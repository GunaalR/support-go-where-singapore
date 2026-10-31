import { useState } from 'react';
import { ArrowDown, CalendarDays, Check, ChevronDown, ClipboardList, Clock, ListOrdered, Wallet } from 'lucide-react';
import { C, FONT_DISPLAY } from '../../theme/brand';
import type { YearPanelA } from '../../variantA/resultsDataA';
import {
  DEADLINE,
  HOW_STEPS,
  NEEDS,
  money,
  niceDate,
  progressWithPlan,
  todayIso,
  who,
  type Plan,
  type TaskEntry,
} from './taskGuide';

// SLOT for M3 (choice architecture): "Start here", now one to-do list
// (AUDIT.md Findings 4, 5, 7 and 10; PROMPTS.md Entries MS-1 to MS-4).
// Before MS-4 the same 2-3 items appeared twice: in Start here at the top and
// again in "Plan your next step" at the bottom. They are now one list, in the
// "task list" pattern public-service sites use (e.g. GOV.UK): each task shows
// its status (To do, Planned, Done, Skipped) and opens to show how to do it,
// what to have ready, a day picker and Skip, with nothing hidden or forced.
// Kept from MS-2: the count and bar that start with the benefits already
// taken care of (Week 2 endowed progress), the "I've done this" tick (Week 2
// feedback), the "already set aside" line for items to claim (Week 4 loss
// aversion and endowment), and members named by age (Week 2 identifiable person).
// The one warm card on a cool page (DESIGN.md, Week 8).

const STATUS_LABEL: Record<TaskEntry['state'], string> = {
  todo: 'To do',
  planned: 'Planned',
  done: 'Done',
  skipped: 'Skipped for now',
};

function StatusPill({ entry }: { entry: TaskEntry }) {
  const style =
    entry.state === 'done'
      ? { color: C.auto, backgroundColor: C.autoTint }
      : entry.state === 'planned'
        ? { color: C.brand, backgroundColor: C.brandTint }
        : entry.state === 'skipped'
          ? { color: C.muted, backgroundColor: C.employeeTint }
          : { color: C.claimDeep, backgroundColor: C.claimTint };
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold whitespace-nowrap" style={style}>
      {entry.state === 'done' && <Check className="w-4 h-4" strokeWidth={3} aria-hidden="true" />}
      {entry.state === 'planned' && <CalendarDays className="w-4 h-4" aria-hidden="true" />}
      {STATUS_LABEL[entry.state]}
      {entry.state === 'planned' && entry.date ? `: ${niceDate(entry.date)}` : ''}
    </span>
  );
}

