'use client';

import { useState } from 'react';
import {
  Coins,
  TrendingUp,
  Globe2,
  Gem,
  Zap,
} from 'lucide-react';

interface AssetCategory {
  id: string;
  name: string;
  icon: typeof Coins;
  totalMonitored: string;
  sampleAssets: {
    symbol: string;
    name: string;
    volatility24h: string;
    primaryTriggers: string;
    latency: string;
  }[];
  keySources: string[];
}

const assetCategories: AssetCategory[] = [
  {
    id: 'crypto',
    name: 'Digital Assets & On-Chain',
    icon: Coins,
    totalMonitored: '540+ Pairs & DEX Pools',
    sampleAssets: [
      { symbol: 'BTC/USD', name: 'Bitcoin', volatility24h: 'High (4.8%)', primaryTriggers: 'Whale CVD Drift, Perp Squeeze, ETF Net Flow', latency: '12ms' },
      { symbol: 'ETH/USD', name: 'Ethereum', volatility24h: 'High (6.1%)', primaryTriggers: 'L2 Liquidity Rotations, Staking Outflows, Gas Spikes', latency: '14ms' },
      { symbol: 'SOL/USD', name: 'Solana', volatility24h: 'Extreme (9.2%)', primaryTriggers: 'DEX Pool Velocity, Token Mint Vol, Validator Flow', latency: '9ms' },
      { symbol: 'AVAX/USD', name: 'Avalanche', volatility24h: 'Moderate (3.4%)', primaryTriggers: 'Subnet Activity & Institutional RWA Volume', latency: '16ms' },
    ],
    keySources: ['Binance', 'Coinbase Pro', 'OKX', 'Bybit', 'Raydium', 'Uniswap v3', 'Hyperliquid'],
  },
  {
    id: 'equities',
    name: 'Global Equities & Options',
    icon: TrendingUp,
    totalMonitored: '2,800+ US & Global Stocks',
    sampleAssets: [
      { symbol: 'NVDA', name: 'NVIDIA Corp', volatility24h: 'High (3.5%)', primaryTriggers: 'Dark Pool Block Absorption, Supply Chain Catalysts', latency: '18ms' },
      { symbol: 'AAPL', name: 'Apple Inc', volatility24h: 'Low (0.8%)', primaryTriggers: 'Option Gamma Imbalance, Institutional Rebalancing', latency: '16ms' },
      { symbol: 'TSLA', name: 'Tesla Inc', volatility24h: 'High (4.2%)', primaryTriggers: '0DTE Option Flow, Retail Sentiment Surge, Delivery Stats', latency: '15ms' },
      { symbol: 'SPY', name: 'S&P 500 ETF', volatility24h: 'Moderate (1.1%)', primaryTriggers: 'VIX Volatility Expansion, Fed Macro Speeches', latency: '12ms' },
    ],
    keySources: ['NYSE Arca', 'NASDAQ', 'Cboe Options', 'FINRA Dark Pool ADF', 'SEC EDGAR'],
  },
  {
    id: 'forex',
    name: 'Interbank Forex & Macro',
    icon: Globe2,
    totalMonitored: '48 Currency Pairs',
    sampleAssets: [
      { symbol: 'EUR/USD', name: 'Euro / US Dollar', volatility24h: 'Moderate (0.4%)', primaryTriggers: 'ECB vs Fed Rate Expectations, Sovereign Yield Spreads', latency: '21ms' },
      { symbol: 'USD/JPY', name: 'US Dollar / Yen', volatility24h: 'High (1.2%)', primaryTriggers: 'BoJ Yield Curve Control & Carry Trade Unwinds', latency: '24ms' },
      { symbol: 'GBP/USD', name: 'British Pound / USD', volatility24h: 'Moderate (0.6%)', primaryTriggers: 'BoE Policy Statements & UK Inflation Prints', latency: '19ms' },
      { symbol: 'AUD/USD', name: 'Aussie Dollar', volatility24h: 'Moderate (0.7%)', primaryTriggers: 'China Commodity Demand & RBA Rate Pivots', latency: '22ms' },
    ],
    keySources: ['EBS Interbank', 'Reuters Dealing', 'Bloomberg B-PIPE', 'ECB/Fed Data Feeds'],
  },
  {
    id: 'commodities',
    name: 'Commodities & Metals',
    icon: Gem,
    totalMonitored: '32 Futures & Spot Feeds',
    sampleAssets: [
      { symbol: 'XAU/USD', name: 'Gold Spot', volatility24h: 'Moderate (1.2%)', primaryTriggers: 'Central Bank Accumulation, Real Rate Inversions', latency: '18ms' },
      { symbol: 'XAG/USD', name: 'Silver Spot', volatility24h: 'High (2.8%)', primaryTriggers: 'Industrial Demand Surges & COMEX Vault Deliveries', latency: '20ms' },
      { symbol: 'CL.1', name: 'WTI Crude Oil', volatility24h: 'High (3.1%)', primaryTriggers: 'OPEC+ Supply Quotas, EIA Inventory Drawdowns', latency: '22ms' },
    ],
    keySources: ['CME NYMEX', 'COMEX', 'London Bullion Market (LBMA)', 'ICE Futures'],
  },
];

