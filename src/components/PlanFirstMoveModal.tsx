import React, { useState } from 'react';
import { X, Calendar, Share2, CheckCircle2, ArrowRight, Copy, Check } from 'lucide-react';
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
  }. Checklist to prepare: ${scheme.whatYouNeed.slice(0, 2).join(', ')}.`;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl border border-gray-100 relative text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 cursor-pointer p-1.5 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: When will you take the next step? */}
        {step === 'timeframe' && (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md w-fit mb-3.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Planning Step</span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-2">
              When will you take the next step?
            </h3>
            
            <p className="text-xs text-gray-600 leading-relaxed mb-6">
              Choosing a specific time helps turn your intention to apply for <strong>{scheme.title}</strong> into a concrete, low-stress plan.
            </p>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleTimeframeSelect('Today')}
                className="w-full p-4 rounded-xl border border-gray-200 hover:border-blue-600 hover:bg-blue-50/30 text-left transition-all cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-blue-700">
                    Today
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Take 5 minutes to gather your basic documents now.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => handleTimeframeSelect('This weekend')}
                className="w-full p-4 rounded-xl border border-gray-200 hover:border-blue-600 hover:bg-blue-50/30 text-left transition-all cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-blue-700">
                    This weekend
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Set aside quiet time on Saturday or Sunday to prepare.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => handleTimeframeSelect('Remind me')}
                className="w-full p-4 rounded-xl border border-gray-200 hover:border-blue-600 hover:bg-blue-50/30 text-left transition-all cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-blue-700">
                    Remind me
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Save this to your browser so it's easy to return to.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Clear and equally prominent Skip option */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                You can always decide later
              </span>
              <button
                onClick={handleSkipPlanning}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Optional Social Support ("Do this with someone") */}
        {step === 'buddy' && (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md w-fit mb-3.5">
              <Share2 className="w-3.5 h-3.5" />
              <span>Optional Support</span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-2">
              Do this with someone
            </h3>

            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Planning to apply? You can share a simple checklist with someone you trust.
            </p>

            {/* Generated clean message preview (strictly NO personal data) */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 mb-5 text-xs text-gray-700 leading-relaxed">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                Simple reminder note (No private information):
              </div>
              <p className="italic bg-white p-3 rounded-lg border border-gray-200 text-gray-800">
                "{shareText}"
              </p>
              <div className="mt-2.5 flex justify-end">
                <button
                  onClick={handleCopyShare}
                  className="px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-50 border border-blue-200 rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Copied note
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy note
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons: Finish vs Skip (Equally prominent) */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
              <button
                onClick={() => handleFinishWithBuddy(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                Skip
              </button>

              <button
                onClick={() => handleFinishWithBuddy(true)}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                Done & Save Plan
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
