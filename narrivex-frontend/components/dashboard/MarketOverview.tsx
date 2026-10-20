'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

export interface MarketTickerItem {
  symbol: string;
  price: string;
  move: string;
  positive: boolean;
  justUpdated?: 'up' | 'down';
}

const DEFAULT_ITEMS: MarketTickerItem[] = [
  { symbol: 'BTC', price: '$96,420', move: '+4.8%', positive: true },
  { symbol: 'ETH', price: '$3,450', move: '+6.1%', positive: true },
  { symbol: 'SOL', price: '$194.80', move: '+8.9%', positive: true },
  { symbol: 'NVDA', price: '$138.65', move: '+3.4%', positive: true },
  { symbol: 'AAPL', price: '$231.90', move: '-0.4%', positive: false },
  { symbol: 'TSLA', price: '$248.30', move: '-1.8%', positive: false },
  { symbol: 'GOLD', price: '$2,742', move: '+1.2%', positive: true },
  { symbol: 'EUR/USD', price: '1.0842', move: '-0.15%', positive: false },
  { symbol: 'S&P 500', price: '5,864', move: '+0.45%', positive: true },
];

interface MarketOverviewProps {
  onSelectSymbol?: (symbol: string) => void;
}

export function MarketOverview({ onSelectSymbol }: MarketOverviewProps) {
  const [items, setItems] = useState<MarketTickerItem[]>(DEFAULT_ITEMS);

  useEffect(() => {
    let isMounted = true;

    const fetchMovers = async () => {
      try {
        const res = await fetch('/api/market/movers');
        if (res.ok && isMounted) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setItems(data);
          }
        }
      } catch {
        // Handled silently
      }
    };

    fetchMovers();

    // Subtle live tick simulation to make the terminal feel real-time
    const tickInterval = setInterval(() => {
      if (!isMounted) return;
      setItems((prev) => {
        const randomIndex = Math.floor(Math.random() * prev.length);
        const item = prev[randomIndex];
        if (!item) return prev;

        const isUp = Math.random() > 0.45;
        return prev.map((entry, idx) => {
          if (idx !== randomIndex) return { ...entry, justUpdated: undefined };
          return {
            ...entry,
            justUpdated: isUp ? 'up' : 'down',
          };
        });
      });
    }, 3800);

    return () => {
      isMounted = false;
      clearInterval(tickInterval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel market-ticker group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-2.5 backdrop-blur-md transition-colors dark:border-white/10 dark:bg-slate-900/80"
    >
      {/* Live status badge on the left */}
      <div className="absolute left-0 top-0 bottom-0 z-10 hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-white via-white/95 to-transparent pr-4 pl-3.5 dark:from-slate-900 dark:via-slate-900/95">
        <Radio className="h-3.5 w-3.5 text-sea animate-pulse" />
        <span className="font-display text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Global Ticker
        </span>
      </div>

      <div className="flex animate-ticker-scroll gap-8 whitespace-nowrap hover:[animation-play-state:paused] cursor-pointer sm:pl-32">
        {[...items, ...items].map((item, i) => (
          <button
            type="button"
            key={`${item.symbol}-${i}`}
            onClick={() => onSelectSymbol?.(item.symbol)}
            className={`inline-flex items-center gap-2.5 rounded-lg px-2 py-1 transition-all ${
              item.justUpdated === 'up'
                ? 'bg-emerald-500/20 ring-1 ring-emerald-500/40'
                : item.justUpdated === 'down'
                ? 'bg-rose-500/20 ring-1 ring-rose-500/40'
                : 'hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
            }`}
          >
            <span className="text-xs font-bold text-slate-800 dashboard-card-heading dark:text-slate-200">
              {item.symbol}
            </span>
            <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
              {item.price}
            </span>
            <span
              className={`inline-flex items-center gap-0.5 text-[11px] font-bold ${
                item.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
              }`}
            >
              {item.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {item.move}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
