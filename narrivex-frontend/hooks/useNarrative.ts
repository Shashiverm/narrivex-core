'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { trackEvent } from '@/lib/analytics';

interface Narrative {
  text: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  createdAt: string;
}

export function useNarrative(symbol: string) {
  const [narrative, setNarrative] = useState<Narrative | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let isInitialLoad = true;

    const fetchNarrative = async () => {
      trackEvent(isInitialLoad ? 'narrative_load_attempt' : 'narrative_refresh_attempt', {
        symbol,
      });
      try {
        const response = await api.getNarrative(symbol);
        if (isMounted) {
          setNarrative(response.data);
          trackEvent(isInitialLoad ? 'narrative_load_success' : 'narrative_refresh_success', {
            symbol,
            sentiment: response.data?.sentiment ?? 'unknown',
          });
        }
      } catch {
        if (isMounted) {
          setNarrative(null);
          trackEvent(isInitialLoad ? 'narrative_load_failed' : 'narrative_refresh_failed', {
            symbol,
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          isInitialLoad = false;
        }
      }
    };

    fetchNarrative();
    const interval = setInterval(fetchNarrative, 5 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [symbol]);

  return { narrative, loading };
}