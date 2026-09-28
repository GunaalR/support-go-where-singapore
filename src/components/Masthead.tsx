import { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, GraduationCap } from 'lucide-react';

export function Masthead() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#F0F2F5] border-b border-gray-200 py-1 px-4 text-[11px] text-[#475467]" data-purpose="masthead">
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-3.5 h-3.5 text-blue-700 shrink-0" />
            <span className="font-medium text-gray-700">HelpCompass SG — Academic Student Prototype</span>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-blue-700 underline hover:text-blue-900 ml-1 inline-flex items-center gap-0.5 cursor-pointer font-medium"
              aria-expanded={isOpen}
            >
              Ethics & Research Protocol
              {isOpen ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="pt-3 pb-2 border-t border-gray-200 mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600 animate-in fade-in duration-150">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Zero Real Data Collection</p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  No NRIC, names, addresses, or banking information are collected or stored. The prototype runs purely in the client browser with simulated mock data.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <GraduationCap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Decision Architecture Testing</p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Testing whether structured choice architecture ("Start Here" + implementation intention planning) reduces cognitive overload and friction without coercion or deceptive dark patterns.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
