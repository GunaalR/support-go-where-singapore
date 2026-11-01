// HelpCompass SG design tokens: one source of truth for colour, used by the
// site shell (header, notice bar, footer, homepage) and by variant B.
// Variant A (src/variantA/) does NOT use these: it stays a copy of the live
// results screen, so A and B differ only where AUDIT.md says they should.
// Reasons for every colour are in DESIGN.md at the repository root.
//
// Contrast (WCAG 2.x relative luminance), text on its usual background:
//   ink #0F1E2E on white 16.9:1 · body #334155 10.4:1 · muted #5B6675 5.8:1
//   brand #0F766E on white 5.5:1 · white on brandDeep #134E4A 9.5:1
//   white on brandMid #0D9488 3.7:1 (large text and decoration only)
//   claim text #9A4A00 on claim tint #FFF4E5 5.8:1 · auto #4B5563 on #F1F3F5 6.8:1
//   signup #1E5A8A on #EAF3FB 6.5:1 · employee #475569 on #F1F5F9 6.9:1

export const C = {
  // neutrals: slate text on a warm off-white page
  ink: '#0F1E2E', // headings and amounts
  body: '#334155', // body text
  muted: '#5B6675', // secondary text
  line: '#E2E8F0', // borders and dividers
  page: '#F8F6F5', // page background, a warm off-white
  surface: '#FFFFFF', // cards

  // brand: care teal (MS-6). Red is kept for the heart logo only: red also
  // reads as danger and risk (Bazley et al., 2021, Week 8), which a help
  // site should not signal. Teal is the colour many health and care
  // services use for calm and healing, and it sits opposite red on the
  // colour wheel, so the heart logo stands out against it.
  brand: '#0F766E',
  brandDeep: '#134E4A', // hero background
  brandTint: '#F0FDFA', // soft brand surface
  brandOnDeep: '#CCFBF1', // secondary text on brandDeep (8.4:1)
  brandMid: '#0D9488', // gradients and decoration
  brandSoft: '#CCFBF1', // chips and hover surfaces
  brandLine: '#A7E3D9', // soft borders

  // "needs you": warm apricot/amber, the warm opposite of the cool teal, so
  // the few items that need action are the warmest thing on the page and
  // stand out without using red (complementary contrast, Week 8).
  claim: '#9A4A00',
  claimDeep: '#7A3B00',
  claimTint: '#FFF4E5',
  claimSoft: '#FFF8EF',
  claimLine: '#F3D2A8',
  claimSolid: '#B45309',

  // "nothing to do": quiet grey with a check, so automatic items recede
  // (grey, not green, so it is never confused with the teal brand)
  auto: '#4B5563',
  autoTint: '#F1F3F5',
  // "automatic if signed up before": calm sky blue, an "info" tone
  signup: '#1E5A8A',
  signupTint: '#EAF3FB',
  // "automatic for employees": neutral slate
  employee: '#475569',
  employeeTint: '#F1F5F9',
} as const;

export const FONT_BODY = "'Inter', ui-sans-serif, system-ui, sans-serif";
export const FONT_DISPLAY = "'Plus Jakarta Sans', 'Inter', ui-sans-serif, system-ui, sans-serif";
