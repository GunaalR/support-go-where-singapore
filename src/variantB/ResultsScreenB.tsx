import { useEffect, useState } from 'react';
import {
  CalendarClock,
  CalendarDays,
  Calculator,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  FileText,
  Hand,
  Home,
  Info,
  MessageCircleQuestion,
  Search,
  Square,
  User,
  Users,
  Volume2,
} from 'lucide-react';
import { BenefitBoxA, PayoutRowA, RESULTS_A, YearPanelA } from '../variantA/resultsDataA';
import { C, FONT_BODY, FONT_DISPLAY } from '../theme/brand';
import { COPY_B, KIND_STYLE, kindOf, schemeColour } from './slots/styleB';
import { StartHere } from './slots/StartHere';
import { SchemeLabel } from './slots/SchemeLabel';
import { NextStep } from './slots/NextStep';
import { SchemeCategory } from './slots/SchemeCategory';
import { HelpBot } from './slots/HelpBot';
import { PayoutTimeline } from './slots/PayoutTimeline';
import { PrintPlan } from './slots/PrintPlan';
import { statusFor } from './slots/schemeStatusM3';
import { CONDITION, needsYou, nextPayout, paidSplit, payStatus, progressWithPlan, timeline, usePlan, who } from './slots/taskGuide';
import { CountUp, Reveal } from './motion';

// Variant B: the same results screen as variant A, with our nudges.
// Same data, same order of sections and same wording as variant A
// (src/variantA/ResultsScreenA.tsx); the nudges live in ./slots/:
//   slots/StartHere.tsx      "Start here" block, above your own boxes
//   slots/SchemeLabel.tsx    "Automatic" / "Claim it yourself" under each scheme
//   slots/NextStep.tsx       plan the next step, after the results
//   slots/styleB.ts          plain wording (COPY_B) and colour per kind of support
//   slots/SchemeCategory.tsx icon, kind word and plain line under each scheme
// Visual design (MS-3): HelpCompass tokens from src/theme/brand.ts, with the
// reasons in DESIGN.md. MS-6: the brand is care teal (red only in the heart logo); the
// amber card and chips mark what needs the household; everything automatic
// is quiet. On wide screens a sticky sidebar keeps the summary, the finder
// and help in view, and calm motion (src/index.css) shows what changed.
// Usability (MS-4), from the visitor's side of the screen:
//   - "At a glance" tiles: what to do, what is automatic, the next payout month
//   - one to-do list instead of the same items twice (StartHere + NextStep)
//   - text size (A / A+ / A++) and "Listen" (the browser's own voice, offline)
//   - jump-to-person chips and an "only the ones that need me" filter; every
//     row stays one tap away (Finding 2), and "All" is the default
//   - two columns of compact rows on wide screens, so the page is shorter
//   - "Ask Compass", a scripted helper (slots/HelpBot.tsx)

interface ResultsScreenBProps {
  onBack?: () => void;
  // the live page opens each scheme page in a new tab; here the shell decides
  onOpenScheme?: (schemeCode: string) => void;
  onOpenBanner?: () => void;
  onOpenFaq?: () => void;
}

function money(n: number) {
  return `$${n.toLocaleString('en-SG', { maximumFractionDigits: 2 })}`;
}

function rowAmount(row: PayoutRowA) {
  if (row.unit === 'months') return COPY_B.months(row.amount);
  return row.isMax ? COPY_B.upTo(money(row.amount)) : money(row.amount);
}

function boxCash(box: BenefitBoxA) {
  return box.rows.filter(r => r.unit === 'currency').reduce((sum, r) => sum + r.amount, 0);
}

function boxMonths(box: BenefitBoxA) {
  return box.rows.filter(r => r.unit === 'months').reduce((sum, r) => sum + r.amount, 0);
}

function totalParts(panel: YearPanelA) {
  const boxes = [...panel.ownBoxes, ...panel.memberBoxes];
  const cash = boxes.reduce((sum, b) => sum + boxCash(b), 0);
  const months = boxes.reduce((sum, b) => sum + boxMonths(b), 0);
  const isMax = boxes.some(b => b.rows.some(r => r.isMax));
  return { cash, months, isMax };
}

function totalLabel(panel: YearPanelA) {
  const { cash, months, isMax } = totalParts(panel);
  const amount = money(cash);
  if (months === 0) return isMax ? COPY_B.upTo(amount) : amount;
  const withMonths = `${amount} and ${COPY_B.rebateMonthsLong(months)}`;
  return isMax ? COPY_B.upTo(withMonths) : withMonths;
}

