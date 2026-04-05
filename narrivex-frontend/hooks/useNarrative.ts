'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

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

    const fetchNarrative = async () => {
      try {
        const response = await api.getNarrative(symbol);
        if (isMounted) {
          setNarrative(response.data);
        }
      } catch {
        if (isMounted) {
          setNarrative(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
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