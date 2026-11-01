import { useEffect, useRef, useState, type FormEvent } from 'react';
import { MessageCircleQuestion, Send, X } from 'lucide-react';
import type { YearPanelA } from '../../variantA/resultsDataA';
import { C, FONT_DISPLAY } from '../../theme/brand';
import { COPY_B } from './styleB';
import { PLAIN_LINE } from './SchemeCategory';
import { actionItems, statusFor } from './schemeStatusM3';
import { deadlineFor, money, nextPayout, niceDate, paidSplit, plainName, progressWithPlan, stepsFor, CONDITION, type Plan } from './taskGuide';

// "Ask Compass": a scripted helper for variant B (MS-4).
// Why (AUDIT.md Findings 7 and 11; Nielsen heuristic 10, help and
// documentation): on the live screen, help is one FAQ link, and how to claim
// sits on other pages. Here a visitor can ask in plain words and get the
// answer for THIS household, built from the page's own data and records.
// Guardrails (Week 6 briefing): no AI model, no network call, nothing stored.
// It says plainly that it is a simple helper with fixed answers, never claims
// to be a person, and never pushes: every answer can be ignored.

type Topic = 'todo' | 'total' | 'next' | 'apply' | 'NCV' | 'CHILD-CREDITS' | 'LCV' | 'meaning' | 'help';

interface Msg {
  from: 'bot' | 'you';
  text: string;
  list?: string[];
  actions?: { label: string; target?: string; topic?: Topic; scheme?: string }[];
}

const QUICK: { label: string; topic: Topic }[] = [
  { label: 'What do I need to do?', topic: 'todo' },
  { label: 'How much will we get?', topic: 'total' },
  { label: 'When is the next payout?', topic: 'next' },
  { label: 'Do I need to apply?', topic: 'apply' },
  { label: 'What do these schemes mean?', topic: 'meaning' },
  { label: 'Can someone help me?', topic: 'help' },
];

function totalText(panel: YearPanelA) {
  const rows = [...panel.ownBoxes, ...panel.memberBoxes].flatMap(b => b.rows);
  const cash = rows.filter(r => r.unit === 'currency').reduce((s, r) => s + r.amount, 0);
  const months = rows.filter(r => r.unit === 'months').reduce((s, r) => s + r.amount, 0);
  const isMax = rows.some(r => r.isMax);
  const base = months > 0 ? `${money(cash)} and ${COPY_B.rebateMonthsLong(months)}` : money(cash);
  return isMax ? `up to ${base}` : base;
}

