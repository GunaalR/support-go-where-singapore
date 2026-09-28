import { useState } from 'react';
import { ChevronDown, ChevronUp, Lock, Globe } from 'lucide-react';

export function GovMasthead() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#F0F2F5] border-b border-gray-200 py-1.5 px-4 sm:px-6 lg:px-8 text-[11px] text-[#475467]" data-purpose="gov-masthead">
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Singapore Crest Graphic */}
            <svg 
              className="w-3.5 h-3.5 text-red-600 shrink-0" 
              fill="currentColor" 
              viewBox="0 0 24 24"
              aria-label="Singapore Crest"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            <span className="font-normal text-gray-700">A Singapore Government Agency Website</span>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#175CD3] underline hover:text-blue-900 ml-1 inline-flex items-center gap-0.5 cursor-pointer font-medium"
              aria-expanded={isOpen}
            >
              How to identify
              {isOpen ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
            </button>
          </div>
        </div>

        {/* Expandable How To Identify Section */}
        {isOpen && (
          <div className="pt-3 pb-2 border-t border-gray-200 mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600 animate-in fade-in duration-150 text-left">
            <div className="flex items-start gap-2.5">
              <Globe className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Official website links end with .gov.sg</p>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                  Government agency websites end with .gov.sg. Before sharing any sensitive information, check the address bar of your browser.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Secure websites use HTTPS</p>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                  Look for a lock icon in your browser address bar or check that the web address begins with https:// for secure transmission.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
