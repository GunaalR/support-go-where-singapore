import type { PayoutRowA, YearPanelA } from '../../variantA/resultsDataA';

// M3 (choice architecture): what the household has to do for each scheme.
// Every line comes from the official record saved in
// audit/evidence/2026-10-24_scheme_records.json (see the table in
// audit/evidence/README.md), with real names swapped for the fictional ones.
// Rule from AUDIT.md Finding 5: never say "You need to apply". Every record
// says "No application needed", so the words used are "claim" and "sign up".
// Used by SchemeLabel.tsx and StartHere.tsx. Owned by M3.

// automatic: nothing to do · signup: automatic only if signed up before
// claim: the household must claim it · app: arrives in an app and must be used in time
export type StatusKind = 'automatic' | 'signup' | 'claim' | 'app' | 'employee';

export interface SchemeStatus {
  kind: StatusKind;
  label: string; // shown under the scheme name in variant B
  shortName?: string; // plain name for the Start here block
  reason?: string; // one-line reason, only for items that need the household
}

const AUTOMATIC: SchemeStatus = { kind: 'automatic', label: 'Automatic: nothing to do' };

export const SCHEME_STATUS: Record<string, SchemeStatus> = {
  'STEADY-CASH': AUTOMATIC,
  'COL-2026': AUTOMATIC,
  'NSF-TOPUP-2026': AUTOMATIC,
  EUCR: AUTOMATIC,
  'U-CREDIT': AUTOMATIC,
  NCV: {
    kind: 'claim',
    label: 'Claim it yourself: on the RedeemNow website',
    shortName: 'NCV Vouchers',
    reason: 'Claim them on the RedeemNow website. They are not paid out by themselves, and they expire on 31 December 2027.',
  },
  'CHILD-CREDITS': {
    kind: 'app',
    label: 'Automatic: sent to the CompassLife app, use within 12 months',
    shortName: 'Child CompassLife Credits',
    reason: 'They go to the child’s trustee in the CompassLife app, not to a bank account. Check the app and use them within 12 months.',
  },
  'LCV-CASH': {
    kind: 'signup',
    label: 'Automatic if you have signed up before',
    shortName: 'LCV cash',
    reason: 'Paid automatically if you have signed up for LCV before. If you never have, sign up once on the benefits portal.',
  },
  'LCV-HEALTHSAVE': { kind: 'signup', label: 'Automatic if you have signed up before' },
  'HP-ESB': {
    kind: 'employee',
    label: 'Automatic for employees; self-employed, declare your income',
  },
};

export function statusFor(row: PayoutRowA): SchemeStatus | undefined {
  return SCHEME_STATUS[row.schemeCode];
}

// Items the household must act on this year, most urgent first, at most three.
// Order: things to claim, then things to check in an app, then a one-time sign-up.
const PRIORITY: StatusKind[] = ['claim', 'app', 'signup'];

export interface ActionItem {
  code: string;
  status: SchemeStatus;
  total: number; // sum across the household, in dollars
  whoFor: string[]; // box titles the row appears in
}

export function actionItems(panel: YearPanelA): ActionItem[] {
  const byCode = new Map<string, ActionItem>();
  for (const box of [...panel.ownBoxes, ...panel.memberBoxes]) {
    for (const row of box.rows) {
      const status = statusFor(row);
      if (!status || !status.reason) continue;
      const item = byCode.get(row.schemeCode) ?? { code: row.schemeCode, status, total: 0, whoFor: [] };
      if (row.unit === 'currency') item.total += row.amount;
      if (!item.whoFor.includes(box.title)) item.whoFor.push(box.title);
      byCode.set(row.schemeCode, item);
    }
  }
  return [...byCode.values()]
    .sort((a, b) => PRIORITY.indexOf(a.status.kind) - PRIORITY.indexOf(b.status.kind))
    .slice(0, 3);
}
