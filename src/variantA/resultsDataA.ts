// Variant A: the live calculator results screen as it was on 2026-10-24,
// rebuilt under the fictional brand. Amounts, payout months, row order and
// notes follow audit/evidence/2026-10-24_P1_calculator_result.json; every
// real name is swapped as listed in audit/evidence/README.md.

export type PayoutUnit = 'currency' | 'months';

export interface PayoutRowA {
  schemeName: string;
  schemeCode: string;
  amount: number;
  unit: PayoutUnit;
  // "max" amounts are shown as "Up to $X" and turn the totals into "Up to"
  isMax?: boolean;
  payoutLine: string;
}

export interface BenefitBoxA {
  id: string;
  kind: 'member' | 'household';
  title: string;
  profile: string;
  rows: PayoutRowA[];
  notes: string[];
}

export interface YearPanelA {
  year: string;
  // the person's own box and the household box, under "your profile and your property"
  ownBoxes: BenefitBoxA[];
  // boxes for the other household members
  memberBoxes: BenefitBoxA[];
}

export const COPY_A = {
  back: 'Back',
  pageTitle: 'Estimated benefits you and your household may receive',
  pageSubtitle:
    'Based on your current input and the assumption that information given remains the same for current and 2027 payouts.',
  totalTitle: 'Total estimated benefits for you and your household',
  ownSectionTitle: 'Based on your input of your profile and your property',
  membersSectionTitle: 'Based on your input of your other household members',
  membersSectionNote:
    'Household members who live at the same address as you, and do not own more than one property.',
  toNote: 'To note:',
  notEligible: 'Not eligible based on current input',
  memberNoResultTitle: (year: string) =>
    `Based on your input, this household member does not qualify for any benefits for the year of ${year}.`,
  memberNoResultDesc:
    'If there are changes in the person’s life situation, do enter the required input to view the estimated benefits.',
  upTo: (amount: string) => `Up to ${amount}`,
  months: (n: number) => `${n} ${n === 1 ? 'month' : 'months'}`,
  rebateMonthsShort: (n: number) => `${n} months EUC Rebate`,
  rebateMonthsLong: (n: number) => `${n} months of EUC Rebate`,
  bannerTitle: 'Your benefits @ CompassLife',
  bannerDesc: 'View benefits paid out this year and in previous years on CompassLife.',
  bannerButton: 'View benefits',
  unsure: 'Unsure of your benefits? ',
  faqLink: 'See Frequently Asked Questions',
};

const PROFILE_YOU = '45 years old (in 2026), Assessable Income: $22,001 to $39,000';
const PROFILE_HOUSEHOLD =
  'Owned by me/household member(s), 4-room flat, Annual Value: $15,000 and below';
const PROFILE_MEMBER_1 =
  '71 years old (in 2026), Assessable Income: $22,000 and below or No income, NSF retirement savings: Below $60,000';
const PROFILE_MEMBER_2 = '12 years old (in 2026)';
const PROFILE_MEMBER_3 = '9 years old (in 2026)';

const NOTE_EARN_AND_SAVE =
  'For Harbour Package — Earn and Save Bonus, this benefit assumes that your average monthly income in preceding Year of Assessment is $500 to $6,000.';
const NOTE_CHILD_CREDITS =
  'The trustee of the eligible child’s Child Savings Account will be able to access the Child CompassLife Credits via the CompassLife application.';
const NOTE_EUC =
  'For EUC Rebate, this benefit assumes that your household members do not own private property and you have not rented out the whole flat.';
const NOTE_U_CREDIT =
  'For U-Credit, this benefit assumes that your household members do not own more than one property.';

const NAME = {
  steadyCash: 'Cash - Steady Package',
  lcvCash: 'Cash - LCV',
  lcvHealthSave: 'NSF Top-up - LCV — HealthSave',
  earnAndSave: 'NSF Top-up - Harbour Package — Earn and Save Bonus',
  childCredits: 'Credit - Child CompassLife Credits',
  costOfLiving: 'Cash - 2026 Cost-of-Living Special Payment',
  nsfTopUp: 'NSF Top-up - 2026 NSF Top-Up',
  uCredit: 'Rebate - U-Credit',
  ncv: 'Voucher - NCV Vouchers',
  euc: 'Rebate - Estate Upkeep Charges (EUC) Rebate',
};

