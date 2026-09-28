import React, { useState } from 'react';
import { Scheme, DemoHousehold, FirstMovePlan } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { TopicIllustration } from './TopicIllustrations';
import { 
  Check, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  SlidersHorizontal,
  Compass,
  FileText,
  MapPin,
  HelpCircle
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
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Primary recommendation: Family Grocery Support Grant
  const primaryScheme = schemes.find(s => s.id === 'family-grocery-grant') || schemes[0];

  // Secondary alternatives in compact format:
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

  // Categories for Visual Category Discovery (Section 14)
  const categories = [
    { id: 'caregiving', name: 'Caregiving', desc: 'Respite care, caregiver allowances & home assistance' },
    { id: 'family', name: 'Family & parenting', desc: 'Childcare, infant grants & student bursaries' },
    { id: 'financial', name: 'Financial support', desc: 'Grocery vouchers, daily essentials & household cash' },
    { id: 'healthcare', name: 'Healthcare & well-being', desc: 'Subsidies, outpatient aid & eldercare wellness' },
    { id: 'education', name: 'Education & learning', desc: 'Tuition bursaries, school transport & devices' },
    { id: 'housing', name: 'Housing', desc: 'Utilities credits, rental grants & conservancy rebates' },
    { id: 'work', name: 'Work & employment', desc: 'Skills upgrading, career matching & transit aid' },
    { id: 'retirement', name: 'Retirement & planning', desc: 'Senior silver support & retirement top-ups' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 text-left" id="results-section">
      
      {/* ========================================================================= */}
      {/* 1. HERO RESULTS INTRODUCTION (Editorial, Whitespace & Strong Typography)  */}
      {/* ========================================================================= */}
      <section className="border-b border-gray-200 pb-12 mb-14" aria-labelledby="assessment-summary-heading">
        
        {/* Subtle Kicker */}
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
          <span>Assessment complete</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Title & Narrative */}
          <div className="lg:col-span-7">
            <h1 id="assessment-summary-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
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

          {/* Prominent but Restrained Support Summary */}
          <div className="lg:col-span-5 bg-gray-50/80 rounded-2xl p-6 border border-gray-200/80">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estimated annual support
            </div>
            
            <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-1.5">
              ${household.estimatedTotal.toLocaleString()}
            </div>
            
            <p className="text-xs text-gray-500 mt-1 leading-normal">
              Estimated based on your current information.
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
      </section>

      {/* ========================================================================= */}
      {/* 2. THE CORE BEHAVIOURAL INTERVENTION: "START HERE"                        */}
      {/* ========================================================================= */}
      <section className="mb-16" id="start-here" aria-labelledby="start-here-heading">
        
        {/* Section Heading & Reassuring Guidance */}
        <div className="mb-6">
          <h2 id="start-here-heading" className="text-2xl font-bold text-gray-900 tracking-tight">
            Start here
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Based on your results, these are a few useful places to begin.
          </p>
        </div>

        {/* ONE DOMINANT RECOMMENDED FIRST OPTION */}
        <div className="bg-white rounded-2xl border border-gray-300 shadow-xs p-6 sm:p-8 mb-8 relative">
          
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

            {/* Clear Action Status Label */}
            <div className="sm:text-right shrink-0">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-900 bg-amber-50/90 border border-amber-200/80 px-2.5 py-1 rounded-md">
                <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
                <span>You need to apply</span>
              </div>
              <span className="block text-[11px] text-gray-500 mt-1">
                Complete an application to receive this support.
              </span>
            </div>
          </div>

          <div className="py-5">
            <p className="text-sm text-gray-800 leading-relaxed font-normal mb-2">
              Support for everyday grocery and household expenses.
            </p>
            
            <p className="text-xs text-gray-500 leading-relaxed">
              This is one of the simpler application-based options in your results.
            </p>

            {/* Active Intention / Next Step indicator if planned */}
            {primaryPlan?.timeframe && (
              <div className="mt-4 p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center gap-2 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Next step scheduled: {primaryPlan.timeframe}</span>
                </div>
                <span className="text-[11px] text-emerald-700">
                  Plan saved
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
              <span>{primaryPlan?.timeframe ? 'Update your next step' : 'Plan your next step'}</span>
            </button>
          </div>

        </div>

        {/* 1-2 ALTERNATIVE SCHEMES: "OTHER PLACES YOU COULD START" */}
        <div className="pt-2">
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
                      
                      {/* Subtle, reassuring Action Status */}
                      <div className="mt-1 flex items-center gap-3 text-xs">
                        {scheme.actionStatus === 'automatic' ? (
                          <span className="text-emerald-800 font-medium inline-flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                            <span>Automatic — nothing to do</span>
                            <span className="text-gray-400 font-normal hidden sm:inline">· Your support will be credited automatically.</span>
                          </span>
                        ) : (
                          <span className="text-gray-600 font-medium inline-flex items-center gap-1">
                            <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                            <span>You need to apply</span>
                            <span className="text-gray-400 font-normal hidden sm:inline">· Complete an application to receive this support.</span>
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

      </section>

      {/* ========================================================================= */}
      {/* 3. PRESERVE USER CHOICE: "SEE ALL ELIGIBLE SUPPORT"                       */}
      {/* ========================================================================= */}
      <section className="pt-8 border-t border-gray-200 mb-16" id="all-schemes" aria-labelledby="all-eligible-heading">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 id="all-eligible-heading" className="text-xl font-bold text-gray-900 tracking-tight">
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

        {/* Complete Schemes List */}
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
                        <div>
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 bg-emerald-50/70 px-2 py-0.5 rounded">
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
      </section>

      {/* ========================================================================= */}
      {/* 4. VISUAL CATEGORY DISCOVERY: "EXPLORE SUPPORT BY TOPIC" (Section 14)     */}
      {/* ========================================================================= */}
      <section className="pt-8 border-t border-gray-200 mb-16" id="explore-topics" aria-labelledby="explore-topics-heading">
        <div className="mb-6">
          <h2 id="explore-topics-heading" className="text-2xl font-bold text-gray-900 tracking-tight">
            Explore support by topic
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Browse government schemes, community assistance, and social services by life stage and need.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const isSelected = selectedTopic === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedTopic(isSelected ? null : cat.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'border-blue-700 bg-blue-50/40 ring-1 ring-blue-700'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="mb-3">
                    <TopicIllustration topic={cat.id} className="w-12 h-12" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-blue-700">
                  <span>Explore topic</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Topic Schemes Filter Feedback */}
        {selectedTopic && (
          <div className="mt-5 p-4 rounded-xl bg-blue-50/50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between animate-in fade-in duration-100">
            <span>
              Viewing guidance for <strong>{categories.find(c => c.id === selectedTopic)?.name}</strong>. All eligible schemes in your assessment are listed in the sections above.
            </span>
            <button
              onClick={() => setSelectedTopic(null)}
              className="font-semibold text-blue-700 underline cursor-pointer ml-3 shrink-0"
            >
              Clear filter
            </button>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 5. RESOURCES & TOOLS (Section 15 & 16)                                     */}
      {/* ========================================================================= */}
      <section className="pt-8 border-t border-gray-200" id="resources-and-tools" aria-labelledby="resources-tools-heading">
        <div className="mb-6">
          <h2 id="resources-tools-heading" className="text-2xl font-bold text-gray-900 tracking-tight">
            Resources & Tools
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Practical guidance and directories to help Singapore households navigate public benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Tool 1: Support Finder */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200 text-left flex flex-col justify-between hover:border-gray-300 transition-colors">
            <div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                <Compass className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">
                Support Finder
              </h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                Answer a few simple questions to discover assistance tailored to your household.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <button
                onClick={onOpenCalculator}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Launch calculator</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Tool 2: Benefits Guide */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200 text-left flex flex-col justify-between hover:border-gray-300 transition-colors">
            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">
                Benefits Guide
              </h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                Plain-language guides explaining how government and community grants work.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <button
                onClick={() => {
                  const el = document.getElementById('start-here');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Read guide overview</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Tool 3: Community Services Directory */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200 text-left flex flex-col justify-between hover:border-gray-300 transition-colors">
            <div>
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">
                Community Services Directory
              </h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                Find local family service centres, eldercare providers, and social support near you.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <button
                onClick={() => {
                  const el = document.getElementById('explore-topics');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Browse directory</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
