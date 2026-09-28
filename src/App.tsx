import React, { useState, useEffect } from 'react';
import { Variant, Scheme, DemoHousehold, FirstMovePlan } from './types';
import { FICTIONAL_SCHEMES } from './data/fictionalSchemes';
import { StudentResearchBanner } from './components/StudentResearchBanner';
import { PrototypeDisclaimerBanner } from './components/PrototypeDisclaimerBanner';
import { Masthead } from './components/Masthead';
import { Header } from './components/Header';
import { ResultsSection } from './components/ResultsSection';
import { BudgetCalculatorModal } from './components/BudgetCalculatorModal';
import { SchemeDetailModal } from './components/SchemeDetailModal';
import { PlanFirstMoveModal } from './components/PlanFirstMoveModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';

export default function App() {
  // Support ?v=A or ?v=B from URL
  const [variant, setVariant] = useState<Variant>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('v');
      if (v === 'B' || v === 'b') return 'B';
    }
    return 'A'; // Default to Variant A (Baseline)
  });

  const handleVariantChange = (newVariant: Variant) => {
    setVariant(newVariant);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('v', newVariant);
      window.history.replaceState({}, '', url.toString());
    }
  };

  // Synchronize on browser history popstate
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('v');
      setVariant(v === 'B' || v === 'b' ? 'B' : 'A');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fictional household persona
  const [household, setHousehold] = useState<DemoHousehold>({
    name: 'The Lee Family',
    householdLabel: '4-Room Apartment · 1 Senior Dependant, 1 Child',
    dwellingType: '4-Room Apartment',
    estimatedTotal: 3300
  });

  // Track voluntary first-move plans (Variant B)
  const [plans, setPlans] = useState<Record<string, FirstMovePlan>>({});

  // Modals state
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [schemeForPlanning, setSchemeForPlanning] = useState<Scheme | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleCompletePlan = (plan: FirstMovePlan) => {
    setPlans((prev) => ({
      ...prev,
      [plan.schemeId]: plan
    }));
  };

  const handleResetHousehold = () => {
    setHousehold({
      name: 'The Lee Family',
      householdLabel: '4-Room Apartment · 1 Senior Dependant, 1 Child',
      dwellingType: '4-Room Apartment',
      estimatedTotal: 3300
    });
    setPlans({});
  };

  const handleScrollToResults = () => {
    const el = document.getElementById('results-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased flex flex-col selection:bg-blue-100 selection:text-blue-800">
      
      {/* 1. Academic Course Header & Variant Selector (?v=A | ?v=B) */}
      <StudentResearchBanner
        variant={variant}
        onVariantChange={handleVariantChange}
      />

      {/* 2. Educational & Research Prototype Notice */}
      <PrototypeDisclaimerBanner />

      {/* 3. Academic Masthead with Ethics Standards */}
      <Masthead />

      {/* 4. HelpCompass SG Main Header */}
      <Header
        household={household}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onResetHousehold={handleResetHousehold}
        onScrollToResults={handleScrollToResults}
      />

      {/* Main Results View (The core of the MGMT 6108 experiment) */}
      <main className="flex-1">
        <ResultsSection
          variant={variant}
          household={household}
          schemes={FICTIONAL_SCHEMES}
          plans={plans}
          onSelectScheme={(scheme) => setSelectedScheme(scheme)}
          onOpenPlanModal={(scheme) => setSchemeForPlanning(scheme)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />
      </main>

      {/* 5. Footer with Course Brief and Safeguards */}
      <Footer />

      {/* Modals */}
      {/* Scheme Detail Modal (includes "What you'll need" checklist) */}
      <SchemeDetailModal
        scheme={selectedScheme}
        variant={variant}
        plan={selectedScheme ? plans[selectedScheme.id] : undefined}
        onClose={() => setSelectedScheme(null)}
        onOpenPlanModal={(scheme) => {
          setSelectedScheme(null);
          setSchemeForPlanning(scheme);
        }}
      />

      {/* Plan the First Move Modal (Variant B: When will you take the next step? + Do this with someone) */}
      <PlanFirstMoveModal
        isOpen={Boolean(schemeForPlanning)}
        scheme={schemeForPlanning}
        onClose={() => setSchemeForPlanning(null)}
        onCompletePlan={handleCompletePlan}
      />

      {/* Assessment Calculator Modal */}
      <BudgetCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onApplyResults={(total, dwelling) => {
          setHousehold((prev) => ({
            ...prev,
            estimatedTotal: total,
            dwellingType: dwelling
          }));
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectScheme={(scheme) => setSelectedScheme(scheme)}
      />

    </div>
  );
}