export const RESULTS_A: YearPanelA[] = [
  {
    year: '2026',
    ownBoxes: [
      {
        id: 'you',
        kind: 'member',
        title: 'Your individual benefits',
        profile: PROFILE_YOU,
        rows: [
          { schemeName: NAME.steadyCash, schemeCode: 'STEADY-CASH', amount: 250, unit: 'currency', payoutLine: 'Payout in December 2026' },
          { schemeName: NAME.lcvCash, schemeCode: 'LCV-CASH', amount: 850, unit: 'currency', payoutLine: 'Payout in August 2026' },
          { schemeName: NAME.costOfLiving, schemeCode: 'COL-2026', amount: 500, unit: 'currency', payoutLine: 'Payout in September 2026' },
        ],
        notes: [],
      },
      {
        id: 'household',
        kind: 'household',
        title: 'Your household benefits',
        profile: PROFILE_HOUSEHOLD,
        rows: [
          { schemeName: NAME.uCredit, schemeCode: 'U-CREDIT', amount: 600, unit: 'currency', payoutLine: 'Granted from January 2026, April 2026, July 2026 and October 2026' },
          { schemeName: NAME.ncv, schemeCode: 'NCV', amount: 800, unit: 'currency', payoutLine: 'Payout in January 2026 and June 2026' },
          { schemeName: NAME.euc, schemeCode: 'EUCR', amount: 2.5, unit: 'months', payoutLine: 'Granted from January 2026, April 2026, July 2026 and October 2026' },
        ],
        notes: [NOTE_EUC, NOTE_U_CREDIT],
      },
    ],
    memberBoxes: [
      {
        id: 'member-1',
        kind: 'member',
        title: 'Member 1 benefits',
        profile: PROFILE_MEMBER_1,
        rows: [
          { schemeName: NAME.steadyCash, schemeCode: 'STEADY-CASH', amount: 250, unit: 'currency', payoutLine: 'Payout in December 2026' },
          { schemeName: NAME.lcvCash, schemeCode: 'LCV-CASH', amount: 850, unit: 'currency', payoutLine: 'Payout in August 2026' },
          { schemeName: NAME.lcvHealthSave, schemeCode: 'LCV-HEALTHSAVE', amount: 250, unit: 'currency', payoutLine: 'Payout in August 2026' },
          { schemeName: NAME.earnAndSave, schemeCode: 'HP-ESB', amount: 1000, unit: 'currency', isMax: true, payoutLine: 'Payout in March 2026' },
          { schemeName: NAME.costOfLiving, schemeCode: 'COL-2026', amount: 600, unit: 'currency', payoutLine: 'Payout in September 2026' },
          { schemeName: NAME.nsfTopUp, schemeCode: 'NSF-TOPUP-2026', amount: 1500, unit: 'currency', payoutLine: 'Payout in December 2026' },
        ],
        notes: [NOTE_EARN_AND_SAVE],
      },
      {
        id: 'member-2',
        kind: 'member',
        title: 'Member 2 benefits',
        profile: PROFILE_MEMBER_2,
        rows: [
          { schemeName: NAME.childCredits, schemeCode: 'CHILD-CREDITS', amount: 500, unit: 'currency', payoutLine: 'Payout in April 2026 and July 2026' },
        ],
        notes: [NOTE_CHILD_CREDITS],
      },
      {
        id: 'member-3',
        kind: 'member',
        title: 'Member 3 benefits',
        profile: PROFILE_MEMBER_3,
        rows: [
          { schemeName: NAME.childCredits, schemeCode: 'CHILD-CREDITS', amount: 500, unit: 'currency', payoutLine: 'Payout in April 2026 and July 2026' },
        ],
        notes: [NOTE_CHILD_CREDITS],
      },
    ],
  },
  {
    year: '2027',
    ownBoxes: [
      {
        id: 'you',
        kind: 'member',
        title: 'Your individual benefits',
        profile: PROFILE_YOU,
        rows: [
          { schemeName: NAME.lcvCash, schemeCode: 'LCV-CASH', amount: 850, unit: 'currency', payoutLine: 'Payout in August 2027' },
        ],
        notes: [],
      },
      {
        id: 'household',
        kind: 'household',
        title: 'Your household benefits',
        profile: PROFILE_HOUSEHOLD,
        rows: [
          { schemeName: NAME.uCredit, schemeCode: 'U-CREDIT', amount: 375, unit: 'currency', payoutLine: 'Granted from January 2027, April 2027, July 2027 and October 2027' },
          { schemeName: NAME.ncv, schemeCode: 'NCV', amount: 300, unit: 'currency', payoutLine: 'Payout in January 2027' },
          { schemeName: NAME.euc, schemeCode: 'EUCR', amount: 2.5, unit: 'months', payoutLine: 'Granted from January 2027, April 2027, July 2027 and October 2027' },
        ],
        notes: [NOTE_EUC, NOTE_U_CREDIT],
      },
    ],
    memberBoxes: [
      {
        id: 'member-1',
        kind: 'member',
        title: 'Member 1 benefits',
        profile: PROFILE_MEMBER_1,
        rows: [
          { schemeName: NAME.lcvCash, schemeCode: 'LCV-CASH', amount: 850, unit: 'currency', payoutLine: 'Payout in August 2027' },
          { schemeName: NAME.lcvHealthSave, schemeCode: 'LCV-HEALTHSAVE', amount: 250, unit: 'currency', payoutLine: 'Payout in August 2027' },
          { schemeName: NAME.earnAndSave, schemeCode: 'HP-ESB', amount: 1000, unit: 'currency', isMax: true, payoutLine: 'Payout in March 2027' },
        ],
        notes: [NOTE_EARN_AND_SAVE],
      },
      { id: 'member-2', kind: 'member', title: 'Member 2 benefits', profile: PROFILE_MEMBER_2, rows: [], notes: [] },
      { id: 'member-3', kind: 'member', title: 'Member 3 benefits', profile: PROFILE_MEMBER_3, rows: [], notes: [] },
    ],
  },
];
