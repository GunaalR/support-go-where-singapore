import React, { useState } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  ChevronRight, 
  Compass, 
  FileText, 
  MapPin, 
  Building2, 
  Users, 
  HeartHandshake
} from 'lucide-react';
import { Scheme } from '../types';
import { HeroSection } from './HeroSection';
import { TopicIllustration } from './TopicIllustrations';
import { CategoryIcon } from './CategoryIcon';

interface HomePageProps {
  schemes: Scheme[];
  onSelectScheme: (scheme: Scheme) => void;
  onOpenCalculator: () => void;
}

export function HomePage({
  schemes,
  onSelectScheme,
  onOpenCalculator
}: HomePageProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // 12 illustrated topic categories, as on the live homepage
  const topicCategories = [
    { id: 'financial', name: 'Financial support & benefits', desc: 'Grocery vouchers, NCV Vouchers & cash grants' },
    { id: 'work', name: 'Work & employment', desc: 'Career matching, training allowances & retrenchment aid' },
    { id: 'caregiving', name: 'Caregiving support', desc: 'Respite care, caregiver allowances & home assistance' },
    { id: 'housing', name: 'Housing & shelters', desc: 'Rental assistance, flat rebates & public housing' },
    { id: 'healthcare', name: 'Healthcare & well-being', desc: 'Polyclinic subsidies, medical aid & eldercare wellness' },
    { id: 'family', name: 'Family, parenting & relationships', desc: 'Childcare subsidies, infant grants & family services' },
    { id: 'education', name: 'Education & learning', desc: 'School bursaries, tuition subsidies & transport concessions' },
    { id: 'retirement', name: 'Retirement & legacy planning', desc: 'Senior support, NSF planning & senior wellness' },
    { id: 'disability', name: 'Disability support', desc: 'Assistive tech, transport subsidies & care grants' },
    { id: 'mentalhealth', name: 'Mental health', desc: 'Youth counselling, peer support & clinic subsidies' },
    { id: 'citizenship', name: 'Citizenship & residency', desc: 'Passports, identity cards & community registration' },
    { id: 'counselling', name: 'Counselling & crisis support', desc: 'Family service centres & 24/7 community helplines' }
  ];

  const handleExploreCategory = (categoryId: string) => {
    setSelectedTopic(categoryId);
    const el = document.getElementById('explore-topics');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter schemes if a topic is selected
  const displayedSchemes = selectedTopic
    ? schemes.filter(s => s.topicId === selectedTopic)
    : schemes.slice(0, 4);

  return (
    <div className="bg-[#FAFBFD] text-[#0F1E2E] pb-20">
      
      {/* 1. HERO SECTION WITH GUIDED AI ASSISTANT (Change 3) */}
      <HeroSection
        schemes={schemes}
        onExploreCategory={handleExploreCategory}
        onSelectScheme={onSelectScheme}
      />

      {/* 2. "EXPLORE SUPPORT BY TOPIC" (12 Illustrated Topic Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left" id="explore-topics">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2E] tracking-tight">
            Explore support by topic
          </h2>
          <p className="text-sm sm:text-base text-[#5B6675] mt-1">
            Browse all public assistance programmes, subsidies, and community initiatives by category.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {topicCategories.map((cat) => {
            const isSelected = selectedTopic === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedTopic(isSelected ? null : cat.id)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'border-[#BE123C] bg-[#FFF1F3]/50 ring-2 ring-[#BE123C]'
                    : 'border-gray-200 bg-white hover:border-[#FDA4B4] hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="mb-3.5">
                    <TopicIllustration topic={cat.id} className="w-12 h-12" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0F1E2E] group-hover:text-[#BE123C] transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-[13px] text-[#5B6675] mt-1 leading-normal line-clamp-2">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[13px] font-semibold text-[#BE123C]">
                  <span>{isSelected ? 'Active filter' : 'Explore'}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Topic Notice */}
        {selectedTopic && (
          <div className="mt-6 p-4 rounded-xl bg-[#FFF1F3] border border-[#FECDD6] text-sm text-[#881337] flex items-center justify-between animate-in fade-in duration-100">
            <span>
              Showing schemes related to <strong>{topicCategories.find(c => c.id === selectedTopic)?.name}</strong>.
            </span>
            <button
              onClick={() => setSelectedTopic(null)}
              className="font-bold text-[#BE123C] underline cursor-pointer ml-3 shrink-0"
            >
              Clear filter
            </button>
          </div>
        )}
      </section>

      {/* 3. BUDGET 2026 CALCULATOR PROMOTIONAL SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-left">
        <div className="bg-gradient-to-br from-[#881337] via-[#BE123C] to-[#E11D48] rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-[#FECDD6] mb-1">
              2026 Support
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Check what support you qualify for
            </h2>
            <p className="text-sm sm:text-base text-[#FFE4E8] mt-2 max-w-xl leading-relaxed">
              Find out your estimated NCV Vouchers, Steady Package payouts, and utility rebates with our interactive calculator.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onOpenCalculator}
              className="px-5 py-3 bg-white text-[#BE123C] hover:bg-[#FFF1F3] font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <Calculator className="w-4 h-4 text-[#BE123C]" />
              <span>Launch 2026 Support Calculator</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. ASSISTANCE SCHEMES DISCOVERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-left">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#0F1E2E] tracking-tight">
              {selectedTopic ? 'Relevant assistance schemes' : 'Featured assistance schemes'}
            </h2>
            <p className="text-sm sm:text-base text-[#5B6675] mt-0.5">
              Government and community initiatives available for eligible Singapore citizens and residents.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(displayedSchemes.length > 0 ? displayedSchemes : schemes.slice(0, 4)).map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-[#FDA4B4] transition-all text-left flex flex-col justify-between group shadow-2xs"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <CategoryIcon topicId={scheme.topicId} className="w-8 h-8" />
                    <div>
                      <span className="text-sm font-bold text-[#BE123C] uppercase tracking-wider block">
                        {scheme.agencyAbbr}
                      </span>
                      <h4 className="text-sm font-bold text-[#0F1E2E] group-hover:text-[#BE123C] transition-colors">
                        {scheme.title}
                      </h4>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#0F1E2E] shrink-0">
                    ${scheme.estimatedValue}/yr
                  </span>
                </div>

                <p className="text-sm text-[#334155] leading-relaxed mt-2 line-clamp-2">
                  {scheme.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm text-[#5B6675] bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                  {scheme.actionStatus === 'automatic' ? 'Automatic disbursement' : 'Application required'}
                </span>

                <button
                  onClick={() => onSelectScheme(scheme)}
                  className="text-sm font-semibold text-[#BE123C] hover:text-[#881337] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>View scheme</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. OTHER RESOURCES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="resources-and-tools">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#0F1E2E] tracking-tight">
            Other resources
          </h2>
          <p className="text-sm sm:text-base text-[#5B6675] mt-1">
            Connect with partner agencies and community service touchpoints across Singapore.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-white border border-gray-200 text-left flex flex-col justify-between hover:border-gray-300 transition-colors shadow-2xs">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#FFF1F3] text-[#BE123C] flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-sm font-bold text-[#0F1E2E]">Neighbourhood Support Offices</h3>
              <p className="text-sm text-[#334155] mt-1.5 leading-relaxed">
                Local offices providing financial assistance and neighbourhood social support.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <button
                onClick={() => handleExploreCategory('financial')}
                className="text-sm font-semibold text-[#BE123C] hover:text-[#881337] inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Find nearest office</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 text-left flex flex-col justify-between hover:border-gray-300 transition-colors shadow-2xs">
            <div>
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-sm font-bold text-[#0F1E2E]">Neighbourhood Councils</h3>
              <p className="text-sm text-[#334155] mt-1.5 leading-relaxed">
                Administering NCV Vouchers for neighbourhood shops and supermarkets.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <button
                onClick={() => handleExploreCategory('financial')}
                className="text-sm font-semibold text-[#BE123C] hover:text-[#881337] inline-flex items-center gap-1 cursor-pointer"
              >
                <span>About NCV Vouchers</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 text-left flex flex-col justify-between hover:border-gray-300 transition-colors shadow-2xs">
            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <Users className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-sm font-bold text-[#0F1E2E]">Family Service Centres</h3>
              <p className="text-sm text-[#334155] mt-1.5 leading-relaxed">
                Community-based social workers providing family counselling and casework support.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <button
                onClick={() => handleExploreCategory('counselling')}
                className="text-sm font-semibold text-[#BE123C] hover:text-[#881337] inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Browse centres</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 text-left flex flex-col justify-between hover:border-gray-300 transition-colors shadow-2xs">
            <div>
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
                <Compass className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-sm font-bold text-[#0F1E2E]">CompassLife Digital Services</h3>
              <p className="text-sm text-[#334155] mt-1.5 leading-relaxed">
                Access digital services tailored across personal life moments.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <button
                onClick={() => handleExploreCategory('financial')}
                className="text-sm font-semibold text-[#BE123C] hover:text-[#881337] inline-flex items-center gap-1 cursor-pointer"
              >
                <span>About CompassLife</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
