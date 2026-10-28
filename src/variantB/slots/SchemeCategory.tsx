import type { PayoutRowA } from '../../variantA/resultsDataA';

// SLOT for M5 (colour and fluency): shown in variant B directly under each
// scheme name, above M3's status label.
// Use it for AUDIT.md Finding 12 (an icon and a category word per kind of
// support: cash, savings top-up, bill rebate, voucher, app credit) and
// Finding 6 (one plain-language line saying what the scheme is).
// Look the row up by row.schemeCode.
// Returning null shows nothing, which is what variant B does until M5 builds it.
// Owned by M5: only M5 edits this file.

export function SchemeCategory({ row }: { row: PayoutRowA }) {
  void row;
  return null;
}
