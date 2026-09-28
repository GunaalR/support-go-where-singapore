import { useState } from 'react';
import { Scheme, DemoHousehold, FirstMovePlan } from './types';
import { FICTIONAL_SCHEMES } from './data/fictionalSchemes';
import { Masthead } from './components/Masthead';
import { Header } from './components/Header';
import { ResultsSection } from './components/ResultsSection';
import { BudgetCalculatorModal } from './components/BudgetCalculatorModal';
import { SchemeDetailModal } from './components/SchemeDetailModal';
import { PlanFirstMoveModal } from './components/PlanFirstMoveModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';

export default function App() {
  // Household profile used for calculations
  const [household, setHousehold] = useState<DemoHousehold>({
    name: 'Your assessment',
    householdLabel: '4-Room Apartment · 1 Senior Dependant, 1 Child',
    dwellingType: '4-Room Apartment',
    estimatedTotal: 3300
  });

  // Track voluntary first-move intentions
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

  const handleScrollToSupport = () => {
    const el = document.getElementById('results-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToResources = () => {
    const el = document.getElementById('resources-and-tools');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 font-sans antialiased flex flex-col selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. Official Reassuring Public-Service Masthead */}
      <Masthead />

      {/* 2. Main Navigation Header (Clean, Understated, No login/account) */}
      <Header
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onScrollToSupport={handleScrollToSupport}
        onScrollToResources={handleScrollToResources}
      />

      {/* 3. Main Results Experience */}
      <main className="flex-1">
        <ResultsSection
          household={household}
          schemes={FICTIONAL_SCHEMES}
          plans={plans}
          onSelectScheme={(scheme) => setSelectedScheme(scheme)}
          onOpenPlanModal={(scheme) => setSchemeForPlanning(scheme)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />
      </main>

      {/* 4. Trustworthy Public Service Footer */}
      <Footer
        onScrollToSupport={handleScrollToSupport}
        onScrollToResources={handleScrollToResources}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* Modals */}
      {/* Scheme Detail Modal (with "What you'll need" checklist) */}
      <SchemeDetailModal
        scheme={selectedScheme}
        plan={selectedScheme ? plans[selectedScheme.id] : undefined}
        onClose={() => setSelectedScheme(null)}
        onOpenPlanModal={(scheme) => {
          setSelectedScheme(null);
          setSchemeForPlanning(scheme);
        }}
      />

      {/* Plan the First Move Modal (Intention-setting + optional social support) */}
      <PlanFirstMoveModal
        isOpen={Boolean(schemeForPlanning)}
        scheme={schemeForPlanning}
        onClose={() => setSchemeForPlanning(null)}
        onCompletePlan={handleCompletePlan}
      />

      {/* Support Calculator Modal */}
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
