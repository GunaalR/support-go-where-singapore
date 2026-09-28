import React, { useState } from 'react';
import { Variant, Scheme, DemoHousehold, FirstMovePlan } from '../types';
import { Sparkles, ArrowRight, CheckCircle2, FileText, Check, Calendar, ChevronDown, ChevronUp, Info, Eye } from 'lucide-react';

interface ResultsSectionProps {
  variant: Variant;
  household: DemoHousehold;
  schemes: Scheme[];
  plans: Record<string, FirstMovePlan>;
  onSelectScheme: (scheme: Scheme) => void;
  onOpenPlanModal: (scheme: Scheme) => void;
  onOpenCalculator: () => void;
}

export function ResultsSection({
  variant,
  household,
  schemes,
  plans,
  onSelectScheme,
  onOpenPlanModal,
  onOpenCalculator
}: ResultsSectionProps) {
  const [showAllInVariantB, setShowAllInVariantB] = useState(true);

  // In Variant B, filter 2 recommended first steps
  const recommendedSchemes = schemes.filter(s => s.isRecommendedInB);
  const otherSchemes = schemes.filter(s => !s.isRecommendedInB);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12" id="results-section">
      
      {/* 1. Results Summary Card (Identical in both A and B to maintain baseline visual fidelity) */}
      <div className="bg-gradient-to-br from-blue-50/70 via-indigo-50/50 to-white rounded-3xl border border-blue-200/80 p-6 sm:p-8 mb-10 shadow-xs text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-blue-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100/70 px-2.5 py-0.5 rounded-full">
                Assessment Results
              </span>
              <span className="text-xs text-gray-500">
                Household: {household.householdLabel}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Estimated Support for {household.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
              Based on your household size, dwelling type ({household.dwellingType}), and dependants, you qualify for <strong>{schemes.length} support schemes</strong>.
            </p>
          </div>

          {/* Big Total Box */}
          <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-xs flex flex-col justify-center min-w-56 shrink-0">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Total Estimated Support
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-700 tracking-tight my-1">
              ${household.estimatedTotal.toLocaleString()}
              <span className="text-xs font-normal text-gray-500 ml-1">/ year</span>
            </div>
            <button
              onClick={onOpenCalculator}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 underline text-left mt-1 cursor-pointer"
            >
              Recalculate household answers
            </button>
          </div>
        </div>

        {/* Breakdown bar */}
        <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-gray-600">
          <div>
            Automatic credits: <strong className="text-gray-900">$1,450</strong>
          </div>
          <span className="text-gray-300">·</span>
          <div>
            Requires application: <strong className="text-gray-900">$2,200</strong>
          </div>
          <span className="text-gray-300">·</span>
          <div>
            Active condition: <strong className="text-blue-700 font-semibold">{variant === 'A' ? 'Baseline (Variant A)' : 'Start Here (Variant B)'}</strong>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VARIANT A: BASELINE CONDITION                                            */}
      {/* - Plain scheme list                                                      */}
      {/* - NO "Start Here"                                                        */}
      {/* - NO recommendation tag                                                  */}
      {/* - NO action-status badge                                                 */}
      {/* - NO day picker or planning prompt                                       */}
      {/* ========================================================================= */}
      {variant === 'A' && (
        <div className="space-y-6 text-left">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Eligible Schemes ({schemes.length})
            </h2>
            <span className="text-xs text-gray-500">
              Standard Baseline List
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {schemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between shadow-xs hover:border-gray-300 transition-all text-left"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      {scheme.agencyAbbr}
                    </span>
                    <span className="text-xs font-bold text-gray-900">
                      ${scheme.estimatedValue}/yr
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mb-1 leading-snug">
                    {scheme.title}
                  </h3>
                  
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {scheme.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {scheme.tags.map((tag, idx) => (
                      <span key={idx} className="text-[11px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => onSelectScheme(scheme)}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 cursor-pointer"
                  >
                    View details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VARIANT B: DECISION ARCHITECTURE INTERVENTION                            */}
      {/* - "Start Here" section with 2-3 transparent recommendations             */}
      {/* - Explicit Action Status labels: "Automatic — nothing to do" vs           */}
      {/*   "You need to apply" (Text-based, not color alone)                      */}
      {/* - "See all schemes" keeps all options accessible                         */}
      {/* - "When will you take the next step?" voluntary planning modal           */}
      {/* ========================================================================= */}
      {variant === 'B' && (
        <div className="space-y-10 text-left">
          
          {/* SECTION 1: START HERE */}
          <div className="bg-emerald-50/50 rounded-3xl border-2 border-emerald-200/90 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-emerald-200/60">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full tracking-wide">
                    <Sparkles className="w-3.5 h-3.5" />
                    Start Here
                  </span>
                  <span className="text-xs font-semibold text-emerald-900">
                    Recommended First Moves
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1 max-w-xl">
                  To avoid overwhelm, these options are suggested first based on <strong>high financial value ($800–$950)</strong> and <strong>simple preparation (~5 mins)</strong>. You remain free to choose any scheme below.
                </p>
              </div>

              <div className="text-[11px] text-gray-500 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 self-start sm:self-auto">
                2 options highlighted
              </div>
            </div>

            {/* Recommended Schemes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {recommendedSchemes.map((scheme) => {
                const plan = plans[scheme.id];

                return (
                  <div
                    key={scheme.id}
                    className="bg-white rounded-2xl border-2 border-emerald-300/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all text-left"
                  >
                    <div>
                      {/* Top Badges: Transparent Reason + Action Status */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-md">
                          Recommended first option
                        </span>
                        
                        {/* Action status text (Text-based rule from prompt) */}
                        <span className="text-[11px] font-bold text-amber-900 bg-amber-100/90 border border-amber-200 px-2.5 py-0.5 rounded-md">
                          Action: You need to apply
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <h3 className="text-base font-bold text-gray-900 leading-snug">
                          {scheme.title}
                        </h3>
                        <span className="text-sm font-extrabold text-emerald-700 shrink-0">
                          ${scheme.estimatedValue}/yr
                        </span>
                      </div>

                      {/* Transparent reason for recommendation */}
                      <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100 mb-3 text-[11px] text-gray-600">
                        <span className="font-semibold text-gray-800">Why start here: </span>
                        {scheme.recommendationReason}
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed mb-4">
                        {scheme.summary}
                      </p>

                      {/* Plan status indicator if user already planned */}
                      {plan?.timeframe && (
                        <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 mb-4 flex items-center justify-between text-xs text-emerald-800">
                          <div className="flex items-center gap-1.5 font-semibold">
                            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                            Next step: {plan.timeframe}
                          </div>
                          {plan.sharedWithSomeone && (
                            <span className="text-[10px] text-emerald-600 font-medium">
                              (Reminder note copied)
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-2">
                      <button
                        onClick={() => onOpenPlanModal(scheme)}
                        className="w-full sm:flex-1 py-2 px-3 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl inline-flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        {plan?.timeframe ? 'Change Plan' : 'Plan First Move'}
                      </button>

                      <button
                        onClick={() => onSelectScheme(scheme)}
                        className="w-full sm:w-auto py-2 px-3 text-xs font-semibold text-gray-700 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors cursor-pointer"
                      >
                        View checklist
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: ALL OTHER ELIGIBLE SCHEMES */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                  All Eligible Schemes ({schemes.length})
                </h3>
                <p className="text-xs text-gray-500">
                  Every eligible scheme remains fully available. No options are hidden.
                </p>
              </div>

              <button
                onClick={() => setShowAllInVariantB(!showAllInVariantB)}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 cursor-pointer bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200"
              >
                {showAllInVariantB ? (
                  <>Hide list <ChevronUp className="w-3.5 h-3.5" /></>
                ) : (
                  <>See all schemes ({schemes.length}) <ChevronDown className="w-3.5 h-3.5" /></>
                )}
              </button>
            </div>

            {showAllInVariantB && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {schemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between shadow-xs hover:border-gray-300 transition-all text-left"
                  >
                    <div>
                      {/* Action Status explicit text label */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                          {scheme.agencyAbbr}
                        </span>

                        {scheme.actionStatus === 'automatic' ? (
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-600" />
                            Automatic — nothing to do
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-amber-900 bg-amber-100/90 border border-amber-200 px-2.5 py-0.5 rounded-md">
                            Action: You need to apply
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <h4 className="text-base font-bold text-gray-900 leading-snug">
                          {scheme.title}
                        </h4>
                        <span className="text-xs font-bold text-gray-900 shrink-0">
                          ${scheme.estimatedValue}/yr
                        </span>
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed mb-4">
                        {scheme.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <button
                        onClick={() => onSelectScheme(scheme)}
                        className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 cursor-pointer"
                      >
                        View details & checklist
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {scheme.actionStatus === 'apply' && (
                        <button
                          onClick={() => onOpenPlanModal(scheme)}
                          className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 cursor-pointer"
                        >
                          Plan move
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

    </section>
  );
}
