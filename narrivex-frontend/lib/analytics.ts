'use client';

export type AnalyticsConsent = {
  essential: true;
  analytics: boolean;
  updatedAt: string;
};

export const COOKIE_CONSENT_KEY = 'narrivex_cookie_consent';
export const CONSENT_UPDATED_EVENT = 'narrivex-consent-updated';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    __narrivexAnalyticsInitialized?: boolean;
  }
}

export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!raw) {
    return false;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<AnalyticsConsent>;
    return parsed.analytics === true;
  } catch {
    return false;
  }
}

export function initializeAnalytics(): boolean {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) {
    return false;
  }

  if (window.__narrivexAnalyticsInitialized) {
    return true;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true,
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.__narrivexAnalyticsInitialized = true;
  return true;
}

export function trackPageView(path: string): void {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID || !window.gtag) {
    return;
  }

  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    send_to: GA_MEASUREMENT_ID,
  });
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', eventName, params);
}