export function StartHere({ panel, plan }: { panel: YearPanelA; plan: Plan }) {
  const { done, total, left, percent, items } = progressWithPlan(panel, plan);
  // the first task that is not done starts open; the visitor can open any
  const firstOpen = items.find(it => plan.get(panel.year, it.code).state !== 'done')?.code;
  const [open, setOpen] = useState<Record<string, boolean>>({});
  if (items.length === 0) return null;

  const isOpen = (code: string) => open[`${panel.year}:${code}`] ?? code === firstOpen;
  const toggleOpen = (code: string) => setOpen(prev => ({ ...prev, [`${panel.year}:${code}`]: !isOpen(code) }));

  const seeAll = () =>
    document.getElementById('see-all-schemes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section id="todo" aria-labelledby={`start-here-${panel.year}`} className="mb-12 scroll-mt-[150px]">
      <div
        className="rounded-3xl p-5 sm:p-7 md:p-9 shadow-[0_1px_2px_rgba(15,30,46,0.04),0_8px_24px_-12px_rgba(154,74,0,0.25)]"
        style={{ backgroundColor: C.claimSoft, border: `1px solid ${C.claimLine}` }}
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em]" style={{ color: C.claimDeep }}>
              Your to-do list
            </p>
            <h2
              id={`start-here-${panel.year}`}
              className="mt-1 text-2xl md:text-4xl font-extrabold tracking-tight"
              style={{ color: C.ink, fontFamily: FONT_DISPLAY }}
            >
              Start here
            </h2>
          </div>
          <p className="text-base md:text-lg font-semibold" style={{ color: C.claimDeep }}>
            {left === 0 ? 'Nothing left to do' : `${left} of ${items.length} left`}
          </p>
        </div>

        {/* Progress: count, then bar */}
        <div className="mt-5 rounded-2xl bg-white p-4 md:p-5" style={{ border: `1px solid ${C.claimLine}` }}>
          <p
            id={`start-here-progress-${panel.year}`}
            className="text-lg md:text-xl font-bold"
            style={{ color: C.ink }}
            aria-live="polite"
          >
            {done} of {total} benefits already taken care of
            {left > 0 ? `: ${left} to go` : ''}
          </p>
          <div
            role="progressbar"
            aria-labelledby={`start-here-progress-${panel.year}`}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={done}
            className="mt-3 h-3.5 w-full rounded-full overflow-hidden"
            style={{ backgroundColor: C.brandTint }}
          >
            <div
              className="h-full rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none"
              style={{ width: `${percent}%`, background: `linear-gradient(90deg, ${C.brand}, #127FA8)` }}
            />
          </div>
          {left === 0 && (
            <p className="mt-3 flex items-center gap-2 text-lg font-semibold" style={{ color: C.auto }}>
              <Check className="w-5 h-5" strokeWidth={2.5} aria-hidden="true" />
              All done for {panel.year}.
            </p>
          )}
        </div>

        <p className="mt-5 text-lg leading-relaxed" style={{ color: C.body }}>
          {items.length === 1 ? 'This one needs' : `These ${items.length} need`} something from you. Open a task to see
          how to do it. The label under each scheme below shows what, if anything, the others need.
        </p>

        <ol className="mt-5 flex flex-col gap-4">
          {items.map((item, i) => {
            const entry = plan.get(panel.year, item.code);
            const isDone = entry.state === 'done';
            const expanded = isOpen(item.code);
            const panelId = `task-${panel.year}-${item.code}`;
            const checkboxId = `start-here-${panel.year}-${item.code}`;
            const dateId = `plan-date-${panel.year}-${item.code}`;
            const steps = HOW_STEPS[item.code] ?? [];
            const needs = NEEDS[item.code] ?? [];
            return (
              <li
                key={item.code}
                className="rounded-2xl bg-white transition-opacity"
                style={{
                  opacity: isDone ? 0.7 : 1,
                  border: `1px solid ${isDone ? C.line : C.claimLine}`,
                  boxShadow: isDone ? 'none' : '0 1px 2px rgba(15,30,46,0.05)',
                }}
              >
                <div className="flex gap-4 p-4 md:p-6">
                  <span
                    aria-hidden="true"
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-extrabold"
                    style={
                      isDone
                        ? { backgroundColor: C.autoTint, color: C.auto }
                        : { backgroundColor: C.claimSolid, color: '#FFFFFF' }
                    }
                  >
                    {isDone ? '✓' : i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                      <div className="min-w-0">
                        <p className="text-lg md:text-xl font-bold" style={{ color: C.ink }}>
                          {item.status.shortName}
                        </p>
                        <div className="mt-1.5 flex flex-wrap items-center gap-2">
                          <StatusPill entry={entry} />
                          {DEADLINE[item.code] && (
                            <span className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: C.muted }}>
                              <Clock className="w-4 h-4" aria-hidden="true" />
                              {DEADLINE[item.code]}
                            </span>
                          )}
                        </div>
                      </div>
                      {item.total > 0 && (
                        <p className="text-xl md:text-2xl font-extrabold tabular-nums" style={{ color: C.ink, fontFamily: FONT_DISPLAY }}>
                          {money(item.total)}
                        </p>
                      )}
                    </div>
                    <p className="mt-2 text-base md:text-lg leading-relaxed" style={{ color: C.body }}>
                      {item.status.reason}
                    </p>
                    {item.status.ownedLine && item.total > 0 && (
                      <p
                        className="mt-3 flex items-start gap-2 rounded-xl px-3 py-2 text-base md:text-lg font-semibold"
                        style={{ color: C.claimDeep, backgroundColor: C.claimTint }}
                      >
                        <Wallet className="w-5 h-5 mt-0.5 shrink-0" strokeWidth={2} aria-hidden="true" />
                        <span>{item.status.ownedLine(money(item.total))}</span>
                      </p>
                    )}
                    {item.whoFor.length > 1 && (
                      <p className="mt-2 text-base" style={{ color: C.muted }}>
                        For: {item.whoFor.map(who).join(', ')}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <div className="flex items-center gap-3">
                        <input
                          id={checkboxId}
                          type="checkbox"
                          checked={isDone}
                          onChange={() =>
                            plan.set(panel.year, item.code, isDone ? { state: 'todo' } : { state: 'done', date: entry.date })
                          }
                          className="w-6 h-6 cursor-pointer rounded"
                          style={{ accentColor: C.brand }}
                        />
                        <label htmlFor={checkboxId} className="text-lg font-medium cursor-pointer" style={{ color: C.ink }}>
                          I’ve done this
                          <span className="sr-only">: {item.status.shortName}</span>
                        </label>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleOpen(item.code)}
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-base font-semibold cursor-pointer transition-colors hover:bg-[#E8F3F7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        style={{ color: C.brand, border: `1.5px solid ${C.brand}`, outlineColor: C.brand }}
                      >
                        {expanded ? 'Hide steps' : 'How to do it'}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform motion-reduce:transition-none ${expanded ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {expanded && (
                  <div
                    id={panelId}
                    className="grid gap-5 md:grid-cols-2 px-4 pb-5 md:px-6 md:pb-6 pt-5 md:ml-14"
                    style={{ borderTop: `1px dashed ${C.claimLine}` }}
                  >
                    {steps.length > 0 && (
                      <div>
                        <p className="flex items-center gap-2 text-base font-bold" style={{ color: C.ink }}>
                          <ListOrdered className="w-5 h-5" style={{ color: C.brand }} aria-hidden="true" /> How to do it
                        </p>
                        <ol className="mt-2 flex flex-col gap-2">
                          {steps.map((s, n) => (
                            <li key={s} className="flex gap-3 text-base leading-relaxed" style={{ color: C.body }}>
                              <span
                                aria-hidden="true"
                                className="shrink-0 w-6 h-6 mt-0.5 rounded-full flex items-center justify-center text-sm font-bold"
                                style={{ backgroundColor: C.brandTint, color: C.brand }}
                              >
                                {n + 1}
                              </span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                    <div className="flex flex-col gap-5">
                      {needs.length > 0 && (
                        <div>
                          <p className="flex items-center gap-2 text-base font-bold" style={{ color: C.ink }}>
                            <ClipboardList className="w-5 h-5" style={{ color: C.brand }} aria-hidden="true" /> What you’ll need
                          </p>
                          <ul className="mt-2 ml-7 list-disc flex flex-col gap-1 text-base" style={{ color: C.body }}>
                            {needs.map(n => (
                              <li key={n}>{n}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {!isDone && (
                        <div>
                          <label htmlFor={dateId} className="flex items-center gap-2 text-base font-bold" style={{ color: C.ink }}>
                            <CalendarDays className="w-5 h-5" style={{ color: C.brand }} aria-hidden="true" /> When will you do this?
                          </label>
                          <div className="mt-2 flex flex-wrap items-center gap-3">
                            <input
                              id={dateId}
                              type="date"
                              min={todayIso()}
                              value={entry.state === 'planned' ? entry.date ?? '' : ''}
                              onChange={e =>
                                plan.set(panel.year, item.code, e.target.value ? { state: 'planned', date: e.target.value } : { state: 'todo' })
                              }
                              className="rounded-xl px-4 py-2.5 text-lg bg-white min-h-[48px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                              style={{ border: '1.5px solid #CBD5E1', color: C.ink, outlineColor: C.brand }}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                plan.set(panel.year, item.code, entry.state === 'skipped' ? { state: 'todo' } : { state: 'skipped' })
                              }
                              aria-pressed={entry.state === 'skipped'}
                              className="rounded-xl px-5 py-2.5 text-lg font-semibold cursor-pointer min-h-[48px] transition-colors hover:bg-[#F1F5F9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                              style={{ border: '1.5px solid #CBD5E1', color: C.body, backgroundColor: '#FFFFFF', outlineColor: C.brand }}
                            >
                              {entry.state === 'skipped' ? 'Undo skip' : 'Skip for now'}
                            </button>
                          </div>
                          <p className="mt-2 text-sm" style={{ color: C.muted }}>
                            Optional. Picking a day makes it easier to remember; skipping is fine too.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <button
          type="button"
          onClick={seeAll}
          className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-lg font-semibold cursor-pointer transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ color: C.brand, border: `1.5px solid ${C.brand}`, outlineColor: C.brand }}
        >
          See all schemes
          <ArrowDown className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
      {/* "See all schemes" lands here, just above the full list; the margin clears the sticky header and year tabs */}
      <span id="see-all-schemes" className="block" style={{ scrollMarginTop: '150px' }} />
    </section>
  );
}
