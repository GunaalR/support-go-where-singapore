import { useState } from 'react';
import { ArrowDown, Check, Wallet } from 'lucide-react';
import { C, FONT_DISPLAY } from '../../theme/brand';
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
// Look (DESIGN.md): the one warm card on a cool page, so it is the first
// thing the eye lands on after the total (complementary contrast, Week 8).
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
    <section aria-labelledby={`start-here-${panel.year}`} className="mb-12">
      <div
        className="rounded-3xl p-5 sm:p-7 md:p-9 shadow-[0_1px_2px_rgba(15,30,46,0.04),0_8px_24px_-12px_rgba(154,74,0,0.25)]"
        style={{ backgroundColor: C.claimSoft, border: `1px solid ${C.claimLine}` }}
      >
        <p className="text-sm font-bold uppercase tracking-[0.14em]" style={{ color: C.claimDeep }}>
          Your next steps
        </p>
        <h2
          id={`start-here-${panel.year}`}
          className="mt-1 text-2xl md:text-4xl font-extrabold tracking-tight"
          style={{ color: C.ink, fontFamily: FONT_DISPLAY }}
        >
          Start here
        </h2>

        {/* Progress: count, then bar */}
        <div className="mt-5 rounded-2xl bg-white p-4 md:p-5" style={{ border: `1px solid ${C.claimLine}` }}>
          <p
            id={`start-here-progress-${panel.year}`}
            className="text-lg md:text-xl font-bold"
            style={{ color: C.ink }}
            aria-live="polite"
          >
            {done} of {base.total} benefits already taken care of
            {left > 0 ? `: ${left} to go` : ''}
          </p>
          <div
            role="progressbar"
            aria-labelledby={`start-here-progress-${panel.year}`}
            aria-valuemin={0}
            aria-valuemax={base.total}
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
          {items.length === 1 ? 'This one needs' : `These ${items.length} need`} something from you. The label under
          each scheme below shows what, if anything, the others need.
        </p>

        <ol className="mt-5 flex flex-col gap-4">
          {items.map((item, i) => {
            const isDone = isTicked(item.code);
            const checkboxId = `start-here-${panel.year}-${item.code}`;
            return (
              <li
                key={item.code}
                className="flex gap-4 rounded-2xl bg-white p-4 md:p-6 transition-opacity"
                style={{
                  opacity: isDone ? 0.6 : 1,
                  border: `1px solid ${isDone ? C.line : C.claimLine}`,
                  boxShadow: isDone ? 'none' : '0 1px 2px rgba(15,30,46,0.05)',
                }}
              >
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
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-lg md:text-xl font-bold" style={{ color: C.ink }}>
                      {item.status.shortName}
                    </p>
                    {item.total > 0 && (
                      <p className="text-xl md:text-2xl font-extrabold tabular-nums" style={{ color: C.ink, fontFamily: FONT_DISPLAY }}>
                        {money(item.total)}
                      </p>
                    )}
                  </div>
                  <p className="mt-1 text-base md:text-lg leading-relaxed" style={{ color: C.body }}>
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
                  <div className="mt-3 flex items-center gap-3">
                    <input
                      id={checkboxId}
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggle(item.code)}
                      className="w-6 h-6 cursor-pointer rounded"
                      style={{ accentColor: C.brand }}
                    />
                    <label htmlFor={checkboxId} className="text-lg font-medium cursor-pointer" style={{ color: C.ink }}>
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
