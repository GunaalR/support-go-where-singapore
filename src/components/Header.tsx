import React, { useState } from 'react';
import { Compass, Search, Globe } from 'lucide-react';

interface HeaderProps {
  onOpenCalculator: () => void;
  onOpenSearch: () => void;
  onScrollToSupport: () => void;
  onScrollToResources: () => void;
}

export function Header({
  onOpenCalculator,
  onOpenSearch,
  onScrollToSupport,
  onScrollToResources
}: HeaderProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | '中文' | 'Melayu' | 'தமிழ்'>('English');
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages: Array<'English' | '中文' | 'Melayu' | 'தமிழ்'> = ['English', '中文', 'Melayu', 'தமிழ்'];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Logo Container */}
        <div className="flex items-center gap-8 lg:gap-12">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-700 text-white shadow-xs">
              <Compass className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="leading-none text-left">
              <span className="block text-xl font-bold tracking-tight text-gray-900 font-sans">
                HelpCompass SG
              </span>
              <span className="block text-[11px] font-medium text-gray-500 tracking-wide mt-0.5">
                Public Support Directory
              </span>
            </div>
          </a>

          {/* Primary Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <button
              onClick={onScrollToSupport}
              className="text-gray-700 hover:text-blue-700 transition-colors cursor-pointer py-1"
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

        {/* Right Action Area: Language Selector & Search (Strictly NO login/account) */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Language Selector: English | 中文 | Melayu | தமிழ் */}
          <div className="hidden lg:flex items-center text-xs text-gray-600 gap-1.5 font-medium">
            <Globe className="w-3.5 h-3.5 text-gray-400 mr-0.5" />
            {languages.map((lang, index) => (
              <React.Fragment key={lang}>
                <button
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-1 py-0.5 rounded transition-colors cursor-pointer ${
                    selectedLanguage === lang
                      ? 'font-bold text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label={`Select language ${lang}`}
                >
                  {lang}
                </button>
                {index < languages.length - 1 && (
                  <span className="text-gray-300 select-none">|</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Compact Mobile Language Menu */}
          <div className="relative lg:hidden">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              aria-label="Language selection"
            >
              <Globe className="w-3.5 h-3.5 text-gray-500" />
              <span>{selectedLanguage}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in duration-100 text-left">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs ${
                      selectedLanguage === lang
                        ? 'font-bold text-blue-700 bg-blue-50/50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button 
            onClick={onOpenSearch}
            className="h-9 px-3 sm:px-3.5 rounded-lg border border-gray-300 flex items-center gap-2 text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors cursor-pointer text-xs font-medium"
            aria-label="Search directory"
            title="Search directory"
          >
            <Search className="w-4 h-4 text-gray-500" />
            <span className="hidden sm:inline">Search</span>
          </button>

        </div>

      </div>
    </header>
  );
}
