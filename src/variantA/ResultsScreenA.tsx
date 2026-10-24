import { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Home, User } from 'lucide-react';
import { BenefitBoxA, COPY_A, PayoutRowA, RESULTS_A, YearPanelA } from './resultsDataA';

// Variant A: the live results screen as it is, for persona P1.
// Owned by M2. Layout follows the live page, element by element:
// page title, sticky year tabs, total box, your own and household boxes
// (open by default), other members' boxes, notes, banner, FAQ link.

interface ResultsScreenAProps {
  onBack?: () => void;
  // the live page opens each scheme page in a new tab; here the shell decides
  onOpenScheme?: (schemeCode: string) => void;
  onOpenBanner?: () => void;
  onOpenFaq?: () => void;
}

const GREEN_LIGHTER = '#EBF1EE';
const BORDER_GREY = '#CACACA';
const TEXT_DARK = '#4E4E4E';
const LINK_BLUE = '#125EEC';
const BANNER_BLUE = '#1C76D5';

function money(n: number) {
  return `$${n.toLocaleString('en-SG', { maximumFractionDigits: 2 })}`;
}

function rowAmount(row: PayoutRowA) {
  if (row.unit === 'months') return COPY_A.months(row.amount);
  return row.isMax ? COPY_A.upTo(money(row.amount)) : money(row.amount);
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
  if (months === 0) return isMax ? COPY_A.upTo(amount) : amount;
  const withMonths = `${amount} and ${COPY_A.rebateMonthsLong(months)}`;
  return isMax ? COPY_A.upTo(withMonths) : withMonths;
}

