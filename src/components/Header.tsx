import React, { useState } from 'react';
import { Compass, Search, Globe, ChevronRight } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'results';
  onNavigateHome: () => void;
  onNavigateResults: () => void;
  onOpenCalculator: () => void;
  onOpenSearch: () => void;
  onScrollToResources: () => void;
  hasAssessmentResults?: boolean;
}

export function Header({
  currentView,
  onNavigateHome,
  onNavigateResults,
  onOpenCalculator,
  onOpenSearch,
  onScrollToResources,
  hasAssessmentResults = true
}: HeaderProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | '中文' | 'Melayu' | 'தமிழ்'>('English');
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages: Array<'English' | '中文' | 'Melayu' | 'தமிழ்'> = ['English', '中文', 'Melayu', 'தமிழ்'];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      
      {/* Top Language Bar (SupportGoWhere style: "Read this in: English | 中文 | Melayu | தமிழ்") */}
      <div className="bg-gray-50 border-b border-gray-200/70 py-1 px-4 sm:px-6 lg:px-8 text-[11px] text-gray-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-medium">
            <Globe className="w-3.5 h-3.5 text-gray-400 mr-1" />
            <span className="text-gray-500 mr-1">Read this in:</span>
            {languages.map((lang, index) => (
              <React.Fragment key={lang}>
                <button
                  onClick={() => setSelectedLanguage(lang)}
                  className={`cursor-pointer transition-colors ${
                    selectedLanguage === lang
                      ? 'font-bold text-blue-700 underline'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {lang}
                </button>
                {index < languages.length - 1 && (
                  <span className="text-gray-300 select-none">|</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="text-[11px] text-gray-400 hidden md:inline">
            Free independent community directory for Singapore households
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Container */}
        <div className="flex items-center gap-8 lg:gap-10">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-3 group text-left cursor-pointer"
            aria-label="HelpCompass SG Home"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-700 text-white shadow-xs group-hover:bg-blue-800 transition-colors">
              <Compass className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="leading-none">
              <span className="block text-xl font-bold tracking-tight text-gray-900 font-sans">
                HelpCompass SG
              </span>
              <span className="block text-[11px] font-medium text-gray-500 tracking-wide mt-0.5">
                Public Support Directory
              </span>
            </div>
          </button>

          {/* Primary Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-700">
            <button
              onClick={onNavigateHome}
              className={`transition-colors cursor-pointer py-1 ${
                currentView === 'home'
                  ? 'text-blue-700 font-bold'
                  : 'text-gray-700 hover:text-blue-700'
              }`}
            >
              Support
            </button>
            <button
              onClick={onScrollToResources}
              className="text-gray-700 hover:text-blue-700 transition-colors cursor-pointer py-1"
            >
              Resources & Tools
            </button>
            <button
              onClick={onOpenCalculator}
              className="text-gray-700 hover:text-blue-700 transition-colors cursor-pointer py-1"
            >
              Support Calculator
            </button>
          </nav>
        </div>

        {/* Right Action Area */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Quick Results View Toggle Button */}
          {hasAssessmentResults && (
            <button
              onClick={currentView === 'results' ? onNavigateHome : onNavigateResults}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'results'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
              <span>{currentView === 'results' ? 'Assessment Results' : 'View Results ($3,300)'}</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-70" />
            </button>
          )}

          {/* Search Trigger */}
          <button 
            onClick={onOpenSearch}
            className="h-9 px-3 sm:px-3.5 rounded-lg border border-gray-300 flex items-center gap-2 text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors cursor-pointer text-xs font-medium"
            aria-label="Search schemes"
            title="Search schemes"
          >
            <Search className="w-4 h-4 text-gray-500" />
            <span className="hidden sm:inline">Search</span>
          </button>

        </div>

      </div>
    </header>
  );
}
