'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  CONSENT_UPDATED_EVENT,
  hasAnalyticsConsent,
  initializeAnalytics,
  trackPageView,
} from '@/lib/analytics';

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const updateConsent = () => {
      setIsEnabled(hasAnalyticsConsent());
    };

    updateConsent();
    window.addEventListener('storage', updateConsent);
    window.addEventListener(CONSENT_UPDATED_EVENT, updateConsent);

    return () => {
      window.removeEventListener('storage', updateConsent);
      window.removeEventListener(CONSENT_UPDATED_EVENT, updateConsent);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    initializeAnalytics();
  }, [isEnabled]);

  const routePath = useMemo(() => {
    const query = searchParams.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    trackPageView(routePath);
  }, [isEnabled, routePath]);

  return null;
}
