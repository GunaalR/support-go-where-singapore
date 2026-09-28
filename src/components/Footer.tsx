import React, { useState } from 'react';
import { X, Shield, FileText, HelpCircle, HeartHandshake, Mail, Eye } from 'lucide-react';

interface FooterProps {
  onScrollToSupport?: () => void;
  onScrollToResources?: () => void;
  onOpenCalculator?: () => void;
}

export function Footer({
  onScrollToSupport,
  onScrollToResources,
  onOpenCalculator
}: FooterProps) {
  const [activeModal, setActiveModal] = useState<'about' | 'privacy' | 'terms' | 'accessibility' | 'contact' | 'help' | null>(null);

  return (
    <>
      <footer className="bg-white border-t border-gray-200 text-xs text-gray-600 py-12 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-gray-200">
            
            {/* SupportGoWhere Brand Column */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="relative w-8 h-8 flex items-center justify-center rounded-xl bg-gradient-to-tr from-amber-400 via-rose-500 to-red-500 shadow-xs shadow-red-200">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <div className="leading-none text-left">
                  <span className="block text-lg font-bold tracking-tight text-gray-900 font-sans">
                    SupportGoWhere
                  </span>
                  <span className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                    Singapore Public Support
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed max-w-sm mt-3">
                An official Singapore Government initiative helping residents discover and access support schemes, subsidies, and community assistance.
              </p>
            </div>

            {/* Navigation Column */}
            <div className="md:col-span-4 grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 mb-3">
                  Services
                </h4>
                <ul className="space-y-2.5">
                  <li>
                    <button
                      onClick={onScrollToSupport}
                      className="text-gray-600 hover:text-[#175CD3] transition-colors cursor-pointer"
                    >
                      Support
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={onScrollToResources}
                      className="text-gray-600 hover:text-[#175CD3] transition-colors cursor-pointer"
                    >
                      Resources & Tools
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={onOpenCalculator}
                      className="text-gray-600 hover:text-[#175CD3] transition-colors cursor-pointer"
                    >
                      Support Calculator
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 mb-3">
                  Directory
                </h4>
                <ul className="space-y-2.5">
                  <li>
                    <button
                      onClick={() => setActiveModal('about')}
                      className="text-gray-600 hover:text-[#175CD3] transition-colors cursor-pointer"
                    >
                      About
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveModal('contact')}
                      className="text-gray-600 hover:text-[#175CD3] transition-colors cursor-pointer"
                    >
                      Contact
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveModal('help')}
                      className="text-gray-600 hover:text-[#175CD3] transition-colors cursor-pointer"
                    >
                      Help
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Standards & Policies Column */}
            <div className="md:col-span-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 mb-3">
                Standards & Policies
              </h4>
              <ul className="space-y-2.5 mb-4">
                <li>
                  <button
                    onClick={() => setActiveModal('accessibility')}
                    className="text-gray-600 hover:text-[#175CD3] transition-colors cursor-pointer"
                  >
                    Accessibility
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('privacy')}
                    className="text-gray-600 hover:text-[#175CD3] transition-colors cursor-pointer"
                  >
                    Privacy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('terms')}
                    className="text-gray-600 hover:text-[#175CD3] transition-colors cursor-pointer"
                  >
                    Terms
                  </button>
                </li>
              </ul>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                GovTech Singapore · In collaboration with Ministry of Social and Family Development (MSF).
              </p>
            </div>

          </div>

          {/* Bottom Copyright Row */}
          <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-gray-500">
            <div>
              © 2026 Government of Singapore. All rights reserved.
            </div>
            <div>
              Last updated 28 September 2026 · SupportGoWhere
            </div>
          </div>

        </div>
      </footer>

      {/* Info Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl border border-gray-200 relative text-left">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 cursor-pointer p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'about' && (
              <div>
                <div className="flex items-center gap-2.5 mb-3 text-[#175CD3]">
                  <HeartHandshake className="w-5 h-5" />
                  <h3 className="text-base font-bold text-gray-900">About SupportGoWhere</h3>
                </div>
                <div className="text-xs text-gray-600 leading-relaxed space-y-3 mb-5">
                  <p>
                    SupportGoWhere is a one-stop portal for Singaporeans to discover government support schemes and community initiatives that suit their needs.
                  </p>
                  <p>
                    From living expenses and healthcare subsidies to career training allowances, the portal provides transparent eligibility criteria and guided assistance for all life stages.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'privacy' && (
              <div>
                <div className="flex items-center gap-2.5 mb-3 text-emerald-700">
                  <Shield className="w-5 h-5" />
                  <h3 className="text-base font-bold text-gray-900">Privacy Statement</h3>
                </div>
                <div className="text-xs text-gray-600 leading-relaxed space-y-2.5 mb-5">
                  <p>
                    This service adheres to the Public Sector (Governance) Act. All data provided for simulation and discovery remains private and secure.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'terms' && (
              <div>
                <div className="flex items-center gap-2.5 mb-3 text-gray-700">
                  <FileText className="w-5 h-5" />
                  <h3 className="text-base font-bold text-gray-900">Terms of Use</h3>
                </div>
                <div className="text-xs text-gray-600 leading-relaxed space-y-2.5 mb-5">
                  <p>
                    Information provided on SupportGoWhere is updated regularly from administering agencies. Eligibility criteria and disbursements are subject to official evaluation.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'accessibility' && (
              <div>
                <div className="flex items-center gap-2.5 mb-3 text-[#175CD3]">
                  <Eye className="w-5 h-5" />
                  <h3 className="text-base font-bold text-gray-900">Accessibility</h3>
                </div>
                <div className="text-xs text-gray-600 leading-relaxed space-y-2.5 mb-5">
                  <p>
                    SupportGoWhere is designed to be accessible to all users, including individuals with disabilities, in compliance with digital government standards.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'contact' && (
              <div>
                <div className="flex items-center gap-2.5 mb-3 text-[#175CD3]">
                  <Mail className="w-5 h-5" />
                  <h3 className="text-base font-bold text-gray-900">Contact SupportGoWhere</h3>
                </div>
                <div className="text-xs text-gray-600 leading-relaxed space-y-2.5 mb-5">
                  <p>
                    For feedback or enquiries regarding support schemes:
                  </p>
                  <p className="font-semibold text-gray-800">
                    Email: support@supportgowhere.gov.sg
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'help' && (
              <div>
                <div className="flex items-center gap-2.5 mb-3 text-[#175CD3]">
                  <HelpCircle className="w-5 h-5" />
                  <h3 className="text-base font-bold text-gray-900">Help & FAQs</h3>
                </div>
                <div className="text-xs text-gray-600 leading-relaxed space-y-3 mb-5">
                  <div>
                    <strong className="text-gray-900 block mb-0.5">How do I find relevant support?</strong>
                    <span>Use the guided assistant on the homepage to select your current situation, or explore schemes by category below.</span>
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
