import { COPY_A, type PayoutRowA } from '../../variantA/resultsDataA';

// SLOT for M5 (colour and fluency).
// Owned by M5: only M5 edits this file.

// 1. Plain-language wording. Variant B reads every piece of text from COPY_B.
//    It starts as an exact copy of variant A's wording; override any key here,
//    e.g. pageTitle: 'What you and your household can get',
export const COPY_B = {
  ...COPY_A,
};

// 2. Colour per support category. Return a colour (e.g. '#2E7D32') for a row
//    and variant B draws it as a bar on the left of that scheme; return
//    undefined for no colour. Look the row up by row.schemeCode.
//    Check every colour against white for contrast (WCAG AA, 3:1 for a bar).
export function schemeColour(row: PayoutRowA): string | undefined {
  void row;
  return undefined;
}
