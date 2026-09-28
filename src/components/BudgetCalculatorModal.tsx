import React, { useState } from 'react';
import { X, Calculator, Wallet, DollarSign, Zap, HeartPulse, Check } from 'lucide-react';
import { BudgetInput, BudgetResult } from '../types';

interface BudgetCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyResults: (total: number, dwelling: string) => void;
}

export function BudgetCalculatorModal({ isOpen, onClose, onApplyResults }: BudgetCalculatorModalProps) {
  const [input, setInput] = useState<BudgetInput>({
    age: 42,
    householdIncome: 'tier_1',
    dwellingType: 'medium_apartment',
    hasDependants: true,
    numChildren: 1
  });

  if (!isOpen) return null;

  // Fictional support estimation formula
  const calculateBenefits = (): BudgetResult => {
    let utilities = 600;
    if (input.dwellingType === 'small_apartment') utilities = 800;
    if (input.dwellingType === 'large_apartment') utilities = 400;

    let livingCost = 800;
    if (input.householdIncome === 'tier_1') livingCost = 1200;
    if (input.householdIncome === 'tier_3') livingCost = 400;

    let caregiver = input.hasDependants ? 950 : 0;
    let skills = 500;

    const total = utilities + livingCost + caregiver + skills;

    return {
      utilitiesSubsidy: utilities,
      livingCostCredit: livingCost,
      caregiverSupport: caregiver,
      skillsCredit: skills,
      totalAnnualBenefit: total
    };
  };

  const results = calculateBenefits();

  const handleSave = () => {
    const dwellingMap: Record<string, string> = {
      small_apartment: '1-2 Room Apartment',
      medium_apartment: '4-Room Apartment',
      large_apartment: '5-Room / Executive'
    };
    onApplyResults(results.totalAnnualBenefit, dwellingMap[input.dwellingType] || '4-Room Apartment');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative my-8 text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
              Household Assessment
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Support Calculator
            </h3>
          </div>
        </div>

        {/* Input Parameters Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Primary Applicant Age
            </label>
            <input
              type="number"
              min={21}
              max={90}
              value={input.age}
              onChange={(e) => setInput({ ...input, age: parseInt(e.target.value) || 21 })}
              className="w-full text-xs font-medium border border-gray-200 rounded-xl p-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Household Monthly Income Tier
            </label>
            <select
              value={input.householdIncome}
              onChange={(e) => setInput({ ...input, householdIncome: e.target.value as any })}
              className="w-full text-xs font-medium border border-gray-200 rounded-xl p-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="tier_1">Moderate Support Tier (Below $3,000/mo)</option>
              <option value="tier_2">Standard Support Tier ($3,000 – $6,500/mo)</option>
              <option value="tier_3">Higher Tier (Above $6,500/mo)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Dwelling / Apartment Type
            </label>
            <select
              value={input.dwellingType}
              onChange={(e) => setInput({ ...input, dwellingType: e.target.value as any })}
              className="w-full text-xs font-medium border border-gray-200 rounded-xl p-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="small_apartment">1-Room or 2-Room Apartment</option>
              <option value="medium_apartment">4-Room Apartment</option>
              <option value="large_apartment">5-Room or Executive Apartment</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Number of School-going Children
            </label>
            <select
              value={input.numChildren}
              onChange={(e) => setInput({ ...input, numChildren: parseInt(e.target.value) })}
              className="w-full text-xs font-medium border border-gray-200 rounded-xl p-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value={0}>0 children</option>
              <option value={1}>1 child</option>
              <option value={2}>2 children</option>
              <option value={3}>3 or more children</option>
            </select>
          </div>

        </div>

        {/* Checkbox for seniors in household */}
        <div className="mb-6 flex items-center gap-2">
          <input
            type="checkbox"
            id="hasDependants"
            checked={input.hasDependants}
            onChange={(e) => setInput({ ...input, hasDependants: e.target.checked })}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <label htmlFor="hasDependants" className="text-xs text-gray-700 cursor-pointer select-none">
            Household includes an elderly parent or dependant requiring care
          </label>
        </div>

        {/* Results Preview Card */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50/40 to-white rounded-2xl p-5 border border-blue-200 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-4 pb-3 border-b border-blue-200/60">
            <span className="text-xs font-semibold text-gray-600">
              Estimated Total Annual Support Package
            </span>
            <div className="text-3xl font-extrabold text-blue-800 tracking-tight">
              ${results.totalAnnualBenefit.toLocaleString()}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="bg-white p-3 rounded-xl border border-blue-100">
              <span className="text-gray-500 block mb-1">Utilities Credit</span>
              <div className="font-bold text-gray-900">${results.utilitiesSubsidy}</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-blue-100">
              <span className="text-gray-500 block mb-1">Grocery / Living</span>
              <div className="font-bold text-gray-900">${results.livingCostCredit}</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-blue-100">
              <span className="text-gray-500 block mb-1">Caregiver Support</span>
              <div className="font-bold text-gray-900">${results.caregiverSupport}</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-blue-100">
              <span className="text-gray-500 block mb-1">Skills Credit</span>
              <div className="font-bold text-gray-900">${results.skillsCredit}</div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-[11px] text-gray-400">
            *Estimates are calculated based on current published criteria.
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Update Results Screen
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
