import { COPY_A, type PayoutRowA } from '../../variantA/resultsDataA';

// SLOT for M5 (colour and fluency).
// Owned by M5: only M5 edits this file.

// 1. Plain-language wording. Variant B reads every piece of text from COPY_B.
//    It starts as an exact copy of variant A's wording; override any key here,
//    e.g. pageTitle: 'What you and your household can get',
export const COPY_B = {
  ...COPY_A,
  // GR-5, W7 fluency: plainer, shorter title (the subtitle still says these are estimates)
  pageTitle: 'What you and your household can get',
};

// 2. Kind of support (AUDIT.md Finding 12). Five kinds, taken from the prefix
//    of each scheme name in src/variantA/resultsDataA.ts. Each kind has ONE
//    colour, always shown with an icon and a word (SchemeCategory.tsx), so the
//    meaning never rests on colour alone (colour-blind users, Week 8).
//
//    Colour choices (Week 8):
//    - No red anywhere: red reads as risk and loss (Bazley et al., 2021) and
//      also means prosperity in Chinese culture, so it is ambiguous here.
//    - No green on money: green reads as "healthy/good" (Schuldt, 2013) and
//      would make some amounts look better than others for the same facts.
//    - Blue for cash, the most common kind: calm, open thinking.
//    - The other four are muted and clearly different from each other and
//      from the site's pale green boxes. No gradients, no flashing.
//
//    Contrast (WCAG AA), computed with the WCAG relative-luminance formula:
//    kind       colour    on white  on box green #EBF1EE
//    Cash       #1D5A96   7.11:1    6.21:1
//    NSF Top-up #5B4A8B   7.51:1    6.56:1
//    Rebate     #8A5300   6.33:1    5.53:1
//    Voucher    #0E6B6B   6.30:1    5.50:1
//    Credit     #8B3A62   7.29:1    6.37:1
//    All pass 4.5:1 for text (the kind word) and 3:1 for the bar.
//
//    Each kind also has a pale tint (9% of its colour on white) used as the
//    row background in variant B, so the kind shows at a glance (GR-4).
//    Contrast on each tint: kind colour 5.5-6.6:1, body grey #4E4E4E
//    7.2-7.3:1, link blue #125EEC 4.8:1. All pass 4.5:1.
export type SupportKind = 'cash' | 'topup' | 'rebate' | 'voucher' | 'credit';

export const KIND_STYLE: Record<SupportKind, { word: string; colour: string; tint: string }> = {
  cash: { word: 'Cash', colour: '#1D5A96', tint: '#EBF0F6' },
  topup: { word: 'NSF Top-up', colour: '#5B4A8B', tint: '#F0EFF5' },
  rebate: { word: 'Rebate', colour: '#8A5300', tint: '#F4F0E8' },
  voucher: { word: 'Voucher', colour: '#0E6B6B', tint: '#E9F2F2' },
  credit: { word: 'Credit', colour: '#8B3A62', tint: '#F5EDF1' },
};

const KIND_BY_CODE: Record<string, SupportKind> = {
  'STEADY-CASH': 'cash',
  'COL-2026': 'cash',
  'LCV-CASH': 'cash',
  'NSF-TOPUP-2026': 'topup',
  'LCV-HEALTHSAVE': 'topup',
  'HP-ESB': 'topup',
  EUCR: 'rebate',
  'U-CREDIT': 'rebate',
  NCV: 'voucher',
  'CHILD-CREDITS': 'credit',
};

// Look up by scheme code; fall back to the name's prefix for any new row.
export function kindOf(row: PayoutRowA): SupportKind | undefined {
  const byCode = KIND_BY_CODE[row.schemeCode];
  if (byCode) return byCode;
  const prefix = row.schemeName.split(' - ')[0].trim().toLowerCase();
  if (prefix === 'cash') return 'cash';
  if (prefix === 'nsf top-up') return 'topup';
  if (prefix === 'rebate') return 'rebate';
  if (prefix === 'voucher') return 'voucher';
  if (prefix === 'credit') return 'credit';
  return undefined;
}

// Colour per support category. Variant B draws it as a 6px bar on the left
// of each scheme row; undefined means no bar.
export function schemeColour(row: PayoutRowA): string | undefined {
  const kind = kindOf(row);
  return kind ? KIND_STYLE[kind].colour : undefined;
}

// Pale background for the whole row in that kind's colour (GR-4).
export function schemeTint(row: PayoutRowA): string | undefined {
  const kind = kindOf(row);
  return kind ? KIND_STYLE[kind].tint : undefined;
}
