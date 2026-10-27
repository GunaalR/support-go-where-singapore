import { useCallback, useEffect, useState } from 'react';

// Which screen the visitor sees, read from the URL.
//   ?v=A     variant A: the live results screen as it is (M2)
//   ?v=B     variant B: the same screen with our nudges (M3, M4, M5)
//   ?v=home  the homepage rebuilt from the live site (M1, Stitch)
// No ?v= opens variant A, so the marker only needs one link.
// Owned by M1.

export type View = 'A' | 'B' | 'home';

function readView(): View {
  const v = new URLSearchParams(window.location.search).get('v');
  if (v === null) return 'A';
  const upper = v.toUpperCase();
  if (upper === 'B') return 'B';
  if (upper === 'HOME') return 'home';
  return 'A';
}

export function useVariant() {
  const [view, setViewState] = useState<View>(readView);

  // keep the screen in step with the browser's back and forward buttons
  useEffect(() => {
    const onPop = () => setViewState(readView());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const setView = useCallback((next: View) => {
    const url = new URL(window.location.href);
    url.searchParams.set('v', next);
    window.history.pushState({}, '', url);
    setViewState(next);
    window.scrollTo({ top: 0 });
  }, []);

  return { view, setView };
}
