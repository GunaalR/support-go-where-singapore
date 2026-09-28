import { useState } from 'react';
import { X, CheckCircle2, Bookmark, BookmarkCheck, ArrowRight, ShieldCheck, Check, Calendar, CheckSquare, AlertCircle } from 'lucide-react';
import { Scheme, FirstMovePlan } from '../types';
import { CategoryIcon } from './CategoryIcon';

interface SchemeDetailModalProps {
  scheme: Scheme | null;
  plan?: FirstMovePlan;
  onClose: () => void;
  onOpenPlanModal: (scheme: Scheme) => void;
}

export function SchemeDetailModal({
  scheme,
  plan,
  onClose,
  onOpenPlanModal
}: SchemeDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'what_you_need' | 'overview' | 'eligibility'>('what_you_need');
  const [isSaved, setIsSaved] = useState(false);

  if (!scheme) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-xl border border-gray-100 relative my-8 text-left">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <div className="flex items-center gap-3">
            <CategoryIcon topicId={scheme.topicId} className="w-8 h-8" />
            <div>
              <span className="text-xs font-bold text-gray-900">{scheme.agencyAbbr}</span>
              <span className="text-xs text-gray-400 ml-1.5 font-normal">· {scheme.agency}</span>
            </div>
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

        {/* Title and Estimated Value */}
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-snug">
              {scheme.title}
            </h2>
            <span className="text-lg font-extrabold text-blue-700 shrink-0">
              ${scheme.estimatedValue.toLocaleString()} / year
            </span>
          </div>

          <p className="text-xs text-gray-500 font-medium">
            {scheme.subtitle}
          </p>
        </div>

        {/* Action Status Banner */}
        <div className="mb-6 flex flex-wrap items-center gap-2.5">
          {scheme.actionStatus === 'automatic' ? (
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              Automatic — nothing to do
            </span>
          ) : (
            <span className="text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
              You need to apply
            </span>
          )}

          {plan?.timeframe && (
            <span className="text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              Planned next step: {plan.timeframe}
            </span>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-6 gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('what_you_need')}
            className={`pb-2.5 cursor-pointer transition-colors border-b-2 ${
              activeTab === 'what_you_need'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            What you'll need
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 cursor-pointer transition-colors border-b-2 ${
              activeTab === 'overview'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Scheme Overview
          </button>
          <button
            onClick={() => setActiveTab('eligibility')}
            className={`pb-2.5 cursor-pointer transition-colors border-b-2 ${
              activeTab === 'eligibility'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Eligibility Details
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-52 text-xs text-gray-700 leading-relaxed mb-6">
          
          {/* TAB 1: WHAT YOU'LL NEED (Standardized 4-step checklist to reduce uncertainty) */}
          {activeTab === 'what_you_need' && (
            <div className="space-y-4 animate-in fade-in duration-100">
              
              <div className="p-4 bg-[#F8FAFC] rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-xs mb-1 flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-blue-700" />
                  What you'll need
                </h4>
                <p className="text-[11px] text-gray-500">
                  This checklist breaks down the application process so you know exactly what to expect.
                </p>

                {/* 4 Standard Action Steps from prompt */}
                <div className="mt-3.5 space-y-2">
                  <div className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-gray-200/80">
                    <Check className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />
                    <span className="font-medium text-gray-900">Review your eligibility information</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-gray-200/80">
                    <Check className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />
                    <span className="font-medium text-gray-900">Prepare the required documents</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-gray-200/80">
                    <Check className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />
                    <span className="font-medium text-gray-900">Check the application details</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-gray-200/80">
                    <Check className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />
                    <span className="font-medium text-gray-900">Submit your application</span>
                  </div>
                </div>
              </div>

              {/* Specific Preparation Items */}
              <div>
                <h5 className="font-semibold text-gray-900 text-xs mb-2">
                  Documents & details to prepare:
                </h5>
                <div className="space-y-1.5">
                  {scheme.whatYouNeed.map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-gray-50 rounded-lg border border-gray-200/70 flex items-start gap-2">
                      <span className="text-[11px] font-bold text-gray-400 shrink-0 mt-0.5">•</span>
                      <span className="text-gray-700 text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <p className="text-gray-600 text-xs leading-relaxed">
                {scheme.description}
              </p>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="font-semibold text-gray-900 mb-1">
                  Disbursement Schedule
                </div>
                <p className="text-gray-600 text-xs">
                  {scheme.disbursement}
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-semibold text-gray-900">Support provided:</div>
                <ul className="list-disc pl-4 space-y-1 text-gray-600">
                  {scheme.benefits.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: ELIGIBILITY */}
          {activeTab === 'eligibility' && (
            <div className="space-y-3 animate-in fade-in duration-100">
              <p className="text-gray-600 mb-2 font-medium">
                Household eligibility requirements:
              </p>
              <ul className="space-y-2">
                {scheme.eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-gray-400">
            HelpCompass SG · Public Support Directory
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>

            {scheme.actionStatus === 'apply' && (
              <button
                onClick={() => {
                  onClose();
                  onOpenPlanModal(scheme);
                }}
                className="w-full sm:w-auto px-5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg inline-flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-98"
              >
                <Calendar className="w-3.5 h-3.5" />
                {plan?.timeframe ? 'Update Next Step' : 'Plan Next Step'}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
