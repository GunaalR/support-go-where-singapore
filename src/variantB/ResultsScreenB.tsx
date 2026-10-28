import { useState } from 'react';
import { Calculator, ChevronDown, ChevronLeft, ChevronUp, FileText, Home, Search, User } from 'lucide-react';
import { BenefitBoxA, PayoutRowA, RESULTS_A, YearPanelA } from '../variantA/resultsDataA';
import { COPY_B, schemeColour, schemeTint } from './slots/styleB';
import { StartHere } from './slots/StartHere';
import { SchemeLabel } from './slots/SchemeLabel';
import { NextStep } from './slots/NextStep';
import { SchemeCategory } from './slots/SchemeCategory';

// Variant B: the same results screen as variant A, with our nudges.
// Starts as an exact copy of src/variantA/ResultsScreenA.tsx (same data, same
// layout) so the only differences between A and B are the nudges.
// The nudges live in their own files in ./slots/, one owner each, so pushes
// don't clash:
//   slots/StartHere.tsx    M3  "Start here" block, above your own boxes
//   slots/SchemeLabel.tsx  M3  "Automatic" / "Claim it yourself" under each scheme
//   slots/NextStep.tsx     M4  plan the next step, after the results
//   slots/styleB.ts        M5  plain wording (COPY_B) and colour per category
//   slots/SchemeCategory.tsx M5 icon, category word and plain line under each scheme
// This file is owned by M1. If your nudge needs a new slot or a change here,
// ask M1 rather than editing it.

interface ResultsScreenBProps {
  onBack?: () => void;
  // the live page opens each scheme page in a new tab; here the shell decides
  onOpenScheme?: (schemeCode: string) => void;
  onOpenBanner?: () => void;
  onOpenFaq?: () => void;
}

const GREEN_LIGHTER = '#EBF1EE';
const ORANGE_LIGHT = '#FEF6F1';
const ORANGE_REGULAR = '#F2A474';
const ORANGE_DARK = '#A96237';
const BORDER_GREY = '#CACACA';
const TEXT_DARK = '#4E4E4E';
const LINK_BLUE = '#125EEC';
const BANNER_BLUE = '#1C76D5';

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

function totalLabel(panel: YearPanelA) {
  const boxes = [...panel.ownBoxes, ...panel.memberBoxes];
  const cash = boxes.reduce((sum, b) => sum + boxCash(b), 0);
  const months = boxes.reduce((sum, b) => sum + boxMonths(b), 0);
  const isMax = boxes.some(b => b.rows.some(r => r.isMax));
  const amount = money(cash);
  if (months === 0) return isMax ? COPY_B.upTo(amount) : amount;
  const withMonths = `${amount} and ${COPY_B.rebateMonthsLong(months)}`;
  return isMax ? COPY_B.upTo(withMonths) : withMonths;
}

function BoxHeaderTotal({ box }: { box: BenefitBoxA }) {
  const cash = boxCash(box);
  const months = boxMonths(box);
  if (cash === 0 && months === 0) {
    return <p className="font-semibold text-lg" style={{ color: TEXT_DARK }}>{COPY_B.notEligible}</p>;
  }
  const isMax = box.rows.some(r => r.isMax);
  return (
    <div className="font-bold text-lg md:text-xl" style={{ color: TEXT_DARK }}>
      {cash > 0 && <p>{isMax ? COPY_B.upTo(money(cash)) : money(cash)}</p>}
      {months > 0 && <p>{COPY_B.rebateMonthsShort(months)}</p>}
    </div>
  );
}

