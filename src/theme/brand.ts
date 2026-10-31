// HelpCompass SG design tokens: one source of truth for colour, used by the
// site shell (header, notice bar, footer, homepage) and by variant B.
// Variant A (src/variantA/) does NOT use these: it stays a copy of the live
// results screen, so A and B differ only where AUDIT.md says they should.
// Reasons for every colour are in DESIGN.md at the repository root.
//
// Contrast (WCAG 2.x relative luminance), text on its usual background:
//   ink #0F1E2E on white 16.9:1 · body #334155 10.4:1 · muted #5B6675 5.8:1
//   brand #BE123C on white 6.3:1 · white on brandDeep #881337 9.6:1
//   white on brandMid #E11D48 4.7:1 (large text and decoration only)
//   claim text #9A4A00 on claim tint #FFF4E5 5.8:1 · auto #2F6F5E on #EDF6F2 5.4:1
//   signup #1E5A8A on #EAF3FB 6.5:1 · employee #475569 on #F1F5F9 6.9:1

export const C = {
  // neutrals: slate text on a warm off-white page
  ink: '#0F1E2E', // headings and amounts
  body: '#334155', // body text
  muted: '#5B6675', // secondary text
  line: '#E2E8F0', // borders and dividers
  page: '#F8F6F5', // page background, a warm off-white that sits with the red
  surface: '#FFFFFF', // cards

  // brand: rose-red, taken from the heart logo (MS-5). It carries the
  // brand (hero, buttons, tabs, links) and never marks amounts, labels or
  // warnings, so it reads as "care" and "help", not as risk or loss
  // (Bazley et al., 2021, Week 8). Red is also Singapore's national colour and
  // a lucky colour in Chinese culture (Week 10, culture).
  brand: '#BE123C',
  brandDeep: '#881337', // hero background
  brandTint: '#FFF1F3', // soft brand surface
  brandOnDeep: '#FFE4E8', // secondary text on brandDeep (8.0:1)
  brandMid: '#E11D48', // gradients and decoration
  brandSoft: '#FFE4E8', // chips and hover surfaces
  brandLine: '#FECDD6', // soft borders

  // "needs you": warm apricot/amber, set apart from the brand red by hue and
  // by its own card, chip and icon (a hand), so the few items that need
  // action stand out without using red for them.
  claim: '#9A4A00',
  claimDeep: '#7A3B00',
  claimTint: '#FFF4E5',
  claimSoft: '#FFF8EF',
  claimLine: '#F3D2A8',
  claimSolid: '#B45309',

  // "nothing to do": quiet sage, so automatic items recede
  auto: '#2F6F5E',
  autoTint: '#EDF6F2',
  // "automatic if signed up before": calm sky blue, an "info" tone
  signup: '#1E5A8A',
  signupTint: '#EAF3FB',
  // "automatic for employees": neutral slate
  employee: '#475569',
  employeeTint: '#F1F5F9',
} as const;

export const FONT_BODY = "'Inter', ui-sans-serif, system-ui, sans-serif";
export const FONT_DISPLAY = "'Plus Jakarta Sans', 'Inter', ui-sans-serif, system-ui, sans-serif";
