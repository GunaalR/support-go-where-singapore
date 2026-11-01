import { useCallback, useEffect, useState } from 'react';

// Which screen the visitor sees, read from the URL.
//   ?v=A     variant A: the live results screen as it is (M2)
//   ?v=B     variant B: the same screen with our nudges (M3, M4, M5)
//   ?v=home  the homepage rebuilt from the live site (M1, Stitch)
// No ?v= (MS-7, as the Week 6 brief asks): the visitor is assigned A or B at
// random once, and the arm is kept in this browser's localStorage so a reload
// shows the same version. ?v= always wins, so markers' links still work.
// Owned by M1.

export type View = 'A' | 'B' | 'home';

const ARM_KEY = 'hc-arm';

function storedArm(): 'A' | 'B' | null {
  try {
    const v = window.localStorage.getItem(ARM_KEY);
    return v === 'A' || v === 'B' ? v : null;
  } catch {
    return null;
  }
}

function assignArm(): 'A' | 'B' {
  const existing = storedArm();
  if (existing) return existing;
  const arm = Math.random() < 0.5 ? 'A' : 'B';
  try {
    window.localStorage.setItem(ARM_KEY, arm);
  } catch {
    // private window or storage blocked: the arm lasts for this visit only
  }
  return arm;
}

export function clearArm() {
  try {
    window.localStorage.removeItem(ARM_KEY);
  } catch {
    // nothing stored
  }
}

function readView(): View {
  const v = new URLSearchParams(window.location.search).get('v');
  if (v === null) return assignArm();
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
