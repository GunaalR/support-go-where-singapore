import { Banknote, PiggyBank, ReceiptText, Smartphone, Ticket, type LucideIcon } from 'lucide-react';
import type { PayoutRowA } from '../../variantA/resultsDataA';
import { KIND_STYLE, kindOf, type SupportKind } from './styleB';

// SLOT for M5 (colour and fluency): shown in variant B directly under each
// scheme name, above M3's status label.
// Finding 12: an icon and a category word per kind of support, in that kind's
// colour, so the kind is recognised, not recalled (never colour alone).
// Finding 6: one plain-language line saying what the scheme is and where it
// goes. The official name above stays as it is. Facts come from
// audit/evidence/2026-10-24_scheme_records.json, with the fictional names in
// audit/evidence/README.md.
// Owned by M5: only M5 edits this file.

const KIND_ICON: Record<SupportKind, LucideIcon> = {
  cash: Banknote,
  topup: PiggyBank,
  rebate: ReceiptText,
  voucher: Ticket,
  credit: Smartphone,
};

const PLAIN_LINE: Record<string, string> = {
  'STEADY-CASH': 'Cash paid to your bank account every December, until 2026.',
  'COL-2026': 'One-off cash to help with living costs, paid to your bank account in September 2026.',
  'LCV-CASH': 'Cash paid to your bank account every August.',
  'LCV-HEALTHSAVE': 'Added to your HealthSave account (savings for medical bills) every August.',
  'NSF-TOPUP-2026': 'A one-off top-up added to your NSF savings account.',
  'HP-ESB': 'A yearly bonus for working seniors, added to your NSF savings account every March.',
  EUCR: 'Covers some months of your estate upkeep charges, credited to your estate charges account.',
  'U-CREDIT': 'Money taken off your utilities bills, credited to your utilities account.',
  NCV: 'Vouchers to spend at neighbourhood shops, hawkers and supermarkets, claimed on RedeemNow.',
  'CHILD-CREDITS':
    "Credits for household spending, sent in the CompassLife app to the trustee of the child's Child Savings Account.",
};

const PLAIN_TEXT = '#4E4E4E'; // site's body text colour, 8.32:1 on white

export function SchemeCategory({ row }: { row: PayoutRowA }) {
  const kind = kindOf(row);
  const plain = PLAIN_LINE[row.schemeCode];
  if (!kind && !plain) return null;
  const Icon = kind ? KIND_ICON[kind] : null;
  const style = kind ? KIND_STYLE[kind] : null;
  return (
    <div className="flex flex-col gap-0.5 mt-1" data-kind={kind}>
      {style && Icon && (
        <p className="flex items-center gap-1.5 text-base font-semibold" style={{ color: style.colour }}>
          <Icon className="w-5 h-5 shrink-0" strokeWidth={2} aria-hidden="true" />
          <span>{style.word}</span>
        </p>
      )}
      {plain && (
        <p className="text-base" style={{ color: PLAIN_TEXT }}>
          {plain}
        </p>
      )}
    </div>
  );
}