function SectionHeading({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <div className="mb-5 md:mb-6">
      <p className="text-sm font-bold uppercase tracking-[0.14em]" style={{ color: C.brand }}>
        {eyebrow}
      </p>
      <h2 className="mt-1 text-xl md:text-3xl font-extrabold tracking-tight" style={{ color: C.ink, fontFamily: FONT_DISPLAY }}>
        {title}
      </h2>
      {note && (
        <p className="mt-2 text-base md:text-lg" style={{ color: C.muted }}>
          {note}
        </p>
      )}
    </div>
  );
}

function BoxHeaderTotal({ box }: { box: BenefitBoxA }) {
  const cash = boxCash(box);
  const months = boxMonths(box);
  if (cash === 0 && months === 0) {
    return <p className="font-semibold text-base md:text-lg" style={{ color: C.muted }}>{COPY_B.notEligible}</p>;
  }
  const isMax = box.rows.some(r => r.isMax);
  return (
    <div className="font-extrabold text-xl md:text-2xl tabular-nums leading-tight" style={{ color: C.ink, fontFamily: FONT_DISPLAY }}>
      {cash > 0 && <p className="whitespace-nowrap">{isMax ? COPY_B.upTo(money(cash)) : money(cash)}</p>}
      {months > 0 && <p className="whitespace-nowrap text-base md:text-lg font-bold" style={{ color: C.body }}>{COPY_B.rebateMonthsShort(months)}</p>}
    </div>
  );
}

function NoResult({ year }: { year: string }) {
  return (
    <div className="flex flex-col items-center text-center px-6 py-10">
      <div
        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-5"
        style={{ backgroundColor: C.brandTint }}
        aria-hidden="true"
      >
        <Calculator className="w-10 h-10 md:w-12 md:h-12" style={{ color: C.brand }} />
        <Search className="absolute -left-1 top-1 w-8 h-8 md:w-9 md:h-9" style={{ color: C.muted }} />
      </div>
      <p className="font-bold text-lg md:text-xl max-w-xl" style={{ color: C.ink }}>{COPY_B.memberNoResultTitle(year)}</p>
      <p className="mt-2 max-w-xl" style={{ color: C.body }}>{COPY_B.memberNoResultDesc}</p>
    </div>
  );
}

function SchemeRow({ row, onOpenScheme }: { row: PayoutRowA; onOpenScheme?: (schemeCode: string) => void }) {
  const kind = kindOf(row);
  const bar = schemeColour(row) ?? C.line;
  // M5's kind colour as a left bar and a soft wash that fades into white (GR-4)
  const wash = kind ? `linear-gradient(90deg, ${KIND_STYLE[kind].tint} 0%, #FFFFFF 55%)` : '#FFFFFF';
  // One left-aligned column, with only the amount on the right of the name,
  // so the text never gets squeezed into a narrow strip (MS-9)
  return (
    <li
      className="hc-lift flex flex-col gap-3 rounded-xl px-4 py-4 md:px-6 md:py-5"
      style={{ borderLeft: `5px solid ${bar}`, background: wash, boxShadow: `inset 0 0 0 1px ${C.line}` }}
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <button
          type="button"
          onClick={() => onOpenScheme?.(row.schemeCode)}
          className="min-w-0 flex-1 text-left text-lg md:text-xl font-semibold leading-snug underline decoration-2 underline-offset-4 cursor-pointer transition-colors hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm"
          style={{ color: C.brand, textDecorationColor: 'rgba(15,118,110,0.3)', outlineColor: C.brand }}
        >
          {row.schemeName}
        </button>
        <p
          className="shrink-0 whitespace-nowrap sm:text-right text-2xl md:text-[28px] font-extrabold tabular-nums leading-tight"
          style={{ color: C.ink, fontFamily: FONT_DISPLAY }}
        >
          {rowAmount(row)}
        </p>
      </div>
      {/* M5 slot: kind icon, word and plain-language line */}
      <SchemeCategory row={row} />
      {/* M3 slot (status) and Finding 3 (paid or to come), side by side */}
      <div className="flex flex-wrap items-center gap-2">
        <SchemeLabel row={row} />
        <PayBadge row={row} />
      </div>
      {/* Finding 8: the condition sits with the amount it limits */}
      {CONDITION[row.schemeCode] && (
        <p
          className="flex items-start gap-2 rounded-lg px-3 py-2 text-[15px] leading-snug"
          style={{ color: C.body, backgroundColor: C.claimSoft, boxShadow: `inset 0 0 0 1px ${C.claimLine}` }}
        >
          <Info className="w-4 h-4 mt-0.5 shrink-0" style={{ color: C.claim }} aria-hidden="true" />
          <span>
            <strong style={{ color: C.claimDeep }}>Condition: </strong>
            {CONDITION[row.schemeCode]}
          </span>
        </p>
      )}
      <p className="flex items-start gap-2 text-base" style={{ color: C.muted }}>
        <CalendarDays className="w-4 h-4 mt-1 shrink-0" aria-hidden="true" />
        <span>{row.payoutLine}</span>
      </p>
    </li>
  );
}

