import { useEffect, useState } from 'react';
import { CalendarDays, Check, ClipboardList, Copy, Users } from 'lucide-react';
import type { YearPanelA } from '../../variantA/resultsDataA';
import { C, FONT_DISPLAY } from '../../theme/brand';
import { actionItems } from './schemeStatusM3';

// SLOT for M4 (follow-through), built by M1 (GR-5) after M4 finished her
// other parts. Shown in variant B right after the results boxes.
// For each item in M3's "Start here" list it offers:
//   - "What you'll need": a short checklist           W1/W2 goal visibility
//   - "When will you do this?": pick a day, or Skip   W1 self-imposed nudge; Skip keeps it a nudge, not a push
//   - a calendar reminder, ticked by default           W4 defaults
//   - "Do this with someone": a message to copy        W2 a named person helps, social support
// Nothing is stored or sent anywhere: the plan lives in the page, and the
// reminder is a calendar file the visitor downloads.

const NEEDS: Record<string, string[]> = {
  NCV: ['A phone or computer', 'Your digital ID login for the RedeemNow website'],
  'CHILD-CREDITS': ['The CompassLife app on the trustee’s phone', 'The trustee’s digital ID login'],
  LCV: ['Your digital ID login for the benefits portal', 'Your bank account details, for the payout'],
};

// colours from the HelpCompass tokens (src/theme/brand.ts, DESIGN.md)
const DARK = C.ink;
const GREY = C.body;
const LINE = C.line;
const LINK = C.brand;

const todayIso = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

const niceDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

