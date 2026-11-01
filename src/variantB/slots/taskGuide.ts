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
  // CDC record: "claim their vouchers via the RedeemSG website", "for spending
  // at participating heartland merchants, hawkers, and supermarkets". The last
  // step, with its dates, comes from ncvSpendBy() below.
  NCV: [
    'Open the RedeemNow website.',
    'Log in with your digital ID.',
    'Claim the vouchers for your household.',
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

// NCV Vouchers have two expiry dates on the 2026 tab (EZ's correction of
// 1 Nov 2026, audit/evidence/2026-11-01_recheck.md): the January 2026 $300 is
// valid until 31 Dec 2026, the June 2026 $500 until 31 Dec 2027. The 2027 tab
// holds only the January 2027 $300, valid until 31 Dec 2027.
const ncvSpendBy = (year: string) =>
  year === '2026'
    ? 'Spend them at neighbourhood shops, hawkers and supermarkets that take them: the January 2026 $300 by 31 December 2026, and the June 2026 $500 by 31 December 2027.'
    : 'Spend them at neighbourhood shops, hawkers and supermarkets that take them, by 31 December 2027.';

export const stepsFor = (code: string, year: string) =>
  code === 'NCV' ? [...HOW_STEPS.NCV, ncvSpendBy(year)] : HOW_STEPS[code] ?? [];

// One short deadline line per item
export const deadlineFor = (code: string, year: string) =>
  code === 'NCV' && year === '2026' ? '$300 by 31 Dec 2026, $500 by 31 Dec 2027' : DEADLINE[code];

const DEADLINE: Record<string, string> = {
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

// ---- Conditions next to the amount (AUDIT.md Finding 8, MS-7) --------------
// The live screen puts these in small italics under "To note:" at the foot of
// a box, away from the amount they limit. Same facts as the notes in
// src/variantA/resultsDataA.ts, in plain words, shown beside the amount.
export const CONDITION: Record<string, string> = {
  'HP-ESB': 'Only if their average monthly income last Year of Assessment was $500 to $6,000',
  EUCR: 'Only if no household member owns private property and the whole flat is not rented out',
  'U-CREDIT': 'Only if no household member owns more than one property',
};

// ---- Paid or still to come (AUDIT.md Finding 3, MS-7) ----------------------
// Each row's payout months compared with today's month. "now" means the
// payout month is this month.
export type PayStatus = 'paid' | 'now' | 'coming' | 'partly';

const monthKey = (d: Date) => d.getFullYear() * 12 + d.getMonth();

export function payStatus(row: PayoutRowA, now = new Date()): PayStatus | null {
  const months = payoutMonths(row).map(({ y, m }) => y * 12 + m);
  if (months.length === 0) return null;
  const k = monthKey(now);
  if (months.every(x => x < k)) return 'paid';
  if (months.every(x => x > k)) return 'coming';
  if (months.length === 1 && months[0] === k) return 'now';
  return 'partly';
}

// Cash already paid, still to come, and in rows that are partly paid (their
// amount cannot be split by month from the data, so it is shown on its own).
export function paidSplit(panel: YearPanelA, now = new Date()) {
  let paid = 0;
  let coming = 0;
  let partly = 0;
  for (const row of [...panel.ownBoxes, ...panel.memberBoxes].flatMap(b => b.rows)) {
    if (row.unit !== 'currency') continue;
    const s = payStatus(row, now);
    if (s === 'paid') paid += row.amount;
    else if (s === 'coming' || s === 'now') coming += row.amount;
    else if (s === 'partly') partly += row.amount;
  }
  return { paid, coming, partly };
}

// ---- Month-by-month timeline (MS-7) ----------------------------------------
export interface MonthCell {
  y: number;
  m: number;
  label: string; // "Dec"
  long: string; // "December 2026"
  status: 'past' | 'now' | 'future';
  items: { name: string; amount: string | null; who: string }[];
  cash: number; // only rows paid in this one month, so the sum is exact
}

export function timeline(panel: YearPanelA, now = new Date()): MonthCell[] {
  const year = Number(panel.year);
  const k = monthKey(now);
  const cells: MonthCell[] = MONTHS.map((long, m) => ({
    y: year,
    m,
    label: long.slice(0, 3),
    long: `${long} ${year}`,
    status: year * 12 + m < k ? 'past' : year * 12 + m === k ? 'now' : 'future',
    items: [],
    cash: 0,
  }));
  for (const box of [...panel.ownBoxes, ...panel.memberBoxes]) {
    for (const row of box.rows) {
      const months = payoutMonths(row).filter(({ y }) => y === year);
      for (const { m } of months) {
        const single = months.length === 1;
        cells[m].items.push({
          name: plainName(row.schemeName),
          amount: single ? (row.unit === 'months' ? `${row.amount} months` : money(row.amount)) : null,
          who: who(box),
        });
        if (single && row.unit === 'currency') cells[m].cash += row.amount;
      }
    }
  }
  return cells;
}
