import React, { useState } from 'react';
import { Scheme, DemoHousehold, FirstMovePlan } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { 
  Check, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  SlidersHorizontal,
  ChevronLeft,
  Info
} from 'lucide-react';

interface ResultsPageProps {
  household: DemoHousehold;
  schemes: Scheme[];
  plans: Record<string, FirstMovePlan>;
  onSelectScheme: (scheme: Scheme) => void;
  onOpenPlanModal: (scheme: Scheme) => void;
  onOpenCalculator: () => void;
  onBackToHome: () => void;
}

export function ResultsPage({
  household,
  schemes,
  plans,
  onSelectScheme,
  onOpenPlanModal,
  onOpenCalculator,
  onBackToHome
}: ResultsPageProps) {
  const [showAllSchemes, setShowAllSchemes] = useState(false);

  // Primary recommendation: Family Grocery Support Grant (FGSG)
  const primaryScheme = schemes.find(s => s.id === 'family-grocery-grant') || schemes[0];

  // Secondary options in compact format:
  // Community Utilities Credit and Neighbourhood Caregiver Respite Allowance
  const utilitiesScheme = schemes.find(s => s.id === 'community-utilities-credit');
  const caregiverScheme = schemes.find(s => s.id === 'caregiver-respite-allowance');
  const secondarySchemes = [utilitiesScheme, caregiverScheme].filter((s): s is Scheme => Boolean(s));

  // Calculated totals
  const automaticTotal = schemes
    .filter(s => s.actionStatus === 'automatic')
    .reduce((acc, curr) => acc + curr.estimatedValue, 0);

  const applyTotal = schemes
    .filter(s => s.actionStatus === 'apply')
    .reduce((acc, curr) => acc + curr.estimatedValue, 0);

  const primaryPlan = plans[primaryScheme.id];

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-gray-900 pb-20 text-left">
      
      {/* Breadcrumb / Back Navigation Bar */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs">
          <button
            onClick={onBackToHome}
            className="text-gray-600 hover:text-blue-700 flex items-center gap-1.5 font-medium cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Support Directory</span>
          </button>

          <span className="text-gray-400 hidden sm:inline">
            Assessment Results · {household.dwellingType}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        
        {/* ========================================================================= */}
        {/* 10. COMPACT RESULTS SUMMARY                                               */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-200/80 shadow-xs mb-10">
          
          {/* Subtle Status Kicker */}
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
            <span>Assessment complete</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left: Heading & Narrative */}
            <div className="md:col-span-7">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-snug">
                Support you may be eligible for
              </h1>

              <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed">
                Based on the information you provided, you may qualify for several forms of support to help with household living costs.
              </p>

              <div className="mt-4">
                <button
                  onClick={onOpenCalculator}
                  className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Review your information</span>
                </button>
              </div>
            </div>

            {/* Right: Restrained Breakdown Card */}
            <div className="md:col-span-5 bg-blue-50/50 rounded-2xl p-5 border border-blue-100">
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Estimated annual support
              </div>
              <div className="text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
                ${household.estimatedTotal.toLocaleString()}
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-normal">
                Estimated based on your current information.
              </p>

              <div className="mt-4 pt-3 border-t border-blue-200/70 grid grid-cols-2 gap-3">
                <div>
                  <div className="text-base font-bold text-gray-900">
                    ${automaticTotal.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-gray-500 leading-tight">
                    Automatic support
                  </div>
                </div>

                <div>
                  <div className="text-base font-bold text-gray-900">
                    ${applyTotal.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-gray-500 leading-tight">
                    Support requiring an application
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 11 & 12. THE MAIN BEHAVIOURAL NUDGE: "START HERE"                         */}
        {/* ========================================================================= */}
        <div className="mb-12" id="start-here">
          
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Start here
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Based on your results, these are a few useful places to begin.
            </p>
          </div>

          {/* PRIMARY START-HERE RECOMMENDATION */}
          <div className="bg-white rounded-3xl border-2 border-blue-600/90 shadow-sm p-6 sm:p-8 mb-6 relative">
            
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <CategoryIcon topicId={primaryScheme.topicId} className="w-12 h-12 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider mb-1">
                    Start Here
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    {primaryScheme.title}
                  </h3>
                  <div className="text-base font-bold text-gray-900 mt-1">
                    ${primaryScheme.estimatedValue.toLocaleString()} / year
                  </div>
                </div>
              </div>

              {/* Action Status Tag */}
              <div className="sm:text-right shrink-0">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-900 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg">
                  <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
                  <span>You need to apply</span>
                </div>
              </div>
            </div>

            <div className="py-4">
              <p className="text-sm text-gray-800 leading-relaxed font-normal mb-1.5">
                Support for everyday grocery and household expenses.
              </p>
              
              <p className="text-xs text-gray-500 leading-relaxed">
                This is one of the simpler application-based options in your results.
              </p>

              {/* Active Plan Indicator if scheduled */}
              {primaryPlan?.timeframe && (
                <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
                  <div className="flex items-center gap-2 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Next step scheduled: {primaryPlan.timeframe}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700">
                    Plan saved
                  </span>
                </div>
              )}
            </div>

            {/* Recommendation Actions */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onSelectScheme(primaryScheme)}
                className="w-full sm:w-auto py-2.5 px-5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>See what you'll need</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onOpenPlanModal(primaryScheme)}
                className="w-full sm:w-auto py-2.5 px-4 text-xs font-semibold text-gray-700 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                <span>{primaryPlan?.timeframe ? 'Update your next step' : 'Plan your next step'}</span>
              </button>
            </div>

          </div>

          {/* 13. OTHER PLACES YOU COULD START (Visually Compact / Secondary) */}
          <div className="pt-2">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Other places you could start
            </div>

            <div className="space-y-3">
              {secondarySchemes.map((scheme) => {
                const plan = plans[scheme.id];

                return (
                  <div
                    key={scheme.id}
                    className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-gray-300 transition-colors shadow-2xs"
                  >
                    <div className="flex items-center gap-3.5">
                      <CategoryIcon topicId={scheme.topicId} className="w-8 h-8 shrink-0" />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-gray-900">
                            {scheme.title}
                          </h4>
                          <span className="text-xs font-semibold text-gray-700">
                            ${scheme.estimatedValue.toLocaleString()} / year
                          </span>
                        </div>
                        
                        <div className="mt-1 flex items-center gap-3 text-xs">
                          {scheme.actionStatus === 'automatic' ? (
                            <span className="text-emerald-800 font-medium inline-flex items-center gap-1">
                              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                              <span>Automatic — nothing to do</span>
                            </span>
                          ) : (
                            <span className="text-gray-600 font-medium inline-flex items-center gap-1">
                              <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                              <span>You need to apply</span>
                            </span>
                          )}

                          {plan?.timeframe && (
                            <span className="text-emerald-700 text-[11px] font-medium">
                              · Planned: {plan.timeframe}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                      <button
                        onClick={() => onSelectScheme(scheme)}
                        className="text-xs font-semibold text-blue-700 hover:text-blue-900 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>View details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      {scheme.actionStatus === 'apply' && (
                        <button
                          onClick={() => onOpenPlanModal(scheme)}
                          className="text-xs font-semibold text-gray-600 hover:text-gray-900 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          Plan
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 14. "SEE ALL ELIGIBLE SUPPORT" (Autonomy & Complete Choice Preserved)     */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-gray-200" id="all-schemes">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                All eligible support ({schemes.length})
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Review every programme your household qualifies for.
              </p>
            </div>

            <button
              onClick={() => setShowAllSchemes(!showAllSchemes)}
              className="self-start sm:self-auto text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1.5 cursor-pointer bg-white hover:bg-blue-50 px-4 py-2 rounded-xl border border-gray-200 transition-colors"
            >
              {showAllSchemes ? (
                <>
                  <span>Hide complete list</span>
                  <ChevronUp className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>See all eligible support ({schemes.length})</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          {/* Expanded Schemes List */}
          {showAllSchemes && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              {schemes.map((scheme) => {
                const plan = plans[scheme.id];

                return (
                  <div
                    key={scheme.id}
                    className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-gray-300 transition-all text-left shadow-2xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                      <div className="flex items-start gap-3.5">
                        <CategoryIcon topicId={scheme.topicId} className="w-8 h-8 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-base font-bold text-gray-900 leading-snug">
                            {scheme.title}
                          </h4>
                          <div className="text-xs font-bold text-gray-700 mt-0.5">
                            ${scheme.estimatedValue.toLocaleString()} / year
                          </div>
                        </div>
                      </div>

                      {/* Action Status Nudge */}
                      <div className="sm:text-right shrink-0">
                        {scheme.actionStatus === 'automatic' ? (
                          <div>
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                              <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                              Automatic — nothing to do
                            </span>
                            <span className="block text-[10px] text-gray-500 mt-0.5">
                              Your support will be credited automatically.
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                              <ArrowRight className="w-3 h-3 text-gray-500" />
                              You need to apply
                            </span>
                            <span className="block text-[10px] text-gray-500 mt-0.5">
                              Complete an application to receive this support.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed my-2 sm:pl-11.5">
                      {scheme.summary}
                    </p>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between sm:pl-11.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {scheme.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] text-gray-500 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => onSelectScheme(scheme)}
                          className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 cursor-pointer"
                        >
                          {scheme.actionStatus === 'apply' ? "See what you'll need" : "View details"}
                          <ArrowRight className="w-3 h-3" />
                        </button>

                        {scheme.actionStatus === 'apply' && (
                          <button
                            onClick={() => onOpenPlanModal(scheme)}
                            className="text-xs font-semibold text-gray-600 hover:text-gray-900 px-2.5 py-1 rounded border border-gray-200 hover:bg-gray-50 cursor-pointer"
                          >
                            {plan?.timeframe ? `Planned: ${plan.timeframe}` : "Plan"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
