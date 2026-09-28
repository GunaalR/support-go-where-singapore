import { useState } from 'react';
import { X, CheckCircle2, Bookmark, BookmarkCheck, ArrowRight, Check, Calendar } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-xl border border-gray-200 relative my-8 text-left">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <div className="flex items-center gap-3">
            <CategoryIcon topicId={scheme.topicId} className="w-8 h-8" />
            <div>
              <span className="text-xs font-bold text-gray-900">{scheme.agencyAbbr}</span>
              <span className="text-xs text-gray-500 ml-1.5 font-normal">· {scheme.agency}</span>
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
            <span className="text-base font-extrabold text-gray-900 shrink-0">
              ${scheme.estimatedValue.toLocaleString()} / year
            </span>
          </div>

          <p className="text-xs text-gray-500 font-medium">
            {scheme.subtitle}
          </p>
        </div>

        {/* Action Status Treatment with Explanations */}
        <div className="mb-5 flex flex-wrap items-center gap-3 text-xs">
          {scheme.actionStatus === 'automatic' ? (
            <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200/80 w-full flex items-center justify-between">
              <span className="font-semibold text-emerald-900 inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                Automatic — nothing to do
              </span>
              <span className="text-emerald-700 text-[11px]">
                Your support will be credited automatically.
              </span>
            </div>
          ) : (
            <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/80 w-full flex items-center justify-between">
              <span className="font-semibold text-amber-900 inline-flex items-center gap-1.5">
                <ArrowRight className="w-4 h-4 text-amber-700" />
                You need to apply
              </span>
              <span className="text-amber-800 text-[11px]">
                Complete an application to receive this support.
              </span>
            </div>
          )}

          {plan?.timeframe && (
            <span className="font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              Next step: {plan.timeframe}
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
            Overview
          </button>
          <button
            onClick={() => setActiveTab('eligibility')}
            className={`pb-2.5 cursor-pointer transition-colors border-b-2 ${
              activeTab === 'eligibility'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Eligibility
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-52 text-xs text-gray-700 leading-relaxed mb-6">
          
          {/* TAB 1: WHAT YOU'LL NEED */}
          {activeTab === 'what_you_need' && (
            <div className="space-y-5 animate-in fade-in duration-100">
              
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">
                  What you'll need
                </h4>
                <p className="text-xs text-gray-500 mb-4">
                  Having these ready can make the next step easier.
                </p>

                {/* Vertical Checklist with Small Icons */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2.5 py-1.5 text-gray-800">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] shrink-0" />
                    <span className="font-medium text-xs">Review your eligibility information</span>
                  </div>
                  <div className="flex items-center gap-2.5 py-1.5 text-gray-800">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] shrink-0" />
                    <span className="font-medium text-xs">Prepare the required documents</span>
                  </div>
                  <div className="flex items-center gap-2.5 py-1.5 text-gray-800">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] shrink-0" />
                    <span className="font-medium text-xs">Check the application details</span>
                  </div>
                  <div className="flex items-center gap-2.5 py-1.5 text-gray-800">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] shrink-0" />
                    <span className="font-medium text-xs">Start your application</span>
                  </div>
                </div>
              </div>

              {/* Specific Items */}
              <div className="pt-4 border-t border-gray-100">
                <div className="font-semibold text-gray-900 text-xs mb-2">
                  Documents to keep on hand:
                </div>
                <div className="space-y-1.5">
                  {scheme.whatYouNeed.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-gray-600">
                      <span className="text-gray-400 select-none">•</span>
                      <span>{item}</span>
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

              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                <div className="font-semibold text-gray-900 mb-1">
                  Disbursement schedule
                </div>
                <p className="text-gray-600 text-xs">
                  {scheme.disbursement}
                </p>
              </div>

              <div className="space-y-1.5">
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
                  <li key={idx} className="flex items-start gap-2.5 p-2.5 bg-gray-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>

          {scheme.actionStatus === 'apply' && (
            <button
              onClick={() => {
                onClose();
                onOpenPlanModal(scheme);
              }}
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{plan?.timeframe ? 'Update next step' : 'Plan next step'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
