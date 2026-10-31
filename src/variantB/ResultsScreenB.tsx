import { useState } from 'react';
import {
  CalendarDays,
  Calculator,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  FileText,
  Home,
  Info,
  Search,
  User,
  Users,
} from 'lucide-react';
import { BenefitBoxA, PayoutRowA, RESULTS_A, YearPanelA } from '../variantA/resultsDataA';
import { C, FONT_BODY, FONT_DISPLAY } from '../theme/brand';
import { COPY_B, KIND_STYLE, kindOf, schemeColour } from './slots/styleB';
import { StartHere } from './slots/StartHere';
import { SchemeLabel } from './slots/SchemeLabel';
import { NextStep } from './slots/NextStep';
import { SchemeCategory } from './slots/SchemeCategory';

// Variant B: the same results screen as variant A, with our nudges.
// Same data, same order of sections and same wording as variant A
// (src/variantA/ResultsScreenA.tsx); the nudges live in ./slots/:
//   slots/StartHere.tsx      "Start here" block, above your own boxes
//   slots/SchemeLabel.tsx    "Automatic" / "Claim it yourself" under each scheme
//   slots/NextStep.tsx       plan the next step, after the results
//   slots/styleB.ts          plain wording (COPY_B) and colour per kind of support
//   slots/SchemeCategory.tsx icon, kind word and plain line under each scheme
// Visual design (MS-3): HelpCompass tokens from src/theme/brand.ts, with the
// reasons in DESIGN.md. The cool brand blue carries the page, the one warm
// colour marks what needs the household, and everything automatic is quiet.

interface ResultsScreenBProps {
  onBack?: () => void;
  // the live page opens each scheme page in a new tab; here the shell decides
  onOpenScheme?: (schemeCode: string) => void;
  onOpenBanner?: () => void;
  onOpenFaq?: () => void;
}

function money(n: number) {
  return `$${n.toLocaleString('en-SG', { maximumFractionDigits: 2 })}`;
}

function rowAmount(row: PayoutRowA) {
  if (row.unit === 'months') return COPY_B.months(row.amount);
  return row.isMax ? COPY_B.upTo(money(row.amount)) : money(row.amount);
}

function boxCash(box: BenefitBoxA) {
  return box.rows.filter(r => r.unit === 'currency').reduce((sum, r) => sum + r.amount, 0);
}

function boxMonths(box: BenefitBoxA) {
  return box.rows.filter(r => r.unit === 'months').reduce((sum, r) => sum + r.amount, 0);
}

function totalParts(panel: YearPanelA) {
  const boxes = [...panel.ownBoxes, ...panel.memberBoxes];
  const cash = boxes.reduce((sum, b) => sum + boxCash(b), 0);
  const months = boxes.reduce((sum, b) => sum + boxMonths(b), 0);
  const isMax = boxes.some(b => b.rows.some(r => r.isMax));
  return { cash, months, isMax };
}

function totalLabel(panel: YearPanelA) {
  const { cash, months, isMax } = totalParts(panel);
  const amount = money(cash);
  if (months === 0) return isMax ? COPY_B.upTo(amount) : amount;
  const withMonths = `${amount} and ${COPY_B.rebateMonthsLong(months)}`;
  return isMax ? COPY_B.upTo(withMonths) : withMonths;
}

function SectionHeading({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <div className="mb-5 md:mb-6">
      <p className="text-sm font-bold uppercase tracking-[0.14em]" style={{ color: C.brand }}>
        {eyebrow}
      </p>
      <h2 className="mt-1 text-xl md:text-3xl font-extrabold tracking-tight" style={{ color: C.ink, fontFamily: FONT_DISPLAY }}>
        {title}
      </h2>
      {note && (
        <p className="mt-2 text-base md:text-lg" style={{ color: C.muted }}>
          {note}
        </p>
      )}
    </div>
  );
}

function BoxHeaderTotal({ box }: { box: BenefitBoxA }) {
  const cash = boxCash(box);
  const months = boxMonths(box);
  if (cash === 0 && months === 0) {
    return <p className="font-semibold text-base md:text-lg" style={{ color: C.muted }}>{COPY_B.notEligible}</p>;
  }
  const isMax = box.rows.some(r => r.isMax);
  return (
    <div className="font-extrabold text-xl md:text-2xl tabular-nums leading-tight" style={{ color: C.ink, fontFamily: FONT_DISPLAY }}>
      {cash > 0 && <p>{isMax ? COPY_B.upTo(money(cash)) : money(cash)}</p>}
      {months > 0 && <p className="text-base md:text-lg font-bold" style={{ color: C.body }}>{COPY_B.rebateMonthsShort(months)}</p>}
    </div>
  );
}