function calendarFile(plans: { title: string; date: string }[]) {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const events = plans.map((p, i) =>
    [
      'BEGIN:VEVENT',
      `UID:helpcompass-${p.date}-${i}@prototype`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${p.date.replace(/-/g, '')}`,
      `SUMMARY:HelpCompass: ${p.title}`,
      'BEGIN:VALARM',
      'TRIGGER:-PT15H',
      'ACTION:DISPLAY',
      `DESCRIPTION:${p.title}`,
      'END:VALARM',
      'END:VEVENT',
    ].join('\r\n'),
  );
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//HelpCompass SG prototype//EN', ...events, 'END:VCALENDAR'].join('\r\n');
}

type Choice = { date: string; skipped: boolean };

export function NextStep({ panel }: { panel: YearPanelA }) {
  const items = actionItems(panel);
  const [choices, setChoices] = useState<Record<string, Choice>>({});
  const [remind, setRemind] = useState(true);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  // a new year tab starts a new plan
  useEffect(() => {
    setChoices({});
    setSaved(false);
    setCopied(false);
  }, [panel.year]);

  if (items.length === 0) return null;

  const set = (code: string, c: Partial<Choice>) => {
    setSaved(false);
    setChoices(prev => ({ ...prev, [code]: { ...(prev[code] ?? { date: '', skipped: false }), ...c } }));
  };

  const planned = items
    .filter(it => choices[it.code]?.date && !choices[it.code]?.skipped)
    .map(it => ({ title: it.status.shortName ?? it.code, date: choices[it.code].date }));

  const savePlan = () => {
    setSaved(true);
    if (remind && planned.length > 0) {
      const blob = new Blob([calendarFile(planned)], { type: 'text/calendar' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `helpcompass-plan-${panel.year}.ics`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const message =
    planned.length > 0
      ? `Can you help me with our household benefits? ${planned.map(p => `${p.title} on ${niceDate(p.date)}`).join('; ')}.`
      : `Can you help me with our household benefits? We need to sort out: ${items.map(it => it.status.shortName).join(', ')}.`;

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section aria-labelledby={`plan-${panel.year}`} className="mt-4 mb-12">
      <div
        className="rounded-3xl p-5 sm:p-7 md:p-9 bg-white shadow-[0_1px_2px_rgba(15,30,46,0.05),0_12px_32px_-16px_rgba(11,90,122,0.3)]"
        style={{ border: `1px solid ${LINE}` }}
      >
        <p className="text-sm font-bold uppercase tracking-[0.14em]" style={{ color: LINK }}>
          Make it happen
        </p>
        <h2
          id={`plan-${panel.year}`}
          className="mt-1 text-2xl md:text-4xl font-extrabold tracking-tight"
          style={{ color: DARK, fontFamily: FONT_DISPLAY }}
        >
          Plan your next step
        </h2>
        <p className="mt-2 text-lg" style={{ color: GREY }}>
          Pick a day for each of the items under “Start here”. You can skip any of them.
        </p>

        <ol className="mt-6 flex flex-col gap-6">
          {items.map((it, i) => {
            const c = choices[it.code] ?? { date: '', skipped: false };
            const needs = NEEDS[it.code] ?? [];
            const dateId = `plan-date-${panel.year}-${i}`;
            return (
              <li
                key={it.code}
                className="rounded-2xl p-4 md:p-6"
                style={{ border: `1px solid ${LINE}`, backgroundColor: C.page, opacity: c.skipped ? 0.6 : 1 }}
              >
                <p className="flex items-center gap-3 text-lg md:text-xl font-bold" style={{ color: DARK }}>
                  <span
                    aria-hidden="true"
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-base font-extrabold text-white"
                    style={{ backgroundColor: C.claimSolid }}
                  >
                    {i + 1}
                  </span>
                  <span>{it.status.shortName}</span>
                </p>

                {needs.length > 0 && (
                  <div className="mt-3">
                    <p className="flex items-center gap-2 text-base font-semibold" style={{ color: DARK }}>
                      <ClipboardList className="w-5 h-5" aria-hidden="true" /> What you’ll need
                    </p>
                    <ul className="mt-1 ml-7 list-disc text-base" style={{ color: GREY }}>
                      {needs.map(n => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap items-end gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor={dateId} className="flex items-center gap-2 text-base font-semibold" style={{ color: DARK }}>
                      <CalendarDays className="w-5 h-5" aria-hidden="true" /> When will you do this?
                    </label>
                    <input
                      id={dateId}
                      type="date"
                      min={todayIso()}
                      value={c.date}
                      disabled={c.skipped}
                      onChange={e => set(it.code, { date: e.target.value, skipped: false })}
                      className="rounded-xl px-4 py-2.5 text-lg bg-white min-h-[48px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{ border: `1.5px solid #CBD5E1`, color: DARK, outlineColor: LINK }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => set(it.code, { skipped: !c.skipped, date: '' })}
                    aria-pressed={c.skipped}
                    className="rounded-xl px-5 py-2.5 text-lg font-semibold cursor-pointer min-h-[48px] transition-colors hover:bg-[#F1F5F9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{ border: `1.5px solid #CBD5E1`, color: GREY, backgroundColor: '#FFFFFF', outlineColor: LINK }}
                  >
                    {c.skipped ? 'Undo skip' : 'Skip'}
                  </button>
                </div>
              </li>
            );
          })}
        </ol>

        <label className="mt-6 flex items-center gap-3 text-lg cursor-pointer" style={{ color: DARK }}>
          <input type="checkbox" checked={remind} onChange={e => setRemind(e.target.checked)} className="w-6 h-6" style={{ accentColor: LINK }} />
          Add a reminder to my calendar
        </label>

        <button
          type="button"
          onClick={savePlan}
          className="mt-4 rounded-full px-7 py-3.5 text-lg font-bold text-white cursor-pointer transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 shadow-[0_6px_16px_-8px_rgba(11,90,122,0.6)]"
          style={{ backgroundColor: LINK, outlineColor: LINK }}
        >
          Save my plan
        </button>

        <div aria-live="polite">
          {saved && (
            <div className="mt-4 rounded-2xl p-4 text-base" style={{ color: DARK, backgroundColor: C.autoTint }}>
              {planned.length > 0 ? (
                <>
                  <p className="flex items-center gap-2 font-semibold">
                    <Check className="w-5 h-5" aria-hidden="true" /> Your plan
                  </p>
                  <ul className="mt-1 ml-7 list-disc" style={{ color: GREY }}>
                    {planned.map(p => (
                      <li key={p.title}>
                        {p.title}: {niceDate(p.date)}
                      </li>
                    ))}
                  </ul>
                  {remind && <p className="mt-1" style={{ color: GREY }}>Your calendar file has downloaded. Open it to add the reminders.</p>}
                </>
              ) : (
                <p style={{ color: GREY }}>No days picked yet. You can come back to this any time.</p>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${LINE}` }}>
          <p className="flex items-center gap-2 text-lg font-bold" style={{ color: DARK }}>
            <Users className="w-5 h-5" aria-hidden="true" /> Do this with someone (optional)
          </p>
          <p className="mt-1 text-base" style={{ color: GREY }}>
            Ask a family member or friend to sit with you. Copy this message and send it to them:
          </p>
          <p className="mt-3 rounded-2xl p-4 text-lg leading-relaxed" style={{ backgroundColor: C.brandTint, color: DARK }}>
            {message}
          </p>
          <button
            type="button"
            onClick={copyMessage}
            className="mt-3 flex items-center gap-2 text-lg font-semibold underline underline-offset-4 cursor-pointer"
            style={{ color: LINK }}
          >
            <Copy className="w-4 h-4" aria-hidden="true" /> {copied ? 'Copied' : 'Copy message'}
          </button>
        </div>
      </div>
    </section>
  );
}
