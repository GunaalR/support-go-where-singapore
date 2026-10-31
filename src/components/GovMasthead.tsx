import { useState } from 'react';
import { ChevronDown, ChevronUp, FlaskConical, ShieldCheck } from 'lucide-react';
import { C } from '../theme/brand';

// Top notice bar. The live site has a "Singapore Government Agency Website"
// bar here; this prototype is fictional, so it says so instead (course rule:
// fictional brand, no real government branding). Same slim bar, same place.

export function GovMasthead() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-1.5 px-4 sm:px-6 lg:px-8 text-[13px]" style={{ backgroundColor: C.brandDeep, color: C.brandOnDeep }} data-purpose="prototype-notice">
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="flex items-start gap-2">
          <FlaskConical className="w-4 h-4 shrink-0 mt-px" aria-hidden="true" />
          <p>
          <span className="mr-2">HelpCompass SG is a class prototype. Not a government website.</span>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-0.5 font-semibold text-white underline underline-offset-2 cursor-pointer"
            aria-expanded={isOpen}
          >
            About this prototype
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" /> : <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />}
          </button>
          </p>
        </div>

        {isOpen && (
          <div className="pt-3 pb-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-left" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <div className="flex items-start gap-2.5">
              <FlaskConical className="w-4 h-4 shrink-0 mt-0.5 text-white" aria-hidden="true" />
              <div>
                <p className="font-semibold text-white">Built for a university course</p>
                <p className="mt-0.5 leading-relaxed">
                  A student project for MGMT6108 Decision Architecture for Managers at Singapore Management University.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-white" aria-hidden="true" />
              <div>
                <p className="font-semibold text-white">Fictional names and data</p>
                <p className="mt-0.5 leading-relaxed">
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
