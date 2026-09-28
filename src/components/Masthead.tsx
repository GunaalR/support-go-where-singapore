import { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, HeartHandshake } from 'lucide-react';

export function Masthead() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#F4F6F8] border-b border-gray-200 py-1.5 px-4 text-[11px] text-[#475467]" data-purpose="service-masthead">
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="font-medium text-gray-700">HelpCompass SG — Public Household Support Navigator</span>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-blue-700 underline hover:text-blue-900 ml-1 inline-flex items-center gap-0.5 cursor-pointer font-medium"
              aria-expanded={isOpen}
            >
              How this service works
              {isOpen ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="pt-3 pb-2 border-t border-gray-200 mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600 animate-in fade-in duration-150">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Privacy & Data Protection</p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  HelpCompass SG does not collect, track, or store personal identity numbers, bank accounts, or confidential credentials. All calculations run securely in your browser.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <HeartHandshake className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Clear, Guided Assistance</p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Designed to help families and caregivers navigate support schemes with less stress by highlighting practical starting points and step-by-step preparation checklists.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
