import type { View } from './useVariant';

// Floating switch so the marker can flip between the two variants on one page.
// It sits at the bottom so it never covers the sticky year tabs at the top.
// Kept deliberately plain and grey: it is research scaffolding, not part of
// either design, and must not read as a nudge itself. Owned by M1.

interface VariantToggleProps {
  view: View;
  onChange: (next: View) => void;
}

const OPTIONS: { value: View; label: string; hint: string }[] = [
  { value: 'A', label: 'A: Live site', hint: 'The results screen as it is today' },
  { value: 'B', label: 'B: With nudges', hint: 'The same screen with our changes' },
];

export function VariantToggle({ view, onChange }: VariantToggleProps) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pointer-events-none"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}
    >
      <div
        role="group"
        aria-label="Choose which version to view"
        className="pointer-events-auto flex items-center gap-1 rounded-full bg-white p-1 shadow-lg"
        style={{ border: '1px solid #CACACA' }}
      >
        {OPTIONS.map(opt => {
          const active = view === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={active}
              title={opt.hint}
              className="rounded-full px-4 py-2 text-sm md:text-base font-semibold cursor-pointer transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#125EEC]"
              style={
                active
                  ? { backgroundColor: '#374151', color: '#FFFFFF' }
                  : { backgroundColor: 'transparent', color: '#374151' }
              }
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