function match(text: string): Topic | null {
  const t = text.toLowerCase();
  if (/voucher|ncv|redeem/.test(t)) return 'NCV';
  if (/child|kid|credit|compasslife|trustee/.test(t)) return 'CHILD-CREDITS';
  if (/lcv|sign ?up|signed/.test(t)) return 'LCV';
  if (/apply|application|form/.test(t)) return 'apply';
  if (/when|next|date|month|pay ?out|arrive/.test(t)) return 'next';
  if (/how much|total|money|amount|\$|get/.test(t)) return 'total';
  if (/mean|what is|what's|explain|name/.test(t)) return 'meaning';
  if (/help|someone|family|friend|son|daughter|person/.test(t)) return 'help';
  if (/do|need|todo|to-do|task|first|start/.test(t)) return 'todo';
  return null;
}

export function HelpBot({ panel, plan }: { panel: YearPanelA; plan: Plan }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const fabRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const items = actionItems(panel);
  const schemes = (() => {
    const seen = new Map<string, string>();
    for (const row of [...panel.ownBoxes, ...panel.memberBoxes].flatMap(b => b.rows)) {
      if (!seen.has(row.schemeCode)) seen.set(row.schemeCode, plainName(row.schemeName));
    }
    return [...seen.entries()];
  })();

  const greeting: Msg = {
    from: 'bot',
    text: `Hi, I’m Compass, a simple helper for this page. I answer from the figures shown here for ${panel.year}. I’m not a person, I can’t see your real details, and nothing you type is sent anywhere. What would you like to know?`,
  };

  // focus the question box on open; give focus back to the button on close
  const returnFocus = useRef(false);
  useEffect(() => {
    if (open) inputRef.current?.focus();
    else if (returnFocus.current) {
      fabRef.current?.focus();
      returnFocus.current = false;
    }
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs]);

  // the sidebar's "Ask Compass" button opens the helper
  useEffect(() => {
    const openIt = () => setOpen(true);
    window.addEventListener('helpcompass:open-bot', openIt);
    return () => window.removeEventListener('helpcompass:open-bot', openIt);
  }, []);

  // a new year tab starts a new conversation
  useEffect(() => setMsgs([]), [panel.year]);

  const close = () => {
    returnFocus.current = true;
    setOpen(false);
  };

  const answer = (topic: Topic | null, scheme?: string): Msg => {
    if (scheme) {
      const row = [...panel.ownBoxes, ...panel.memberBoxes].flatMap(b => b.rows).find(r => r.schemeCode === scheme);
      const name = schemes.find(([code]) => code === scheme)?.[1] ?? scheme;
      return {
        from: 'bot',
        text: `${name}: ${PLAIN_LINE[scheme] ?? 'A support scheme in your results.'}`,
        list: row
          ? [
              `What you need to do: ${statusFor(row)?.label ?? 'see the label on the page'}`,
              `When: ${row.payoutLine}`,
              ...(CONDITION[scheme] ? [`Condition: ${CONDITION[scheme]}`] : []),
            ]
          : undefined,
        actions: [{ label: 'Explain another scheme', topic: 'meaning' }],
      };
    }
    switch (topic) {
      case 'todo': {
        const { left } = progressWithPlan(panel, plan);
        if (left === 0) return { from: 'bot', text: `You have ticked off everything on your ${panel.year} list. Everything else is paid automatically.` };
        return {
          from: 'bot',
          text: `${items.length} things need you in ${panel.year}. Everything else is paid automatically. Your list, soonest deadline first:`,
          list: items.map(it => {
            const e = plan.get(panel.year, it.code);
            const state = e.state === 'done' ? 'done' : e.state === 'planned' && e.date ? `planned for ${niceDate(e.date)}` : e.state === 'skipped' ? 'skipped for now' : 'to do';
            return `${it.status.shortName}${it.total ? ` (${money(it.total)})` : ''}: ${state}. ${deadlineFor(it.code, panel.year) ?? ''}`;
          }),
          actions: [
            { label: 'Show my to-do list', target: 'todo' },
            ...items.slice(0, 2).map(it => ({ label: `How do I do ${it.status.shortName}?`, topic: it.code as Topic })),
          ],
        };
      }
      case 'total':
        return {
          from: 'bot',
          text: `Your household could get ${totalText(panel)} in ${panel.year}. ${(() => {
            const s = paidSplit(panel);
            return s.paid > 0 ? `Of the cash, ${money(s.paid)} has already been paid and ${money(s.coming)} is still to come. ` : '';
          })()}It is an estimate: it assumes the details you entered stay the same, and amounts marked “Up to” depend on conditions such as income.`,
          actions: [{ label: 'See every scheme', target: 'see-all-schemes' }, { label: 'When is the next payout?', topic: 'next' }],
        };
      case 'next': {
        const next = nextPayout(panel);
        if (!next) return { from: 'bot', text: `All the ${panel.year} payouts on this page are in the past. Try the other year tab to see what is coming.` };
        return {
          from: 'bot',
          text: `The next payout month is ${next.label}. Paid then:`,
          list: next.schemes,
          actions: [{ label: 'See every scheme', target: 'see-all-schemes' }],
        };
      }
      case 'apply':
        return {
          from: 'bot',
          text: `You don’t need to fill in an application for any of these: the official record for each says “No application needed”. But ${items.length} need you to claim, use or sign up:`,
          list: items.map(it => `${it.status.shortName}: ${it.status.label}`),
          actions: [{ label: 'Show my to-do list', target: 'todo' }],
        };
      case 'NCV':
      case 'CHILD-CREDITS':
      case 'LCV': {
        const it = items.find(i => i.code === topic);
        if (!it) return { from: 'bot', text: `That one is not in your ${panel.year} results. Try the other year tab.` };
        return {
          from: 'bot',
          text: `${it.status.shortName}: ${it.status.reason}`,
          list: stepsFor(topic, panel.year).map((s, n) => `Step ${n + 1}: ${s}`),
          actions: [{ label: 'Pick a day for this', target: 'todo' }],
        };
      }
      case 'meaning':
        return {
          from: 'bot',
          text: 'Which scheme would you like explained in plain words?',
          actions: schemes.map(([code, name]) => ({ label: name, scheme: code })),
        };
      case 'help':
        return {
          from: 'bot',
          text: 'Yes. Any member of your household can go through this with you. Under “Your plan” there is a short message you can copy and send to a family member or friend. It only has the scheme names and the days you picked, never your income or address.',
          actions: [{ label: 'Go to “Your plan”', target: `plan-${panel.year}` }],
        };
      default:
        return {
          from: 'bot',
          text: 'Sorry, I can only answer a few questions about this page. Try one of the buttons below.',
        };
    }
  };

  const ask = (label: string, topic: Topic | null, scheme?: string) => {
    setMsgs(prev => [...(prev.length ? prev : [greeting]), { from: 'you', text: label }, answer(topic, scheme)]);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput('');
    ask(text, match(text));
  };

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.innerWidth < 768) setOpen(false);
  };

  const shown = msgs.length ? msgs : [greeting];

  return (
    <>
      {!open && (
        <button
          ref={fabRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="help-bot"
          className="hc-ring lg:hidden fixed right-3 md:right-6 bottom-[84px] md:bottom-6 z-50 inline-flex items-center gap-2 rounded-full pl-4 pr-5 py-3.5 text-base md:text-lg font-bold text-white cursor-pointer shadow-[0_10px_30px_-8px_rgba(15,118,110,0.7)] transition-transform hover:-translate-y-0.5 motion-reduce:transition-none focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2"
          style={{ background: `linear-gradient(135deg, ${C.brand}, #0D9488)`, outlineColor: C.claimSolid }}
        >
          <MessageCircleQuestion className="w-6 h-6" aria-hidden="true" />
          Ask Compass
        </button>
      )}

      {open && (
        <div
          id="help-bot"
          role="dialog"
          aria-modal="false"
          aria-labelledby="help-bot-title"
          onKeyDown={e => e.key === 'Escape' && close()}
          className="hc-rise fixed z-50 inset-x-2 bottom-[76px] md:inset-x-auto md:right-6 md:bottom-6 md:w-[400px] flex flex-col rounded-3xl bg-white overflow-hidden shadow-[0_24px_64px_-16px_rgba(15,30,46,0.45)]"
          // on phones it sits above the A/B switch at the bottom of the screen
          style={{ maxHeight: 'min(640px, calc(100vh - 170px))', border: `1px solid ${C.line}` }}
        >
          <div className="flex items-center justify-between gap-3 px-5 py-4 text-white" style={{ background: `linear-gradient(135deg, ${C.brandDeep}, ${C.brand})` }}>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-white/15" aria-hidden="true">
                <MessageCircleQuestion className="w-6 h-6" />
              </span>
              <div>
                <p id="help-bot-title" className="text-lg font-extrabold leading-tight" style={{ fontFamily: FONT_DISPLAY }}>
                  Ask Compass
                </p>
                <p className="text-sm" style={{ color: C.brandOnDeep }}>
                  A simple helper with fixed answers
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={close}
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              aria-label="Close helper"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          <div ref={logRef} role="log" aria-live="polite" className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ backgroundColor: C.page }}>
            {shown.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'you' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[88%] rounded-2xl px-4 py-3 text-base leading-relaxed"
                  style={
                    m.from === 'you'
                      ? { backgroundColor: C.brand, color: '#FFFFFF', borderBottomRightRadius: 6 }
                      : { backgroundColor: '#FFFFFF', color: C.ink, border: `1px solid ${C.line}`, borderBottomLeftRadius: 6 }
                  }
                >
                  <span className="sr-only">{m.from === 'you' ? 'You said: ' : 'Compass said: '}</span>
                  <p>{m.text}</p>
                  {m.list && (
                    <ul className="mt-2 flex flex-col gap-1.5 list-disc ml-5">
                      {m.list.map(l => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  )}
                  {m.actions && m.actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.actions.map(a => (
                        <button
                          key={a.label}
                          type="button"
                          onClick={() => (a.target ? goTo(a.target) : ask(a.label, a.topic ?? null, a.scheme))}
                          className="rounded-full px-3 py-1.5 text-sm font-semibold cursor-pointer transition-colors hover:bg-[#F0FDFA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1"
                          style={{ color: C.brand, border: `1.5px solid ${C.brand}`, outlineColor: C.brand }}
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 pt-3 pb-4 bg-white" style={{ borderTop: `1px solid ${C.line}` }}>
            <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1" aria-label="Suggested questions">
              {QUICK.map(q => (
                <button
                  key={q.label}
                  type="button"
                  onClick={() => ask(q.label, q.topic)}
                  className="shrink-0 rounded-full px-3.5 py-2 text-sm font-semibold cursor-pointer transition-colors hover:bg-[#FFF4E5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1"
                  style={{ color: C.claimDeep, backgroundColor: C.claimSoft, border: `1px solid ${C.claimLine}`, outlineColor: C.brand }}
                >
                  {q.label}
                </button>
              ))}
            </div>
            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <label htmlFor="help-bot-input" className="sr-only">
                Type your question
              </label>
              <input
                ref={inputRef}
                id="help-bot-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a question, e.g. “how do I claim vouchers?”"
                autoComplete="off"
                className="flex-1 min-w-0 rounded-full px-4 py-3 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1"
                style={{ border: '1.5px solid #CBD5E1', color: C.ink, outlineColor: C.brand }}
              />
              <button
                type="submit"
                className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-white cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: C.brand, outlineColor: C.brand }}
                aria-label="Send question"
              >
                <Send className="w-5 h-5" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
