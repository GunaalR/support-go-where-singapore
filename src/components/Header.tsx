import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, LogIn, ExternalLink } from 'lucide-react';

interface HeaderProps {
  onOpenCalculator: () => void;
  onOpenSearch: () => void;
  onSelectTopic: (topicId: string) => void;
  onScrollToResources: () => void;
  onOpenLogin?: () => void;
}

export function Header({
  onOpenCalculator,
  onOpenSearch,
  onSelectTopic,
  onScrollToResources,
  onOpenLogin
}: HeaderProps) {
  const [supportMenuOpen, setSupportMenuOpen] = useState(false);
  const [resourcesMenuOpen, setResourcesMenuOpen] = useState(false);
  const supportRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (supportRef.current && !supportRef.current.contains(event.target as Node)) {
        setSupportMenuOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setResourcesMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* SupportGoWhere Original Logo */}
        <div className="flex items-center gap-8 lg:gap-10">
          <a href="#" className="flex items-center gap-2.5 group cursor-pointer" aria-label="SupportGoWhere Home">
            <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-tr from-amber-400 via-rose-500 to-red-500 shadow-xs shadow-red-200">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div className="leading-none text-left">
              <span className="block text-xl font-bold tracking-tight text-gray-900 font-sans">
                Support
              </span>
              <span className="block text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                GoWhere
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            
            {/* Support Dropdown */}
            <div className="relative" ref={supportRef}>
              <button 
                onClick={() => {
                  setSupportMenuOpen(!supportMenuOpen);
                  setResourcesMenuOpen(false);
                }}
                className="inline-flex items-center gap-1.5 hover:text-[#175CD3] transition-colors cursor-pointer py-2 text-gray-800"
                aria-expanded={supportMenuOpen}
              >
                <span>Support</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {supportMenuOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in duration-100 text-left">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    Browse Categories
                  </div>
                  <button
                    onClick={() => {
                      onSelectTopic('financial');
                      setSupportMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>Financial Support & Benefits</span>
                    <span className="text-[10px] text-gray-400">14 schemes</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectTopic('caregiving');
                      setSupportMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>Caregiving Support</span>
                    <span className="text-[10px] text-gray-400">8 schemes</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectTopic('work');
                      setSupportMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>Work & Employment</span>
                    <span className="text-[10px] text-gray-400">10 schemes</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectTopic('housing');
                      setSupportMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>Housing & Shelters</span>
                    <span className="text-[10px] text-gray-400">6 schemes</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectTopic('healthcare');
                      setSupportMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>Healthcare & Well-being</span>
                    <span className="text-[10px] text-gray-400">12 schemes</span>
                  </button>
                </div>
              )}
            </div>

            {/* Resources & Tools Dropdown */}
            <div className="relative" ref={resourcesRef}>
              <button 
                onClick={() => {
                  setResourcesMenuOpen(!resourcesMenuOpen);
                  setSupportMenuOpen(false);
                }}
                className="inline-flex items-center gap-1.5 hover:text-[#175CD3] transition-colors cursor-pointer py-2 text-gray-800"
                aria-expanded={resourcesMenuOpen}
              >
                <span>Resources & Tools</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {resourcesMenuOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in duration-100 text-left">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    Interactive Tools
                  </div>
                  <button
                    onClick={() => {
                      onOpenCalculator();
                      setResourcesMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors cursor-pointer flex flex-col"
                  >
                    <span className="font-semibold text-gray-900">Budget 2026 Calculator</span>
                    <span className="text-[11px] text-gray-500">Calculate CDC vouchers & AP payouts</span>
                  </button>
                  <button
                    onClick={() => {
                      onScrollToResources();
                      setResourcesMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors cursor-pointer flex flex-col"
                  >
                    <span className="font-semibold text-gray-900">Directory of SSOs</span>
                    <span className="text-[11px] text-gray-500">Find your nearest Social Service Office</span>
                  </button>
                </div>
              )}
            </div>

          </nav>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenSearch}
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
            aria-label="Search schemes"
            title="Search schemes"
          >
            <Search className="w-4 h-4 text-[#175CD3]" />
          </button>

          <button 
            onClick={onOpenLogin || onOpenCalculator}
            className="px-4 py-1.5 text-sm font-semibold text-[#175CD3] border border-[#175CD3] rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
          >
            Log in
          </button>
        </div>

      </div>
    </header>
  );
}
