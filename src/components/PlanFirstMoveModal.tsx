import React, { useState } from 'react';
import { X, ArrowRight, Copy, Check, Calendar, HeartHandshake } from 'lucide-react';
import { Scheme, FirstMovePlan } from '../types';

interface PlanFirstMoveModalProps {
  isOpen: boolean;
  scheme: Scheme | null;
  onClose: () => void;
  onCompletePlan: (plan: FirstMovePlan) => void;
}

export function PlanFirstMoveModal({
  isOpen,
  scheme,
  onClose,
  onCompletePlan
}: PlanFirstMoveModalProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'Today' | 'This weekend' | 'Remind me' | null>(null);
  const [step, setStep] = useState<'timeframe' | 'buddy'>('timeframe');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !scheme) return null;

  const handleTimeframeSelect = (timeframe: 'Today' | 'This weekend' | 'Remind me') => {
    setSelectedTimeframe(timeframe);
    setStep('buddy');
  };

  const handleSkipPlanning = () => {
    onCompletePlan({
      schemeId: scheme.id,
      timeframe: null,
      sharedWithSomeone: false
    });
    onClose();
  };

  const shareText = `Planning to apply for "${scheme.title}" ${
    selectedTimeframe ? selectedTimeframe.toLowerCase() : 'soon'
  }. Checklist: ${scheme.whatYouNeed.slice(0, 2).join(', ')}.`;

  const handleCopyShare = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFinishWithBuddy = (shared: boolean) => {
    onCompletePlan({
      schemeId: scheme.id,
      timeframe: selectedTimeframe,
      sharedWithSomeone: shared,
      buddyMessage: shared ? shareText : undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-xl border border-gray-200 relative text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: When will you take the next step? */}
        {step === 'timeframe' && (
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>Next step</span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-2">
              When will you take the next step?
            </h3>
            
            <p className="text-xs text-gray-600 leading-relaxed mb-5">
              Planning a quiet moment helps make applying for <strong>{scheme.title}</strong> simpler and less rushed.
            </p>

            <div className="space-y-2.5 mb-6">
              <button
                onClick={() => handleTimeframeSelect('Today')}
                className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 hover:bg-gray-50/50 text-left transition-all cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">
                    Today
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Gather your initial checklist now (around 5 minutes).
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-700 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => handleTimeframeSelect('This weekend')}
                className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 hover:bg-gray-50/50 text-left transition-all cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">
                    This weekend
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Set aside quiet time on Saturday or Sunday.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-700 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => handleTimeframeSelect('Remind me')}
                className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 hover:bg-gray-50/50 text-left transition-all cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">
                    Remind me
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Save this to your session for when you have time.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-700 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Clear and equally prominent Skip option */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                You remain in full control
              </span>
              <button
                onClick={handleSkipPlanning}
                className="px-3.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Optional Social Support ("Need a hand?") */}
        {step === 'buddy' && (
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-gray-400" />
              <span>Optional sharing</span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-2">
              Need a hand?
            </h3>

            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              You can share this simple checklist with someone you trust.
            </p>

            {/* Generated clean message preview (strictly NO personal data) */}
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 mb-5 text-xs text-gray-700 leading-relaxed">
              <div className="text-[10px] font-medium uppercase tracking-wider text-gray-400 mb-1">
                Checklist preview (No personal data):
              </div>
              <p className="italic bg-white p-2.5 rounded-lg border border-gray-200 text-gray-800 text-xs">
                "{shareText}"
              </p>
              <div className="mt-2.5 flex justify-end">
                <button
                  onClick={handleCopyShare}
                  className="px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50 border border-blue-200 rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied checklist</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Share checklist</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons: Finish vs Skip (Equally prominent) */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
              <button
                onClick={() => handleFinishWithBuddy(false)}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                Skip
              </button>

              <button
                onClick={() => handleFinishWithBuddy(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-all cursor-pointer"
              >
                Save plan
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