function NoResult({ year }: { year: string }) {
  return (
    <div className="flex flex-col items-center text-center px-4 py-8">
      <div
        className="relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: ORANGE_LIGHT }}
        aria-hidden="true"
      >
        <Calculator className="w-12 h-12 md:w-16 md:h-16 text-[#2C2C2C]" />
        <Search className="absolute -left-2 top-2 w-10 h-10 md:w-12 md:h-12 text-[#4E6B7A]" />
      </div>
      <p className="font-bold text-lg md:text-xl" style={{ color: TEXT_DARK }}>{COPY_B.memberNoResultTitle(year)}</p>
      <p className="mt-2" style={{ color: TEXT_DARK }}>{COPY_B.memberNoResultDesc}</p>
    </div>
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
      className="mb-6"
      style={{ border: `1px solid ${BORDER_GREY}`, borderRadius: open ? '8px 8px 0 0' : 8 }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 p-4 text-left cursor-pointer"
        style={{ backgroundColor: GREEN_LIGHTER, borderRadius: open ? '8px 8px 0 0' : 8 }}
      >
        <div className="flex items-start gap-4 w-full">
          <Icon className="w-7 h-7 shrink-0 mt-1" style={{ color: ORANGE_DARK }} strokeWidth={1.5} aria-hidden="true" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2">
            <div>
              <p className="font-semibold text-lg md:text-xl" style={{ color: TEXT_DARK }}>{box.title}</p>
              <p className="mt-0.5 max-w-[690px]" style={{ color: TEXT_DARK }}>{box.profile}</p>
            </div>
            <div className="md:text-right">
              <BoxHeaderTotal box={box} />
            </div>
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-6 h-6 shrink-0 text-gray-500" strokeWidth={1.5} aria-hidden="true" />
        ) : (
          <ChevronDown className="w-6 h-6 shrink-0 text-gray-500" strokeWidth={1.5} aria-hidden="true" />
        )}
      </button>

      {open && (
        <div className="pb-2">
          {box.rows.length === 0 ? (
            <NoResult year={year} />
          ) : (
            box.rows.map((row, i) => (
              <div
                key={`${row.schemeCode}-${i}`}
                className="flex flex-col gap-2 mt-2 md:mt-4 mb-5"
                // M5 slot: colour per category, a bar on the left and a pale tint behind the row
                style={
                  schemeColour(row)
                    ? {
                        borderLeft: `6px solid ${schemeColour(row)}`,
                        backgroundColor: schemeTint(row),
                        padding: '12px 16px',
                        borderRadius: '0 8px 8px 0',
                      }
                    : undefined
                }
              >
                <div className="flex flex-col pt-2 pl-4 md:pl-6 pr-2 pb-2">
                  <button
                    type="button"
                    onClick={() => onOpenScheme?.(row.schemeCode)}
                    className="text-left text-lg font-medium underline underline-offset-2 cursor-pointer w-fit"
                    style={{ color: LINK_BLUE }}
                  >
                    {row.schemeName}
                  </button>
                  {/* M5 slot: category icon and plain-language line */}
                  <SchemeCategory row={row} />
                  {/* M3 slot: Automatic / Claim it yourself */}
                  <SchemeLabel row={row} />
                  <p className="text-lg" style={{ color: TEXT_DARK }}>{row.payoutLine}</p>
                </div>
                <p className="pl-4 md:pl-6 text-lg font-bold" style={{ color: TEXT_DARK }}>{rowAmount(row)}</p>
              </div>
            ))
          )}

          {box.notes.length > 0 && (
            <div className="ml-2 md:ml-4 mr-4 mb-4">
              <p className="italic ml-3" style={{ color: TEXT_DARK }}>{COPY_B.toNote}</p>
              <ul className="list-disc mt-0 ml-8">
                {box.notes.map(note => (
                  <li key={note} className="italic" style={{ color: TEXT_DARK }}>{note}</li>
                ))}
              </ul>
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

  return (
    <div className="bg-white" style={{ color: TEXT_DARK }} data-variant="B">
      {/* Page title */}
      <div style={{ background: 'linear-gradient(to bottom, #FAFAFA, #ECF0EF)' }}>
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-12 md:pt-8 md:pb-20">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-lg font-semibold cursor-pointer mb-8 md:mb-12"
            style={{ color: LINK_BLUE }}
            aria-label="Go back to calculator landing page"
          >
            <ChevronLeft className="w-5 h-5 text-gray-500" strokeWidth={1.5} aria-hidden="true" />
            {COPY_B.back}
          </button>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight">{COPY_B.pageTitle}</h1>
          <p className="mt-4 text-lg md:text-2xl max-w-5xl">{COPY_B.pageSubtitle}</p>
        </div>
      </div>

      {/* Year tabs, sticky like the live page */}
      <div className="sticky top-0 z-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 pt-6 md:pt-10">
          <div className="flex" role="tablist" style={{ borderBottom: `1px solid ${ORANGE_REGULAR}` }}>
            {RESULTS_A.map((p, i) => (
              <button
                key={p.year}
                type="button"
                role="tab"
                aria-selected={i === tab}
                onClick={() => setTab(i)}
                className="flex-1 py-3 text-lg md:text-xl cursor-pointer"
                style={{
                  backgroundColor: i === tab ? ORANGE_LIGHT : 'transparent',
                  borderBottom: i === tab ? `4px solid ${ORANGE_REGULAR}` : '4px solid transparent',
                  fontWeight: i === tab ? 700 : 400,
                  color: '#222222',
                }}
              >
                {p.year}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6 md:mt-8 mb-6 md:mb-8" role="tabpanel">
        {/* Total box */}
        <div
          className="relative flex flex-col p-6 md:p-8 mb-10 overflow-hidden rounded-2xl shadow-sm"
          style={{ backgroundColor: GREEN_LIGHTER }}
        >
          <span
            className="absolute rounded-full w-[1200px] h-[1200px] -right-[800px] -top-[50px] md:-right-[490px] md:-top-[40px]"
            style={{ backgroundColor: ORANGE_LIGHT }}
            aria-hidden="true"
          />
          <p className="relative text-xl md:text-3xl font-bold">{COPY_B.totalTitle}</p>
          <p className="relative text-xl md:text-3xl mt-1" id={`${panel.year}-aggregate`}>
            {totalLabel(panel)}
          </p>
        </div>

        {/* M3 slot: Start here */}
        <StartHere panel={panel} />

        <h2 className="text-xl md:text-3xl mb-6">{COPY_B.ownSectionTitle}</h2>
        {panel.ownBoxes.map(box => (
          <BenefitBox key={`${panel.year}-${box.id}`} box={box} year={panel.year} onOpenScheme={onOpenScheme} />
        ))}

        {panel.memberBoxes.length > 0 && (
          <>
            <hr className="border-t mb-10 mt-4" style={{ borderColor: BORDER_GREY }} />
            <div className="flex flex-col mb-6">
              <h2 className="text-xl md:text-3xl">{COPY_B.membersSectionTitle}</h2>
              <p className="py-2">{COPY_B.membersSectionNote}</p>
            </div>
            {panel.memberBoxes.map(box => (
              <BenefitBox key={`${panel.year}-${box.id}`} box={box} year={panel.year} onOpenScheme={onOpenScheme} />
            ))}
          </>
        )}
      </div>

      {/* M4 slot: plan the next step */}
      <div className="max-w-6xl mx-auto px-4">
        <NextStep panel={panel} />
      </div>

      {/* Banner and FAQ link, below the tabbed results */}
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 md:p-8 rounded-xl shadow-sm mb-10"
          style={{ background: 'linear-gradient(to left, #F3F7E8, #EEF6FA)' }}
        >
          <FileText className="w-12 h-12 shrink-0 hidden md:block" style={{ color: BANNER_BLUE }} strokeWidth={1.25} aria-hidden="true" />
          <div className="flex-1">
            <p className="text-sm md:text-base font-semibold uppercase tracking-widest" style={{ color: BANNER_BLUE }}>{COPY_B.bannerTitle}</p>
            <p className="mt-1 md:mt-2 text-lg font-semibold">{COPY_B.bannerDesc}</p>
          </div>
          <button
            type="button"
            onClick={onOpenBanner}
            className="rounded-lg px-5 py-3 text-lg font-semibold text-white cursor-pointer w-full md:w-[284px]"
            style={{ backgroundColor: BANNER_BLUE }}
          >
            {COPY_B.bannerButton}
          </button>
        </div>

        <p className="text-center text-lg mb-10 md:mb-16">
          {COPY_B.unsure}
          <button
            type="button"
            onClick={onOpenFaq}
            className="inline-block font-semibold underline cursor-pointer"
            style={{ color: LINK_BLUE }}
          >
            {COPY_B.faqLink}
          </button>
        </p>
      </div>
    </div>
  );
}
