'use client';

import { useState } from 'react';
import { Chart } from '@/components/dashboard/Chart';
import { Narrative } from '@/components/dashboard/Narrative';
import { Sparkles, TrendingUp, Activity, Bell, Play, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ProTerminalDeepDiveProps {
  symbol: string;
  onSymbolChange?: (newSymbol: string) => void;
}

const mockOrderBook = {
  bids: [
    { price: '96,410', size: '14.2 BTC', depth: 85 },
    { price: '96,390', size: '8.6 BTC', depth: 65 },
    { price: '96,350', size: '21.0 BTC', depth: 95 },
  ],
  asks: [
    { price: '96,440', size: '6.4 BTC', depth: 40 },
    { price: '96,480', size: '9.2 BTC', depth: 55 },
    { price: '96,520', size: '18.5 BTC', depth: 80 },
  ],
};

const quickTerminalSymbols = ['BTC', 'ETH', 'SOL', 'NVDA'];

export function ProTerminalDeepDive({ symbol, onSymbolChange }: ProTerminalDeepDiveProps) {
  const [isSimulated, setIsSimulated] = useState(false);

  return (
    <div className="space-y-6">
      {/* Top Pro Terminal Control Bar */}
      <div className="glass-panel flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-xs backdrop-blur-md dark:border-white/10 dark:bg-slate-900/85">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {symbol} / USD
            </span>
            <span className="rounded-md border border-sea/30 bg-sea/10 px-2 py-0.5 font-mono text-xs font-bold text-sea dark:bg-sea/20 dark:text-sea-light">
              PRO TERMINAL ACTIVE
            </span>
          </div>

          {onSymbolChange && (
            <div className="flex items-center gap-1 rounded-lg border border-slate-200/80 bg-slate-100/70 p-0.5 dark:border-white/10 dark:bg-slate-800/80">
              {quickTerminalSymbols.map((sym) => (
                <button
                  key={sym}
                  type="button"
                  onClick={() => onSymbolChange(sym)}
                  className={`rounded-md px-2 py-0.5 text-xs font-bold transition ${
                    symbol === sym
                      ? 'bg-white text-sea shadow-xs dark:bg-slate-900 dark:text-sea-light'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {sym}
                </button>
              ))}
            </div>
          )}

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span>• Direct Ingestion:</span>
            <strong className="text-slate-800 dark:text-slate-200">Binance / NASDAQ L3 Order Stream</strong>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Paper Trade simulation trigger */}
          <button
            type="button"
            onClick={() => {
              setIsSimulated(true);
              setTimeout(() => setIsSimulated(false), 3000);
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-sea/30 bg-sea/10 px-3 py-1.5 text-xs font-bold text-sea hover:bg-sea/20 transition dark:bg-sea/20 dark:text-sea-light"
          >
            {isSimulated ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <Play className="h-3.5 w-3.5" />}
            <span>{isSimulated ? 'Signal Executed (Paper)' : 'Simulate Paper Trade'}</span>
          </button>

          <Link href="/alerts">
            <Button size="sm" variant="outline" className="text-xs font-semibold dark:border-white/10 dark:bg-slate-800 dark:text-slate-200">
              <Bell className="mr-1.5 h-3.5 w-3.5 text-coral" />
              Set Custom Rule
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Terminal Layout: Chart + Deep AI Inspector */}
      <div className="grid gap-6 xl:grid-cols-12">
        {/* Left Column: High-Performance Chart (7 cols) */}
        <div className="space-y-4 xl:col-span-7">
          <Chart symbol={symbol} delay={0} />

          {/* Real-time Order Flow & CVD Telemetry */}
          <div className="glass-panel grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-2xl border border-slate-200/80 bg-white/85 p-4 text-xs shadow-xs backdrop-blur-md dark:border-white/10 dark:bg-slate-900/85">
            <div className="rounded-xl border border-slate-200/60 bg-slate-50/70 p-3 dark:border-white/5 dark:bg-slate-800/60">
              <span className="text-[10px] uppercase font-bold text-slate-400">Order Book Imbalance</span>
              <p className="mt-1 font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                74% Bids / 26% Asks
              </p>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex">
                <div className="bg-emerald-500 h-full w-[74%]" />
                <div className="bg-rose-500 h-full w-[26%]" />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200/60 bg-slate-50/70 p-3 dark:border-white/5 dark:bg-slate-800/60">
              <span className="text-[10px] uppercase font-bold text-slate-400">Cumulative Delta (CVD)</span>
              <p className="mt-1 font-mono text-sm font-bold text-sea dark:text-sea-light">
                +$42.8M (Aggressive Buys)
              </p>
              <span className="text-[10px] text-slate-400">15m Trailing Window</span>
            </div>

            <div className="rounded-xl border border-slate-200/60 bg-slate-50/70 p-3 dark:border-white/5 dark:bg-slate-800/60">
              <span className="text-[10px] uppercase font-bold text-slate-400">Whale Activity Alert</span>
              <p className="mt-1 font-mono text-sm font-bold text-coral">
                3 Block Fills &gt; $5M
              </p>
              <span className="text-[10px] text-slate-400">Ask Absorption Detected</span>
            </div>
          </div>

          {/* Level 2 Order Book Depth Preview */}
          <div className="glass-panel rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-xs backdrop-blur-md dark:border-white/10 dark:bg-slate-900/85">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-white/5">
              <span className="font-display text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                L2 Depth Heatmap · {symbol}
              </span>
              <span className="text-[10px] font-mono text-slate-400">Spread: 0.01%</span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-4 text-xs font-mono">
              {/* Bids */}
              <div>
                <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mb-1">BIDS (SUPPORT)</p>
                <div className="space-y-1">
                  {mockOrderBook.bids.map((b, i) => (
                    <div key={i} className="relative flex justify-between p-1 rounded overflow-hidden">
                      <div
                        className="absolute inset-y-0 right-0 bg-emerald-500/15"
                        style={{ width: `${b.depth}%` }}
                      />
                      <span className="relative z-10 text-emerald-700 dark:text-emerald-400 font-bold">{b.price}</span>
                      <span className="relative z-10 text-slate-500 dark:text-slate-400">{b.size}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Asks */}
              <div>
                <p className="text-[10px] font-bold text-rose-600 dark:text-rose-400 mb-1">ASKS (RESISTANCE)</p>
                <div className="space-y-1">
                  {mockOrderBook.asks.map((a, i) => (
                    <div key={i} className="relative flex justify-between p-1 rounded overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-rose-500/15"
                        style={{ width: `${a.depth}%` }}
                      />
                      <span className="relative z-10 text-rose-700 dark:text-rose-400 font-bold">{a.price}</span>
                      <span className="relative z-10 text-slate-500 dark:text-slate-400">{a.size}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Deep AI Intelligence & Scenarios (5 cols) */}
        <div className="space-y-4 xl:col-span-5">
          <div className="glass-panel rounded-2xl border border-slate-200/80 bg-white/85 p-5 space-y-4 shadow-xs backdrop-blur-md dark:border-white/10 dark:bg-slate-900/85">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-sea" />
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                  Real-Time AI Narrative & Scenario Forecast
                </h3>
              </div>
            </div>

            {/* AI Narrative Component */}
            <Narrative symbol={symbol} delay={0} />

            {/* AI Actionable Scenarios Breakdown */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <span>Predictive Scenario Planning</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">92% Conviction</span>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-50/60 p-3.5 text-xs text-slate-800 dark:border-emerald-500/30 dark:bg-emerald-950/20 dark:text-slate-200">
                <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Primary Case: Bullish Expansion (68% Prob)</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                  Sustained spot volume above 20-EMA with short liquidation cascade creates a liquidity vacuum toward key overhead resistance.
                </p>
              </div>

              <div className="rounded-xl border border-rose-500/20 bg-rose-50/60 p-3.5 text-xs text-slate-800 dark:border-rose-500/30 dark:bg-rose-950/20 dark:text-slate-200">
                <div className="flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-400 mb-1">
                  <Activity className="h-3.5 w-3.5" />
                  <span>Invalidation Level</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                  A 15-minute close below key bid absorption support invalidates immediate upward expansion bias.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
