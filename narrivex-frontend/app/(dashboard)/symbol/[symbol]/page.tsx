'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Chart } from '@/components/dashboard/Chart';
import { Narrative } from '@/components/dashboard/Narrative';
import { ArrowLeft, Bell, Plus, Check, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface QuoteData {
  symbol: string;
  price: number;
  change: number;
  changePercent: string;
  high: number;
  low: number;
  volume: number;
  isPositive: boolean;
}

export default function SymbolDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawSymbol = typeof params.symbol === 'string' ? params.symbol.toUpperCase() : 'BTC';

  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchQuote = async () => {
      try {
        const res = await fetch(`/api/market/quote/${rawSymbol}`);
        if (res.ok && isMounted) {
          const data = await res.json();
          setQuote(data);
        }
      } catch {
        // Silent catch
      }
    };

    fetchQuote();

    // Check watchlist in localStorage
    const saved = localStorage.getItem('narrivex_watchlist');
    if (saved) {
      try {
        const list = JSON.parse(saved);
        if (Array.isArray(list) && list.includes(rawSymbol)) {
          setInWatchlist(true);
        }
      } catch {
        // Ignore
      }
    }

    return () => {
      isMounted = false;
    };
  }, [rawSymbol]);

  const toggleWatchlist = () => {
    const saved = localStorage.getItem('narrivex_watchlist');
    let list: string[] = saved ? JSON.parse(saved) : ['BTC', 'ETH', 'AAPL'];

    if (inWatchlist) {
      list = list.filter((s) => s !== rawSymbol);
      toast.success(`Removed ${rawSymbol} from watchlist`);
      setInWatchlist(false);
    } else {
      list.push(rawSymbol);
      toast.success(`Added ${rawSymbol} to watchlist`);
      setInWatchlist(true);
    }

    localStorage.setItem('narrivex_watchlist', JSON.stringify(list));
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Top Bar: Back & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleWatchlist}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
              inWatchlist
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-sea/10 text-sea hover:bg-sea/20'
            }`}
          >
            {inWatchlist ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
          </button>

          <button
            onClick={() => router.push(`/alerts?symbol=${rawSymbol}`)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            <Bell className="h-4 w-4 text-coral" /> Set Alert
          </button>
        </div>
      </div>

      {/* Symbol Header Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-2xl p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-slate-100">
                {rawSymbol}
              </h1>
              <span className="rounded-lg bg-sea/10 px-2.5 py-1 text-xs font-semibold text-sea">
                Real-Time Data
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">Live market feed & AI narrative</p>
          </div>

          <div className="text-right">
            <div className="font-display text-4xl font-bold text-slate-900 dark:text-slate-100">
              {quote ? `$${quote.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '—'}
            </div>
            <div className="mt-1 flex items-center justify-end gap-2">
              {quote && (
                <span
                  className={`inline-flex items-center gap-1 text-sm font-bold ${
                    quote.isPositive ? 'text-emerald-600' : 'text-rose-500'
                  }`}
                >
                  {quote.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {quote.change > 0 ? `+${quote.change.toFixed(2)}` : quote.change.toFixed(2)} (
                  {quote.changePercent})
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5 sm:grid-cols-4 dark:border-slate-800">
          <div>
            <span className="text-xs text-slate-400">24h High</span>
            <p className="font-display text-lg font-bold text-slate-800 dark:text-slate-200">
              {quote ? `$${quote.high.toLocaleString()}` : '—'}
            </p>
          </div>
          <div>
            <span className="text-xs text-slate-400">24h Low</span>
            <p className="font-display text-lg font-bold text-slate-800 dark:text-slate-200">
              {quote ? `$${quote.low.toLocaleString()}` : '—'}
            </p>
          </div>
          <div>
            <span className="text-xs text-slate-400">Volume</span>
            <p className="font-display text-lg font-bold text-slate-800 dark:text-slate-200">
              {quote ? quote.volume.toLocaleString() : '—'}
            </p>
          </div>
          <div>
            <span className="text-xs text-slate-400">Asset Type</span>
            <p className="font-display text-lg font-bold text-sea">
              {rawSymbol.endsWith('USDT') || ['BTC', 'ETH', 'SOL', 'BNB'].includes(rawSymbol)
                ? 'Crypto'
                : 'Stock / Equity'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Grid: Chart + AI Narrative */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Chart symbol={rawSymbol} />
        </div>
        <div className="space-y-6">
          <Narrative symbol={rawSymbol} />

          {/* Quick Technical Overview */}
          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-slate-100">
              Key Metrics Overview
            </h3>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span>Volatility Rating</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Moderate</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span>RSI Status</span>
                <span className="font-semibold text-emerald-600">Neutral (52.4)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span>AI Sentiment</span>
                <span className="font-semibold text-sea">Bullish Bias</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Data Feed</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Alpha Vantage / Binance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
