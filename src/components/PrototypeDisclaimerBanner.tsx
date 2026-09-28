import { useState } from 'react';
import { X, Info, ShieldCheck } from 'lucide-react';

export function PrototypeDisclaimerBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside 
      className="bg-[#FFF8E6] border-b border-[#FEEFC3] text-xs text-[#5C3C00] py-2 px-4" 
      data-purpose="academic-disclaimer"
    >
      <div className="max-w-7xl mx-auto flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[11px] sm:text-xs">
            <strong className="font-semibold text-gray-900">Academic Prototype Notice</strong> — 
            This portal is a student decision architecture research project under course <strong>MGMT 6108 (Decision Architecture for Managers)</strong>. All schemes, monetary values, and household personas are strictly fictional. No real personal data or government applications are collected.
          </p>
        </div>
        <button 
          aria-label="Dismiss notice" 
          onClick={() => setIsVisible(false)}
          className="text-amber-800/60 hover:text-amber-900 shrink-0 cursor-pointer p-0.5" 
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