// Finding 3: whether this payout has already been made, as of today
function PayBadge({ row }: { row: PayoutRowA }) {
  const s = payStatus(row);
  if (!s) return null;
  const look = {
    paid: { text: 'Already paid', Icon: CheckCircle2, fg: C.auto, bg: C.autoTint },
    now: { text: 'Paying this month', Icon: CalendarClock, fg: C.brand, bg: C.brandSoft },
    coming: { text: 'Still to come', Icon: CalendarClock, fg: C.brand, bg: C.brandTint },
    partly: { text: 'Partly paid', Icon: CalendarClock, fg: C.signup, bg: C.signupTint },
  }[s];
  return (
    <span className="inline-flex items-center gap-1 w-fit rounded-full px-2.5 py-1 text-sm font-bold" style={{ color: look.fg, backgroundColor: look.bg }}>
      <look.Icon className="w-4 h-4" aria-hidden="true" />
      {look.text}
    </span>
  );
}

function BenefitBox({
  box,
  year,
  onlyMine,
  onOpenScheme,
}: {
  box: BenefitBoxA;
  year: string;
  onlyMine: boolean;
  onOpenScheme?: (schemeCode: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const Icon = box.kind === 'household' ? Home : User;
  const rows = onlyMine ? box.rows.filter(needsYou) : box.rows;

  return (
    <div
      id={`box-${year}-${box.id}`}
      className="mb-6 rounded-2xl bg-white overflow-hidden scroll-mt-[150px] shadow-[0_1px_2px_rgba(15,30,46,0.05),0_6px_20px_-12px_rgba(15,30,46,0.18)]"
      style={{ border: `1px solid ${C.line}` }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 p-4 md:p-6 text-left cursor-pointer transition-colors hover:bg-[#F9FDFC] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2"
        style={{ outlineColor: C.brand }}
      >
        <div className="flex items-start gap-4 w-full">
          <span
            className="shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: C.brandTint }}
            aria-hidden="true"
          >
            <Icon className="w-6 h-6" style={{ color: C.brand }} strokeWidth={2} />
          </span>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2 md:gap-6">
            <div className="min-w-0">
              <p className="font-bold text-lg md:text-xl" style={{ color: C.ink, fontFamily: FONT_DISPLAY }}>{box.title}</p>
              <p className="mt-0.5 max-w-[690px] text-base" style={{ color: C.muted }}>{box.profile}</p>
            </div>
            <div className="shrink-0 md:text-right">
              <BoxHeaderTotal box={box} />
            </div>
          </div>
        </div>
        <span
          className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: C.page }}
          aria-hidden="true"
        >
          {open ? (
            <ChevronUp className="w-5 h-5" style={{ color: C.body }} strokeWidth={2} />
          ) : (
            <ChevronDown className="w-5 h-5" style={{ color: C.body }} strokeWidth={2} />
          )}
        </span>
      </button>

      {open && (
        <div className="px-3 pb-4 md:px-6 md:pb-6" style={{ borderTop: `1px solid ${C.line}` }}>
          {box.rows.length === 0 ? (
            <NoResult year={year} />
          ) : rows.length === 0 ? (
            <p className="mt-4 flex items-center gap-2 rounded-xl px-4 py-3 text-base font-semibold" style={{ color: C.auto, backgroundColor: C.autoTint }}>
              <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
              Nothing needed here: {box.rows.length === 1 ? 'this one is' : `all ${box.rows.length} are`} automatic.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {rows.map((row, i) => (
                <SchemeRow key={`${row.schemeCode}-${i}`} row={row} onOpenScheme={onOpenScheme} />
              ))}
            </ul>
          )}

          {!onlyMine && box.notes.length > 0 && (
            <div className="mt-4 flex gap-3 rounded-xl p-4" style={{ backgroundColor: C.page }}>
              <Info className="w-5 h-5 mt-0.5 shrink-0" style={{ color: C.brand }} aria-hidden="true" />
              <div>
                <p className="font-bold" style={{ color: C.ink }}>{COPY_B.toNote}</p>
                <ul className="mt-1 flex flex-col gap-1 list-disc ml-5">
                  {box.notes.map(note => (
                    <li key={note} className="text-base leading-relaxed" style={{ color: C.body }}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const TEXT_SIZES = [
  { label: 'A', name: 'Normal text', zoom: 1 },
  { label: 'A+', name: 'Larger text', zoom: 1.15 },
  { label: 'A++', name: 'Largest text', zoom: 1.3 },
];

function StatTile({
  icon: Icon,
  label,
  value,
  note,
  fg,
  bg,
  onClick,
  className = '',
  compact = false,
}: {
  icon: typeof Hand;
  label: string;
  value: string;
  note: string;
  fg: string;
  bg: string;
  onClick?: () => void;
  className?: string;
  compact?: boolean;
}) {
  const body = (
    <>
      <span className="w-11 h-11 shrink-0 rounded-2xl flex items-center justify-center" style={{ backgroundColor: bg }} aria-hidden="true">
        <Icon className="w-6 h-6" style={{ color: fg }} strokeWidth={2} />
      </span>
      <span className="min-w-0 text-left">
        <span className="block text-sm font-bold uppercase tracking-[0.1em]" style={{ color: C.muted }}>{label}</span>
        <span className="block text-xl font-extrabold leading-tight" style={{ color: C.ink, fontFamily: FONT_DISPLAY }}>{value}</span>
        {!compact && <span className="block text-base" style={{ color: C.body }}>{note}</span>}
      </span>
    </>
  );
  const cls = `hc-lift flex items-start gap-3 rounded-2xl bg-white text-left ${compact ? 'p-3' : 'p-4'} ${className}`;
  return onClick ? (
    <button
      type="button"
      onClick={onClick}
      className={`${cls} cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
      style={{ border: `1.5px solid ${C.claimLine}`, outlineColor: C.brand }}
    >
      {body}
    </button>
  ) : (
    <div className={cls} style={{ border: `1px solid ${C.line}` }}>
      {body}
    </div>
  );
}

function openHelper() {
  window.dispatchEvent(new Event('helpcompass:open-bot'));
}

export function ResultsScreenB({ onBack, onOpenScheme, onOpenBanner, onOpenFaq }: ResultsScreenBProps) {
  const thisYear = String(new Date().getFullYear());
  const defaultIndex = Math.max(0, RESULTS_A.findIndex(p => p.year === thisYear));
  const [tab, setTab] = useState(defaultIndex);
  const [size, setSize] = useState(0);
  const [onlyMine, setOnlyMine] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const plan = usePlan();
  const panel = RESULTS_A[tab];
  const total = totalParts(panel);
  const zoom = TEXT_SIZES[size].zoom;

  const allRows = [...panel.ownBoxes, ...panel.memberBoxes].flatMap(b => b.rows);
  const automaticCount = allRows.filter(r => statusFor(r)?.kind === 'automatic' || statusFor(r)?.kind === 'employee').length;
  const mineCount = allRows.filter(needsYou).length;
  const { left, items, done, total: rowTotal, percent } = progressWithPlan(panel, plan);
  const next = nextPayout(panel);
  const split = paidSplit(panel);
  const asOf = new Date().toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' });
  const boxes = [...panel.ownBoxes, ...panel.memberBoxes];

  const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;
  useEffect(() => () => {
    if (canSpeak) window.speechSynthesis.cancel();
  }, [canSpeak]);
  const listen = () => {
    if (!canSpeak) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const todo = items.length
      ? `${items.length} things need you: ${items.map(it => it.status.shortName).join(', ')}. Everything else is paid automatically.`
      : 'Everything is paid automatically.';
    const text = `${COPY_B.pageTitle}, for ${panel.year}. ${COPY_B.totalTitle}: ${totalLabel(panel)}. ${todo} ${
      next ? `The next payout month is ${next.label}.` : ''
    } ${COPY_B.pageSubtitle}`;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-SG';
    u.rate = 0.95;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    setSpeaking(true);
  };

  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const tiles = (stacked: boolean) => (
    <div className={`grid gap-3 ${stacked ? '' : 'md:grid-cols-3'}`}>
      <StatTile
        icon={Hand}
        label="Needs you"
        value={left === 0 ? 'All done' : `${left} ${left === 1 ? 'thing' : 'things'} to do`}
        note={left === 0 ? 'Nothing left on your list' : 'Tap to see your to-do list'}
        fg={C.claim}
        bg={C.claimTint}
        onClick={() => goTo('todo')}
        className="hc-rise hc-d1"
        compact={stacked}
      />
      <StatTile
        icon={CheckCircle2}
        label="Automatic"
        value={`${automaticCount} of ${allRows.length}`}
        note="Paid to you with nothing to do"
        fg={C.auto}
        bg={C.autoTint}
        className="hc-rise hc-d2"
        compact={stacked}
      />
      <StatTile
        icon={CalendarClock}
        label="Next payout"
        value={next ? next.label : 'None left'}
        note={next ? next.schemes.slice(0, 2).join(', ') + (next.schemes.length > 2 ? ' and more' : '') : `All ${panel.year} payouts are in the past`}
        fg={C.brand}
        bg={C.brandTint}
        className="hc-rise hc-d3"
        compact={stacked}
      />
    </div>
  );

  // The hedged total (Finding 1); "compact" is the sidebar version
  const totalCard = (compact: boolean) => (
    <div
      className={`relative overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(15,30,46,0.05),0_12px_32px_-16px_rgba(15,118,110,0.35)] ${
        compact ? 'p-5' : 'p-6 md:p-9'
      }`}
      style={{ border: `1px solid ${C.line}` }}
    >
      <span className="absolute inset-y-0 left-0 w-1.5" style={{ background: `linear-gradient(180deg, ${C.brand}, ${C.brandMid})` }} aria-hidden="true" />
      <p className="text-sm font-bold uppercase tracking-[0.14em]" style={{ color: C.brand }}>
        At a glance · {panel.year}
      </p>
      <p className={`mt-1 font-semibold ${compact ? 'text-base' : 'text-base md:text-lg'}`} style={{ color: C.muted }}>
        {COPY_B.totalTitle}
      </p>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-2.5 gap-y-1" aria-hidden="true">
        {total.isMax && (
          <span className={`font-bold ${compact ? 'text-lg' : 'text-xl md:text-2xl'}`} style={{ color: C.body }}>
            Up to
          </span>
        )}
        <span
          className={`font-extrabold tracking-tight tabular-nums leading-none ${compact ? 'text-5xl' : 'text-5xl md:text-7xl'}`}
          style={{ color: C.ink, fontFamily: FONT_DISPLAY }}
        >
          <CountUp value={total.cash} format={money} />
        </span>
        {total.months > 0 && (
          <span className={`font-bold ${compact ? 'text-base' : 'text-xl md:text-2xl'}`} style={{ color: C.body }}>
            and {COPY_B.rebateMonthsLong(total.months)}
          </span>
        )}
      </div>
      {/* Finding 3: how much of this year's money has already arrived */}
      {(split.paid > 0 || split.partly > 0) && (
        <div className="mt-4">
          <p className={`font-semibold ${compact ? 'text-sm' : 'text-base'}`} style={{ color: C.body }}>
            <span style={{ color: C.auto }}>{money(split.paid)} already paid</span>
            {' · '}
            <span style={{ color: C.brand }}>{money(split.coming)} still to come</span>
            {split.partly > 0 ? ` · ${money(split.partly)} partly paid` : ''}
            <span className="font-normal" style={{ color: C.muted }}> (as of {asOf})</span>
          </p>
          <div className="mt-1.5 flex h-2.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: C.brandTint }} aria-hidden="true">
            <span style={{ width: `${(split.paid / Math.max(1, total.cash)) * 100}%`, backgroundColor: '#A0A8B3' }} />
            <span style={{ width: `${(split.partly / Math.max(1, total.cash)) * 100}%`, backgroundColor: C.signup }} />
            <span style={{ width: `${(split.coming / Math.max(1, total.cash)) * 100}%`, backgroundColor: C.brand }} />
          </div>
        </div>
      )}
      {compact && (
        <div className="mt-4">
          <p className="text-sm font-semibold" style={{ color: C.body }}>
            {done} of {rowTotal} benefits taken care of
          </p>
          <div className="mt-1.5 h-2.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: C.brandTint }} aria-hidden="true">
            <div
              className="h-full rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none"
              style={{ width: `${percent}%`, background: `linear-gradient(90deg, ${C.brand}, ${C.brandMid})` }}
            />
          </div>
        </div>
      )}
      <div className={compact ? 'mt-5' : 'mt-7'}>{tiles(compact)}</div>
    </div>
  );

  // Jump-to-person chips and the filter
  const finder = (inSidebar: boolean) => (
    <div className={inSidebar ? 'rounded-3xl bg-white p-5' : 'mb-6'} style={inSidebar ? { border: `1px solid ${C.line}` } : undefined}>
      <p className="text-sm font-bold uppercase tracking-[0.14em]" style={{ color: C.brand }}>
        Find your benefits
      </p>
      <div
        role="group"
        aria-label="Which schemes to show"
        className={`mt-3 p-1 bg-white ${inSidebar ? 'grid grid-cols-2 gap-1 rounded-2xl' : 'flex flex-wrap w-fit rounded-full'}`}
        style={{ boxShadow: `inset 0 0 0 1px ${C.line}` }}
      >
        {[
          { mine: false, label: `All (${allRows.length})` },
          { mine: true, label: `Only ones that need me (${mineCount})` },
        ].map(o => (
          <button
            key={o.label}
            type="button"
            onClick={() => setOnlyMine(o.mine)}
            aria-pressed={onlyMine === o.mine}
            className={`font-semibold cursor-pointer transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              inSidebar ? 'rounded-xl px-2 py-2 text-sm leading-tight text-center' : 'rounded-full px-4 py-2 text-base whitespace-nowrap'
            }`}
            style={onlyMine === o.mine ? { backgroundColor: C.brand, color: '#FFFFFF', outlineColor: C.brand } : { color: C.body, outlineColor: C.brand }}
          >
            {o.label}
          </button>
        ))}
      </div>
      <nav aria-label="Jump to a person" className={`mt-3 flex flex-wrap gap-2 ${inSidebar ? 'flex-col' : ''}`}>
        {boxes.map(box => {
          const cash = box.rows.filter(r => r.unit === 'currency').reduce((s, r) => s + r.amount, 0);
          return (
            <button
              key={box.id}
              type="button"
              onClick={() => goTo(`box-${panel.year}-${box.id}`)}
              className="group inline-flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-2.5 text-base font-semibold cursor-pointer transition-colors hover:bg-[#F0FDFA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ color: C.ink, border: `1px solid ${C.line}`, outlineColor: C.brand }}
            >
              <span className="inline-flex items-center gap-2">
                {box.kind === 'household' ? (
                  <Home className="w-4 h-4" style={{ color: C.brand }} aria-hidden="true" />
                ) : (
                  <User className="w-4 h-4" style={{ color: C.brand }} aria-hidden="true" />
                )}
                {who(box)}
              </span>
              {inSidebar && (
                <span className="text-sm font-bold tabular-nums" style={{ color: box.rows.length ? C.body : C.muted }}>
                  {box.rows.length ? (cash ? money(cash) : `${box.rows.length} items`) : 'None'}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );

  const helpCard = (
    <div
      className="relative overflow-hidden rounded-3xl p-5 text-white"
      style={{ background: `linear-gradient(140deg, ${C.brandDeep}, ${C.brand} 60%, ${C.brandMid})` }}
    >
      <svg className="absolute -right-10 -bottom-10 w-40 h-40 opacity-15 hc-spin-slow" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="46" fill="none" stroke="#FFF" strokeWidth="2" />
        <path d="M50 10l8 40-8 40-8-40z" fill="#FFF" />
      </svg>
      <p className="relative flex items-center gap-2 text-lg font-extrabold" style={{ fontFamily: FONT_DISPLAY }}>
        <MessageCircleQuestion className="w-6 h-6" aria-hidden="true" /> Not sure what to do?
      </p>
      <p className="relative mt-1 text-base" style={{ color: C.brandOnDeep }}>
        Ask in plain words, or bring in someone you trust.
      </p>
      <div className="relative mt-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={openHelper}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-base font-bold cursor-pointer transition-transform hover:-translate-y-0.5 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          style={{ color: C.brand }}
        >
          Ask Compass
        </button>
        <button
          type="button"
          onClick={() => goTo(`plan-${panel.year}`)}
          className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-base font-semibold cursor-pointer transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          style={{ border: '1.5px solid rgba(255,255,255,0.6)' }}
        >
          <Users className="w-5 h-5" aria-hidden="true" /> Do this with someone
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ color: C.body, backgroundColor: C.page, fontFamily: FONT_BODY }} data-variant="B">
      <div style={{ zoom }}>
        {/* Page title */}
        <div
          className="relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${C.brandDeep} 0%, ${C.brand} 65%, ${C.brandMid} 100%)` }}
        >
          {/* slowly turning compass, decoration only */}
          <svg
            className="hc-spin-slow absolute -right-24 -top-24 w-[420px] h-[420px] md:w-[560px] md:h-[560px] opacity-[0.1]"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <g fill="none" stroke="#FFFFFF" strokeWidth="1.2">
              <circle cx="100" cy="100" r="96" />
              <circle cx="100" cy="100" r="70" />
              <circle cx="100" cy="100" r="44" />
              <path d="M100 4v192M4 100h192" />
            </g>
            <path d="M100 40l14 60-14 60-14-60z" fill="#FFFFFF" />
          </svg>
          <span className="absolute -left-20 bottom-[-120px] w-80 h-80 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: '#F59E0B' }} aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-6 pb-12 md:pt-8 md:pb-16">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-8 md:mb-10">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1.5 rounded-full pl-2 pr-4 py-1.5 text-base md:text-lg font-semibold cursor-pointer transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                style={{ color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.35)' }}
                aria-label="Go back to calculator landing page"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                {COPY_B.back}
              </button>

              {/* Reading tools: text size and listen */}
              <div className="flex flex-wrap items-center gap-2">
                <div role="group" aria-label="Text size" className="flex rounded-full p-1 bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.3)' }}>
                  {TEXT_SIZES.map((s, i) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => setSize(i)}
                      aria-pressed={size === i}
                      aria-label={s.name}
                      title={s.name}
                      className="min-w-[44px] h-9 rounded-full px-2 font-bold cursor-pointer transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                      style={{
                        fontSize: 14 + i * 3,
                        color: size === i ? C.brandDeep : '#FFFFFF',
                        backgroundColor: size === i ? '#FFFFFF' : 'transparent',
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                {canSpeak && (
                  <button
                    type="button"
                    onClick={listen}
                    aria-pressed={speaking}
                    className="inline-flex items-center gap-2 h-11 rounded-full px-4 text-base font-semibold cursor-pointer transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                    style={{ color: '#FFFFFF', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)' }}
                  >
                    {speaking ? <Square className="w-4 h-4" aria-hidden="true" /> : <Volume2 className="w-5 h-5" aria-hidden="true" />}
                    {speaking ? 'Stop' : 'Listen'}
                  </button>
                )}
              </div>
            </div>
            <h1
              className="hc-rise text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-white max-w-4xl"
              style={{ fontFamily: FONT_DISPLAY }}
            >
              {COPY_B.pageTitle}
            </h1>
            <p className="hc-rise hc-d1 mt-4 text-lg md:text-xl max-w-3xl leading-relaxed" style={{ color: C.brandOnDeep }}>
              {COPY_B.pageSubtitle}
            </p>
          </div>
        </div>

        {/* Year tabs: sticky under the site header (72px, outside the zoom) */}
        <div
          className="sticky z-30 backdrop-blur"
          style={{ top: 72 / zoom, backgroundColor: 'rgba(248,246,245,0.92)', borderBottom: `1px solid ${C.line}` }}
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center gap-4">
            <div
              className="flex w-full sm:w-fit gap-1 rounded-full p-1"
              role="tablist"
              aria-label="Payout year"
              style={{ backgroundColor: '#FFFFFF', boxShadow: `inset 0 0 0 1px ${C.line}` }}
            >
              {RESULTS_A.map((p, i) => {
                const active = i === tab;
                return (
                  <button
                    key={p.year}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(i)}
                    className="flex-1 sm:flex-none sm:min-w-[140px] rounded-full px-6 py-2.5 text-lg font-bold cursor-pointer transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={
                      active
                        ? { backgroundColor: C.brand, color: '#FFFFFF', outlineColor: C.brand }
                        : { backgroundColor: 'transparent', color: C.body, outlineColor: C.brand }
                    }
                  >
                    {p.year}
                  </button>
                );
              })}
            </div>
            <p className="hidden md:block text-base" style={{ color: C.muted }}>
              Showing estimates for <strong style={{ color: C.ink }}>{panel.year}</strong>
            </p>
          </div>
        </div>

        <p className="sr-only" id={`${panel.year}-aggregate`}>
          {COPY_B.totalTitle}: {totalLabel(panel)}
        </p>

        {/* Two columns on wide screens: the work on the left, a sticky summary on the right */}
        <div
          key={panel.year}
          className="max-w-7xl mx-auto px-4 lg:px-8 mt-6 md:mt-10 mb-6 md:mb-8 lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8 xl:gap-10"
          role="tabpanel"
        >
          <div className="min-w-0">
            {/* Narrow screens: the summary sits on top instead of in the sidebar */}
            <div className="lg:hidden mb-10 hc-rise">{totalCard(false)}</div>

            {/* M3 slot: Start here, the to-do list */}
            <div className="hc-rise hc-d1">
              <StartHere panel={panel} plan={plan} />
            </div>

            {/* When the money comes: month-by-month (Finding 3) */}
            <Reveal>
              <PayoutTimeline panel={panel} />
            </Reveal>

            <Reveal>
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-[0.14em]" style={{ color: C.brand }}>
                  Every scheme
                </p>
                <h2 className="mt-1 text-xl md:text-3xl font-extrabold tracking-tight" style={{ color: C.ink, fontFamily: FONT_DISPLAY }}>
                  All your benefits
                </h2>
              </div>
              <div className="lg:hidden">{finder(false)}</div>
            </Reveal>

            <Reveal>
              <SectionHeading eyebrow="You and your home" title={COPY_B.ownSectionTitle} />
            </Reveal>
            {panel.ownBoxes.map(box => (
              <Reveal key={`${panel.year}-${box.id}`}>
                <BenefitBox box={box} year={panel.year} onlyMine={onlyMine} onOpenScheme={onOpenScheme} />
              </Reveal>
            ))}

            {panel.memberBoxes.length > 0 && (
              <div className="mt-12">
                <Reveal>
                  <SectionHeading eyebrow="Your household" title={COPY_B.membersSectionTitle} note={COPY_B.membersSectionNote} />
                </Reveal>
                {panel.memberBoxes.map(box => (
                  <Reveal key={`${panel.year}-${box.id}`}>
                    <BenefitBox box={box} year={panel.year} onlyMine={onlyMine} onOpenScheme={onOpenScheme} />
                  </Reveal>
                ))}
              </div>
            )}

            {/* M4 slot: the plan, reminders and "Do this with someone" */}
            <Reveal>
              <NextStep panel={panel} plan={plan} />
            </Reveal>
          </div>

          {/* Sidebar (wide screens): summary, finder and help stay in view */}
          <aside className="hidden lg:block" aria-label="Summary and shortcuts">
            {/* scrolls on its own if the window is short, so nothing is cut off */}
            <div
              className="sticky flex flex-col gap-4 pb-6 pr-1 overflow-y-auto"
              style={{ top: 150 / zoom, maxHeight: `calc(${100 / zoom}vh - ${170 / zoom}px)` }}
            >
              <div className="hc-rise">{totalCard(true)}</div>
              <div className="hc-rise hc-d2">{helpCard}</div>
              <div className="hc-rise hc-d3">{finder(true)}</div>
            </div>
          </aside>
        </div>

        {/* Banner and FAQ link, below the results (Finding 9: kept below the action items) */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-6">
          <Reveal>
            <div
              className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 md:p-8 rounded-3xl mb-10 bg-white"
              style={{ border: `1px solid ${C.line}` }}
            >
              <span
                className="hidden md:flex shrink-0 w-14 h-14 rounded-2xl items-center justify-center"
                style={{ backgroundColor: C.brandTint }}
                aria-hidden="true"
              >
                <FileText className="w-7 h-7" style={{ color: C.brand }} strokeWidth={1.75} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold uppercase tracking-[0.14em]" style={{ color: C.brand }}>{COPY_B.bannerTitle}</p>
                <p className="mt-1 md:mt-2 text-lg font-semibold" style={{ color: C.ink }}>{COPY_B.bannerDesc}</p>
              </div>
              <button
                type="button"
                onClick={onOpenBanner}
                className="rounded-full px-6 py-3 text-lg font-semibold text-white cursor-pointer w-full md:w-auto md:min-w-[220px] transition-colors hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: C.brand, outlineColor: C.brand }}
              >
                {COPY_B.bannerButton}
              </button>
            </div>
          </Reveal>

          <p className="flex flex-wrap items-center justify-center gap-x-2 text-center text-lg mb-10 md:mb-16" style={{ color: C.body }}>
            <Users className="w-5 h-5" style={{ color: C.muted }} aria-hidden="true" />
            {COPY_B.unsure}
            <button
              type="button"
              onClick={onOpenFaq}
              className="inline-block font-semibold underline underline-offset-4 cursor-pointer"
              style={{ color: C.brand }}
            >
              {COPY_B.faqLink}
            </button>
          </p>
        </div>
      </div>

      {/* Scripted helper, outside the zoom so it stays pinned to the corner */}
      <HelpBot panel={panel} plan={plan} />
      {/* One-page plan, printed by "Print my plan" */}
      <PrintPlan panel={panel} plan={plan} totalText={totalLabel(panel)} />
    </div>
  );
}
