import React, { useState } from 'react';
import { Compass, X, Shield, FileText, HelpCircle, HeartHandshake } from 'lucide-react';

export function Footer() {
  const [activeModal, setActiveModal] = useState<'about' | 'privacy' | 'faq' | null>(null);

  return (
    <>
      <footer className="bg-white border-t border-gray-200 text-xs text-gray-600 py-10 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-left">
          
          {/* Top Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-700 text-white flex items-center justify-center">
                <Compass className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-bold text-sm text-gray-900 tracking-tight">
                  HelpCompass SG
                </span>
                <span className="text-[11px] text-gray-500 ml-2 font-normal">
                  Household Support Directory
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-gray-600">
              <button
                onClick={() => setActiveModal('about')}
                className="hover:text-blue-700 transition-colors cursor-pointer"
              >
                About this directory
              </button>
              <button
                onClick={() => setActiveModal('privacy')}
                className="hover:text-blue-700 transition-colors cursor-pointer"
              >
                Privacy & Data
              </button>
              <button
                onClick={() => setActiveModal('faq')}
                className="hover:text-blue-700 transition-colors cursor-pointer"
              >
                Frequently Asked Questions
              </button>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-gray-500">
            <div>
              © 2026 HelpCompass SG. Independent community assistance guide for Singapore residents.
            </div>
            <div>
              Free public service. No personal identity data or banking credentials are ever collected.
            </div>
          </div>

        </div>
      </footer>

      {/* Info Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl border border-gray-100 relative text-left">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 cursor-pointer p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'about' && (
              <div>
                <div className="flex items-center gap-2.5 mb-3 text-blue-700">
                  <HeartHandshake className="w-5 h-5" />
                  <h3 className="text-base font-bold text-gray-900">About HelpCompass SG</h3>
                </div>
                <div className="text-xs text-gray-600 leading-relaxed space-y-3 mb-5">
                  <p>
                    HelpCompass SG is designed to simplify how households discover, understand, and apply for assistance schemes in Singapore.
                  </p>
                  <p>
                    Rather than presenting dozens of confusing schemes with equal weight, the directory highlights structured starting points ("Start here") and actionable preparation checklists to reduce decision overload.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'privacy' && (
              <div>
                <div className="flex items-center gap-2.5 mb-3 text-emerald-700">
                  <Shield className="w-5 h-5" />
                  <h3 className="text-base font-bold text-gray-900">Privacy & Data Safeguards</h3>
                </div>
                <div className="text-xs text-gray-600 leading-relaxed space-y-2.5 mb-5">
                  <p>
                    Your trust and peace of mind are paramount:
                  </p>
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li>We do not ask for or store NRIC numbers, full names, or bank account details.</li>
                    <li>All household benefit calculations are computed locally in your web browser.</li>
                    <li>Optional reminders and sharing features contain zero private identifying data.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeModal === 'faq' && (
              <div>
                <div className="flex items-center gap-2.5 mb-3 text-blue-700">
                  <HelpCircle className="w-5 h-5" />
                  <h3 className="text-base font-bold text-gray-900">Frequently Asked Questions</h3>
                </div>
                <div className="text-xs text-gray-600 leading-relaxed space-y-3 mb-5">
                  <div>
                    <strong className="text-gray-900 block mb-0.5">Are these benefit figures guaranteed?</strong>
                    <span>Amounts shown are estimates based on standard published criteria for your dwelling and household size. Official administering bodies make final disbursement determinations.</span>
                  </div>
                  <div>
                    <strong className="text-gray-900 block mb-0.5">What is the difference between automatic and application-based support?</strong>
                    <span>Automatic support is credited directly to bills or designated government accounts without paperwork. Application-based schemes require submitting basic proof of eligibility.</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
