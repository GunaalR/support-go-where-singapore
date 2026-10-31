// HelpCompass SG logo mark: a compass needle in the brand teal-blue.
// Replaces the earlier red heart: red reads as risk and urgency (Week 8),
// and a compass says "we show you the way", which is the product's job.

export function BrandMark({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="hc-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#127FA8" />
          <stop offset="1" stopColor="#083D54" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#hc-mark)" />
      <circle cx="20" cy="20" r="12" fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.5" />
      <path d="M20 8.5l4 11.5-4 11.5-4-11.5z" fill="#FFFFFF" />
      <path d="M20 8.5l4 11.5h-8z" fill="#FFB86B" />
      <circle cx="20" cy="20" r="1.8" fill="#083D54" />
    </svg>
  );
}
