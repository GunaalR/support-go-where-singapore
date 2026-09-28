import React, { useState } from 'react';
import { Compass, GraduationCap, X, Shield, FileText } from 'lucide-react';

export function Footer() {
  const [activeModal, setActiveModal] = useState<'brief' | 'ethics' | null>(null);

  return (
    <>
      <footer className="bg-white border-t border-gray-200 text-xs text-gray-600 py-8">
        <div className="max-w-6xl mx-auto px-4 text-left">
          
          {/* Top Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold text-sm text-gray-900 tracking-tight">
                  HelpCompass SG
                </span>
                <span className="text-[10px] text-gray-400 ml-2 font-medium">
                  MGMT 6108 Student Prototype
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-gray-500">
              <button
                onClick={() => setActiveModal('brief')}
                className="hover:text-blue-700 transition-colors cursor-pointer"
              >
                Course Research Brief
              </button>
              <button
                onClick={() => setActiveModal('ethics')}
                className="hover:text-blue-700 transition-colors cursor-pointer"
              >
                Academic Safeguards
              </button>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-gray-500">
            <div>
              MGMT 6108: Decision Architecture for Managers · Fictional Prototype Simulation.
            </div>
            <div>
              No real personal data or government systems involved. Client-side evaluation prototype.
            </div>
          </div>

        </div>
      </footer>

      {/* Info Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative text-left">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'brief' && (
              <div>
                <div className="flex items-center gap-2.5 mb-3 text-blue-700">
                  <GraduationCap className="w-5 h-5" />
                  <h3 className="text-base font-bold text-gray-900">MGMT 6108 Research Brief</h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  <strong>Project Question:</strong> "What does a household do next after seeing its estimated support?"
                </p>
                <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-600 space-y-2 mb-4">
                  <p>
                    <strong>Variant A (Baseline):</strong> Presents the full list of eligible schemes without structured starting recommendations or planning scaffolds.
                  </p>
                  <p>
                    <strong>Variant B (Intervention):</strong> Introduces "Start Here" (2 transparently highlighted first options based on value and ease) + "Plan the First Move" voluntary intention-setting and optional social support.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'ethics' && (
              <div>
                <div className="flex items-center gap-2.5 mb-3 text-emerald-700">
                  <Shield className="w-5 h-5" />
                  <h3 className="text-base font-bold text-gray-900">Academic Safeguards & Ethics</h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  In accordance with behavioral design ethics:
                </p>
                <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1.5 mb-4">
                  <li>No fake social proof ("10,000 others applied today")</li>
                  <li>No artificial urgency or countdown timers</li>
                  <li>No guilt-inducing or coercive copy</li>
                  <li>All schemes remain fully visible and accessible via "See all schemes"</li>
                  <li>All planning and buddy sharing steps are completely voluntary and easy to skip</li>
                </ul>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl cursor-pointer"
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