function NoResult({ year }: { year: string }) {
  return (
    <div className="flex flex-col items-center text-center px-6 py-10">
      <div
        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-5"
        style={{ backgroundColor: C.brandTint }}
        aria-hidden="true"
      >
        <Calculator className="w-10 h-10 md:w-12 md:h-12" style={{ color: C.brand }} />
        <Search className="absolute -left-1 top-1 w-8 h-8 md:w-9 md:h-9" style={{ color: C.muted }} />
      </div>
      <p className="font-bold text-lg md:text-xl max-w-xl" style={{ color: C.ink }}>{COPY_B.memberNoResultTitle(year)}</p>
      <p className="mt-2 max-w-xl" style={{ color: C.body }}>{COPY_B.memberNoResultDesc}</p>
    </div>
  );
}

function SchemeRow({ row, onOpenScheme }: { row: PayoutRowA; onOpenScheme?: (schemeCode: string) => void }) {
  const kind = kindOf(row);
  const bar = schemeColour(row) ?? C.line;
  // M5's kind colour as a left bar and a soft wash that fades into white (GR-4)
  const wash = kind ? `linear-gradient(90deg, ${KIND_STYLE[kind].tint} 0%, #FFFFFF 55%)` : '#FFFFFF';
  return (
    <li
      className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-6 rounded-xl px-4 py-4 md:px-6 md:py-5"
      style={{ borderLeft: `5px solid ${bar}`, background: wash, boxShadow: `inset 0 0 0 1px ${C.line}` }}
    >
      <div className="flex flex-col gap-2 min-w-0">
        <button
          type="button"
          onClick={() => onOpenScheme?.(row.schemeCode)}
          className="text-left text-lg md:text-xl font-semibold underline decoration-2 underline-offset-4 cursor-pointer w-fit transition-colors hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm"
          style={{ color: C.brand, textDecorationColor: 'rgba(11,90,122,0.3)', outlineColor: C.brand }}
        >
          {row.schemeName}
        </button>
        {/* M5 slot: kind icon, word and plain-language line */}
        <SchemeCategory row={row} />
        {/* M3 slot: Automatic / Claim it yourself */}
        <SchemeLabel row={row} />
        <p className="flex items-center gap-2 text-base" style={{ color: C.muted }}>
          <CalendarDays className="w-4 h-4 shrink-0" aria-hidden="true" />
          {row.payoutLine}
        </p>
      </div>
      <p
        className="shrink-0 text-2xl md:text-[28px] font-extrabold tabular-nums leading-none sm:pt-1 sm:text-right"
        style={{ color: C.ink, fontFamily: FONT_DISPLAY }}
      >
        {rowAmount(row)}
      </p>
    </li>
  );
}

