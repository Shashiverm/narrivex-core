'use client';

import { useEffect, useState, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { trackEvent } from '@/lib/analytics';
import { RefreshCw, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface NarrativeData {
  symbol: string;
  text: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  createdAt: string;
}

const sentimentConfig = {
  bullish: {
    border: 'sentiment-border-bullish',
    barColor: 'bg-emerald-500',
    badgeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  },
  bearish: {
    border: 'sentiment-border-bearish',
    barColor: 'bg-rose-500',
    badgeBg: 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
  },
  neutral: {
    border: 'sentiment-border-neutral',
    barColor: 'bg-slate-400',
    badgeBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  },
};

export function Narrative({ symbol, delay = 0 }: { symbol: string; delay?: number }) {
  const [data, setData] = useState<NarrativeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNarrative = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetch(`/api/narrative/${symbol}`);
      if (res.ok) {
        const result = await res.json();
        setData(result);
        trackEvent('narrative_fetch_success', { symbol, sentiment: result.sentiment });
      }
    } catch {
      // Handled silently
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchNarrative();
  }, [fetchNarrative]);

  if (loading) {
    return (
      <div className="glass-panel dashboard-card rounded-2xl p-5">
        <Skeleton className="h-28 w-full rounded-xl" />
      </div>
    );
  }

  const sentiment = (data?.sentiment || 'neutral') as keyof typeof sentimentConfig;
  const config = sentimentConfig[sentiment];
  const confidence = data?.confidence ?? 75;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.12 + 0.1 }}
      className={`glass-panel dashboard-card space-y-3 rounded-2xl p-5 ${config.border}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-sea" />
          <h3 className="dashboard-card-heading font-display text-base font-bold">
            Gemini AI Narrative
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={`dashboard-badge capitalize ${config.badgeBg}`}>
            {sentiment}
          </Badge>
          <button
            type="button"
            onClick={() => fetchNarrative(true)}
            disabled={refreshing}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50 dark:hover:bg-slate-800"
            title="Regenerate with Gemini"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin text-sea' : ''}`} />
          </button>
        </div>
      </div>

      <p className="dashboard-card-text text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {data?.text || `Analyzing market sentiment for ${symbol}...`}
      </p>

      {/* Confidence bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-400">AI Confidence Score</span>
          <span className="text-[11px] font-bold text-slate-500">{confidence}%</span>
        </div>
        <div className="confidence-bar">
          <div
            className={`confidence-bar-fill ${config.barColor}`}
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>

      {/* Timestamp */}
      {data?.createdAt && (
        <p className="text-[10px] text-slate-400">
          Generated via Gemini AI · Updated{' '}
          {new Date(data.createdAt).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })}
        </p>
      )}
    </motion.div>
  );
}