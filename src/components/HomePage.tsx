import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Calculator, 
  HelpCircle, 
  FileText, 
  MapPin, 
  Compass, 
  Check, 
  ChevronRight, 
  MessageSquare,
  Bot
} from 'lucide-react';
import { Scheme } from '../types';
import { TopicIllustration } from './TopicIllustrations';
import { CategoryIcon } from './CategoryIcon';

interface HomePageProps {
  schemes: Scheme[];
  onSelectScheme: (scheme: Scheme) => void;
  onOpenCalculator: () => void;
  onNavigateToResults: () => void;
  hasAssessmentResults?: boolean;
}

export function HomePage({
  schemes,
  onSelectScheme,
  onOpenCalculator,
  onNavigateToResults,
  hasAssessmentResults = true
}: HomePageProps) {
  const [aiQuery, setAiQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState<{
    query: string;
    text: string;
    matchedSchemes: Scheme[];
  } | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // 12 Illustrated Topic Categories inspired by SupportGoWhere
  const topicCategories = [
    { id: 'caregiving', name: 'Caregiving support', desc: 'Respite care, caregiver allowances & home assistance' },
    { id: 'citizenship', name: 'Citizenship & residency', desc: 'Passports, identity cards & community registration' },
    { id: 'counselling', name: 'Counselling & crisis support', desc: 'Family service centres & 24/7 helplines' },
    { id: 'disability', name: 'Disability support', desc: 'Assistive tech, transport subsidies & care grants' },
    { id: 'education', name: 'Education & learning', desc: 'School bursaries, tuition aid & student transit' },
    { id: 'family', name: 'Family, parenting & relationships', desc: 'Childcare subsidies, infant care & family grants' },
    { id: 'financial', name: 'Financial support & benefits', desc: 'Grocery vouchers, cash aid & utilities credits' },
    { id: 'healthcare', name: 'Healthcare & well-being', desc: 'Subsidies, outpatient care & medical assistance' },
    { id: 'housing', name: 'Housing & shelters', desc: 'Rental assistance, HDB rebates & public housing' },
    { id: 'mentalhealth', name: 'Mental health', desc: 'Youth counselling, peer support & clinic subsidies' },
    { id: 'retirement', name: 'Retirement & legacy planning', desc: 'Silver support, CPF planning & senior wellness' },
    { id: 'work', name: 'Work & employment', desc: 'Career matching, upskilling grants & retrenchment aid' }
  ];

  const suggestedQuestions = [
    "Any assistance for job loss?",
    "When can I withdraw my CPF?",
    "How do I apply for family support?",
    "Support for senior healthcare expenses"
  ];

  const handleAskAi = (question: string) => {
    setAiQuery(question);
    const q = question.toLowerCase();

    if (q.includes('job') || q.includes('work') || q.includes('employment') || q.includes('retrenchment')) {
      const matched = schemes.filter(s => s.topicId === 'work');
      setAiAnswer({
        query: question,
        text: "For jobseekers and workers transitioning careers, the Career Transition & Training Allowance provides up to $500 monthly training support alongside active job matching with participating community employers.",
        matchedSchemes: matched.length ? matched : schemes.slice(3, 4)
      });
    } else if (q.includes('cpf') || q.includes('retirement') || q.includes('senior') || q.includes('withdraw')) {
      const matched = schemes.filter(s => s.topicId === 'healthcare' || s.id.includes('senior'));
      setAiAnswer({
        query: question,
        text: "Senior citizens and retirees can access multiple support programmes such as the Senior Mobility & Active Living Grant ($450/year) and automated utility credits. CPF payout details and eligible government schemes can be calculated based on your household composition.",
        matchedSchemes: matched.length ? matched : schemes.slice(5, 6)
      });
    } else if (q.includes('family') || q.includes('child') || q.includes('parenting')) {
      const matched = schemes.filter(s => s.id === 'family-grocery-grant' || s.topicId === 'education');
      setAiAnswer({
        query: question,
        text: "Families with dependants qualify for household living grants including the Family Grocery Support Grant ($800/yr in vouchers) and Student Education Support Grants ($450/yr). You can run a personalized estimate to see your full eligibility.",
        matchedSchemes: matched
      });
    } else {
      const matched = schemes.slice(0, 2);
      setAiAnswer({
        query: question,
        text: "Based on published assistance criteria, households can receive direct utility credits, caregiver allowances, and quarterly grocery vouchers. We recommend reviewing the support calculator for a tailored assessment.",
        matchedSchemes: matched
      });
    }
  };

  return (
    <div className="bg-[#FAFBFD] text-gray-900 pb-20">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: "Find the support you need" + AI Assistant               */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-b from-blue-50/70 via-blue-50/30 to-[#FAFBFD] pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-blue-100/60 text-left">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Title */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-100/70 px-3 py-1 rounded-full mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Public Support Directory</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Find the support you need
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mt-3 max-w-2xl leading-relaxed">
              Search government schemes, community assistance, and social services for your household in Singapore.
            </p>
          </div>

          {/* AI / Chatbot Support Discovery Box */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-blue-200/80 mt-6 relative">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-800 mb-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Tell us more about your situation</span>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (aiQuery.trim()) handleAskAi(aiQuery);
              }}
              className="relative mt-2"
            >
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="e.g. I am a caregiver needing respite aid, or looking for grocery vouchers..."
                className="w-full text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-2xl py-3.5 pl-4 pr-24 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-4 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                <span>Ask</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Suggested Questions */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-500 font-medium mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                <span>Suggested questions:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAskAi(q)}
                    className="text-xs bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-800 border border-gray-200 hover:border-blue-300 px-3 py-1.5 rounded-full transition-colors cursor-pointer text-left"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>

            {/* AI Assistant Answer Card (Simulated interactive response) */}
            {aiAnswer && (
              <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-blue-50/60 border border-blue-200/90 text-left animate-in fade-in duration-150">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-900 mb-1.5">
                  <Bot className="w-4 h-4 text-blue-700" />
                  <span>Support Guide Guidance</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {aiAnswer.text}
                </p>

                {aiAnswer.matchedSchemes.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-blue-200/60">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 block mb-2">
                      Relevant support schemes:
                    </span>
                    <div className="space-y-2">
                      {aiAnswer.matchedSchemes.map((s) => (
                        <div
                          key={s.id}
                          onClick={() => onSelectScheme(s)}
                          className="p-2.5 bg-white rounded-xl border border-blue-100 hover:border-blue-300 flex items-center justify-between cursor-pointer transition-colors group"
                        >
                          <div className="flex items-center gap-2.5">
                            <CategoryIcon topicId={s.topicId} className="w-7 h-7" />
                            <div>
                              <div className="text-xs font-bold text-gray-900 group-hover:text-blue-700">
                                {s.title}
                              </div>
                              <div className="text-[11px] text-gray-500">
                                ${s.estimatedValue} / year · {s.agencyAbbr}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-blue-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                            View details <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={onOpenCalculator}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline cursor-pointer"
                  >
                    Calculate exact eligibility for your dwelling
                  </button>
                  <button
                    onClick={() => setAiAnswer(null)}
                    className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Assessment Results Quick Access Banner */}
          {hasAssessmentResults && (
            <div className="mt-6 p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">
                    Your assessment results are ready
                  </div>
                  <div className="text-xs text-gray-500">
                    Estimated support available: <strong>$3,300 / year</strong> across 6 schemes.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                <button
                  onClick={onNavigateToResults}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View your results</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SUPPORT CALCULATOR PROMOTIONAL SECTION                                  */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 my-12 text-left">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-1">
              Support Calculator
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Check what support you qualify for
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-2 max-w-xl leading-relaxed">
              Answer 3 simple questions about your household size, dwelling type, and dependants to generate an estimated benefits breakdown in 2 minutes.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOpenCalculator}
              className="px-5 py-3 bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <Calculator className="w-4 h-4 text-blue-700" />
              <span>Launch Support Calculator</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. "EXPLORE SUPPORT BY TOPIC" (12 Illustrated SupportGoWhere Categories)  */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16 text-left" id="explore-topics">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Explore support by topic
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Browse all public assistance programmes and community grants by category.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {topicCategories.map((cat) => {
            const isSelected = selectedTopic === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedTopic(isSelected ? null : cat.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'border-blue-700 bg-blue-50/40 ring-1 ring-blue-700'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="mb-3">
                    <TopicIllustration topic={cat.id} className="w-12 h-12" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1 leading-normal line-clamp-2">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-blue-700">
                  <span>Browse</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {selectedTopic && (
          <div className="mt-5 p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-blue-900 flex items-center justify-between animate-in fade-in duration-100">
            <span>
              Showing assistance related to <strong>{topicCategories.find(c => c.id === selectedTopic)?.name}</strong>.
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
      {/* 4. KEY SCHEMES & ASSISTANCE PROGRAMMES DISCOVERY                           */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16 text-left">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Featured assistance schemes
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Widely accessed government and community initiatives for Singapore resident households.
            </p>
          </div>

          <button
            onClick={onNavigateToResults}
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View your results</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schemes.slice(0, 4).map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-blue-300 transition-all text-left flex flex-col justify-between group shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <CategoryIcon topicId={scheme.topicId} className="w-8 h-8" />
                    <div>
                      <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                        {scheme.agencyAbbr}
                      </span>
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                        {scheme.title}
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-900 shrink-0">
                    ${scheme.estimatedValue}/yr
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed mt-2 line-clamp-2">
                  {scheme.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                  {scheme.actionStatus === 'automatic' ? 'Automatic disbursement' : 'Application required'}
                </span>

                <button
                  onClick={() => onSelectScheme(scheme)}
                  className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>View details</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. RESOURCES & TOOLS                                                      */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-left" id="resources-and-tools">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Resources & Tools
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Practical calculators and guides to assist Singapore residents with household budgeting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-gray-200 text-left flex flex-col justify-between hover:border-gray-300 transition-colors">
            <div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                <Compass className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Support Finder</h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                Answer simple questions to estimate benefits tailored to your household.
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

          <div className="p-5 rounded-2xl bg-white border border-gray-200 text-left flex flex-col justify-between hover:border-gray-300 transition-colors">
            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Benefits Guide</h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                Plain-language explanations of government vouchers, rebates, and grants.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <button
                onClick={onNavigateToResults}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Read benefits overview</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 text-left flex flex-col justify-between hover:border-gray-300 transition-colors">
            <div>
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Community Directory</h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                Locate nearby Social Service Offices, family centres, and eldercare agencies.
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
                <span>Browse centres</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