function BenefitBox({
  box,
  year,
  onOpenScheme,
}: {
  box: BenefitBoxA;
  year: string;
  onOpenScheme?: (schemeCode: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const Icon = box.kind === 'household' ? Home : User;

  return (
    <div
      className="mb-6 rounded-2xl bg-white overflow-hidden shadow-[0_1px_2px_rgba(15,30,46,0.05),0_6px_20px_-12px_rgba(15,30,46,0.18)]"
      style={{ border: `1px solid ${C.line}` }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 p-4 md:p-6 text-left cursor-pointer transition-colors hover:bg-[#FAFCFD] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2"
        style={{ outlineColor: C.brand }}
      >
        <div className="flex items-start gap-4 w-full">
          <span
            className="shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: C.brandTint }}
            aria-hidden="true"
          >
            <Icon className="w-6 h-6" style={{ color: C.brand }} strokeWidth={2} />
          </span>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2">
            <div>
              <p className="font-bold text-lg md:text-xl" style={{ color: C.ink, fontFamily: FONT_DISPLAY }}>{box.title}</p>
              <p className="mt-0.5 max-w-[690px] text-base" style={{ color: C.muted }}>{box.profile}</p>
            </div>
            <div className="md:text-right">
              <BoxHeaderTotal box={box} />
            </div>
          </div>
        </div>
        <span
          className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: C.page }}
          aria-hidden="true"
        >
          {open ? (
            <ChevronUp className="w-5 h-5" style={{ color: C.body }} strokeWidth={2} />
          ) : (
            <ChevronDown className="w-5 h-5" style={{ color: C.body }} strokeWidth={2} />
          )}
        </span>
      </button>

      {open && (
        <div className="px-3 pb-4 md:px-6 md:pb-6" style={{ borderTop: `1px solid ${C.line}` }}>
          {box.rows.length === 0 ? (
            <NoResult year={year} />
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {box.rows.map((row, i) => (
                <SchemeRow key={`${row.schemeCode}-${i}`} row={row} onOpenScheme={onOpenScheme} />
              ))}
            </ul>
          )}

          {box.notes.length > 0 && (
            <div className="mt-4 flex gap-3 rounded-xl p-4" style={{ backgroundColor: C.page }}>
              <Info className="w-5 h-5 mt-0.5 shrink-0" style={{ color: C.brand }} aria-hidden="true" />
              <div>
                <p className="font-bold" style={{ color: C.ink }}>{COPY_B.toNote}</p>
                <ul className="mt-1 flex flex-col gap-1 list-disc ml-5">
                  {box.notes.map(note => (
                    <li key={note} className="text-base leading-relaxed" style={{ color: C.body }}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ResultsScreenB({ onBack, onOpenScheme, onOpenBanner, onOpenFaq }: ResultsScreenBProps) {
  const thisYear = String(new Date().getFullYear());
  const defaultIndex = Math.max(0, RESULTS_A.findIndex(p => p.year === thisYear));
  const [tab, setTab] = useState(defaultIndex);
  const panel = RESULTS_A[tab];
  const total = totalParts(panel);

  return (
    <div style={{ color: C.body, backgroundColor: C.page, fontFamily: FONT_BODY }} data-variant="B">
      {/* Page title */}
      <div
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${C.brandDeep} 0%, ${C.brand} 70%, #127FA8 100%)` }}
      >
        {/* soft compass rings, decoration only */}
        <svg
          className="absolute -right-24 -top-24 w-[420px] h-[420px] md:w-[560px] md:h-[560px] opacity-[0.09]"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <g fill="none" stroke="#FFFFFF" strokeWidth="1.2">
            <circle cx="100" cy="100" r="96" />
            <circle cx="100" cy="100" r="70" />
            <circle cx="100" cy="100" r="44" />
            <path d="M100 4v192M4 100h192" />
          </g>
          <path d="M100 40l14 60-14 60-14-60z" fill="#FFFFFF" />
        </svg>
        <div className="relative max-w-6xl mx-auto px-4 pt-6 pb-12 md:pt-8 md:pb-16">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-full pl-2 pr-4 py-1.5 text-base md:text-lg font-semibold cursor-pointer mb-8 md:mb-10 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            style={{ color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.35)' }}
            aria-label="Go back to calculator landing page"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
            {COPY_B.back}
          </button>
          <h1
            className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-white max-w-4xl"
            style={{ fontFamily: FONT_DISPLAY }}
          >
            {COPY_B.pageTitle}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl leading-relaxed" style={{ color: C.brandOnDeep }}>
            {COPY_B.pageSubtitle}
          </p>
        </div>
      </div>

      {/* Year tabs: sticky under the site header (72px) */}
      <div
        className="sticky top-[72px] z-30 backdrop-blur"
        style={{ backgroundColor: 'rgba(245,247,249,0.92)', borderBottom: `1px solid ${C.line}` }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div
            className="flex w-full sm:w-fit gap-1 rounded-full p-1"
            role="tablist"
            aria-label="Payout year"
            style={{ backgroundColor: '#FFFFFF', boxShadow: `inset 0 0 0 1px ${C.line}` }}
          >
            {RESULTS_A.map((p, i) => {
              const active = i === tab;
              return (
                <button
                  key={p.year}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(i)}
                  className="flex-1 sm:flex-none sm:min-w-[140px] rounded-full px-6 py-2.5 text-lg font-bold cursor-pointer transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={
                    active
                      ? { backgroundColor: C.brand, color: '#FFFFFF', outlineColor: C.brand }
                      : { backgroundColor: 'transparent', color: C.body, outlineColor: C.brand }
                  }
                >
                  {p.year}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6 md:mt-10 mb-6 md:mb-8" role="tabpanel">
        {/* Total box: the hedged total is kept (AUDIT.md Finding 1) */}
        <div
          className="relative overflow-hidden rounded-3xl p-6 md:p-9 mb-10 bg-white shadow-[0_1px_2px_rgba(15,30,46,0.05),0_12px_32px_-16px_rgba(11,90,122,0.35)]"
          style={{ border: `1px solid ${C.line}` }}
        >
          <span
            className="absolute inset-y-0 left-0 w-1.5"
            style={{ background: `linear-gradient(180deg, ${C.brand}, #127FA8)` }}
            aria-hidden="true"
          />
          <p className="text-base md:text-lg font-semibold" style={{ color: C.muted }}>
            {COPY_B.totalTitle}
          </p>
          <p className="sr-only" id={`${panel.year}-aggregate`}>
            {totalLabel(panel)}
          </p>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1" aria-hidden="true">
            {total.isMax && (
              <span className="text-xl md:text-2xl font-bold" style={{ color: C.body }}>
                Up to
              </span>
            )}
            <span
              className="text-5xl md:text-7xl font-extrabold tracking-tight tabular-nums leading-none"
              style={{ color: C.ink, fontFamily: FONT_DISPLAY }}
            >
              {money(total.cash)}
            </span>
            {total.months > 0 && (
              <span className="text-xl md:text-2xl font-bold" style={{ color: C.body }}>
                and {COPY_B.rebateMonthsLong(total.months)}
              </span>
            )}
          </div>
        </div>

        {/* M3 slot: Start here */}
        <StartHere panel={panel} />

        <SectionHeading eyebrow="You and your home" title={COPY_B.ownSectionTitle} />
        {panel.ownBoxes.map(box => (
          <BenefitBox key={`${panel.year}-${box.id}`} box={box} year={panel.year} onOpenScheme={onOpenScheme} />
        ))}

        {panel.memberBoxes.length > 0 && (
          <div className="mt-12">
            <SectionHeading
              eyebrow="Your household"
              title={COPY_B.membersSectionTitle}
              note={COPY_B.membersSectionNote}
            />
            {panel.memberBoxes.map(box => (
              <BenefitBox key={`${panel.year}-${box.id}`} box={box} year={panel.year} onOpenScheme={onOpenScheme} />
            ))}
          </div>
        )}
      </div>

      {/* M4 slot: plan the next step */}
      <div className="max-w-6xl mx-auto px-4">
        <NextStep panel={panel} />
      </div>

      {/* Banner and FAQ link, below the tabbed results (Finding 9: kept below the action items) */}
      <div className="max-w-6xl mx-auto px-4 pb-6">
        <div
          className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 md:p-8 rounded-3xl mb-10 bg-white"
          style={{ border: `1px solid ${C.line}` }}
        >
          <span
            className="hidden md:flex shrink-0 w-14 h-14 rounded-2xl items-center justify-center"
            style={{ backgroundColor: C.brandTint }}
            aria-hidden="true"
          >
            <FileText className="w-7 h-7" style={{ color: C.brand }} strokeWidth={1.75} />
          </span>
          <div className="flex-1">
            <p className="text-sm font-bold uppercase tracking-[0.14em]" style={{ color: C.brand }}>{COPY_B.bannerTitle}</p>
            <p className="mt-1 md:mt-2 text-lg font-semibold" style={{ color: C.ink }}>{COPY_B.bannerDesc}</p>
          </div>
          <button
            type="button"
            onClick={onOpenBanner}
            className="rounded-full px-6 py-3 text-lg font-semibold text-white cursor-pointer w-full md:w-auto md:min-w-[220px] transition-colors hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ backgroundColor: C.brand, outlineColor: C.brand }}
          >
            {COPY_B.bannerButton}
          </button>
        </div>

        <p className="flex flex-wrap items-center justify-center gap-x-2 text-center text-lg mb-10 md:mb-16" style={{ color: C.body }}>
          <Users className="w-5 h-5" style={{ color: C.muted }} aria-hidden="true" />
          {COPY_B.unsure}
          <button
            type="button"
            onClick={onOpenFaq}
            className="inline-block font-semibold underline underline-offset-4 cursor-pointer"
            style={{ color: C.brand }}
          >
            {COPY_B.faqLink}
          </button>
        </p>
      </div>
    </div>
  );
}
