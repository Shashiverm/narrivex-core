'use client';

import { useEffect, useState, useMemo } from 'react';
import { Activity, ArrowUpRight, ArrowDownRight, Layers, Pause, Play } from 'lucide-react';

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
  { symbol: 'BTC/USD', name: 'Bitcoin', category: 'Crypto', price: 96420.50, change24h: 4.82, alertType: 'Whale Imbalance', volume: '$42.8B' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', category: 'Equities', price: 138.65, change24h: 3.45, alertType: 'Dark Pool Block', volume: '$18.4B' },
  { symbol: 'ETH/USD', name: 'Ethereum', category: 'Crypto', price: 3452.10, change24h: 6.12, alertType: 'Breakout Squeeze', volume: '$19.2B' },
  { symbol: 'EUR/USD', name: 'Euro / USD', category: 'Forex', price: 1.0842, change24h: -0.28, alertType: 'ECB Divergence', volume: '$110B' },
  { symbol: 'SOL/USD', name: 'Solana', category: 'Crypto', price: 194.80, change24h: 8.95, alertType: 'DEX Velocity Surge', volume: '$8.6B' },
  { symbol: 'TSLA', name: 'Tesla Inc', category: 'Equities', price: 248.30, change24h: -1.85, volume: '$12.1B' },
  { symbol: 'XAU/USD', name: 'Gold Spot', category: 'Commodities', price: 2742.40, change24h: 1.15, alertType: 'Macro Flight', volume: '$34.5B' },
  { symbol: 'AAPL', name: 'Apple Inc', category: 'Equities', price: 231.90, change24h: 0.74, volume: '$9.8B' },
  { symbol: 'GBP/USD', name: 'British Pound', category: 'Forex', price: 1.2915, change24h: 0.42, volume: '$78B' },
  { symbol: 'SPY', name: 'S&P 500 ETF', category: 'Equities', price: 592.40, change24h: 0.88, alertType: 'Gamma Imbalance', volume: '$48.2B' },
];

export function LiveMarketTicker() {
  const [tickers, setTickers] = useState<TickerItem[]>(initialTickers);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Crypto' | 'Equities' | 'Forex' | 'Commodities'>('All');
  const [latency] = useState<number>(14);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setTickers((prev) =>
        prev.map((item) => {
          const delta = (Math.random() - 0.48) * (item.price * 0.0004);
          const newPrice = Math.max(0.0001, item.price + delta);
          return {
            ...item,
            price: Number(newPrice.toFixed(item.category === 'Forex' ? 4 : 2)),
          };
        })
      );
    }, 2800);

    return () => clearInterval(interval);
  }, [isPaused]);

  const filteredTickers = useMemo(() => {
    return activeFilter === 'All' ? tickers : tickers.filter((t) => t.category === activeFilter);
  }, [activeFilter, tickers]);

  // Duplicate list to achieve continuous marquee scrolling
  const displayItems = useMemo(() => [...filteredTickers, ...filteredTickers], [filteredTickers]);

  return (
    <div className="w-full border-b border-slate-200/80 bg-[#070b12] text-slate-200 dark:border-white/[0.07] select-none">
      {/* Top Telemetry Header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-semibold text-emerald-400 tracking-wide text-[10px] uppercase">
              L3 Order Flow Live
            </span>
          </div>

          <span className="text-slate-700 hidden sm:inline">|</span>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-300 font-mono">
            <Activity className="h-3 w-3 text-sea" />
            <span className="text-slate-400">Ingestion Ping:</span>
            <span className="text-emerald-400 font-bold tabular-nums">{latency}ms</span>
          </div>

          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-slate-200 transition-colors"
          >
            {isPaused ? <Play className="h-2.5 w-2.5 text-amber-400" /> : <Pause className="h-2.5 w-2.5" />}
            <span>{isPaused ? 'RESUME STREAM' : 'PAUSE'}</span>
          </button>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-1 font-mono text-[10px]">
          <span className="text-slate-500 mr-1 hidden md:inline">Feeds:</span>
          {(['All', 'Crypto', 'Equities', 'Forex', 'Commodities'] as const).map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-md px-2 py-0.5 transition-colors ${
                  isActive
                    ? 'bg-sea/15 text-sea border border-sea/30 font-bold'
                    : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Marquee Track with subtle edge fading */}
      <div className="relative flex overflow-hidden border-t border-white/[0.05] bg-[#090e18] py-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#090e18] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#090e18] to-transparent" />

        <div
          className={`flex shrink-0 items-center gap-3.5 whitespace-nowrap pl-4 ${
            isPaused ? '' : 'animate-ticker-scroll'
          }`}
        >
          {displayItems.map((item, idx) => {
            const isPositive = item.change24h >= 0;
            return (
              <div
                key={`${item.symbol}-${idx}`}
                className="group inline-flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-[#0c121e] px-3 py-1.5 shadow-xs transition hover:border-sea/40 hover:bg-[#111928]"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-bold text-slate-100 group-hover:text-sea transition-colors">
                    {item.symbol}
                  </span>
                  <span className="rounded bg-white/[0.06] px-1 py-0.2 font-mono text-[9px] text-slate-400 uppercase">
                    {item.category}
                  </span>
                </div>

                <span className="font-mono text-xs font-semibold tabular-nums text-slate-200">
                  {item.category === 'Forex'
                    ? item.price.toFixed(4)
                    : `$${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </span>

                <div
                  className={`inline-flex items-center gap-0.5 rounded px-1.5 py-0.2 font-mono text-[10px] font-bold tabular-nums ${
                    isPositive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
                  }`}
                >
                  {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  <span>{isPositive ? `+${item.change24h}%` : `${item.change24h}%`}</span>
                </div>

                {item.alertType && (
                  <span className="inline-flex items-center gap-1 rounded border border-amber-500/25 bg-amber-500/10 px-1.5 py-0.2 font-mono text-[9px] font-medium text-amber-300">
                    <Layers className="h-2.5 w-2.5 text-amber-400" />
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

