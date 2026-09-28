import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  ExternalLink, 
  Compass, 
  HelpCircle, 
  ArrowUp,
  ChevronRight,
  Bot,
  UserCheck
} from 'lucide-react';
import { Scheme } from '../types';

interface HeroSectionProps {
  schemes: Scheme[];
  onExploreCategory: (categoryId: string) => void;
  onSelectScheme: (scheme: Scheme) => void;
}

type GuidanceStep = 'initial' | 'followup_1' | 'followup_2' | 'result';

interface SituationOption {
  id: string;
  label: string;
  category: string;
  aiIntro: string;
  followupQuestion: string;
  followupOptions: { id: string; label: string }[];
  secondQuestion: string;
  secondOptions: { id: string; label: string }[];
  resultMessage: string;
}

export function HeroSection({
  schemes,
  onExploreCategory,
  onSelectScheme
}: HeroSectionProps) {
  // Step in the Guided AI flow
  const [currentStep, setCurrentStep] = useState<GuidanceStep>('initial');
  const [selectedSituation, setSelectedSituation] = useState<SituationOption | null>(null);
  const [selectedFollowup1, setSelectedFollowup1] = useState<string | null>(null);
  const [selectedFollowup2, setSelectedFollowup2] = useState<string | null>(null);
  const [freeTextQuery, setFreeTextQuery] = useState('');
  const [customResultText, setCustomResultText] = useState<string | null>(null);
  const [targetCategory, setTargetCategory] = useState<string>('financial');

  // Situations configured per Step 1, 2, 3
  const situations: SituationOption[] = [
    {
      id: 'money',
      label: 'I need help with money',
      category: 'financial',
      aiIntro: 'I can help you explore financial assistance, grocery vouchers, and daily expense support.',
      followupQuestion: 'What would you like help with first?',
      followupOptions: [
        { id: 'groceries_utilities', label: 'Help with everyday expenses & bills' },
        { id: 'household_cash', label: 'Cash grants for low to middle income' },
        { id: 'family_allowance', label: 'Child or senior dependant expenses' },
        { id: 'not_sure', label: "I'm not sure" }
      ],
      secondQuestion: 'What best describes your situation?',
      secondOptions: [
        { id: 'urgent_bills', label: 'I need immediate assistance with bills' },
        { id: 'long_term', label: 'I am looking for ongoing monthly support' },
        { id: 'general_check', label: 'I want to see what my household qualifies for' },
        { id: 'not_sure', label: "I'm not sure" }
      ],
      resultMessage: 'Based on what you’ve told me, you may want to start by exploring Financial Support & Benefits, including quarterly utility rebates and grocery vouchers.'
    },
    {
      id: 'job_loss',
      label: 'I lost my job',
      category: 'work',
      aiIntro: 'I can help you look for support related to employment and finances.',
      followupQuestion: 'What would you like help with first?',
      followupOptions: [
        { id: 'expenses', label: 'Help with everyday expenses' },
        { id: 'find_job', label: 'Find a new job' },
        { id: 'training', label: 'Training & skills' },
        { id: 'not_sure', label: "I'm not sure" }
      ],
      secondQuestion: 'What best describes your situation?',
      secondOptions: [
        { id: 'immediate_money', label: 'I need immediate financial help' },
        { id: 'looking_work', label: "I'm looking for work" },
        { id: 'improve_skills', label: 'I want to improve my skills' },
        { id: 'not_sure', label: "I'm not sure" }
      ],
      resultMessage: 'Based on what you’ve told me, you may want to start by exploring financial support and employment assistance.'
    },
    {
      id: 'caregiving',
      label: "I'm caring for someone",
      category: 'caregiving',
      aiIntro: 'I can help you look for caregiver allowances, respite options, and care support.',
      followupQuestion: 'Who are you providing care for?',
      followupOptions: [
        { id: 'elderly_parent', label: 'An elderly parent or senior family member' },
        { id: 'disability', label: 'A child or adult with special needs' },
        { id: 'respite', label: 'I need relief / respite care services' },
        { id: 'not_sure', label: "I'm not sure" }
      ],
      secondQuestion: 'What would ease your caregiving duties most?',
      secondOptions: [
        { id: 'monthly_allowance', label: 'Monthly caregiver financial assistance' },
        { id: 'home_nursing', label: 'Day care or home nursing subsidies' },
        { id: 'assistive_gear', label: 'Subsidies for mobility devices' },
        { id: 'not_sure', label: "I'm not sure" }
      ],
      resultMessage: 'Based on what you’ve told me, you may want to start by exploring Caregiving Support and community respite programmes.'
    },
    {
      id: 'housing',
      label: 'I need help with housing',
      category: 'housing',
      aiIntro: 'I can help you explore public housing assistance, rental subsidies, and utility rebates.',
      followupQuestion: 'What housing support are you seeking?',
      followupOptions: [
        { id: 'rental', label: 'Subsidised public rental housing' },
        { id: 'utilities', label: 'Utilities & service conservancy rebates' },
        { id: 'emergency_shelter', label: 'Temporary or transitional shelter' },
        { id: 'not_sure', label: "I'm not sure" }
      ],
      secondQuestion: 'What best describes your housing situation?',
      secondOptions: [
        { id: 'existing_flat', label: 'Currently renting / owning an HDB flat' },
        { id: 'need_home', label: 'Seeking urgent shelter / rental aid' },
        { id: 'bill_arrears', label: 'Need help managing housing fees' },
        { id: 'not_sure', label: "I'm not sure" }
      ],
      resultMessage: 'Based on what you’ve told me, you may want to start by exploring Housing & Shelters and utility bill relief.'
    },
    {
      id: 'healthcare',
      label: 'I need healthcare support',
      category: 'healthcare',
      aiIntro: 'I can help you discover medical subsidies, chronic care assistance, and eldercare wellness aid.',
      followupQuestion: 'What healthcare assistance do you need?',
      followupOptions: [
        { id: 'clinic_subsidy', label: 'Subsidies for polyclinics and GP visits' },
        { id: 'hospital_bills', label: 'Assistance for major hospitalisation costs' },
        { id: 'mobility_devices', label: 'Senior mobility aids & hearing devices' },
        { id: 'not_sure', label: "I'm not sure" }
      ],
      secondQuestion: 'Who is the medical support for?',
      secondOptions: [
        { id: 'senior', label: 'A senior citizen (aged 60 and above)' },
        { id: 'adult_child', label: 'Myself or dependent child' },
        { id: 'chronic_condition', label: 'Someone with a chronic medical illness' },
        { id: 'not_sure', label: "I'm not sure" }
      ],
      resultMessage: 'Based on what you’ve told me, you may want to start by exploring Healthcare & Well-being and medical subsidies.'
    },
    {
      id: 'family',
      label: 'I need family support',
      category: 'family',
      aiIntro: 'I can help you explore childcare subsidies, student education bursaries, and family grants.',
      followupQuestion: 'What area of family support are you looking for?',
      followupOptions: [
        { id: 'childcare_aid', label: 'Infant care & infant childcare subsidies' },
        { id: 'school_expenses', label: 'School fees, bursaries & transport grants' },
        { id: 'counselling_aid', label: 'Family counselling & marital assistance' },
        { id: 'not_sure', label: "I'm not sure" }
      ],
      secondQuestion: 'What best describes your household?',
      secondOptions: [
        { id: 'young_children', label: 'Parents with young children under 7' },
        { id: 'school_age', label: 'Parents with school-going children' },
        { id: 'single_parent', label: 'Single parent or multi-generational household' },
        { id: 'not_sure', label: "I'm not sure" }
      ],
      resultMessage: 'Based on what you’ve told me, you may want to start by exploring Family, Parenting & Relationships and student subsidies.'
    }
  ];

  const somethingElseSituation: SituationOption = {
    id: 'something_else',
    label: 'Something else',
    category: 'counselling',
    aiIntro: 'I can help you connect with community services, crisis aid, and specialised support.',
    followupQuestion: 'What category comes closest to your need?',
    followupOptions: [
      { id: 'crisis_help', label: 'Emergency crisis or community support' },
      { id: 'mental_health', label: 'Mental health and youth counselling' },
      { id: 'cpf_retirement', label: 'Retirement and CPF planning' },
      { id: 'not_sure', label: "I'm not sure" }
    ],
    secondQuestion: 'Would you prefer community support or government grants?',
    secondOptions: [
      { id: 'social_service', label: 'Connect with a nearby Social Service Office' },
      { id: 'general_grants', label: 'View all published schemes' },
      { id: 'helpline', label: 'Access confidential community helplines' },
      { id: 'not_sure', label: "I'm not sure" }
    ],
    resultMessage: 'Based on what you’ve told me, you may want to start by exploring Counselling & Community Support or browsing all support topics.'
  };

  // Step 1: Select a situation
  const handleSelectSituation = (situation: SituationOption) => {
    setSelectedSituation(situation);
    setTargetCategory(situation.category);
    setCurrentStep('followup_1');
  };

  // Step 2: Answer first follow-up question
  const handleSelectFollowup1 = (optionId: string) => {
    setSelectedFollowup1(optionId);
    setCurrentStep('followup_2');
  };

  // Step 3: Answer second question -> leads to Step 4 (Result)
  const handleSelectFollowup2 = (optionId: string) => {
    setSelectedFollowup2(optionId);
    setCurrentStep('result');
  };

  // Reset to initial screen
  const handleStartOver = () => {
    setCurrentStep('initial');
    setSelectedSituation(null);
    setSelectedFollowup1(null);
    setSelectedFollowup2(null);
    setFreeTextQuery('');
    setCustomResultText(null);
  };

  // Free-text submit handler
  const handleFreeTextSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!freeTextQuery.trim()) return;

    const q = freeTextQuery.toLowerCase();
    let cat = 'financial';
    let res = 'Based on what you’ve told me, you may want to start by exploring financial support and daily essentials.';

    if (q.includes('job') || q.includes('work') || q.includes('retrench') || q.includes('employ')) {
      cat = 'work';
      res = 'Based on what you’ve told me, you may want to start by exploring employment assistance, job matching, and training allowances.';
    } else if (q.includes('care') || q.includes('elder') || q.includes('respite')) {
      cat = 'caregiving';
      res = 'Based on what you’ve told me, you may want to start by exploring caregiver allowances and community respite care.';
    } else if (q.includes('house') || q.includes('rent') || q.includes('flat') || q.includes('hdb')) {
      cat = 'housing';
      res = 'Based on what you’ve told me, you may want to start by exploring public housing schemes, rental subsidies, and utilities support.';
    } else if (q.includes('health') || q.includes('medical') || q.includes('clinic') || q.includes('doctor')) {
      cat = 'healthcare';
      res = 'Based on what you’ve told me, you may want to start by exploring healthcare subsidies and medical wellness schemes.';
    } else if (q.includes('child') || q.includes('school') || q.includes('student') || q.includes('kid')) {
      cat = 'family';
      res = 'Based on what you’ve told me, you may want to start by exploring family grants, student education support, and childcare subsidies.';
    }

    setTargetCategory(cat);
    setCustomResultText(res);
    setCurrentStep('result');
  };

  const handlePillClick = (text: string) => {
    setFreeTextQuery(text);
    const q = text.toLowerCase();
    if (q.includes('job')) {
      handleSelectSituation(situations.find(s => s.id === 'job_loss') || situations[1]);
    } else if (q.includes('cpf')) {
      handleSelectSituation(somethingElseSituation);
    } else if (q.includes('family')) {
      handleSelectSituation(situations.find(s => s.id === 'family') || situations[5]);
    } else {
      handleSelectSituation(situations.find(s => s.id === 'healthcare') || situations[4]);
    }
  };

  const quickPills = [
    "Any assistance for job loss?",
    "When can I withdraw my CPF?",
    "How do I apply for family support?",
    "Support for senior healthcare expenses"
  ];

  return (
    <section className="relative bg-[#EBF5FF] border-b border-blue-100/80 pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
      
      {/* Container */}
      <div className="relative max-w-3xl mx-auto z-10">
        
        {/* Floating Background Illustrations (SupportGoWhere original style) */}
        <div className="hidden lg:block absolute -left-52 top-4 pointer-events-none select-none">
          <div className="relative w-44 h-44">
            <div className="absolute top-2 left-4 bg-white p-3 rounded-2xl shadow-sm border border-blue-100 w-36 -rotate-6">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <div className="h-2 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="h-1.5 bg-gray-100 rounded w-full mb-1"></div>
              <div className="h-1.5 bg-gray-100 rounded w-4/5"></div>
            </div>
            <div className="absolute -right-2 top-8 text-amber-400 text-lg">✦</div>
          </div>
        </div>

        <div className="hidden lg:block absolute -right-52 top-4 pointer-events-none select-none">
          <div className="relative w-44 h-44">
            <div className="absolute top-0 right-4 bg-white p-3 rounded-2xl shadow-sm border border-blue-100 w-36 rotate-6">
              <div className="w-full h-12 bg-blue-50/80 rounded-lg flex items-center justify-center relative overflow-hidden">
                <Compass className="w-6 h-6 text-blue-300" />
                <div className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-red-500"></div>
              </div>
            </div>
            <div className="absolute -left-2 bottom-6 text-red-500 text-base">✦</div>
          </div>
        </div>

        {/* Section Titles */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight mb-2">
          Find the support you need
        </h1>
        
        <p className="text-xs sm:text-sm text-[#475467] font-medium flex items-center justify-center gap-1 mb-8">
          <span>Part of</span>
          <a
            href="https://www.life.gov.sg"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center font-bold text-gray-900 hover:text-red-600 transition-colors"
          >
            Life<span className="text-[#E63946]">SG</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400 ml-1 inline" />
          </a>
        </p>

        {/* ======================================================================= */}
        {/* GUIDED AI ASSISTANT (Change 3: Behavioral Redesign)                      */}
        {/* ======================================================================= */}
        <div className="bg-white rounded-3xl shadow-sm border border-blue-200/90 p-6 sm:p-8 text-left transition-all relative">
          
          {/* Top Assistant Header Indicator */}
          <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 mb-5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-[#175CD3] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-gray-900">
                SupportGoWhere Guided Assistant
              </span>
            </div>

            {currentStep !== 'initial' && (
              <button
                onClick={handleStartOver}
                className="text-xs text-gray-500 hover:text-[#175CD3] inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Start over</span>
              </button>
            )}
          </div>

          {/* STEP 1: INITIAL AI SCREEN */}
          {currentStep === 'initial' && (
            <div className="animate-in fade-in duration-150">
              
              <div className="mb-5">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                  How can we help?
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                  Tell us a little about your situation and we'll help you find where to start.
                </p>
              </div>

              {/* 6 Situation Options + Something Else */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                {situations.map((sit) => (
                  <button
                    key={sit.id}
                    onClick={() => handleSelectSituation(sit)}
                    className="p-3.5 rounded-xl border border-gray-200 hover:border-[#175CD3] hover:bg-blue-50/50 text-left transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-[#175CD3]">
                      {sit.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#175CD3] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}

                {/* Something Else */}
                <button
                  onClick={() => handleSelectSituation(somethingElseSituation)}
                  className="p-3.5 rounded-xl border border-gray-200 hover:border-[#175CD3] hover:bg-blue-50/50 text-left transition-all cursor-pointer flex items-center justify-between group sm:col-span-2"
                >
                  <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-[#175CD3]">
                    Something else
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#175CD3] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Free-Text Option: "Or tell us in your own words" */}
              <div className="pt-4 border-t border-gray-100">
                <label className="text-xs font-medium text-gray-500 block mb-2">
                  Or tell us in your own words:
                </label>
                
                <form onSubmit={handleFreeTextSubmit} className="relative">
                  <input
                    type="text"
                    value={freeTextQuery}
                    onChange={(e) => setFreeTextQuery(e.target.value)}
                    placeholder="Type your situation..."
                    className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl py-3 pl-3.5 pr-20 focus:bg-white focus:ring-2 focus:ring-[#175CD3] outline-none transition-all placeholder:text-gray-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#1570EF] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                  >
                    <span>Ask</span>
                    <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* STEP 2: GUIDED FOLLOW-UP */}
          {currentStep === 'followup_1' && selectedSituation && (
            <div className="animate-in fade-in duration-150">
              
              {/* User selected echo badge */}
              <div className="mb-4 inline-flex items-center gap-1.5 text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                <span className="font-semibold text-gray-900">Your situation:</span>
                <span>"{selectedSituation.label}"</span>
              </div>

              {/* Conversational AI Response */}
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 mb-5">
                <div className="flex items-start gap-2.5">
                  <Bot className="w-4 h-4 text-[#175CD3] mt-0.5 shrink-0" />
                  <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-normal">
                    {selectedSituation.aiIntro}
                  </p>
                </div>
              </div>

              {/* Question 1 */}
              <div className="mb-3">
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  {selectedSituation.followupQuestion}
                </h3>
              </div>

              <div className="space-y-2 mb-4">
                {selectedSituation.followupOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectFollowup1(opt.id)}
                    className="w-full p-3 rounded-xl border border-gray-200 hover:border-[#175CD3] hover:bg-blue-50/50 text-left transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <span className="text-xs sm:text-sm text-gray-800 group-hover:text-[#175CD3] font-medium">
                      {opt.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#175CD3] transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>

            </div>
          )}

          {/* STEP 3: SECOND GUIDANCE QUESTION */}
          {currentStep === 'followup_2' && selectedSituation && (
            <div className="animate-in fade-in duration-150">
              
              <div className="mb-4 inline-flex items-center gap-1.5 text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                <span className="font-semibold text-gray-900">Your situation:</span>
                <span>"{selectedSituation.label}"</span>
              </div>

              {/* Question 2 */}
              <div className="mb-3">
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  {selectedSituation.secondQuestion}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  This helps point you toward the most relevant assistance category.
                </p>
              </div>

              <div className="space-y-2 mb-4">
                {selectedSituation.secondOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectFollowup2(opt.id)}
                    className="w-full p-3 rounded-xl border border-gray-200 hover:border-[#175CD3] hover:bg-blue-50/50 text-left transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <span className="text-xs sm:text-sm text-gray-800 group-hover:text-[#175CD3] font-medium">
                      {opt.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#175CD3] transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>

            </div>
          )}

          {/* STEP 4: GUIDED RESULT */}
          {currentStep === 'result' && (
            <div className="animate-in fade-in duration-150">
              
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 border border-blue-200 text-left mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-900 mb-1.5">
                  <Sparkles className="w-4 h-4 text-[#175CD3]" />
                  <span>Support Recommendation</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-normal">
                  {customResultText || (selectedSituation ? selectedSituation.resultMessage : 'Based on what you’ve told me, you may want to start by exploring financial support and employment assistance.')}
                </p>
              </div>

              {/* Next Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onExploreCategory(targetCategory)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#1570EF] hover:bg-blue-700 text-white rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Explore relevant support</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleStartOver}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors cursor-pointer text-center"
                >
                  Start over
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Quick Query Pill Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          {quickPills.map((pill, idx) => (
            <button
              key={idx}
              onClick={() => handlePillClick(pill)}
              className="text-xs bg-white hover:bg-gray-50 hover:border-blue-300 text-gray-700 border border-gray-200 rounded-full px-3.5 py-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              "{pill}"
            </button>
          ))}
        </div>

      </div>

    </section>
  );
}
