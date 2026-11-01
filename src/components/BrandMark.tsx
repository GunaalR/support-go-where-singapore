// HelpCompass SG logo mark: the original warm heart (amber to rose to red),
// kept on purpose because it says "help" and "care" (MS-4). Red appears only
// here, in the brand mark; it is never used on amounts, labels or warnings,
// so it does not read as risk on the results screen (DESIGN.md, Week 8).

export function BrandMark({ className = 'w-9 h-9', iconClassName = 'w-5 h-5' }: { className?: string; iconClassName?: string }) {
  return (
    <div
      className={`relative ${className} shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-tr from-amber-400 via-rose-500 to-red-500 shadow-xs shadow-red-200`}
      aria-hidden="true"
    >
      <svg className={`${iconClassName} text-white`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
}
