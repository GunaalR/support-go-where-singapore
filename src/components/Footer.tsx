import React, { useState } from 'react';
import { Compass, X, Shield, FileText, HelpCircle, HeartHandshake, Phone, Mail, Eye } from 'lucide-react';

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
  const [selectedLang, setSelectedLang] = useState<'English' | '中文' | 'Melayu' | 'தமிழ்'>('English');

  const languages: Array<'English' | '中文' | 'Melayu' | 'தமிழ்'> = ['English', '中文', 'Melayu', 'தமிழ்'];

  return (
    <>
      <footer className="bg-white border-t border-gray-200 text-xs text-gray-600 py-12 mt-16 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-gray-100">
            
            {/* Brand Column */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-xl bg-blue-700 text-white flex items-center justify-center">
                  <Compass className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="font-bold text-base text-gray-900 tracking-tight block">
                    HelpCompass SG
                  </span>
                  <span className="text-[11px] text-gray-500 font-medium">
                    Public Support Directory
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed max-w-sm mt-3">
                An independent public-support navigator helping residents discover, understand, and plan household assistance with clarity and calm.
              </p>

              {/* Language Selector */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs">
                <span className="text-gray-400 font-medium">Language:</span>
                <div className="flex items-center gap-1.5 font-medium">
                  {languages.map((lang, index) => (
                    <React.Fragment key={lang}>
                      <button
                        onClick={() => setSelectedLang(lang)}
                        className={`transition-colors cursor-pointer ${
                          selectedLang === lang ? 'text-blue-700 font-bold' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {lang}
                      </button>
                      {index < languages.length - 1 && (
                        <span className="text-gray-300 select-none">|</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
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
                      onClick={() => {
                        const el = document.getElementById('results-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-gray-600 hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      Support
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        const el = document.getElementById('resources-and-tools');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-gray-600 hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      Resources & Tools
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={onOpenCalculator}
                      className="text-gray-600 hover:text-blue-700 transition-colors cursor-pointer"
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
                      className="text-gray-600 hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      About
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveModal('contact')}
                      className="text-gray-600 hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      Contact
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveModal('help')}
                      className="text-gray-600 hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      Help
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Standards & Transparency Column */}
            <div className="md:col-span-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 mb-3">
                Standards & Policies
              </h4>
              <ul className="space-y-2.5 mb-4">
                <li>
                  <button
                    onClick={() => setActiveModal('accessibility')}
                    className="text-gray-600 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    Accessibility
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('privacy')}
                    className="text-gray-600 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    Privacy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('terms')}
                    className="text-gray-600 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    Terms
                  </button>
                </li>
              </ul>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Free public resource. No sensitive personal data, NRIC numbers, or confidential financial credentials are required or saved.
              </p>
            </div>

          </div>

          {/* Bottom Row */}
          <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-gray-400">
            <div>
              © 2026 HelpCompass SG. Independent community assistance guide for Singapore residents.
            </div>
            <div>
              Public benefits discovery service. Calculations are non-binding estimates.
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
                  <h3 className="text-base font-bold text-gray-900">Privacy Safeguards</h3>
                </div>
                <div className="text-xs text-gray-600 leading-relaxed space-y-2.5 mb-5">
                  <p>
                    Your trust and peace of mind are paramount:
                  </p>
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li>We do not collect or store NRIC numbers, full names, or bank account details.</li>
                    <li>All household benefit calculations are computed locally in your web browser.</li>
                    <li>Optional reminders and sharing features contain zero private identifying data.</li>
                  </ul>
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
                    HelpCompass SG provides informational guidance based on publicly available eligibility rules. Figures displayed are non-binding estimates. Official administering agencies make final eligibility determinations upon formal application.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'accessibility' && (
              <div>
                <div className="flex items-center gap-2.5 mb-3 text-blue-700">
                  <Eye className="w-5 h-5" />
                  <h3 className="text-base font-bold text-gray-900">Accessibility Commitment</h3>
                </div>
                <div className="text-xs text-gray-600 leading-relaxed space-y-2.5 mb-5">
                  <p>
                    HelpCompass SG is designed to meet WCAG AA contrast standards, keyboard navigability, readable typography, and screen-reader accessibility for all Singapore residents.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'contact' && (
              <div>
                <div className="flex items-center gap-2.5 mb-3 text-blue-700">
                  <Mail className="w-5 h-5" />
                  <h3 className="text-base font-bold text-gray-900">Contact & Support</h3>
                </div>
                <div className="text-xs text-gray-600 leading-relaxed space-y-2.5 mb-5">
                  <p>
                    Have questions about community schemes or navigating this directory?
                  </p>
                  <p className="font-medium text-gray-800">
                    Email: support@helpcompass.sg
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'help' && (
              <div>
                <div className="flex items-center gap-2.5 mb-3 text-blue-700">
                  <HelpCircle className="w-5 h-5" />
                  <h3 className="text-base font-bold text-gray-900">Help & Guidance</h3>
                </div>
                <div className="text-xs text-gray-600 leading-relaxed space-y-3 mb-5">
                  <div>
                    <strong className="text-gray-900 block mb-0.5">Where should I begin?</strong>
                    <span>Use the "Start here" section near the top of your assessment results to see the most accessible starting options.</span>
                  </div>
                  <div>
                    <strong className="text-gray-900 block mb-0.5">How do automatic schemes work?</strong>
                    <span>Schemes marked "Automatic — nothing to do" are credited directly to your utility bills or CPF accounts without paperwork.</span>
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
