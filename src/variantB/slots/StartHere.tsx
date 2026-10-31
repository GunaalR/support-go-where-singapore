import { useState } from 'react';
import type { YearPanelA } from '../../variantA/resultsDataA';
import { actionItems, progress } from './schemeStatusM3';

// SLOT for M3 (choice architecture): the "Start here" block (AUDIT.md Finding 4).
// Shows the 2-3 items that need the household, each with a one-line reason,
// above the full list. "See all schemes" keeps the full list one tap away.
// On top of that (PROMPTS.md Entry MS-2):
// - a count and bar that start with the payouts already taken care of
//   (Week 2 endowed progress and goal gradient);
// - an "I've done this" tick per item that moves the count (Week 2 feedback),
//   kept in React state only;
// - for items to claim, the amount framed as already the household's, with
//   the real deadline (Week 4 loss aversion and endowment effect);
// - each household member named by age in the "For:" line (Week 2
//   identifiable person).
// Owned by M3: only M3 edits this file.

const money = (n: number) => `$${n.toLocaleString('en-SG')}`;

// "Your individual benefits" -> "You", "Member 2 benefits" -> "Member 2 (age 12)".
// The age comes from the box's profile ("12 years old (in 2026)"); the data
// does not say how members are related, so no relationship is named.
const who = ({ title, profile }: { title: string; profile: string }) => {
  if (title === 'Your individual benefits') return 'You';
  const name = title.replace(/ benefits$/, '');
  const age = profile.match(/(\d+) years old/)?.[1];
  return age && name.startsWith('Member') ? `${name} (age ${age})` : name;
};

export function StartHere({ panel }: { panel: YearPanelA }) {
  // ticked items, as "year:code" so each year tab keeps its own ticks
  const [ticked, setTicked] = useState<Set<string>>(() => new Set());
  const items = actionItems(panel);
  if (items.length === 0) return null;

  const isTicked = (code: string) => ticked.has(`${panel.year}:${code}`);
  const toggle = (code: string) =>
    setTicked(prev => {
      const next = new Set(prev);
      const key = `${panel.year}:${code}`;
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  // Rows taken care of by themselves, plus the rows of every ticked item.
  const base = progress(panel);
  const done = base.done + items.filter(item => isTicked(item.code)).reduce((sum, item) => sum + item.rows, 0);
  const left = items.filter(item => !isTicked(item.code)).length;
  const percent = base.total === 0 ? 0 : Math.round((done / base.total) * 100);

  const seeAll = () =>
    document.getElementById('see-all-schemes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section aria-labelledby={`start-here-${panel.year}`} className="mb-10">
      <div className="rounded-2xl p-6 md:p-8" style={{ border: '1px solid #CACACA', backgroundColor: '#FFFFFF' }}>
        <h2 id={`start-here-${panel.year}`} className="text-xl md:text-3xl font-bold">
          Start here
        </h2>

        {/* Progress: count, then bar */}
        <p id={`start-here-progress-${panel.year}`} className="mt-3 text-lg font-semibold" aria-live="polite">
          {done} of {base.total} benefits already taken care of
          {left > 0 ? `: ${left} to go` : ''}
        </p>
        <div
          role="progressbar"
          aria-labelledby={`start-here-progress-${panel.year}`}
          aria-valuemin={0}
          aria-valuemax={base.total}
          aria-valuenow={done}
          className="mt-2 h-3 w-full rounded-full overflow-hidden"
          style={{ backgroundColor: '#EBF1EE', border: '1px solid #CACACA' }}
        >
          <div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: '#2C2C2C' }} />
        </div>
        {left === 0 && (
          <p className="mt-3 text-lg" style={{ color: '#4E4E4E' }}>
            All done for {panel.year}.
          </p>
        )}

        <p className="mt-4 text-lg" style={{ color: '#4E4E4E' }}>
          {items.length === 1 ? 'This one needs' : `These ${items.length} need`} something from you. The label under
          each scheme below shows what, if anything, the others need.
        </p>

        <ol className="mt-6 flex flex-col gap-5">
          {items.map((item, i) => {
            const isDone = isTicked(item.code);
            const checkboxId = `start-here-${panel.year}-${item.code}`;
            return (
              <li key={item.code} className="flex gap-4" style={{ opacity: isDone ? 0.6 : 1 }}>
                <span
                  aria-hidden="true"
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{ border: '2px solid #2C2C2C', color: '#2C2C2C' }}
                >
                  {isDone ? '✓' : i + 1}
                </span>
                <div>
                  <p className="text-lg font-bold">
                    {item.status.shortName}
                    {item.total > 0 && <span className="font-normal">: {money(item.total)}</span>}
                  </p>
                  <p className="text-lg" style={{ color: '#4E4E4E' }}>
                    {item.status.reason}
                  </p>
                  {item.status.ownedLine && item.total > 0 && (
                    <p className="text-lg mt-1 font-medium" style={{ color: '#4E4E4E' }}>
                      {item.status.ownedLine(money(item.total))}
                    </p>
                  )}
                  {item.whoFor.length > 1 && (
                    <p className="text-base mt-1" style={{ color: '#4E4E4E' }}>
                      For: {item.whoFor.map(who).join(', ')}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      id={checkboxId}
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggle(item.code)}
                      className="w-5 h-5 cursor-pointer"
                      style={{ accentColor: '#2C2C2C' }}
                    />
                    <label htmlFor={checkboxId} className="text-lg cursor-pointer">
                      I’ve done this
                      <span className="sr-only">: {item.status.shortName}</span>
                    </label>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <button
          type="button"
          onClick={seeAll}
          className="mt-6 text-left text-lg font-medium underline underline-offset-2 cursor-pointer w-fit"
          style={{ color: '#125EEC' }}
        >
          See all schemes
        </button>
      </div>
      {/* "See all schemes" lands here, just above the full list; the margin clears the sticky year tabs */}
      <span id="see-all-schemes" className="block" style={{ scrollMarginTop: '96px' }} />
    </section>
  );
}
