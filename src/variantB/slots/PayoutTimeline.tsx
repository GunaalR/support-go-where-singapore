import { useState } from 'react';
import { CalendarRange, CircleDot } from 'lucide-react';
import type { YearPanelA } from '../../variantA/resultsDataA';
import { C, FONT_DISPLAY } from '../../theme/brand';
import { money, timeline } from './taskGuide';

// "When the money comes": a month-by-month strip for the year shown (MS-7).
// It answers "when?" at a glance (AUDIT.md Finding 3, W3 expectations): past
// months are greyed as paid, this month is marked, and the months ahead are
// in the brand teal. Tapping a month lists what is paid then and to whom.
// Amounts are shown only for payouts that fall in one month, so every
// figure is exact; rows spread over several months (rebates, two voucher
// tranches) are listed without a split amount.

export function PayoutTimeline({ panel }: { panel: YearPanelA }) {
  const cells = timeline(panel);
  const firstAhead = cells.find(c => c.status !== 'past' && c.items.length > 0);
  const [picked, setPicked] = useState<number | null>(null);
  const sel = cells[picked ?? firstAhead?.m ?? cells.findIndex(c => c.items.length > 0)] ?? cells[0];

  return (
    <section aria-labelledby={`timeline-${panel.year}`} className="mb-12">
      <div className="rounded-3xl bg-white p-5 sm:p-7 md:p-8" style={{ border: `1px solid ${C.line}` }}>
        <p className="text-sm font-bold uppercase tracking-[0.14em]" style={{ color: C.brand }}>
          When the money comes
        </p>
        <h2
          id={`timeline-${panel.year}`}
          className="mt-1 text-xl md:text-3xl font-extrabold tracking-tight"
          style={{ color: C.ink, fontFamily: FONT_DISPLAY }}
        >
          Your {panel.year} payout calendar
        </h2>
        <p className="mt-2 text-base" style={{ color: C.muted }}>
          Tap a month to see what is paid then.
        </p>

        <div role="group" aria-label={`Months of ${panel.year}`} className="mt-5 grid grid-cols-4 sm:grid-cols-6 xl:grid-cols-12 gap-2">
          {cells.map(c => {
            const active = c.m === sel.m;
            const has = c.items.length > 0;
            const past = c.status === 'past';
            return (
              <button
                key={c.m}
                type="button"
                onClick={() => setPicked(c.m)}
                aria-pressed={active}
                aria-label={`${c.long}: ${has ? `${c.items.length} ${c.items.length === 1 ? 'payout' : 'payouts'}` : 'nothing paid'}${past ? ', already passed' : c.status === 'now' ? ', this month' : ''}`}
                className="hc-lift relative flex flex-col items-center gap-1 rounded-2xl px-1 py-3 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  outlineColor: C.brand,
                  backgroundColor: active ? C.brand : past ? C.page : has ? C.brandTint : '#FFFFFF',
                  color: active ? '#FFFFFF' : past ? C.muted : C.ink,
                  border: `1.5px solid ${active ? C.brand : c.status === 'now' ? C.brand : C.line}`,
                }}
              >
                {c.status === 'now' && (
                  <span
                    className="absolute -top-2 rounded-full px-1.5 text-[11px] font-bold uppercase tracking-wide"
                    style={{ backgroundColor: C.brand, color: '#FFFFFF' }}
                    aria-hidden="true"
                  >
                    Now
                  </span>
                )}
                <span className="text-sm font-bold uppercase tracking-wide">{c.label}</span>
                <span className="flex gap-0.5 h-2" aria-hidden="true">
                  {c.items.slice(0, 4).map((_, i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: active ? '#FFFFFF' : past ? '#A0A8B3' : C.brandMid }}
                    />
                  ))}
                </span>
                <span className="text-xs font-semibold tabular-nums min-h-[16px]">{c.cash > 0 ? money(c.cash) : ''}</span>
              </button>
            );
          })}
        </div>

        <div className="hc-rise mt-5 rounded-2xl p-4 md:p-5" key={`${panel.year}-${sel.m}`} style={{ backgroundColor: C.page }} aria-live="polite">
          <p className="flex items-center gap-2 text-lg font-bold" style={{ color: C.ink }}>
            <CalendarRange className="w-5 h-5" style={{ color: C.brand }} aria-hidden="true" />
            {sel.long}
            <span className="text-sm font-semibold" style={{ color: C.muted }}>
              {sel.status === 'past' ? '· already passed' : sel.status === 'now' ? '· this month' : '· still to come'}
            </span>
          </p>
          {sel.items.length === 0 ? (
            <p className="mt-2 text-base" style={{ color: C.body }}>Nothing is paid in this month.</p>
          ) : (
            <ul className="mt-3 grid gap-2 md:grid-cols-2">
              {sel.items.map((it, i) => (
                <li key={i} className="flex items-start justify-between gap-3 rounded-xl bg-white px-3 py-2.5" style={{ border: `1px solid ${C.line}` }}>
                  <span className="flex items-start gap-2 min-w-0">
                    <CircleDot
                      className="w-4 h-4 mt-1 shrink-0"
                      style={{ color: it.claim && sel.status !== 'future' ? C.claimSolid : sel.status === 'past' ? C.muted : C.brand }}
                      aria-hidden="true"
                    />
                    <span className="min-w-0">
                      <span className="block text-base font-semibold" style={{ color: C.ink }}>{it.name}</span>
                      <span className="block text-sm" style={{ color: C.muted }}>For: {it.who}</span>
                      {/* issued, but only reaches the household once claimed or used */}
                      {it.claim && sel.status !== 'future' && (
                        <span
                          className="mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-bold"
                          style={{ color: C.claim, backgroundColor: C.claimTint }}
                        >
                          Ready to claim
                        </span>
                      )}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 text-right ${it.amount ? 'text-base font-bold tabular-nums' : 'text-sm font-medium max-w-[150px]'}`}
                    style={{ color: it.amount ? C.ink : C.muted }}
                  >
                    {it.amount ?? 'part of a payout over several months'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
