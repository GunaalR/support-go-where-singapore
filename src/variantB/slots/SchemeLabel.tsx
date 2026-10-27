import type { PayoutRowA } from '../../variantA/resultsDataA';
import { statusFor } from './schemeStatusM3';

// SLOT for M3 (choice architecture): the label under each scheme name,
// "Automatic: nothing to do", "Claim it yourself: [where]" or
// "Automatic if you have signed up before" (AUDIT.md Finding 5).
// Wording comes from schemeStatusM3.ts. Kept in plain grey text: colour is M5's.
// Owned by M3: only M3 edits this file.

export function SchemeLabel({ row }: { row: PayoutRowA }) {
  const status = statusFor(row);
  if (!status) return null;
  const needsYou = status.kind !== 'automatic';
  return (
    <p
      className="text-base"
      style={{ color: '#4E4E4E', fontWeight: needsYou ? 600 : 400 }}
      data-status={status.kind}
    >
      {status.label}
    </p>
  );
}
