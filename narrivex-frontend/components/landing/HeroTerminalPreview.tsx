'use client';

import { useState } from 'react';
import {
  Sparkles,
  Shield,
  Radio,
  CheckCircle2,
} from 'lucide-react';

interface SignalItem {
  id: string;
  category: 'Crypto' | 'Equities' | 'Forex' | 'Macro';
  symbol: string;
  name: string;
  change: string;
  isPositive: boolean;
  trigger: string;
  timeAgo: string;
  confidence: number;
  impact: 'Critical' | 'High Volatility' | 'Medium';
  venue: string;
  aiExplanation: string;
  metrics: {
    volumeSurge: string;
    orderImbalance: string;
    catalystType: string;
    actionableState: string;
  };
}

const mockSignals: SignalItem[] = [
  {
    id: 'sig-1',
    category: 'Crypto',
    symbol: 'BTC / USD',
    name: 'Bitcoin',
    change: '+4.82%',
    isPositive: true,
    trigger: 'Whale Liquidation Cluster & $96.5K Breakout',
    timeAgo: 'Just now',
    confidence: 96,
    impact: 'High Volatility',
    venue: 'Binance / Coinbase Pro',
    aiExplanation:
      'Spot aggregate volume surged 340% above 20-period baseline following an abrupt $54M short liquidation cascade. Cumulative Volume Delta (CVD) shows aggressive taker buy dominance.',
    metrics: {
      volumeSurge: '+340% 15m',
      orderImbalance: '82% Buy / 18% Sell',
      catalystType: 'Derivatives Squeeze',
      actionableState: 'Bullish Momentum Expansion',
    },
  },
  {
    id: 'sig-2',
    category: 'Equities',
    symbol: 'NVDA',
    name: 'NVIDIA Corp',
    change: '+3.45%',
    isPositive: true,
    trigger: 'Dark Pool Block Trade + Supply Chain Catalyst',
    timeAgo: '42s ago',
    confidence: 93,
    impact: 'Critical',
    venue: 'NASDAQ / Dark Pools',
    aiExplanation:
      'Aggregated institutional print of 480k shares filled above the ask in dark pools. Correlates with pre-market Taiwan semiconductor fabrication node expansion announcement.',
    metrics: {
      volumeSurge: '+210% vs 5d avg',
      orderImbalance: '74% Institutional Block',
      catalystType: 'Supply Chain News & Block Flow',
      actionableState: 'Resistance Absorption Confirmed',
    },
  },
  {
    id: 'sig-3',
    category: 'Forex',
    symbol: 'EUR / USD',
    name: 'Euro / US Dollar',
    change: '-0.38%',
    isPositive: false,
    trigger: 'ECB Policy Divergence & Yield Curve Shift',
    timeAgo: '2m ago',
    confidence: 91,
    impact: 'Medium',
    venue: 'Interbank FX / Reuters',
    aiExplanation:
      'Hawkish US 10-year Treasury yield rebound (+6bps) triggered rapid cross-currency unwinding against Eurozone sovereign debt. Algorithmic sell wall established at 1.0870.',
    metrics: {
      volumeSurge: '+185% interbank vol',
      orderImbalance: '68% Bid Absorption',
      catalystType: 'Macro Yield Spread',
      actionableState: 'Downside Mean Reversion',
    },
  },
  {
    id: 'sig-4',
    category: 'Crypto',
    symbol: 'SOL / USD',
    name: 'Solana',
    change: '+8.95%',
    isPositive: true,
    trigger: 'DEX Liquidity Surge & Validator Throughput High',
    timeAgo: '4m ago',
    confidence: 95,
    impact: 'Critical',
    venue: 'Raydium / Binance',
    aiExplanation:
      'On-chain DEX turnover hit $1.2B in 4 hours driven by meme liquidity rotations. Perp funding rates reset positive with open interest expanding by $180M.',
    metrics: {
      volumeSurge: '+420% On-Chain DEX',
      orderImbalance: '89% Taker Volume',
      catalystType: 'On-Chain Velocity Outlier',
      actionableState: 'Trend Continuation Active',
    },
  },
];

