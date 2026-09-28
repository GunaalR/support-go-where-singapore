import React from 'react';

interface LanguageBarProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}

export function LanguageBar({ currentLang, onLanguageChange }: LanguageBarProps) {
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'zh', label: '中文' },
    { code: 'ms', label: 'Melayu' },
    { code: 'ta', label: 'தமிழ்' }
  ];

  return (
    <div className="border-b border-gray-200 bg-[#FCFCFD] text-xs py-2 px-4 sm:px-6 lg:px-8 text-gray-500" data-purpose="language-selector">
      <div className="max-w-7xl mx-auto flex items-center gap-2">
        <span className="text-gray-500 font-medium">Read this in:</span>
        <div className="flex items-center gap-2">
          {languages.map((lang, idx) => (
            <React.Fragment key={lang.code}>
              <button
                onClick={() => onLanguageChange(lang.code)}
                className={`cursor-pointer transition-colors ${
                  currentLang === lang.code
                    ? 'font-bold text-gray-900 underline underline-offset-4 decoration-[#175CD3]'
                    : 'hover:text-gray-900 text-gray-600'
                }`}
              >
                {lang.label}
              </button>
              {idx < languages.length - 1 && (
                <span className="text-gray-300 select-none">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
