'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CONSENT_UPDATED_EVENT, COOKIE_CONSENT_KEY } from '@/lib/analytics';

type CookieConsent = {
  essential: true;
  analytics: boolean;
  updatedAt: string;
};

const COOKIE_POLICY_UPDATED_AT = 'April 7, 2026';

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedConsent = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!storedConsent) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    document.body.dataset.cookieBannerVisible = isVisible ? 'true' : 'false';
    window.dispatchEvent(new Event('cookie-banner-visibility'));

    return () => {
      document.body.dataset.cookieBannerVisible = 'false';
      window.dispatchEvent(new Event('cookie-banner-visibility'));
    };
  }, [isVisible]);

  const saveConsent = (analytics: boolean) => {
    const payload: CookieConsent = {
      essential: true,
      analytics,
      updatedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(payload));
    window.dispatchEvent(new Event(CONSENT_UPDATED_EVENT));
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      className="fixed inset-x-4 bottom-16 z-50 mx-auto w-auto max-w-3xl rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-2xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:bottom-20"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">Cookie & Privacy Preferences</h2>
      <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
        We use essential cookies to maintain secure sessions and WebSocket connection authorization. Optional telemetry helps us monitor real-time feed performance and latency metrics.
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-500 dark:text-slate-400">
        <li>Essential: authentication and cryptographic session tokens.</li>
        <li>Optional telemetry: feed delivery speed and latency diagnostics.</li>
      </ul>
      <p className="mt-2 text-[11px] text-slate-400">
        Last updated: {COOKIE_POLICY_UPDATED_AT}. Read our{' '}
        <Link href="/cookie-policy" className="font-semibold text-sea hover:underline">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        <Button size="sm" onClick={() => saveConsent(true)} className="font-bold">
          Accept All
        </Button>
        <Button variant="outline" size="sm" onClick={() => saveConsent(false)}>
          Essential Only
        </Button>
      </div>
    </aside>
  );
}
