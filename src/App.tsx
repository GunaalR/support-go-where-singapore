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
import { ResultsScreenA } from './variantA/ResultsScreenA';
import { ResultsScreenB } from './variantB/ResultsScreenB';
import { clearArm, useVariant } from './study/useVariant';
import { ConsentScreen, DebriefScreen, FinishBar, CONSENT_KEY, hasConsented } from './study/StudyScreens';
import { VariantToggle } from './study/VariantToggle';

// ?v=A (or no ?v=) shows variant A, ?v=B shows variant B, ?v=home the homepage.
// The switch lives in src/study/ (M1).

export default function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { view, setView } = useVariant();
  // A/B study flow (MS-7): consent once, then the version, then a debrief
  const [consented, setConsented] = useState(hasConsented);
  const [debrief, setDebrief] = useState(false);
  const showStudy = (next: typeof view) => {
    setDebrief(false);
    setView(next);
  };

  // homepage sections only exist on the homepage, so go there first
  const scrollOnHome = (id: string) => {
    const go = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    if (view === 'home') go();
    else {
      setView('home');
      setTimeout(go, 50);
    }
  };

  const handleSelectTopic = (_topicId: string) => {
    scrollOnHome('explore-topics');
  };

  const handleScrollToResources = () => {
    scrollOnHome('resources-and-tools');
  };

  const handleScrollToSupport = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 font-sans antialiased flex flex-col selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. Prototype notice bar (Service identification bar, NOT a language selector) */}
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
      {/* pb-24 keeps the floating A/B switch from covering the last line */}
      <main className="flex-1 pb-24">
        {consented && view === 'home' && (
          <HomePage
            schemes={FICTIONAL_SCHEMES}
            onSelectScheme={(scheme) => setSelectedScheme(scheme)}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
          />
        )}
        {!consented ? (
          <ConsentScreen onAgree={() => setConsented(true)} />
        ) : debrief && view !== 'home' ? (
          <DebriefScreen
            view={view}
            onSeeOther={() => showStudy(view === 'B' ? 'A' : 'B')}
            onBack={() => showStudy(view)}
            onRestart={() => {
              clearArm();
              try {
                window.localStorage.removeItem(CONSENT_KEY);
              } catch {
                // nothing stored
              }
              window.location.href = window.location.pathname;
            }}
          />
        ) : (
          <>
            {view === 'A' && <ResultsScreenA onBack={() => setView('home')} />}
            {view === 'B' && <ResultsScreenB onBack={() => setView('home')} />}
            {view !== 'home' && (
              <FinishBar
                onFinish={() => {
                  setDebrief(true);
                  window.scrollTo({ top: 0 });
                }}
              />
            )}
          </>
        )}
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

      {consented && <VariantToggle view={view} onChange={showStudy} />}

    </div>
  );
}
