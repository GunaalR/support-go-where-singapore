import { useEffect, useRef, useState, type ReactNode } from 'react';

// Small motion helpers for variant B (MS-5). See the CSS in src/index.css.

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Fades and lifts its children in the first time they scroll into view.
// Without IntersectionObserver (or with reduced motion) it shows at once.
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`hc-reveal ${inView ? 'hc-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// Counts a number up from 0 when the value changes (e.g. a new year tab).
// The real value is always in the DOM for screen readers elsewhere; this is
// the visual figure only.
export function CountUp({ value, format }: { value: number; format: (n: number) => string }) {
  const [shown, setShown] = useState(value);
  useEffect(() => {
    if (reduced()) {
      setShown(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const dur = 900;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(value * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <>{format(shown)}</>;
}

// A small, quiet burst of dots, shown once when the to-do list is finished.
export function Burst() {
  const dots = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    return { x: Math.cos(angle) * 46, y: Math.sin(angle) * 46, color: ['#0D9488', '#F59E0B', '#F43F5E', '#2DB3A3'][i % 4] };
  });
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          className="hc-burst absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: d.color, ['--hc-x' as string]: `${d.x}px`, ['--hc-y' as string]: `${d.y}px` }}
        />
      ))}
    </span>
  );
}
