import { useState } from 'react';
import { CalendarCheck, CalendarDays, Check, Copy, Download, Users } from 'lucide-react';
import type { YearPanelA } from '../../variantA/resultsDataA';
import { C, FONT_DISPLAY } from '../../theme/brand';
import { actionItems } from './schemeStatusM3';
import { calendarFile, niceDate, type Plan } from './taskGuide';

// SLOT for M4 (follow-through), first built by M1 (GR-5), reshaped in MS-4.
// Picking a day now happens inside each task of the to-do list (StartHere.tsx),
// so the same items are no longer listed twice. This block sums up the plan:
//   - the days picked, and one calendar file for all of them    W6 reminders at a time the person chose
//   - "Do this with someone": a message to copy               W6 accountability; social support (Finding 11)
// Nothing is stored or sent anywhere: the plan lives in the page, and the
// reminder is a calendar file the visitor downloads.

const DARK = C.ink;
const GREY = C.body;
const LINE = C.line;
const LINK = C.brand;

export function NextStep({ panel, plan }: { panel: YearPanelA; plan: Plan }) {
  const items = actionItems(panel);
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);
  if (items.length === 0) return null;

  const planned = items
    .map(it => ({ it, entry: plan.get(panel.year, it.code) }))
    .filter(({ entry }) => entry.state === 'planned' && entry.date)
    .map(({ it, entry }) => ({ title: it.status.shortName ?? it.code, date: entry.date as string }));
  const doneCount = items.filter(it => plan.get(panel.year, it.code).state === 'done').length;

  const downloadReminders = () => {
    if (planned.length === 0) return;
    const blob = new Blob([calendarFile(planned)], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `helpcompass-plan-${panel.year}.ics`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
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

  const goToTasks = () => document.getElementById('todo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section aria-labelledby={`plan-${panel.year}`} className="mt-4 mb-12">
      <div
        className="rounded-3xl p-5 sm:p-7 md:p-9 bg-white shadow-[0_1px_2px_rgba(15,30,46,0.05),0_12px_32px_-16px_rgba(190,18,60,0.3)]"
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
          Your plan
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Reminders */}
          <div className="rounded-2xl p-5 md:p-6" style={{ backgroundColor: C.page, border: `1px solid ${LINE}` }} aria-live="polite">
            <p className="flex items-center gap-2 text-lg font-bold" style={{ color: DARK }}>
              <CalendarCheck className="w-5 h-5" style={{ color: LINK }} aria-hidden="true" /> Days you picked
            </p>
            {planned.length > 0 ? (
              <>
                <ul className="mt-3 flex flex-col gap-2">
                  {planned.map(p => (
                    <li key={p.title} className="flex items-start gap-2 text-base" style={{ color: GREY }}>
                      <CalendarDays className="w-4 h-4 mt-1 shrink-0" style={{ color: LINK }} aria-hidden="true" />
                      <span>
                        <strong style={{ color: DARK }}>{p.title}</strong>: {niceDate(p.date)}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={downloadReminders}
                  className="mt-4 inline-flex items-center gap-2 rounded-full px-6 py-3 text-lg font-bold text-white cursor-pointer transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 shadow-[0_6px_16px_-8px_rgba(190,18,60,0.6)]"
                  style={{ backgroundColor: LINK, outlineColor: LINK }}
                >
                  <Download className="w-5 h-5" aria-hidden="true" />
                  Add reminders to my calendar
                </button>
                {downloaded && (
                  <p className="mt-3 flex items-center gap-2 text-base" style={{ color: C.auto }}>
                    <Check className="w-5 h-5" aria-hidden="true" /> Calendar file downloaded. Open it to add the reminders.
                  </p>
                )}
              </>
            ) : (
              <p className="mt-3 text-base leading-relaxed" style={{ color: GREY }}>
                {doneCount === items.length
                  ? 'Everything on your list is done. Nothing to remind you about.'
                  : 'No days picked yet. Open a task in your to-do list and choose “When will you do this?”. This is optional.'}
                {doneCount < items.length && (
                  <button
                    type="button"
                    onClick={goToTasks}
                    className="ml-1 font-semibold underline underline-offset-4 cursor-pointer"
                    style={{ color: LINK }}
                  >
                    Go to my to-do list
                  </button>
                )}
              </p>
            )}
          </div>

          {/* Do this with someone */}
          <div className="rounded-2xl p-5 md:p-6" style={{ backgroundColor: C.page, border: `1px solid ${LINE}` }}>
            <p className="flex items-center gap-2 text-lg font-bold" style={{ color: DARK }}>
              <Users className="w-5 h-5" style={{ color: LINK }} aria-hidden="true" /> Do this with someone (optional)
            </p>
            <p className="mt-1 text-base" style={{ color: GREY }}>
              Ask a family member or friend to sit with you. Copy this message and send it to them:
            </p>
            <p className="mt-3 rounded-2xl p-4 text-lg leading-relaxed bg-white" style={{ color: DARK, border: `1px solid ${LINE}` }}>
              {message}
            </p>
            <button
              type="button"
              onClick={copyMessage}
              className="mt-3 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-lg font-semibold cursor-pointer transition-colors hover:bg-[#FFF1F3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ color: LINK, border: `1.5px solid ${LINK}`, outlineColor: LINK }}
            >
              {copied ? <Check className="w-5 h-5" aria-hidden="true" /> : <Copy className="w-5 h-5" aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy message'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