function BoxHeaderTotal({ box }: { box: BenefitBoxA }) {
  const cash = boxCash(box);
  const months = boxMonths(box);
  if (cash === 0 && months === 0) {
    return <p className="text-sm" style={{ color: TEXT_DARK }}>{COPY_A.notEligible}</p>;
  }
  const isMax = box.rows.some(r => r.isMax);
  return (
    <div className="font-semibold text-base text-[#222222]">
      {cash > 0 && <p>{isMax ? COPY_A.upTo(money(cash)) : money(cash)}</p>}
      {months > 0 && <p>{COPY_A.rebateMonthsShort(months)}</p>}
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
          <span className="shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#166938]" aria-hidden="true" />
          </span>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full gap-2">
            <div>
              <p className="font-semibold text-base text-[#222222]">{box.title}</p>
              <p className="text-sm mt-0.5 max-w-[690px]" style={{ color: TEXT_DARK }}>{box.profile}</p>
            </div>
            <div className="md:text-right">
              <BoxHeaderTotal box={box} />
            </div>
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 shrink-0 text-gray-500" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-5 h-5 shrink-0 text-gray-500" aria-hidden="true" />
        )}
      </button>

      {open && (
        <div className="pb-2">
          {box.rows.length === 0 ? (
            <div className="px-4 py-6">
              <p className="font-semibold text-[#222222]">{COPY_A.memberNoResultTitle(year)}</p>
              <p className="mt-2" style={{ color: TEXT_DARK }}>{COPY_A.memberNoResultDesc}</p>
            </div>
          ) : (
            box.rows.map((row, i) => (
              <div key={`${row.schemeCode}-${i}`} className="flex flex-col gap-2 mt-2 md:mt-4 mb-5">
                <div className="flex flex-col pt-2 pl-4 pr-2 pb-2">
                  <button
                    type="button"
                    onClick={() => onOpenScheme?.(row.schemeCode)}
                    className="text-left font-semibold underline-offset-2 hover:underline cursor-pointer w-fit"
                    style={{ color: LINK_BLUE }}
                  >
                    {row.schemeName}
                  </button>
                  <p className="text-[#222222]">{row.payoutLine}</p>
                </div>
                <p className="pl-4 font-semibold text-[#222222]">{rowAmount(row)}</p>
              </div>
            ))
          )}

          {box.notes.length > 0 && (
            <div className="ml-2 mr-4 mb-2">
              <p className="italic text-sm ml-3" style={{ color: TEXT_DARK }}>{COPY_A.toNote}</p>
              <ul className="list-disc mt-0 ml-8">
                {box.notes.map(note => (
                  <li key={note} className="italic text-sm" style={{ color: TEXT_DARK }}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ResultsScreenA({ onBack, onOpenScheme, onOpenBanner, onOpenFaq }: ResultsScreenAProps) {
  const thisYear = String(new Date().getFullYear());
  const defaultIndex = Math.max(0, RESULTS_A.findIndex(p => p.year === thisYear));
  const [tab, setTab] = useState(defaultIndex);
  const panel = RESULTS_A[tab];

  return (
    <div className="bg-white text-[#222222]" data-variant="A">
      {/* Page title */}
      <div className="bg-[#F7F7F7] border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1 text-sm font-semibold cursor-pointer mb-4"
            style={{ color: LINK_BLUE }}
            aria-label="Go back to calculator landing page"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            {COPY_A.back}
          </button>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight">{COPY_A.pageTitle}</h1>
          <p className="mt-3 text-base max-w-3xl" style={{ color: TEXT_DARK }}>{COPY_A.pageSubtitle}</p>
        </div>
      </div>

      {/* Year tabs, sticky like the live page */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 flex gap-6" role="tablist">
          {RESULTS_A.map((p, i) => (
            <button
              key={p.year}
              type="button"
              role="tab"
              aria-selected={i === tab}
              onClick={() => setTab(i)}
              className="py-3 text-base font-semibold cursor-pointer border-b-4"
              style={{
                borderColor: i === tab ? LINK_BLUE : 'transparent',
                color: i === tab ? LINK_BLUE : TEXT_DARK,
              }}
            >
              {p.year}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-2 md:mt-4 mb-6 md:mb-8" role="tabpanel">
        {/* Total box */}
        <div
          className="relative flex flex-col p-6 md:p-8 mb-10 overflow-hidden rounded-2xl shadow-sm mt-4"
          style={{ backgroundColor: GREEN_LIGHTER }}
        >
          <span
            className="absolute rounded-full bg-[#FEF6F1] w-[1200px] h-[1200px] -right-[800px] -top-[50px] md:-right-[490px] md:-top-[40px]"
            aria-hidden="true"
          />
          <p className="relative text-lg md:text-2xl font-semibold" style={{ color: TEXT_DARK }}>{COPY_A.totalTitle}</p>
          <p
            className="relative text-2xl md:text-3xl font-bold mt-1"
            style={{ color: TEXT_DARK }}
            id={`${panel.year}-aggregate`}
          >
            {totalLabel(panel)}
          </p>
        </div>

        <h2 className="text-xl md:text-2xl font-bold mb-6">{COPY_A.ownSectionTitle}</h2>
        {panel.ownBoxes.map(box => (
          <BenefitBox key={`${panel.year}-${box.id}`} box={box} year={panel.year} onOpenScheme={onOpenScheme} />
        ))}

        {panel.memberBoxes.length > 0 && (
          <>
            <hr className="border-t mb-10 mt-4" style={{ borderColor: BORDER_GREY }} />
            <div className="flex flex-col mb-6">
              <h2 className="text-xl md:text-2xl font-bold">{COPY_A.membersSectionTitle}</h2>
              <p className="text-sm py-2" style={{ color: TEXT_DARK }}>{COPY_A.membersSectionNote}</p>
            </div>
            {panel.memberBoxes.map(box => (
              <BenefitBox key={`${panel.year}-${box.id}`} box={box} year={panel.year} onOpenScheme={onOpenScheme} />
            ))}
          </>
        )}
      </div>

      {/* Banner and FAQ link, below the tabbed results */}
      <div className="max-w-5xl mx-auto px-4">
        <div
          className="flex flex-col md:flex-row md:items-center gap-4 p-6 rounded-xl mb-10"
          style={{ background: 'linear-gradient(to left, #F3F7E8, #EEF6FA)' }}
        >
          <div className="flex-1">
            <p className="text-sm font-bold uppercase tracking-wide" style={{ color: BANNER_BLUE }}>{COPY_A.bannerTitle}</p>
            <p className="mt-1 md:mt-2" style={{ color: TEXT_DARK }}>{COPY_A.bannerDesc}</p>
          </div>
          <button
            type="button"
            onClick={onOpenBanner}
            className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold text-white cursor-pointer w-full md:w-[284px]"
            style={{ backgroundColor: BANNER_BLUE }}
          >
            {COPY_A.bannerButton}
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <p className="text-center mb-10 md:mb-16">
          {COPY_A.unsure}
          <button
            type="button"
            onClick={onOpenFaq}
            className="inline-block font-semibold underline cursor-pointer"
            style={{ color: LINK_BLUE }}
          >
            {COPY_A.faqLink}
          </button>
        </p>
      </div>
    </div>
  );
}
