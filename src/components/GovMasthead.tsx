import { useState } from 'react';
import { ChevronDown, ChevronUp, FlaskConical, ShieldCheck } from 'lucide-react';

// Top notice bar. The live site has a "Singapore Government Agency Website"
// bar here. This prototype is fictional, so it says so instead (course rule:
// fictional brand, no real government branding). Same slim bar, same place.

export function GovMasthead() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#F0F2F5] border-b border-gray-200 py-1.5 px-4 sm:px-6 lg:px-8 text-[11px] text-[#475467]" data-purpose="prototype-notice">
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FlaskConical className="w-3.5 h-3.5 text-gray-500 shrink-0" aria-hidden="true" />
            <span className="font-normal text-gray-700">HelpCompass SG is a class prototype. Not a government website.</span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#175CD3] underline hover:text-blue-900 ml-1 inline-flex items-center gap-0.5 cursor-pointer font-medium"
              aria-expanded={isOpen}
            >
              About this prototype
              {isOpen ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
            </button>
          </div>
        </div>

        {/* Expandable About section */}
        {isOpen && (
          <div className="pt-3 pb-2 border-t border-gray-200 mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600 animate-in fade-in duration-150 text-left">
            <div className="flex items-start gap-2.5">
              <FlaskConical className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Built for a university course</p>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                  A student project for MGMT 6108 Decision Architecture for Managers at Singapore Management University.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Fictional names and data</p>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                  Every scheme, amount and household here is made up. Nothing you do is sent or stored, and no real application is made.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
