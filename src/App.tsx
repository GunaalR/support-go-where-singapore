import { useState } from 'react';
import { Scheme } from './types';
import { FICTIONAL_SCHEMES } from './data/fictionalSchemes';
import { GovMasthead } from './components/GovMasthead';
import { Header } from './components/Header';
import { LanguageBar } from './components/LanguageBar';
import { HomePage } from './components/HomePage';
import { BudgetCalculatorModal } from './components/BudgetCalculatorModal';
import { SchemeDetailModal } from './components/SchemeDetailModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSelectTopic = (topicId: string) => {
    const el = document.getElementById('explore-topics');
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

  const handleScrollToSupport = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 font-sans antialiased flex flex-col selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. Singapore Government Agency Masthead (Service identification bar, NOT a language selector) */}
      <GovMasthead />

      {/* 2. Original SupportGoWhere Header (Logo, Support, Resources & Tools, Search, Log in) */}
      <Header
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectTopic={handleSelectTopic}
        onScrollToResources={handleScrollToResources}
      />

      {/* 3. The ONLY Language Selector (Placed directly below main navigation) */}
      <LanguageBar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
      />

      {/* 4. Original SupportGoWhere Homepage with Guided AI Assistant */}
      <main className="flex-1">
        <HomePage
          schemes={FICTIONAL_SCHEMES}
          onSelectScheme={(scheme) => setSelectedScheme(scheme)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />
      </main>

      {/* 5. SupportGoWhere Footer (No duplicate language selector) */}
      <Footer
        onScrollToSupport={handleScrollToSupport}
        onScrollToResources={handleScrollToResources}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* Interactive Modals */}
      <SchemeDetailModal
        scheme={selectedScheme}
        onClose={() => setSelectedScheme(null)}
        onOpenPlanModal={() => {}}
      />

      <BudgetCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onApplyResults={() => {
          setIsCalculatorOpen(false);
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectScheme={(scheme) => setSelectedScheme(scheme)}
      />

    </div>
  );
}
