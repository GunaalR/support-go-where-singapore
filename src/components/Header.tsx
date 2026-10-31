import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, LogIn, ExternalLink } from 'lucide-react';
import { BrandMark } from './BrandMark';

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
    <header className="bg-white/95 backdrop-blur border-b border-[#E2E8F0] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* HelpCompass SG logo (fictional brand, layout kept from the live site) */}
        <div className="flex items-center gap-8 lg:gap-10">
          <a href="#" className="flex items-center gap-2.5 group cursor-pointer" aria-label="HelpCompass SG home">
            <BrandMark className="w-10 h-10" />
            <div className="leading-none text-left">
              <span className="block text-xl font-extrabold tracking-tight text-[#0F1E2E]" style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
                HelpCompass
              </span>
              <span className="block text-[10px] font-bold text-[#0B5A7A] tracking-[0.2em] uppercase">
                SG
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-[15px] font-semibold text-[#334155]">
            
            {/* Support Dropdown */}
            <div className="relative" ref={supportRef}>
              <button 
                onClick={() => {
                  setSupportMenuOpen(!supportMenuOpen);
                  setResourcesMenuOpen(false);
                }}
                className="inline-flex items-center gap-1.5 hover:text-[#0B5A7A] transition-colors cursor-pointer py-2 text-gray-800"
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
                    className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-[#E8F3F7] hover:text-[#0B5A7A] rounded-lg transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>Financial Support & Benefits</span>
                    <span className="text-[10px] text-gray-400">14 schemes</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectTopic('caregiving');
                      setSupportMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-[#E8F3F7] hover:text-[#0B5A7A] rounded-lg transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>Caregiving Support</span>
                    <span className="text-[10px] text-gray-400">8 schemes</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectTopic('work');
                      setSupportMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-[#E8F3F7] hover:text-[#0B5A7A] rounded-lg transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>Work & Employment</span>
                    <span className="text-[10px] text-gray-400">10 schemes</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectTopic('housing');
                      setSupportMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-[#E8F3F7] hover:text-[#0B5A7A] rounded-lg transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>Housing & Shelters</span>
                    <span className="text-[10px] text-gray-400">6 schemes</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectTopic('healthcare');
                      setSupportMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-[#E8F3F7] hover:text-[#0B5A7A] rounded-lg transition-colors cursor-pointer flex items-center justify-between"
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
                className="inline-flex items-center gap-1.5 hover:text-[#0B5A7A] transition-colors cursor-pointer py-2 text-gray-800"
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
                    <span className="text-[11px] text-gray-500">Estimate your vouchers, rebates and cash payouts</span>
                  </button>
                  <button
                    onClick={() => {
                      onScrollToResources();
                      setResourcesMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-[#E8F3F7] hover:text-[#0B5A7A] rounded-lg transition-colors cursor-pointer flex flex-col"
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
            className="w-10 h-10 rounded-full border border-[#CBD5E1] flex items-center justify-center text-[#334155] hover:border-[#0B5A7A] hover:bg-[#E8F3F7] transition-colors cursor-pointer"
            aria-label="Search schemes"
            title="Search schemes"
          >
            <Search className="w-4 h-4 text-[#0B5A7A]" />
          </button>

          <button 
            onClick={onOpenLogin || onOpenCalculator}
            className="px-5 py-2 text-sm font-bold text-white bg-[#0B5A7A] rounded-full hover:bg-[#083D54] transition-colors cursor-pointer shadow-[0_4px_12px_-6px_rgba(11,90,122,0.6)]"
          >
            Log in
          </button>
        </div>

      </div>
    </header>
  );
}
