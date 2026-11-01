import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowRight, CheckCircle2, FlaskConical, RotateCcw, ShieldCheck } from 'lucide-react';
import { C, FONT_DISPLAY } from '../theme/brand';
import type { View } from './useVariant';

// Consent and debrief screens for the A/B test (MS-7; Week 6 brief: "a consent
// screen and a debrief screen"). The same screens for A and B, so they do not
// enter the comparison. Nothing is sent or stored, apart from two small
// notes in this browser: that consent was given, and which version was shown.

export const CONSENT_KEY = 'hc-consent';

export function hasConsented() {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === 'yes';
  } catch {
    return false;
  }
}

function useFocusHeading() {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return ref;
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[70vh] flex items-start md:items-center justify-center px-4 py-10 md:py-16" style={{ backgroundColor: C.page }}>
      <div
        className="hc-rise w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-9 shadow-[0_1px_2px_rgba(15,30,46,0.05),0_20px_48px_-24px_rgba(15,118,110,0.45)]"
        style={{ border: `1px solid ${C.line}` }}
      >
        {children}
      </div>
    </div>
  );
}

export function ConsentScreen({ onAgree }: { onAgree: () => void }) {
  const heading = useFocusHeading();
  const [declined, setDeclined] = useState(false);
  const agree = () => {
    try {
      window.localStorage.setItem(CONSENT_KEY, 'yes');
    } catch {
      // storage blocked: consent lasts for this visit only
    }
    onAgree();
  };

  return (
    <Card>
      <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em]" style={{ color: C.brand }}>
        <FlaskConical className="w-4 h-4" aria-hidden="true" /> A class study · about 3 to 5 minutes
      </p>
      <h1
        ref={heading}
        tabIndex={-1}
        className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight outline-none"
        style={{ color: C.ink, fontFamily: FONT_DISPLAY }}
      >
        Before you start
      </h1>
      <p className="mt-4 text-lg leading-relaxed" style={{ color: C.body }}>
        This is a class prototype, made by students for a Singapore Management University course (MGMT 6108, Decision
        Architecture for Managers). You will see the results screen of a benefits calculator for a made-up household, and
        we would like to know what you would do next.
      </p>
      <ul className="mt-5 flex flex-col gap-3">
        {[
          'No real order, no payment and no application. Nothing you click is sent anywhere.',
          'No personal data. Every name, amount and household here is fictional, and nothing asks for your details.',
          'This browser keeps two small notes: that you agreed, and which version of the screen you saw.',
          'You can stop at any time by closing the tab.',
        ].map(line => (
          <li key={line} className="flex items-start gap-3 text-base md:text-lg" style={{ color: C.body }}>
            <ShieldCheck className="w-5 h-5 mt-1 shrink-0" style={{ color: C.brand }} aria-hidden="true" />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      {declined ? (
        <p className="mt-7 rounded-2xl p-4 text-lg" style={{ backgroundColor: C.page, color: C.body }} role="status">
          That is fine, thank you. You can close this tab now. If you change your mind, reload the page.
        </p>
      ) : (
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={agree}
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-lg font-bold text-white cursor-pointer transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ backgroundColor: C.brand, outlineColor: C.brand }}
          >
            I agree, continue <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setDeclined(true)}
            className="rounded-full px-7 py-3.5 text-lg font-semibold cursor-pointer transition-colors hover:bg-[#F1F5F9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ color: C.body, border: '1.5px solid #CBD5E1', outlineColor: C.brand }}
          >
            No thanks
          </button>
        </div>
      )}
    </Card>
  );
}

const B_CHANGES = [
  'A “Start here” to-do list of the few items that need you, with how-to steps, a day picker and Skip',
  'A label on every scheme: automatic, claim it yourself, or automatic if you have signed up before',
  'A plain-language line and an icon for each kind of support',
  'Paid / still-to-come marks, a payout calendar, and conditions shown next to the amounts',
  'Reminders, a printable plan, a message to share with someone, and the “Ask Compass” helper',
];

export function DebriefScreen({
  view,
  onSeeOther,
  onBack,
  onRestart,
}: {
  view: View;
  onSeeOther: () => void;
  onBack: () => void;
  onRestart: () => void;
}) {
  const heading = useFocusHeading();
  const saw = view === 'B' ? 'B' : 'A';
  return (
    <Card>
      <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em]" style={{ color: C.brand }}>
        <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> Thank you
      </p>
      <h1
        ref={heading}
        tabIndex={-1}
        className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight outline-none"
        style={{ color: C.ink, fontFamily: FONT_DISPLAY }}
      >
        What this study was about
      </h1>
      <p className="mt-4 text-lg leading-relaxed" style={{ color: C.body }}>
        Nothing was ordered, paid or applied for, and nothing you did was sent anywhere. The household, the schemes and the
        amounts were all made up.
      </p>
      <div className="mt-5 rounded-2xl p-5" style={{ backgroundColor: C.brandTint, border: `1px solid ${C.brandLine}` }}>
        <p className="text-lg font-bold" style={{ color: C.ink }}>
          You saw version {saw}.
        </p>
        <p className="mt-1 text-base leading-relaxed" style={{ color: C.body }}>
          {saw === 'A'
            ? 'Version A copies a real benefits results screen as it looked on 24 October 2026, under a made-up brand. It is the comparison.'
            : 'Version B is the same results screen with changes we designed to help households see what needs them and plan it.'}
        </p>
      </div>
      <p className="mt-5 text-lg font-semibold" style={{ color: C.ink }}>
        We are testing whether these changes in version B help people know their next step:
      </p>
      <ul className="mt-2 flex flex-col gap-2 list-disc ml-6 text-base" style={{ color: C.body }}>
        {B_CHANGES.map(c => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <p className="mt-4 text-base leading-relaxed" style={{ color: C.body }}>
        These are “nudges”: each one can be ignored or skipped, and none of them hides an option. Versions were given out at
        random, so neither version says anything about you.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
        <button
          type="button"
          onClick={onSeeOther}
          className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-lg font-bold text-white cursor-pointer transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ backgroundColor: C.brand, outlineColor: C.brand }}
        >
          See version {saw === 'A' ? 'B' : 'A'} <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onBack}
          className="rounded-full px-6 py-3 text-lg font-semibold cursor-pointer transition-colors hover:bg-[#F0FDFA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ color: C.brand, border: `1.5px solid ${C.brand}`, outlineColor: C.brand }}
        >
          Back to version {saw}
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-lg font-semibold cursor-pointer transition-colors hover:bg-[#F1F5F9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ color: C.body, border: '1.5px solid #CBD5E1', outlineColor: C.brand }}
        >
          <RotateCcw className="w-5 h-5" aria-hidden="true" /> Clear and start over
        </button>
      </div>
    </Card>
  );
}

// The same "finished" bar at the end of A and B
export function FinishBar({ onFinish }: { onFinish: () => void }) {
  return (
    <div className="px-4 pb-6">
      <div
        className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl bg-white px-5 py-4"
        style={{ border: `1px solid ${C.line}` }}
      >
        <p className="text-base font-semibold text-center sm:text-left" style={{ color: C.ink }}>
          Finished looking? End here and see what this study was about.
        </p>
        <button
          type="button"
          onClick={onFinish}
          className="shrink-0 rounded-full px-5 py-2.5 text-base font-bold cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ color: '#FFFFFF', backgroundColor: '#374151', outlineColor: '#374151' }}
        >
          I’m finished
        </button>
      </div>
    </div>
  );
}
