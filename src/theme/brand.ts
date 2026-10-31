// HelpCompass SG design tokens: one source of truth for colour, used by the
// site shell (header, notice bar, footer, homepage) and by variant B.
// Variant A (src/variantA/) does NOT use these: it stays a copy of the live
// results screen, so A and B differ only where AUDIT.md says they should.
// Reasons for every colour are in DESIGN.md at the repository root.
//
// Contrast (WCAG 2.x relative luminance), text on its usual background:
//   ink #0F1E2E on white 16.9:1 · body #334155 10.4:1 · muted #5B6675 5.8:1
//   brand #0B5A7A on white 7.6:1 · white on brandDeep #083D54 11.6:1
//   claim text #9A4A00 on claim tint #FFF4E5 5.8:1 · auto #2F6F5E on #EDF6F2 5.4:1
//   signup #1E5A8A on #EAF3FB 6.5:1 · employee #475569 on #F1F5F9 6.9:1

export const C = {
  // neutrals: cool slate, so the one warm colour (claim) stands out
  ink: '#0F1E2E', // headings and amounts
  body: '#334155', // body text
  muted: '#5B6675', // secondary text
  line: '#E2E8F0', // borders and dividers
  page: '#F5F7F9', // page background
  surface: '#FFFFFF', // cards

  // brand: deep teal-blue. Blue signals trust and calm, open thinking
  // (Mehta & Zhu, 2009, Week 8); the teal shift keeps it warmer and less
  // "corporate bank" for a public-service audience.
  brand: '#0B5A7A',
  brandDeep: '#083D54', // hero background
  brandTint: '#E8F3F7', // soft brand surface
  brandOnDeep: '#CFE6EF', // secondary text on brandDeep

  // "needs you": warm apricot, the complement of the brand blue, so the few
  // items that need action are the only warm thing on a cool page
  // (complementary contrast). Not red: red reads as risk and loss
  // (Bazley et al., 2021, Week 8).
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
