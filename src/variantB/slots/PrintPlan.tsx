import { createPortal } from 'react-dom';
import type { YearPanelA } from '../../variantA/resultsDataA';
import { COPY_B } from './styleB';
import { actionItems } from './schemeStatusM3';
import { NEEDS, deadlineFor, money, niceDate, paidSplit, stepsFor, who, type Plan } from './taskGuide';

// A printable one-page plan (MS-7). Hidden on screen; "Print my plan" in
// NextStep.tsx calls window.print(), and the print rules in src/index.css
// print only this block. For visitors who prefer paper, or who want to hand
// the plan to the family member helping them (W6 accountability, Finding 11).
// Plain black on white, large type, no colour needed. Rendered into <body>,
// outside the app, so printing hides the whole app and prints one clean page.

export function PrintPlan({ panel, plan, totalText }: { panel: YearPanelA; plan: Plan; totalText: string }) {
  const items = actionItems(panel);
  const split = paidSplit(panel);
  const printed = new Date().toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' });
  if (typeof document === 'undefined') return null;
  return createPortal(
    <div className="hc-print-root" aria-hidden="true">
      <p style={{ fontSize: 12 }}>HelpCompass SG · class prototype, fictional data · printed {printed}</p>
      <h1 style={{ fontSize: 26, fontWeight: 800, margin: '8px 0 4px' }}>My benefits plan for {panel.year}</h1>
      <p style={{ fontSize: 15 }}>
        {COPY_B.totalTitle}: <strong>{totalText}</strong>. Already paid: {money(split.paid)}.{split.ifSigned > 0 ? ` Paid if you have signed up: ${money(split.ifSigned)}.` : ''}{split.claim > 0 ? ` Ready to claim: ${money(split.claim)}.` : ''} Still to come: {money(split.coming)}.
      </p>
      <p style={{ fontSize: 13, marginTop: 4 }}>{COPY_B.pageSubtitle}</p>

      <h2 style={{ fontSize: 19, fontWeight: 800, margin: '18px 0 6px' }}>Things to do ({items.length})</h2>
      {items.map((it, i) => {
        const e = plan.get(panel.year, it.code);
        const state =
          e.state === 'done' ? 'Done' : e.state === 'planned' && e.date ? `Planned for ${niceDate(e.date)}` : e.state === 'skipped' ? 'Skipped for now' : 'To do';
        return (
          <div key={it.code} style={{ border: '1.5px solid #000', borderRadius: 8, padding: '10px 12px', marginBottom: 10, breakInside: 'avoid' }}>
            <p style={{ fontSize: 17, fontWeight: 800 }}>
              {e.state === 'done' ? '☑' : '☐'} {i + 1}. {it.status.shortName}
              {it.total > 0 ? ` · ${money(it.total)}` : ''}
            </p>
            <p style={{ fontSize: 14 }}>
              <strong>{state}</strong> · {deadlineFor(it.code, panel.year)}
              {it.whoFor.length > 1 ? ` · For: ${it.whoFor.map(who).join(', ')}` : ''}
            </p>
            <p style={{ fontSize: 14, marginTop: 4 }}>{it.status.reason}</p>
            <ol style={{ fontSize: 14, margin: '6px 0 0 20px', listStyle: 'decimal' }}>
              {stepsFor(it.code, panel.year).map(s => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            {(NEEDS[it.code] ?? []).length > 0 && (
              <p style={{ fontSize: 14, marginTop: 4 }}>
                <strong>Have ready:</strong> {(NEEDS[it.code] ?? []).join('; ')}
              </p>
            )}
          </div>
        );
      })}
      <p style={{ fontSize: 13, marginTop: 12 }}>
        Everything else on the results page is paid automatically. Estimates only: amounts marked “Up to” depend on conditions.
      </p>
    </div>,
    document.body,
  );
}
