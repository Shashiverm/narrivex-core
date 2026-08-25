'use client';

import { useState, useMemo } from 'react';
import {
  Coins,
  TrendingUp,
  Globe2,
  Gem,
  Search,
  Zap,
} from 'lucide-react';

interface AssetCategory {
  id: string;
  name: string;
  shortName: string;
  icon: typeof Coins;
  totalMonitored: string;
  sampleAssets: {
    symbol: string;
    name: string;
    volatility24h: string;
    volatilityLevel: 'high' | 'moderate' | 'low';
    primaryTriggers: string;
    latency: string;
  }[];
  keySources: string[];
}

const assetCategories: AssetCategory[] = [
  {
    id: 'crypto',
    name: 'Digital Assets & On-Chain DEX',
    shortName: 'Crypto & DEX',
    icon: Coins,
    totalMonitored: '540+ Pairs & Pools',
    sampleAssets: [
      { symbol: 'BTC/USDT', name: 'Bitcoin Perpetual', volatility24h: '4.8% Vol', volatilityLevel: 'high', primaryTriggers: 'Whale CVD Drift, Perp Liquidation Cascade, ETF Net Flow', latency: '12ms' },
      { symbol: 'ETH/USDT', name: 'Ethereum Perpetual', volatility24h: '6.1% Vol', volatilityLevel: 'high', primaryTriggers: 'L2 Liquidity Rotation, Validator Staking Outflows', latency: '14ms' },
      { symbol: 'SOL/USDT', name: 'Solana Spot', volatility24h: '9.2% Vol', volatilityLevel: 'high', primaryTriggers: 'DEX Pool Velocity, Token Mint Vol, Mempool Outliers', latency: '9ms' },
      { symbol: 'AVAX/USDT', name: 'Avalanche Spot', volatility24h: '3.4% Vol', volatilityLevel: 'moderate', primaryTriggers: 'Subnet Activity & Institutional RWA Volume', latency: '16ms' },
    ],
    keySources: ['Binance', 'Coinbase Pro', 'OKX', 'Bybit', 'Raydium', 'Uniswap v3', 'Hyperliquid'],
  },
  {
    id: 'equities',
    name: 'Global Equities & Options Flow',
    shortName: 'Equities & Options',
    icon: TrendingUp,
    totalMonitored: '2,800+ US & Global Equities',
    sampleAssets: [
      { symbol: 'NVDA', name: 'NVIDIA Corp', volatility24h: '3.5% Vol', volatilityLevel: 'high', primaryTriggers: 'Dark Pool Block Absorption, Supply Chain Catalysts', latency: '18ms' },
      { symbol: 'AAPL', name: 'Apple Inc', volatility24h: '0.8% Vol', volatilityLevel: 'low', primaryTriggers: 'Option Gamma Imbalance, Institutional Rebalancing', latency: '16ms' },
      { symbol: 'TSLA', name: 'Tesla Inc', volatility24h: '4.2% Vol', volatilityLevel: 'high', primaryTriggers: '0DTE Option Flow, Retail Sentiment Surge', latency: '15ms' },
      { symbol: 'SPY', name: 'S&P 500 ETF', volatility24h: '1.1% Vol', volatilityLevel: 'moderate', primaryTriggers: 'VIX Volatility Expansion, Fed Macro Speeches', latency: '12ms' },
    ],
    keySources: ['NYSE Arca', 'NASDAQ', 'Cboe Options', 'FINRA ADF Dark Pools', 'SEC EDGAR'],
  },
  {
    id: 'forex',
    name: 'Interbank Forex & Sovereign Debt',
    shortName: 'Interbank FX',
    icon: Globe2,
    totalMonitored: '48 Currency Pairs',
    sampleAssets: [
      { symbol: 'EUR/USD', name: 'Euro / US Dollar', volatility24h: '0.4% Vol', volatilityLevel: 'low', primaryTriggers: 'ECB vs Fed Rate Expectations, Sovereign Yield Spreads', latency: '21ms' },
      { symbol: 'USD/JPY', name: 'US Dollar / Yen', volatility24h: '1.2% Vol', volatilityLevel: 'moderate', primaryTriggers: 'BoJ Yield Curve Control & Carry Trade Unwinds', latency: '24ms' },
      { symbol: 'GBP/USD', name: 'British Pound / USD', volatility24h: '0.6% Vol', volatilityLevel: 'moderate', primaryTriggers: 'BoE Policy Statements & UK Inflation Prints', latency: '19ms' },
      { symbol: 'AUD/USD', name: 'Aussie Dollar', volatility24h: '0.7% Vol', volatilityLevel: 'moderate', primaryTriggers: 'China Commodity Demand & RBA Rate Pivots', latency: '22ms' },
    ],
    keySources: ['EBS Interbank', 'Reuters Dealing', 'Bloomberg B-PIPE', 'ECB & Fed FastFeeds'],
  },
  {
    id: 'commodities',
    name: 'Commodities & Precious Metals',
    shortName: 'Commodities',
    icon: Gem,
    totalMonitored: '32 Futures & Spot Feeds',
    sampleAssets: [
      { symbol: 'XAU/USD', name: 'Gold Spot', volatility24h: '1.2% Vol', volatilityLevel: 'moderate', primaryTriggers: 'Central Bank Accumulation, Real Rate Inversions', latency: '18ms' },
      { symbol: 'XAG/USD', name: 'Silver Spot', volatility24h: '2.8% Vol', volatilityLevel: 'high', primaryTriggers: 'Industrial Demand Surges & COMEX Deliveries', latency: '20ms' },
      { symbol: 'CL.1', name: 'WTI Crude Oil', volatility24h: '3.1% Vol', volatilityLevel: 'high', primaryTriggers: 'OPEC+ Supply Quotas, EIA Inventory Drawdowns', latency: '22ms' },
    ],
    keySources: ['CME NYMEX', 'COMEX', 'London Bullion Market (LBMA)', 'ICE Futures'],
  },
];

