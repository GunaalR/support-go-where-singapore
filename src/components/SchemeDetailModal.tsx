import { useState } from 'react';
import { X, CheckCircle2, Bookmark, BookmarkCheck, ArrowRight, ShieldCheck, FileText, Banknote, Calendar, CheckSquare } from 'lucide-react';
import { Scheme, Variant, FirstMovePlan } from '../types';

interface SchemeDetailModalProps {
  scheme: Scheme | null;
  variant: Variant;
  plan?: FirstMovePlan;
  onClose: () => void;
  onOpenPlanModal: (scheme: Scheme) => void;
}

export function SchemeDetailModal({
  scheme,
  variant,
  plan,
  onClose,
  onOpenPlanModal
}: SchemeDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'what_you_need'>('overview');
  const [isSaved, setIsSaved] = useState(false);

  if (!scheme) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative my-8 text-left">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              {scheme.agencyAbbr}
            </span>
            <span className="text-xs text-gray-500">{scheme.agency}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isSaved 
                  ? 'bg-blue-50 border-blue-200 text-blue-600' 
                  : 'hover:bg-gray-100 border-gray-200 text-gray-500'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save scheme'}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="mb-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              {scheme.title}
            </h2>
            <span className="text-base font-extrabold text-emerald-700">
              ${scheme.estimatedValue}/year
            </span>
          </div>

          <p className="text-xs text-gray-500 font-medium">
            {scheme.subtitle}
          </p>
        </div>

        {/* In Variant B: Show Action Status Badge explicitly */}
        {variant === 'B' && (
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {scheme.actionStatus === 'automatic' ? (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-3 py-1 rounded-lg inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Automatic — nothing to do
              </span>
            ) : (
              <span className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-lg">
                Action Required: You need to apply
              </span>
            )}

            {plan?.timeframe && (
              <span className="text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                Planned next step: {plan.timeframe}
              </span>
            )}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-5 gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 cursor-pointer transition-colors border-b-2 ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('eligibility')}
            className={`pb-2.5 cursor-pointer transition-colors border-b-2 ${
              activeTab === 'eligibility'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Eligibility Criteria
          </button>
          
          {/* "What you'll need" tab (Highlighted in Variant B per prompt) */}
          <button
            onClick={() => setActiveTab('what_you_need')}
            className={`pb-2.5 cursor-pointer transition-colors border-b-2 ${
              activeTab === 'what_you_need'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            What you'll need
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-48 text-xs text-gray-700 leading-relaxed mb-6">
          {activeTab === 'overview' && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <p className="text-gray-600 text-sm">
                {scheme.description}
              </p>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="font-semibold text-gray-900 mb-1 flex items-center gap-1.5">
                  <Banknote className="w-4 h-4 text-emerald-600" />
                  Disbursement Schedule
                </div>
                <p className="text-gray-600 text-xs">
                  {scheme.disbursement}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'eligibility' && (
            <div className="space-y-3 animate-in fade-in duration-100">
              <p className="text-gray-600 mb-2 font-medium">
                Household eligibility requirements:
              </p>
              <ul className="space-y-2">
                {scheme.eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'what_you_need' && (
            <div className="space-y-3 animate-in fade-in duration-100">
              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 mb-3">
                <div className="font-semibold text-blue-900 flex items-center gap-1.5 mb-1">
                  <CheckSquare className="w-4 h-4 text-blue-700" />
                  Preparation Checklist
                </div>
                <p className="text-[11px] text-blue-800">
                  Gather these basic items beforehand so that the application process takes minimal effort.
                </p>
              </div>

              <div className="space-y-2">
                {scheme.whatYouNeed.map((item, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            Fictional Scheme Reference (HelpCompass SG)
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>

            {/* In Variant B: "Plan the First Move" button if action is needed */}
            {variant === 'B' && scheme.actionStatus === 'apply' && (
              <button
                onClick={() => {
                  onClose();
                  onOpenPlanModal(scheme);
                }}
                className="w-full sm:w-auto px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl inline-flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5" />
                {plan?.timeframe ? 'Update Next Step' : 'Plan the First Move'}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
