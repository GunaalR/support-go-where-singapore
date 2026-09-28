import React, { useState } from 'react';
import { Scheme, DemoHousehold, FirstMovePlan } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { 
  Check, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  SlidersHorizontal
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
  const [showAllSchemes, setShowAllSchemes] = useState(false);

  // Primary recommendation for "Start Here"
  const primaryScheme = schemes.find(s => s.id === 'family-grocery-grant') || schemes[0];

  // Secondary recommendations (lighter, compact)
  const secondarySchemes = schemes.filter(s => 
    s.id === 'caregiver-respite-allowance' || s.id === 'community-utilities-credit'
  );

  // Calculations for summary breakdown
  const automaticTotal = schemes
    .filter(s => s.actionStatus === 'automatic')
    .reduce((acc, curr) => acc + curr.estimatedValue, 0);

  const applyTotal = schemes
    .filter(s => s.actionStatus === 'apply')
    .reduce((acc, curr) => acc + curr.estimatedValue, 0);

  const primaryPlan = plans[primaryScheme.id];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 text-left" id="results-section">
      
      {/* ========================================================================= */}
      {/* 1. HERO RESULTS INTRODUCTION (Editorial, Whitespace & Typography)       */}
      {/* ========================================================================= */}
      <div className="border-b border-gray-200 pb-12 mb-14">
        
        {/* Subtle Kicker */}
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
          <span>Assessment complete</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Title & Narrative */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
              Support you may be eligible for
            </h1>

            <p className="text-base text-gray-600 mt-3.5 leading-relaxed">
              Based on the information you provided, you may qualify for several forms of support to help with household living costs.
            </p>

            <div className="mt-5">
              <button
                onClick={onOpenCalculator}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1.5 cursor-pointer group"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-700" />
                <span>Review your information</span>
              </button>
            </div>
          </div>

          {/* Restrained Estimated Amount Box */}
          <div className="lg:col-span-5 bg-gray-50/80 rounded-2xl p-6 border border-gray-200/70">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estimated annual support
            </div>
            
            <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-1.5">
              ${household.estimatedTotal.toLocaleString()}
            </div>
            
            <p className="text-xs text-gray-500 mt-1 leading-normal">
              Estimated based on your current information
            </p>

            {/* Clean, Non-aggressive Breakdown */}
            <div className="mt-5 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
              <div>
                <div className="text-lg font-bold text-gray-900">
                  ${automaticTotal.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Automatic support
                </div>
              </div>

              <div>
                <div className="text-lg font-bold text-gray-900">
                  ${applyTotal.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Support requiring an application
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. THE MAIN BEHAVIOURAL INTERVENTION: "START HERE"                        */}
      {/* ========================================================================= */}
      <div className="mb-16" id="start-here">
        
        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Start here
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Based on your results, these are a few useful places to begin.
          </p>
        </div>

        {/* ONE DOMINANT RECOMMENDED ACTION */}
        <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-6 sm:p-8 mb-6 relative">
          
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-gray-100">
            <div className="flex items-start gap-4">
              <CategoryIcon topicId={primaryScheme.topicId} className="w-11 h-11 shrink-0 mt-0.5" />
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

            {/* Scannable, text-based Action Status */}
            <div className="sm:text-right shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-50/80 px-2.5 py-1 rounded-md">
                <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
                <span>You need to apply</span>
              </span>
            </div>
          </div>

          <div className="py-5">
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              Support for everyday grocery and household expenses.
            </p>
            
            <p className="text-xs text-gray-500 leading-relaxed">
              This is one of the simpler application-based options in your results.
            </p>

            {/* Active Intention / Next Step indicator if already planned */}
            {primaryPlan?.timeframe && (
              <div className="mt-4 p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center gap-2 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Next step scheduled: {primaryPlan.timeframe}</span>
                </div>
                <span className="text-[11px] text-emerald-700">
                  Intention set
                </span>
              </div>
            )}
          </div>

          {/* Primary Recommendation Actions */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => onSelectScheme(primaryScheme)}
              className="w-full sm:w-auto py-2.5 px-5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>See what you'll need</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onOpenPlanModal(primaryScheme)}
              className="w-full sm:w-auto py-2.5 px-4 text-xs font-semibold text-gray-700 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>{primaryPlan?.timeframe ? 'Update plan' : 'Plan next step'}</span>
            </button>
          </div>

        </div>

        {/* 1-2 COMPACT SECONDARY STARTING OPTIONS */}
        <div className="pt-3">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Other places you could start
          </div>

          <div className="space-y-3">
            {secondarySchemes.map((scheme) => {
              const plan = plans[scheme.id];

              return (
                <div
                  key={scheme.id}
                  className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-gray-300 transition-colors"
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
                      
                      {/* Subtle action status */}
                      <div className="mt-1 flex items-center gap-3 text-xs">
                        {scheme.actionStatus === 'automatic' ? (
                          <span className="text-emerald-800 font-medium inline-flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                            Automatic — nothing to do
                          </span>
                        ) : (
                          <span className="text-gray-600 font-medium inline-flex items-center gap-1">
                            <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                            You need to apply
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
                      className="text-xs font-semibold text-blue-700 hover:text-blue-900 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                      View details
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
      {/* 3. "SEE ALL ELIGIBLE SUPPORT" (Preserving Complete Choice Freedom)        */}
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
            className="self-start sm:self-auto text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1.5 cursor-pointer bg-gray-50 hover:bg-gray-100 px-3.5 py-2 rounded-xl border border-gray-200 transition-colors"
          >
            {showAllSchemes ? (
              <>
                <span>Hide scheme list</span>
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

        {/* All Schemes List (Refined, Non-bulky presentation) */}
        {showAllSchemes && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {schemes.map((scheme) => {
              const plan = plans[scheme.id];

              return (
                <div
                  key={scheme.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 flex flex-col justify-between hover:border-gray-300 transition-all text-left"
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

                    {/* Action Status */}
                    <div className="sm:text-right shrink-0">
                      {scheme.actionStatus === 'automatic' ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 bg-emerald-50/70 px-2 py-0.5 rounded">
                          <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                          Automatic — nothing to do
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                          <ArrowRight className="w-3 h-3 text-gray-500" />
                          You need to apply
                        </span>
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

    </section>
  );
}
