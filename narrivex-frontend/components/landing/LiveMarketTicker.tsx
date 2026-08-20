'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Zap, Flame } from 'lucide-react';

interface TickerItem {
  symbol: string;
  name: string;
  category: 'Crypto' | 'Equities' | 'Forex' | 'Commodities';
  price: number;
  change24h: number;
  alertType?: string;
  volume: string;
}

const initialTickers: TickerItem[] = [
  { symbol: 'BTC/USD', name: 'Bitcoin', category: 'Crypto', price: 96420.50, change24h: 4.82, alertType: 'Whale Outlier', volume: '$42.8B' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', category: 'Equities', price: 138.65, change24h: 3.45, alertType: 'Order Imbalance', volume: '$18.4B' },
  { symbol: 'ETH/USD', name: 'Ethereum', category: 'Crypto', price: 3452.10, change24h: 6.12, alertType: 'Breakout Confirmed', volume: '$19.2B' },
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', category: 'Forex', price: 1.0842, change24h: -0.28, alertType: 'ECB Divergence', volume: '$110B' },
  { symbol: 'SOL/USD', name: 'Solana', category: 'Crypto', price: 194.80, change24h: 8.95, alertType: 'DEX Volume Surge', volume: '$8.6B' },
  { symbol: 'TSLA', name: 'Tesla Inc', category: 'Equities', price: 248.30, change24h: -1.85, volume: '$12.1B' },
  { symbol: 'XAU/USD', name: 'Gold Spot', category: 'Commodities', price: 2742.40, change24h: 1.15, alertType: 'Macro Flight', volume: '$34.5B' },
  { symbol: 'AAPL', name: 'Apple Inc', category: 'Equities', price: 231.90, change24h: 0.74, volume: '$9.8B' },
  { symbol: 'GBP/USD', name: 'British Pound', category: 'Forex', price: 1.2915, change24h: 0.42, volume: '$78B' },
  { symbol: 'SPY', name: 'S&P 500 ETF', category: 'Equities', price: 592.40, change24h: 0.88, alertType: 'Dark Pool Block', volume: '$48.2B' },
];

export function LiveMarketTicker() {
  const [tickers, setTickers] = useState<TickerItem[]>(initialTickers);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Crypto' | 'Equities' | 'Forex'>('All');

  // Subtle real-time price tick simulation to give the live institutional feel
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) =>
        prev.map((item) => {
          const delta = (Math.random() - 0.48) * (item.price * 0.0008);
          const newPrice = Math.max(0.0001, item.price + delta);
          return {
            ...item,
            price: Number(newPrice.toFixed(item.category === 'Forex' ? 4 : 2)),
          };
        })
      );
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  const filteredTickers = activeFilter === 'All' ? tickers : tickers.filter((t) => t.category === activeFilter);
  const displayItems = [...filteredTickers, ...filteredTickers]; // Duplicate for seamless infinite marquee loop

  return (
    <div className="w-full border-y border-black/10 bg-slate-950 text-slate-100 dark:border-white/10">
      {/* Top telemetry bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-mono font-bold tracking-wider text-emerald-400">LIVE FEED</span>
          </div>
          <span className="hidden text-slate-600 sm:inline">|</span>
          <span className="hidden items-center gap-1 sm:inline-flex text-slate-300">
            <Zap className="h-3 w-3 text-amber-400" />
            <span>AI Narrative Engine: <strong>Active (12ms latency)</strong></span>
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="text-slate-500">Filter:</span>
          {(['All', 'Crypto', 'Equities', 'Forex'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded px-1.5 py-0.5 transition ${
                activeFilter === filter
                  ? 'bg-sea text-white font-bold'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Marquee Track */}
      <div className="relative flex overflow-hidden border-t border-slate-800/80 py-2.5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-slate-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-slate-950 to-transparent" />

        <div className="flex shrink-0 animate-ticker-scroll items-center gap-6 whitespace-nowrap pl-4">
          {displayItems.map((item, idx) => {
            const isPositive = item.change24h >= 0;
            return (
              <div
                key={`${item.symbol}-${idx}`}
                className="group inline-flex items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-1.5 shadow-sm transition hover:border-sea/50 hover:bg-slate-800/90"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-bold text-white group-hover:text-sea transition">
                    {item.symbol}
                  </span>
                  <span className="rounded bg-slate-800 px-1 py-0.2 text-[9px] font-semibold text-slate-400">
                    {item.category}
                  </span>
                </div>

                <span className="font-mono text-xs font-semibold text-slate-200">
                  {item.category === 'Forex' ? item.price.toFixed(4) : `$${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </span>

                <div
                  className={`inline-flex items-center gap-0.5 text-[11px] font-bold ${
                    isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  <span>{isPositive ? `+${item.change24h}%` : `${item.change24h}%`}</span>
                </div>

                {item.alertType && (
                  <span className="inline-flex items-center gap-1 rounded bg-sea/20 px-1.5 py-0.5 text-[9px] font-semibold text-sea border border-sea/30">
                    <Flame className="h-2.5 w-2.5 text-coral" />
                    {item.alertType}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
