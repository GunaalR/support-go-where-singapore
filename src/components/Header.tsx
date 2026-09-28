import React, { useState } from 'react';
import { Compass, Search, UserCheck, RotateCcw, ChevronDown, CheckCircle2 } from 'lucide-react';
import { DemoHousehold } from '../types';

interface HeaderProps {
  household: DemoHousehold;
  onOpenCalculator: () => void;
  onOpenSearch: () => void;
  onResetHousehold: () => void;
  onScrollToResults: () => void;
}

export function Header({
  household,
  onOpenCalculator,
  onOpenSearch,
  onResetHousehold,
  onScrollToResults
}: HeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo Container */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-tr from-teal-500 via-blue-600 to-indigo-600 shadow-xs shadow-blue-200">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div className="leading-none text-left">
              <span className="block text-xl font-bold tracking-tight text-gray-900 font-sans">
                HelpCompass
              </span>
              <span className="block text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                SG · Student Prototype
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <button
              onClick={onScrollToResults}
              className="hover:text-blue-700 transition-colors cursor-pointer"
            >
              Calculated Results
            </button>
            <button
              onClick={onOpenCalculator}
              className="hover:text-blue-700 transition-colors cursor-pointer"
            >
              Assessment Calculator
            </button>
            <span className="text-gray-300">|</span>
            <span className="text-xs text-gray-400 font-normal">
              Course: MGMT 6108
            </span>
          </nav>
        </div>

        {/* Right Action Area: Demo Household Profile & Search */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenSearch}
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
            aria-label="Search schemes"
            title="Search schemes"
          >
            <Search className="w-4 h-4 text-blue-700" />
          </button>

          {/* Household Persona Indicator */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 pl-2.5 pr-3 py-1.5 text-xs font-semibold text-gray-800 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors cursor-pointer bg-blue-50/50"
            >
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                <UserCheck className="w-3 h-3" />
              </div>
              <span className="hidden sm:inline font-medium text-gray-900">
                {household.name}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 z-50 animate-in fade-in duration-100 text-left">
                <div className="px-2 py-1.5 border-b border-gray-100 mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Simulated Household Persona
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {household.householdLabel}
                  </p>
                </div>

                <div className="px-2 py-1 text-xs text-gray-600 space-y-1">
                  <div>Dwelling: <strong className="text-gray-900">{household.dwellingType}</strong></div>
                  <div>Estimated Support: <strong className="text-emerald-700">${household.estimatedTotal}/year</strong></div>
                </div>

                <div className="mt-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => {
                      onResetHousehold();
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-2 py-1.5 text-xs text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-1.5 cursor-pointer font-medium"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset Fictional Persona
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
