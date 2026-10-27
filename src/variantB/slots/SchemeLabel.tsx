import type { PayoutRowA } from '../../variantA/resultsDataA';

// SLOT for M3 (choice architecture): the label under each scheme name,
// e.g. "Automatic" or "Claim it yourself" (AUDIT.md Finding 5: say "claim",
// not "apply", because the official records say "No application needed").
// Gets one row; look it up by row.schemeCode.
// Returning null shows nothing, which is what variant B does until M3 builds it.
// Owned by M3: only M3 edits this file.

export function SchemeLabel({ row }: { row: PayoutRowA }) {
  void row;
  return null;
}
