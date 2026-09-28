import { useState, useEffect, useRef } from 'react';
import { X, Search, ChevronRight, Tag } from 'lucide-react';
import { Scheme } from '../types';
import { FICTIONAL_SCHEMES } from '../data/fictionalSchemes';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScheme: (scheme: Scheme) => void;
}

export function SearchModal({ isOpen, onClose, onSelectScheme }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = FICTIONAL_SCHEMES.filter((scheme) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      scheme.title.toLowerCase().includes(term) ||
      scheme.summary.toLowerCase().includes(term) ||
      scheme.tags.some(t => t.toLowerCase().includes(term)) ||
      scheme.agency.toLowerCase().includes(term)
    );
  });

  const popularTags = ['Grocery Support', 'Utilities', 'Caregiving', 'Upskilling', 'Education', 'Seniors'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-20 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 relative text-left">
        
        {/* Search Input Bar */}
        <div className="relative mb-4">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search schemes, allowances, or credits..."
            className="w-full text-sm bg-gray-50 border border-gray-200 rounded-2xl py-3 pl-12 pr-10 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filter Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-5 pb-3 border-b border-gray-100">
          <span className="text-[11px] text-gray-400 flex items-center gap-1 mr-1">
            <Tag className="w-3 h-3" /> Quick filters:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="text-[11px] bg-gray-100 hover:bg-blue-50 hover:text-blue-700 text-gray-600 rounded-full px-2.5 py-1 cursor-pointer transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {results.length > 0 ? (
            results.map((scheme) => (
              <div
                key={scheme.id}
                onClick={() => {
                  onSelectScheme(scheme);
                  onClose();
                }}
                className="p-3 bg-gray-50 hover:bg-blue-50/80 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {scheme.title}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      ({scheme.agencyAbbr})
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                    {scheme.summary}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-gray-500">
              No matching schemes found. Try searching for "Grocery", "Caregiver", or "Utilities".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t border-gray-100 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