export function CoverageMatrix() {
  const [activeCategory, setActiveCategory] = useState<string>('crypto');
  const activeData = assetCategories.find((c) => c.id === activeCategory) || assetCategories[0];

  return (
    <section className="mb-20 rounded-3xl border border-black/10 bg-white/70 p-6 backdrop-blur sm:p-10 dark:border-white/10 dark:bg-slate-900/60">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-6 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sea">
            <Globe2 className="h-3.5 w-3.5" />
            Cross-Asset Unified Matrix
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl text-slate-900 dark:text-white">
            14,800+ Instruments across All Major Venues
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Never switch between disjointed dashboards again. Monitor crypto, stocks, FX, and commodities simultaneously.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex flex-wrap gap-1.5 rounded-2xl border border-black/10 bg-slate-100/80 p-1.5 dark:border-slate-800 dark:bg-slate-800/80">
          {assetCategories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4 text-sea" />
                <span>{cat.name.split('&')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Asset Table Preview */}
      <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white/90 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
        <table className="w-full min-w-[700px] text-left text-xs">
          <thead className="bg-slate-50/80 border-b border-black/5 dark:bg-slate-900/80 dark:border-white/5">
            <tr>
              <th className="px-5 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-slate-500">
                Instrument
              </th>
              <th className="px-5 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-slate-500">
                24h Volatility State
              </th>
              <th className="px-5 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-slate-500">
                Primary AI Trigger Rules
              </th>
              <th className="px-5 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-slate-500 text-right">
                Feed Ingestion Speed
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {activeData.sampleAssets.map((asset) => (
              <tr
                key={asset.symbol}
                className="hover:bg-slate-50/60 dark:hover:bg-slate-900/50 transition-colors"
              >
                <td className="px-5 py-4 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {asset.symbol}
                    </span>
                    <span className="text-slate-400 text-[11px]">({asset.name})</span>
                  </div>
                </td>
                <td className="px-5 py-4 font-semibold text-slate-700 dark:text-slate-300">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                    <Zap className="h-3 w-3 text-amber-500" />
                    {asset.volatility24h}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                  {asset.primaryTriggers}
                </td>
                <td className="px-5 py-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  ⚡ {asset.latency}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Venues Strip */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 px-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Directly Connected Feeds:</span>
          {activeData.keySources.map((source) => (
            <span
              key={source}
              className="rounded-md border border-black/10 bg-white/80 px-2 py-0.5 text-[11px] font-mono text-slate-700 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300"
            >
              {source}
            </span>
          ))}
        </div>
        <span className="font-mono font-semibold text-sea">{activeData.totalMonitored} active</span>
      </div>
    </section>
  );
}
