import React, { useState } from 'react';
import { Scheme, DemoHousehold, FirstMovePlan } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  SlidersHorizontal, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  AlertCircle,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

interface ResultsSectionProps {
  household: DemoHousehold;
  schemes: Scheme[];
  plans: Record<string, FirstMovePlan>;
  onSelectScheme: (scheme: Scheme) => void;
  onOpenPlanModal: (scheme: Scheme) => void;
  onOpenCalculator: () => void;
}

export function ResultsSection({
  household,
  schemes,
  plans,
  onSelectScheme,
  onOpenPlanModal,
  onOpenCalculator
}: ResultsSectionProps) {
  const [showAllSchemes, setShowAllSchemes] = useState(true);

  // Recommended schemes for "Start Here" (2-3 items)
  const recommendedSchemes = schemes.filter(s => s.isRecommendedInB);
  const otherSchemes = schemes.filter(s => !s.isRecommendedInB);

  // Calculations for breakdown
  const automaticTotal = schemes
    .filter(s => s.actionStatus === 'automatic')
    .reduce((acc, curr) => acc + curr.estimatedValue, 0);

  const applyTotal = schemes
    .filter(s => s.actionStatus === 'apply')
    .reduce((acc, curr) => acc + curr.estimatedValue, 0);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12" id="results-section">
      
      {/* ========================================================================= */}
      {/* 1. HERO RESULTS SUMMARY CARD                                             */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-8 mb-10 text-left">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-7 border-b border-gray-100">
          
          {/* Main Titles */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Assessment Completed</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
              Support you may be eligible for
            </h1>

            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Based on the information you provided, you may qualify for <strong>{schemes.length} support schemes</strong> to help with household living costs.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={onOpenCalculator}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline inline-flex items-center gap-1 cursor-pointer"
              >
                <SlidersHorizontal className="w-3 h-3" />
                Review or recalculate household answers
              </button>
            </div>
          </div>

          {/* Prominent Estimated Amount Box */}
          <div className="bg-[#F8FAFC] border border-gray-200/80 rounded-2xl p-5 sm:p-6 min-w-64 text-left shadow-2xs">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
              Estimated total support
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight my-1">
              ${household.estimatedTotal.toLocaleString()}
              <span className="text-xs font-normal text-gray-500 ml-1">/ year</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1 leading-snug">
              Estimated annual support across active schemes. Actual eligibility will be verified upon application or automated processing.
            </p>
          </div>
        </div>

        {/* Clean Support Breakdown: Automatic vs Requires Application */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Automatic Support Box */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 text-left">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500">
                Automatic support
              </div>
              <div className="text-lg font-bold text-gray-900 leading-tight">
                ${automaticTotal.toLocaleString()} <span className="text-xs font-normal text-gray-500">/ year</span>
              </div>
              <p className="text-[11px] text-gray-600 mt-0.5">
                Credited directly to bills or designated accounts without requiring forms.
              </p>
            </div>
          </div>

          {/* Support Requiring Application */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-left">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
              <FileCheck className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500">
                Support requiring application
              </div>
              <div className="text-lg font-bold text-gray-900 leading-tight">
                ${applyTotal.toLocaleString()} <span className="text-xs font-normal text-gray-500">/ year</span>
              </div>
              <p className="text-[11px] text-gray-600 mt-0.5">
                Requires submitting simple household details and documentation.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CORE NUDGE: "START HERE" SECTION                                      */}
      {/* ========================================================================= */}
      <div className="mb-12 text-left" id="start-here">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Start here
            </h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            These are a few useful places to begin based on your results.
          </p>
        </div>

        {/* Recommended Cards Grid (2-3 items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedSchemes.map((scheme) => {
            const plan = plans[scheme.id];

            return (
              <div
                key={scheme.id}
                className="bg-white rounded-2xl border-2 border-blue-200/90 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all text-left relative"
              >
                <div>
                  {/* Category Icon + Action Status Tag */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <CategoryIcon topicId={scheme.topicId} className="w-10 h-10" />

                    {/* Scannable, text-based Action Status */}
                    {scheme.actionStatus === 'automatic' ? (
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                          Automatic — nothing to do
                        </span>
                        <span className="block text-[10px] text-gray-500 mt-0.5">
                          Credited automatically
                        </span>
                      </div>
                    ) : (
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
                          <AlertCircle className="w-3 h-3 text-amber-700" />
                          You need to apply
                        </span>
                        <span className="block text-[10px] text-gray-500 mt-0.5">
                          Online form submission
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title & Estimated Value */}
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-gray-900 leading-snug">
                      {scheme.title}
                    </h3>
                    <div className="text-sm font-extrabold text-blue-700 mt-1">
                      ${scheme.estimatedValue.toLocaleString()} / year
                    </div>
                  </div>

                  {/* Plain-language explanation */}
                  <p className="text-xs text-gray-600 leading-relaxed mb-5">
                    {scheme.summary}
                  </p>

                  {/* Active Intention / Next Step indicator if already planned */}
                  {plan?.timeframe && (
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 mb-4 flex items-center justify-between text-xs text-emerald-900">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                        Next step scheduled: {plan.timeframe}
                      </div>
                      <span className="text-[10px] text-emerald-700 font-medium">
                        Intention set
                      </span>
                    </div>
                  )}
                </div>

                {/* Card CTAs */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-2.5">
                  {scheme.actionStatus === 'apply' ? (
                    <>
                      <button
                        onClick={() => onOpenPlanModal(scheme)}
                        className="w-full sm:flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl inline-flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-98"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        {plan?.timeframe ? 'Update plan' : "Plan next step"}
                      </button>

                      <button
                        onClick={() => onSelectScheme(scheme)}
                        className="w-full sm:w-auto py-2.5 px-4 text-xs font-semibold text-gray-700 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors cursor-pointer"
                      >
                        See what you'll need
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => onSelectScheme(scheme)}
                      className="w-full py-2.5 px-4 text-xs font-semibold text-gray-700 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors cursor-pointer text-center"
                    >
                      View details
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. "SEE ALL ELIGIBLE SUPPORT" (Preserving Complete Choice Freedom)        */}
      {/* ========================================================================= */}
      <div className="text-left pt-6 border-t border-gray-200" id="all-schemes">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              See all eligible support ({schemes.length})
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Browse every support programme your household qualifies for.
            </p>
          </div>

          <button
            onClick={() => setShowAllSchemes(!showAllSchemes)}
            className="self-start sm:self-auto text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1.5 cursor-pointer bg-blue-50/70 hover:bg-blue-100/60 px-3.5 py-1.5 rounded-xl border border-blue-200 transition-colors"
          >
            {showAllSchemes ? (
              <>
                <span>Hide scheme list</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>Show all schemes ({schemes.length})</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* All Schemes Grid */}
        {showAllSchemes && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {schemes.map((scheme) => {
              const plan = plans[scheme.id];

              return (
                <div
                  key={scheme.id}
                  className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:border-gray-300 hover:shadow-xs transition-all text-left"
                >
                  <div>
                    {/* Header Row: Category Icon + Action Status */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <CategoryIcon topicId={scheme.topicId} className="w-9 h-9" />

                      {scheme.actionStatus === 'automatic' ? (
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                            Automatic — nothing to do
                          </span>
                          <span className="block text-[10px] text-gray-500 mt-0.5">
                            Your support will be credited automatically.
                          </span>
                        </div>
                      ) : (
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                            <AlertCircle className="w-3 h-3 text-amber-700" />
                            You need to apply
                          </span>
                          <span className="block text-[10px] text-gray-500 mt-0.5">
                            Complete an application to receive this support.
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Title & Estimated Value */}
                    <div className="mb-2">
                      <h4 className="text-base font-bold text-gray-900 leading-snug">
                        {scheme.title}
                      </h4>
                      <div className="text-xs font-bold text-gray-900 mt-0.5">
                        ${scheme.estimatedValue.toLocaleString()} / year
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                      {scheme.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {scheme.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => onSelectScheme(scheme)}
                      className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 cursor-pointer"
                    >
                      {scheme.actionStatus === 'apply' ? "See what you'll need" : "View details"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {scheme.actionStatus === 'apply' && (
                      <button
                        onClick={() => onOpenPlanModal(scheme)}
                        className="text-xs font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200 cursor-pointer"
                      >
                        {plan?.timeframe ? `Planned: ${plan.timeframe}` : "Plan when to apply"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </section>
  );
}