export function HeroTerminalPreview() {
  const [selectedId, setSelectedId] = useState<string>('sig-1');
  const [activeTab, setActiveTab] = useState<'All' | 'Crypto' | 'Equities' | 'Forex'>('All');

  const filteredSignals = activeTab === 'All' ? mockSignals : mockSignals.filter((s) => s.category === activeTab);
  const activeSignal = mockSignals.find((s) => s.id === selectedId) || mockSignals[0];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white/90 p-4 shadow-2xl backdrop-blur-xl dark:border-white/15 dark:bg-slate-950/90 sm:p-6">
      {/* Decorative Glow Ambient Layer */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-sea/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-coral/15 blur-3xl" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-4 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sea/15 text-sea">
            <Radio className="h-4 w-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-bold text-slate-900 dark:text-white">
                Live AI Intelligence Terminal
              </span>
              <span className="flex items-center gap-1 rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                STREAMING
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Low-latency WebSocket • 24ms Ingestion • NLP Synthesizer
            </p>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex rounded-lg border border-black/10 bg-slate-100/80 p-0.5 text-xs font-semibold dark:border-slate-800 dark:bg-slate-900">
          {(['All', 'Crypto', 'Equities', 'Forex'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-2.5 py-1 transition ${
                activeTab === tab
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-800 dark:text-white font-bold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Signal Display Area */}
      <div className="relative z-10 mt-4 grid gap-4 lg:grid-cols-12">
        {/* Left Column: Interactive Alert Stream List */}
        <div className="space-y-2 lg:col-span-5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 px-1">
            <span>DETECTED ANOMALIES</span>
            <span>STATUS</span>
          </div>

          {filteredSignals.map((signal) => {
            const isSelected = signal.id === activeSignal.id;
            return (
              <button
                key={signal.id}
                onClick={() => setSelectedId(signal.id)}
                className={`w-full text-left transition-all duration-200 rounded-xl p-3 border ${
                  isSelected
                    ? 'border-sea bg-sea/10 shadow-md dark:border-sea/80 dark:bg-sea/15 ring-1 ring-sea/30'
                    : 'border-black/5 bg-slate-50/70 hover:border-black/15 hover:bg-slate-100/70 dark:border-slate-800/80 dark:bg-slate-900/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xs font-bold text-slate-900 dark:text-white">
                      {signal.symbol}
                    </span>
                    <span
                      className={`rounded px-1.5 py-0.2 text-[10px] font-bold ${
                        signal.isPositive
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                          : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {signal.change}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{signal.timeAgo}</span>
                </div>

                <p className="mt-1 line-clamp-1 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  {signal.trigger}
                </p>

                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                  <span className="font-mono text-slate-400">{signal.venue}</span>
                  <span className="font-semibold text-sea flex items-center gap-0.5">
                    <Sparkles className="h-2.5 w-2.5" />
                    {signal.confidence}% Confidence
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep AI Reasoning Inspector */}
        <div className="lg:col-span-7">
          <div className="h-full rounded-xl border border-sea/30 bg-gradient-to-br from-sea/5 via-transparent to-coral/5 p-4 dark:border-sea/30 dark:bg-slate-900/90 sm:p-5 flex flex-col justify-between">
            <div>
              {/* Active Signal Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                      {activeSignal.symbol}
                    </h4>
                    <span className="text-xs text-slate-500">({activeSignal.name})</span>
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                        activeSignal.isPositive
                          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                          : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {activeSignal.change}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs font-medium text-coral dark:text-orange-400">
                    ⚡ {activeSignal.trigger}
                  </p>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="h-3 w-3" />
                    {activeSignal.confidence}% Conviction
                  </span>
                </div>
              </div>

              {/* Instant AI Narrative Box */}
              <div className="mt-4 rounded-xl border border-sea/20 bg-white/95 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/90">
                <div className="flex items-center justify-between border-b border-black/5 pb-2 dark:border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-sea">
                    <Sparkles className="h-4 w-4" />
                    <span>Instant AI Narrative Breakdown</span>
                  </div>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    LLM Synthesis: 38ms
                  </span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-slate-700 dark:text-slate-200">
                  &quot;{activeSignal.aiExplanation}&quot;
                </p>
              </div>

              {/* Institutional Telemetry Grid */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border border-black/5 bg-white/60 p-2.5 dark:border-slate-800 dark:bg-slate-900/60">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Volume Surge</span>
                  <p className="mt-0.5 font-mono font-bold text-slate-900 dark:text-white">
                    {activeSignal.metrics.volumeSurge}
                  </p>
                </div>

                <div className="rounded-lg border border-black/5 bg-white/60 p-2.5 dark:border-slate-800 dark:bg-slate-900/60">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Order Flow</span>
                  <p className="mt-0.5 font-mono font-bold text-slate-900 dark:text-white">
                    {activeSignal.metrics.orderImbalance}
                  </p>
                </div>

                <div className="rounded-lg border border-black/5 bg-white/60 p-2.5 dark:border-slate-800 dark:bg-slate-900/60">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Catalyst Classification</span>
                  <p className="mt-0.5 font-semibold text-slate-800 dark:text-slate-200">
                    {activeSignal.metrics.catalystType}
                  </p>
                </div>

                <div className="rounded-lg border border-black/5 bg-white/60 p-2.5 dark:border-slate-800 dark:bg-slate-900/60">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Actionable Scenario</span>
                  <p className="mt-0.5 font-semibold text-emerald-600 dark:text-emerald-400">
                    {activeSignal.metrics.actionableState}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Callout */}
            <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5 text-sea" />
                Continuous Cross-Exchange Ingestion
              </span>
              <span className="font-mono text-sea">WebSocket ID: #NX-LIVE-{activeSignal.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