export function CoverageMatrix() {
  const [activeCategory, setActiveCategory] = useState<string>('crypto');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeData = useMemo(() => {
    return assetCategories.find((c) => c.id === activeCategory) || assetCategories[0];
  }, [activeCategory]);

  const filteredAssets = useMemo(() => {
    if (!searchQuery.trim()) return activeData.sampleAssets;
    const query = searchQuery.toLowerCase();
    return activeData.sampleAssets.filter(
      (a) =>
        a.symbol.toLowerCase().includes(query) ||
        a.name.toLowerCase().includes(query) ||
        a.primaryTriggers.toLowerCase().includes(query)
    );
  }, [activeData, searchQuery]);

  return (
    <section className="mb-24 rounded-3xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-[#0d131f]/70 sm:p-8 lg:p-10">
      {/* Header with Title and Search / Tabs */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200/80 pb-6 dark:border-white/[0.06]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-3 py-1 font-mono text-xs font-semibold text-sea">
            <Globe2 className="h-3.5 w-3.5" />
            Cross-Asset Unified Ingestion
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold md:text-4xl text-slate-900 dark:text-white">
            14,800+ Instruments Monitored in Real Time
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
            Stream unified intelligence across crypto mempools, equities dark pools, FX interbank, and futures from a single endpoint.
          </p>
        </div>

        {/* Search & Category Pills */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
          {/* Quick Search */}
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search ticker or trigger..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-52 md:w-60 rounded-xl border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-sea focus:outline-none dark:border-white/[0.08] dark:bg-[#090d16] dark:text-slate-200"
            />
          </div>

          {/* Category Switcher Tabs */}
          <div className="flex items-center overflow-x-auto no-scrollbar gap-1 rounded-xl border border-slate-200 bg-slate-100/80 p-1 dark:border-white/[0.08] dark:bg-[#070a10]">
            {assetCategories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 font-mono text-xs font-semibold transition ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-xs dark:bg-white/[0.1] dark:text-white font-bold'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 text-sea" />
                  <span>{cat.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Asset Table Preview */}
      <div className="relative overflow-x-auto rounded-xl border border-slate-200/80 bg-white/90 shadow-xs dark:border-white/[0.06] dark:bg-[#090d16]/90">
        <table className="w-full min-w-[680px] text-left text-xs">
          <thead className="bg-slate-50/80 border-b border-slate-200/80 font-mono text-[11px] font-semibold text-slate-500 uppercase dark:bg-[#0c121e] dark:border-white/[0.06] dark:text-slate-400">
            <tr>
              <th className="px-4 sm:px-5 py-3.5">Instrument / Pair</th>
              <th className="px-4 sm:px-5 py-3.5">24h Volatility State</th>
              <th className="px-4 sm:px-5 py-3.5">Primary Quantitative Trigger Rules</th>
              <th className="px-4 sm:px-5 py-3.5 text-right">Ingestion Latency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
            {filteredAssets.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-400">
                  No instruments matching &quot;{searchQuery}&quot; in this category.
                </td>
              </tr>
            ) : (
              filteredAssets.map((asset) => (
                <tr
                  key={asset.symbol}
                  className="hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 sm:px-5 py-3.5 font-medium">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                        {asset.symbol}
                      </span>
                      <span className="text-slate-400 text-[11px]">({asset.name})</span>
                    </div>
                  </td>

                  <td className="px-4 sm:px-5 py-3.5 font-mono whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold ${
                        asset.volatilityLevel === 'high'
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                          : asset.volatilityLevel === 'moderate'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      <Zap className="h-2.5 w-2.5" />
                      {asset.volatility24h}
                    </span>
                  </td>

                  <td className="px-4 sm:px-5 py-3.5 text-slate-600 dark:text-slate-300 font-sans text-xs">
                    {asset.primaryTriggers}
                  </td>

                  <td className="px-4 sm:px-5 py-3.5 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                    ⚡ {asset.latency}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Venues connected footer bar */}
      <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 px-1">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300">
            Directly Ingested Venues:
          </span>
          {activeData.keySources.map((source) => (
            <span
              key={source}
              className="rounded-md border border-slate-200/80 bg-slate-50 px-2 py-0.5 font-mono text-[10px] text-slate-700 dark:border-white/[0.08] dark:bg-[#0c121e] dark:text-slate-300"
            >
              {source}
            </span>
          ))}
        </div>
        <span className="font-mono text-xs font-semibold text-sea shrink-0">{activeData.totalMonitored} monitored</span>
      </div>
    </section>
  );
}

