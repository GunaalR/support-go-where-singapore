import React from 'react';
import { Variant } from '../types';
import { Compass, Sparkles, SlidersHorizontal, Info } from 'lucide-react';

interface StudentResearchBannerProps {
  variant: Variant;
  onVariantChange: (v: Variant) => void;
}

export function StudentResearchBanner({ variant, onVariantChange }: StudentResearchBannerProps) {
  return (
    <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-bold text-amber-400 bg-amber-950/80 border border-amber-600/40 px-2 py-0.5 rounded text-[10px] uppercase tracking-wide">
            <Compass className="w-3 h-3" />
            MGMT 6108 Prototype
          </span>
          <span className="text-slate-300 hidden md:inline text-[11px]">
            Decision Architecture for Managers · Fictional Prototype (HelpCompass SG)
          </span>
        </div>

        {/* Condition / Variant Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-slate-400" />
            Condition:
          </span>
          <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => onVariantChange('A')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                variant === 'A'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Variant A: Baseline
            </button>
            <button
              onClick={() => onVariantChange('B')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                variant === 'B'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Variant B: Start Here + Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
