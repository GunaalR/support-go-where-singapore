import { useCallback, useState } from 'react';
import type { PayoutRowA, YearPanelA } from '../../variantA/resultsDataA';
import { actionItems, progress, statusFor } from './schemeStatusM3';

// Shared logic for variant B's to-do list (StartHere.tsx), the plan summary
// (NextStep.tsx) and the helper bot (HelpBot.tsx), so the three never disagree.
// Every fact comes from audit/evidence/2026-10-24_scheme_records.json, with the
// fictional names in audit/evidence/README.md. Nothing is stored or sent.

// What to have ready, per Start here item (AUDIT.md Finding 7)
export const NEEDS: Record<string, string[]> = {
  NCV: ['A phone or computer', 'Your digital ID login for the RedeemNow website'],
  'CHILD-CREDITS': ['The CompassLife app on the trustee’s phone', 'The trustee’s digital ID login'],
  LCV: ['Your digital ID login for the benefits portal', 'Your bank account details, for the payout'],
};

// How to do it, step by step (Finding 7: the "How to apply" text, on this page)
export const HOW_STEPS: Record<string, string[]> = {
  // CDC record: "claim their vouchers via the RedeemSG website", "valid until
  // 31 December 2027", "for spending at participating heartland merchants,
  // hawkers, and supermarkets"
  NCV: [
    'Open the RedeemNow website.',
    'Log in with your digital ID.',
    'Claim the vouchers for your household.',
    'Spend them at neighbourhood shops, hawkers and supermarkets that take them, by 31 December 2027.',
  ],
  // Child LifeSG Credits record: "disbursed to the CDA trustee of the child via
  // the LifeSG mobile app", "merchants that accept ... QR", "valid for 12 months
  // from disbursement, with the expiry date displayed in the app"
  'CHILD-CREDITS': [
    'The child’s trustee opens the CompassLife app.',
    'Find the Child CompassLife Credits and check the expiry date shown there.',
    'Pay at shops that accept QR payments, before the credits expire.',
  ],
  // GSTV records: "No application needed if you have previously signed-up ...
  // If you have never signed-up ... apply by logging in to the e-services on
  // the govbenefits portal"; "disbursed in August each year"
  LCV: [
    'If you have had LCV payouts before, you do not need to do anything.',
    'If you never have, log in to the benefits portal with your digital ID and sign up once.',
    'After that, the cash goes to your bank account every August, with no more sign-ups.',
  ],
};

// One short deadline line per item
export const DEADLINE: Record<string, string> = {
  NCV: 'Use by 31 December 2027',
  'CHILD-CREDITS': 'Expires 12 months after it arrives',
  LCV: 'One-time sign-up, only if never done',
};

export const money = (n: number) => `$${n.toLocaleString('en-SG', { maximumFractionDigits: 2 })}`;

// "Your individual benefits" -> "You", "Member 2 benefits" -> "Member 2 (age 12)".
// The age comes from the box's profile; the data does not say how members are
// related, so no relationship is named.
export const who = ({ title, profile }: { title: string; profile: string }) => {
  if (title === 'Your individual benefits') return 'You';
  if (title === 'Your household benefits') return 'Your household';
  const name = title.replace(/ benefits$/, '');
  const age = profile.match(/(\d+) years old/)?.[1];
  return age && name.startsWith('Member') ? `${name} (age ${age})` : name;
};

export const todayIso = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

export const niceDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

export function calendarFile(plans: { title: string; date: string }[]) {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const events = plans.map((p, i) =>
    [
      'BEGIN:VEVENT',
      `UID:helpcompass-${p.date}-${i}@prototype`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${p.date.replace(/-/g, '')}`,
      `SUMMARY:HelpCompass: ${p.title}`,
      'BEGIN:VALARM',
      'TRIGGER:-PT15H',
      'ACTION:DISPLAY',
      `DESCRIPTION:${p.title}`,
      'END:VALARM',
      'END:VEVENT',
    ].join('\r\n'),
  );
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//HelpCompass SG prototype//EN', ...events, 'END:VCALENDAR'].join('\r\n');
}

// ---- The household's plan, one entry per year and item ---------------------
// todo: not started · planned: a day is picked · done: ticked off · skipped: not now
export type TaskState = 'todo' | 'planned' | 'done' | 'skipped';
export interface TaskEntry {
  state: TaskState;
  date?: string;
}

export function usePlan() {
  const [entries, setEntries] = useState<Record<string, TaskEntry>>({});
  const get = useCallback(
    (year: string, code: string): TaskEntry => entries[`${year}:${code}`] ?? { state: 'todo' },
    [entries],
  );
  const set = useCallback((year: string, code: string, entry: TaskEntry) => {
    setEntries(prev => ({ ...prev, [`${year}:${code}`]: entry }));
  }, []);
  return { get, set };
}
export type Plan = ReturnType<typeof usePlan>;

// Progress for the year shown (Week 2 endowed progress): rows that are taken
// care of start the count; each item ticked off adds its rows.
export function progressWithPlan(panel: YearPanelA, plan: Plan) {
  const items = actionItems(panel);
  const base = progress(panel);
  const doneItems = items.filter(it => plan.get(panel.year, it.code).state === 'done');
  const done = base.done + doneItems.reduce((sum, it) => sum + it.rows, 0);
  return {
    done,
    total: base.total,
    left: items.length - doneItems.length,
    percent: base.total === 0 ? 0 : Math.round((done / base.total) * 100),
    items,
  };
}

// ---- Payout dates ---------------------------------------------------------
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// "Payout in January 2026 and June 2026" -> [{ y: 2026, m: 0 }, { y: 2026, m: 5 }]
export function payoutMonths(row: PayoutRowA) {
  const out: { y: number; m: number }[] = [];
  for (const match of row.payoutLine.matchAll(/(January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})/g)) {
    out.push({ y: Number(match[2]), m: MONTHS.indexOf(match[1]) });
  }
  return out;
}

// The next month (after this one) in which something in this year's panel is
// paid out, and which schemes pay then. Used for the "Next payout" tile and
// by the bot. Returns null when every payout in the panel is in the past.
export function nextPayout(panel: YearPanelA, now = new Date()) {
  const nowKey = now.getFullYear() * 12 + now.getMonth();
  let best: number | null = null;
  const rows = [...panel.ownBoxes, ...panel.memberBoxes].flatMap(b => b.rows);
  for (const row of rows) {
    for (const { y, m } of payoutMonths(row)) {
      const key = y * 12 + m;
      if (key > nowKey && (best === null || key < best)) best = key;
    }
  }
  if (best === null) return null;
  const names = new Set<string>();
  for (const row of rows) {
    if (payoutMonths(row).some(({ y, m }) => y * 12 + m === best)) names.add(plainName(row.schemeName));
  }
  return { label: `${MONTHS[best % 12]} ${Math.floor(best / 12)}`, schemes: [...names] };
}

// "NSF Top-up - 2026 NSF Top-Up" -> "2026 NSF Top-Up" (drop the kind prefix)
export const plainName = (schemeName: string) => schemeName.split(' - ').slice(1).join(' - ') || schemeName;

// Rows that need the household: anything that is not simply automatic
export const needsYou = (row: PayoutRowA) => {
  const kind = statusFor(row)?.kind;
  return kind === 'claim' || kind === 'signup';
};
