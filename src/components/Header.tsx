import React, { useState } from 'react';
import { Compass, Search, Home, ChevronDown, SlidersHorizontal, Check } from 'lucide-react';
import { DemoHousehold } from '../types';

interface HeaderProps {
  household: DemoHousehold;
  onOpenCalculator: () => void;
  onOpenSearch: () => void;
  onScrollToStartHere: () => void;
  onScrollToAllSchemes: () => void;
}

export function Header({
  household,
  onOpenCalculator,
  onOpenSearch,
  onScrollToStartHere,
  onScrollToAllSchemes
}: HeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo Container */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-tr from-teal-600 via-blue-600 to-indigo-700 shadow-xs shadow-blue-200">
              <Compass className="w-5 h-5 text-white stroke-[2.2]" />
            </div>
            <div className="leading-none text-left">
              <span className="block text-xl font-bold tracking-tight text-gray-900 font-sans">
                HelpCompass
              </span>
              <span className="block text-[10px] font-semibold text-gray-500 tracking-wider uppercase">
                SG · Support Directory
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-700">
            <button
              onClick={onScrollToStartHere}
              className="text-gray-700 hover:text-blue-700 transition-colors cursor-pointer"
            >
              Start here
            </button>
            <button
              onClick={onScrollToAllSchemes}
              className="text-gray-700 hover:text-blue-700 transition-colors cursor-pointer"
            >
              All support
            </button>
            <button
              onClick={onOpenCalculator}
              className="text-gray-700 hover:text-blue-700 transition-colors cursor-pointer"
            >
              Support calculator
            </button>
          </nav>
        </div>

        {/* Right Action Area: Household Profile Indicator & Search */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenSearch}
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
            aria-label="Search schemes"
            title="Search schemes"
          >
            <Search className="w-4 h-4 text-blue-700" />
          </button>

          {/* Household Context Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 pl-2.5 pr-3 py-1.5 text-xs font-semibold text-gray-800 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors cursor-pointer bg-blue-50/40"
            >
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                <Home className="w-3 h-3" />
              </div>
              <span className="hidden sm:inline font-medium text-gray-900">
                {household.name}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-3.5 z-50 animate-in fade-in duration-100 text-left">
                <div className="px-2 py-1.5 border-b border-gray-100 mb-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    Household Details
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {household.householdLabel}
                  </p>
                </div>

                <div className="px-2 py-1 text-xs text-gray-600 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Dwelling:</span>
                    <strong className="text-gray-900">{household.dwellingType}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Estimated Total:</span>
                    <strong className="text-emerald-700 font-bold">${household.estimatedTotal}/year</strong>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-gray-100">
                  <button
                    onClick={() => {
                      onOpenCalculator();
                      setProfileOpen(false);
                    }}
                    className="w-full text-center px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100/70 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                    Adjust Household Profile
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
