import type { PayoutRowA, YearPanelA } from '../../variantA/resultsDataA';

// M3 (choice architecture): what the household has to do for each scheme.
// Every line comes from the official record saved in
// audit/evidence/2026-10-24_scheme_records.json (see the table in
// audit/evidence/README.md), with real names swapped for the fictional ones.
// Rule from AUDIT.md Finding 5: never say "You need to apply". Every record
// says "No application needed", so the words used are "claim" and "sign up".
// Labels use only the three forms in Finding 5 ("Automatic: nothing to do",
// "Claim it yourself: [where]", "Automatic if you have signed up before"),
// plus one conditional for the Earn and Save Bonus, whose record splits
// employees from the self-employed.
// Used by SchemeLabel.tsx and StartHere.tsx. Owned by M3.

// automatic: nothing to do · claim: the household must claim or use it itself
// signup: automatic only if signed up before · employee: automatic for employees only
export type StatusKind = 'automatic' | 'claim' | 'signup' | 'employee';

export interface SchemeStatus {
  kind: StatusKind;
  label: string; // shown under the scheme name in variant B
  // The rest is only for items that need the household, shown in Start here.
  shortName?: string; // plain name for the Start here block
  reason?: string; // one-line reason
  rank?: number; // order in Start here: earliest deadline first
  group?: string; // rows with the same group are one action, shown as one item
}

const AUTOMATIC: SchemeStatus = { kind: 'automatic', label: 'Automatic: nothing to do' };

// One sign-up covers every LCV payout (record GSTV-CASH and GSTV-MEDISAVE
// share the same "How to apply" text), so the two rows are one Start here item.
const LCV_SIGNUP: Omit<SchemeStatus, 'label'> = {
  kind: 'signup',
  shortName: 'LCV cash and HealthSave top-up',
  reason:
    'Paid automatically to anyone who has signed up for LCV payouts before. Anyone who never has signs up once on the benefits portal, and that covers both.',
  rank: 3,
  group: 'LCV',
};

export const SCHEME_STATUS: Record<string, SchemeStatus> = {
  // GST-CASH: "No application required."
  'STEADY-CASH': AUTOMATIC,
  // ESbwvFrn: "No application needed"
  'COL-2026': AUTOMATIC,
  // WOuv5ZHU: "No application needed – eligibility will be automatically assessed"
  'NSF-TOPUP-2026': AUTOMATIC,
  // SCCR: "credited directly to your household's S&CC account"
  EUCR: AUTOMATIC,
  // U-SAVE: "credited directly into eligible households' utilities accounts"
  'U-CREDIT': AUTOMATIC,
  // CDC: "households can claim their vouchers via the RedeemSG website",
  // "valid until 31 December 2027"
  NCV: {
    kind: 'claim',
    label: 'Claim it yourself: on the RedeemNow website',
    shortName: 'NCV Vouchers',
    reason: 'Claim them on the RedeemNow website, as they do not arrive by themselves. They can be used until 31 December 2027.',
    rank: 2,
  },
  // GNAgZJDj: "disbursed to the CDA trustee of the child via the LifeSG mobile
  // app", "valid for 12 months from disbursement, with the expiry date
  // displayed in the LifeSG mobile app"
  'CHILD-CREDITS': {
    kind: 'claim',
    label: 'Claim it yourself: in the CompassLife app',
    shortName: 'Child CompassLife Credits',
    reason:
      'They are not paid into a bank account. The child’s trustee uses them in the CompassLife app, and they expire 12 months after they arrive (the app shows the date).',
    rank: 1,
  },
  // GSTV-CASH and GSTV-MEDISAVE: "No application needed if you have previously
  // signed-up for past GSTV payouts / If you have never signed-up ... the
  // govbenefits portal"
  'LCV-CASH': { ...LCV_SIGNUP, label: 'Automatic if you have signed up before' },
  'LCV-HEALTHSAVE': { ...LCV_SIGNUP, label: 'Automatic if you have signed up before' },
  // MP-ESB: "Employees and Platform Workers / No application required ...
  // Self-employed persons / Declare your income to IRAS"
  'HP-ESB': {
    kind: 'employee',
    label: 'Automatic for employees; if self-employed, declare your income to the tax office',
  },
};

export function statusFor(row: PayoutRowA): SchemeStatus | undefined {
  return SCHEME_STATUS[row.schemeCode];
}

export interface ActionItem {
  code: string;
  status: SchemeStatus;
  total: number; // sum across the household, in dollars
  whoFor: string[]; // box titles the rows appear in
}

// Items the household must act on in the year shown, earliest deadline first,
// at most three: child credits (12 months from payout), NCV Vouchers
// (31 Dec 2027), then the one-time LCV sign-up (only if never signed up).
export function actionItems(panel: YearPanelA): ActionItem[] {
  const byKey = new Map<string, ActionItem>();
  for (const box of [...panel.ownBoxes, ...panel.memberBoxes]) {
    for (const row of box.rows) {
      const status = statusFor(row);
      if (!status || !status.reason) continue;
      const key = status.group ?? row.schemeCode;
      const item = byKey.get(key) ?? { code: key, status, total: 0, whoFor: [] };
      if (row.unit === 'currency') item.total += row.amount;
      if (!item.whoFor.includes(box.title)) item.whoFor.push(box.title);
      byKey.set(key, item);
    }
  }
  return [...byKey.values()]
    .sort((a, b) => (a.status.rank ?? 99) - (b.status.rank ?? 99))
    .slice(0, 3);
}
