'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type CookieConsent = {
  essential: true;
  analytics: boolean;
  updatedAt: string;
};

const COOKIE_CONSENT_KEY = 'narrivex_cookie_consent';
const COOKIE_POLICY_UPDATED_AT = 'April 7, 2026';

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedConsent = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!storedConsent) {
      setIsVisible(true);
    }
  }, []);

  const saveConsent = (analytics: boolean) => {
    const payload: CookieConsent = {
      essential: true,
      analytics,
      updatedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(payload));
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      className="fixed inset-x-4 bottom-16 z-50 mx-auto w-auto max-w-3xl rounded-2xl border border-black/10 bg-white/95 p-5 shadow-xl backdrop-blur sm:bottom-20"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <h2 className="font-display text-xl font-bold text-ink">Cookie Consent</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">
        We use essential cookies to keep Narrivex secure and working. Optional cookies help with real-time feed performance and analytical tools.
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-600">
        <li>Essential: authentication and secure session handling.</li>
        <li>Optional analytics: product analysis and performance insights.</li>
      </ul>
      <p className="mt-2 text-xs text-slate-500">
        Last updated: {COOKIE_POLICY_UPDATED_AT}. Read our{' '}
        <Link href="/cookie-policy" className="font-semibold text-sea hover:underline">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button onClick={() => saveConsent(true)}>Accept</Button>
        <Button variant="outline" onClick={() => saveConsent(false)}>
          Reject optional
        </Button>
      </div>
    </aside>
  );
}
