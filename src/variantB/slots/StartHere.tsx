import type { YearPanelA } from '../../variantA/resultsDataA';
import { actionItems } from './schemeStatusM3';

// SLOT for M3 (choice architecture): the "Start here" block (AUDIT.md Finding 4).
// Shows the 2-3 items that need the household, each with a one-line reason,
// above the full list. "See all schemes" keeps the full list one tap away.
// Owned by M3: only M3 edits this file.

const money = (n: number) => `$${n.toLocaleString('en-SG')}`;

// "Your individual benefits" -> "You", "Member 2 benefits" -> "Member 2"
const who = (title: string) =>
  title === 'Your individual benefits' ? 'You' : title.replace(/ benefits$/, '');

export function StartHere({ panel }: { panel: YearPanelA }) {
  const items = actionItems(panel);
  if (items.length === 0) return null;

  const seeAll = () =>
    document.getElementById('see-all-schemes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section aria-labelledby={`start-here-${panel.year}`} className="mb-10">
      <div className="rounded-2xl p-6 md:p-8" style={{ border: '1px solid #CACACA', backgroundColor: '#FFFFFF' }}>
        <h2 id={`start-here-${panel.year}`} className="text-xl md:text-3xl font-bold">
          Start here
        </h2>
        <p className="mt-2 text-lg" style={{ color: '#4E4E4E' }}>
          {items.length === 1 ? 'This one needs' : `These ${items.length} need`} something from you in {panel.year}. Most of
          the rest is paid without you doing anything.
        </p>

        <ol className="mt-6 flex flex-col gap-5">
          {items.map((item, i) => (
            <li key={item.code} className="flex gap-4">
              <span
                aria-hidden="true"
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold"
                style={{ border: '2px solid #2C2C2C', color: '#2C2C2C' }}
              >
                {i + 1}
              </span>
              <div>
                <p className="text-lg font-bold">
                  {item.status.shortName}
                  {item.total > 0 && <span className="font-normal">: {money(item.total)}</span>}
                </p>
                <p className="text-lg" style={{ color: '#4E4E4E' }}>
                  {item.status.reason}
                </p>
                {item.whoFor.length > 1 && (
                  <p className="text-base mt-1" style={{ color: '#4E4E4E' }}>
                    For: {item.whoFor.map(who).join(', ')}
                  </p>
                )}
              </div>
            </li>
          ))}
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
