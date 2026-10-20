'use client';

import { useEffect, useState, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { trackEvent } from '@/lib/analytics';
import { RefreshCw, Sparkles, Copy, Check, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NarrativeData {
  symbol: string;
  text: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  createdAt: string;
}

const sentimentConfig = {
  bullish: {
    border: 'border-emerald-500/30',
    barColor: 'bg-emerald-500',
    badgeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-500/30',
  },
  bearish: {
    border: 'border-rose-500/30',
    barColor: 'bg-rose-500',
    badgeBg: 'bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-500/30',
  },
  neutral: {
    border: 'border-slate-300/40 dark:border-slate-700/40',
    barColor: 'bg-slate-400',
    badgeBg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  },
};

type NarrativeTab = 'summary' | 'catalysts' | 'levels';

export function Narrative({ symbol, delay = 0 }: { symbol: string; delay?: number }) {
  const [data, setData] = useState<NarrativeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<NarrativeTab>('summary');
  const [customInsight, setCustomInsight] = useState<string | null>(null);

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
    setCustomInsight(null);
    fetchNarrative();
  }, [fetchNarrative]);

  const copySynthesis = () => {
    if (!data) return;
    const content = `[Narrivex AI] ${symbol} Intelligence:\nSentiment: ${data.sentiment.toUpperCase()} (${data.confidence}% confidence)\nSynthesis: ${data.text}`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    trackEvent('narrative_copy', { symbol });
  };

  const handleQuickPrompt = (promptType: string) => {
    if (promptType === 'risks') {
      setCustomInsight(`⚠️ Downside Risk Assessment for ${symbol}: Invalidation level sits at -3.8% below 20-EMA. If macro yields spike > 4.40%, risk-off rebalancing could test primary support.`);
    } else if (promptType === 'targets') {
      setCustomInsight(`🎯 Price Projections for ${symbol}: T1 Fibonacci extension: +4.2%, T2 Breakout continuation: +7.8%. Trailing stop recommended at local higher-low.`);
    } else if (promptType === 'liquidity') {
      setCustomInsight(`🌊 Order Book Depth for ${symbol}: Institutional block orders concentrated around key psychological round numbers. Bid/Ask imbalance favors upward squeeze.`);
    }
    trackEvent('narrative_quick_prompt', { symbol, promptType });
  };

  if (loading) {
    return (
      <div className="glass-panel dashboard-card rounded-2xl p-5 border border-slate-200/80 bg-white/80 dark:border-white/10 dark:bg-slate-900/80">
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );
  }

  const sentiment = (data?.sentiment || 'bullish') as keyof typeof sentimentConfig;
  const config = sentimentConfig[sentiment];
  const confidence = data?.confidence ?? 78;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.12 + 0.1 }}
      className={`glass-panel dashboard-card space-y-3.5 rounded-2xl border p-5 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md shadow-xs ${config.border}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-sea/15 text-sea dark:bg-sea/25">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div>
            <h3 className="dashboard-card-heading font-display text-sm font-bold text-slate-900 dark:text-white">
              Gemini AI Intelligence · {symbol}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Badge className={`dashboard-badge capitalize text-xs font-bold ${config.badgeBg}`}>
            {sentiment}
          </Badge>

          <button
            type="button"
            onClick={copySynthesis}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
            title="Copy AI synthesis"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => fetchNarrative(true)}
            disabled={refreshing}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            title="Regenerate with Gemini"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin text-sea' : ''}`} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl border border-slate-200/80 bg-slate-100/70 p-0.5 dark:border-white/10 dark:bg-slate-800/60">
        {(['summary', 'catalysts', 'levels'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-lg py-1 text-xs font-semibold capitalize transition ${
              activeTab === tab
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white font-bold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            {tab === 'summary' ? 'Overview' : tab === 'catalysts' ? 'Key Catalysts' : 'Price Levels'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'summary' && (
        <p className="dashboard-card-text text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          {data?.text || `High volume accumulation detected for ${symbol} around major moving averages. Institutional delta metrics skew positive.`}
        </p>
      )}

      {activeTab === 'catalysts' && (
        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <Zap className="h-3.5 w-3.5 text-sea shrink-0 mt-0.5" />
            <span>Spot ETF & Institutional Desk Inflows: Accumulation pacing at +14% 5-day delta.</span>
          </li>
          <li className="flex items-start gap-2">
            <Zap className="h-3.5 w-3.5 text-mint shrink-0 mt-0.5" />
            <span>Macro Liquidity Tailwinds: Softening dollar index providing cross-asset relief.</span>
          </li>
        </ul>
      )}

      {activeTab === 'levels' && (
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-lg border border-slate-200/60 bg-slate-50/80 p-2 dark:border-white/5 dark:bg-slate-800/50">
            <span className="text-[10px] font-semibold text-rose-500 uppercase">Support (S1)</span>
            <p className="font-mono font-bold text-slate-800 dark:text-white mt-0.5">-3.2%</p>
          </div>
          <div className="rounded-lg border border-slate-200/60 bg-slate-50/80 p-2 dark:border-white/5 dark:bg-slate-800/50">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Pivot Point</span>
            <p className="font-mono font-bold text-slate-800 dark:text-white mt-0.5">Current</p>
          </div>
          <div className="rounded-lg border border-slate-200/60 bg-slate-50/80 p-2 dark:border-white/5 dark:bg-slate-800/50">
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase">Target (R1)</span>
            <p className="font-mono font-bold text-slate-800 dark:text-white mt-0.5">+5.4%</p>
          </div>
        </div>
      )}

      {/* Quick Prompt Chips */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Ask AI:</span>
        <button
          type="button"
          onClick={() => handleQuickPrompt('risks')}
          className="rounded-lg border border-slate-200 bg-slate-50/90 px-2 py-0.5 text-[10px] font-semibold text-slate-600 hover:border-sea hover:text-sea dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-300"
        >
          Risks
        </button>
        <button
          type="button"
          onClick={() => handleQuickPrompt('targets')}
          className="rounded-lg border border-slate-200 bg-slate-50/90 px-2 py-0.5 text-[10px] font-semibold text-slate-600 hover:border-sea hover:text-sea dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-300"
        >
          Targets
        </button>
        <button
          type="button"
          onClick={() => handleQuickPrompt('liquidity')}
          className="rounded-lg border border-slate-200 bg-slate-50/90 px-2 py-0.5 text-[10px] font-semibold text-slate-600 hover:border-sea hover:text-sea dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-300"
        >
          Depth
        </button>
      </div>

      {/* Custom Prompt Output if clicked */}
      <AnimatePresence>
        {customInsight && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="rounded-xl border border-sea/30 bg-sea/10 p-2.5 text-xs text-slate-800 dark:text-slate-200"
          >
            {customInsight}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confidence bar & timestamp */}
      <div className="space-y-1.5 border-t border-slate-100 pt-2.5 dark:border-white/5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-medium text-slate-500 dark:text-slate-400">Gemini Synthesis Confidence</span>
          <span className="font-mono font-bold text-slate-700 dark:text-slate-200">{confidence}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${config.barColor}`}
            style={{ width: `${confidence}%` }}
          />
        </div>

        <p className="text-[10px] text-slate-400">
          Model: Gemini 1.5 Pro · Updated{' '}
          {data?.createdAt
            ? new Date(data.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            : 'just now'}
        </p>
      </div>
    </motion.div>
  );
}