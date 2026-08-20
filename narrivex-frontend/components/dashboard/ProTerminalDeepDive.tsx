'use client';

import { Chart } from '@/components/dashboard/Chart';
import { Narrative } from '@/components/dashboard/Narrative';
import { Sparkles, TrendingUp, Activity, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ProTerminalDeepDiveProps {
  symbol: string;
  onSymbolChange?: (newSymbol: string) => void;
}

export function ProTerminalDeepDive({ symbol }: ProTerminalDeepDiveProps) {
  return (
    <div className="space-y-6">
      {/* Top Pro Terminal Control Bar */}
      <div className="glass-panel flex flex-wrap items-center justify-between gap-4 rounded-2xl p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {symbol} / USD
            </span>
            <span className="rounded-md bg-sea/10 px-2 py-0.5 font-mono text-xs font-bold text-sea">
              PRO TERMINAL ACTIVE
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-xs text-slate-400">
            <span>• Direct Ingestion Feed:</span>
            <strong className="text-slate-700 dark:text-slate-300">Binance / NASDAQ L3</strong>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/alerts">
            <Button size="sm" variant="outline" className="text-xs font-semibold">
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
          <div className="glass-panel grid grid-cols-3 gap-3 rounded-2xl p-4 text-xs">
            <div className="rounded-xl border border-black/5 bg-slate-50/70 p-3 dark:border-white/5 dark:bg-slate-800/60">
              <span className="text-[10px] uppercase font-bold text-slate-400">Order Book Imbalance</span>
              <p className="mt-1 font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                74% Bids / 26% Asks
              </p>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden flex">
                <div className="bg-emerald-500 h-full w-[74%]" />
                <div className="bg-rose-500 h-full w-[26%]" />
              </div>
            </div>

            <div className="rounded-xl border border-black/5 bg-slate-50/70 p-3 dark:border-white/5 dark:bg-slate-800/60">
              <span className="text-[10px] uppercase font-bold text-slate-400">Cumulative Delta (CVD)</span>
              <p className="mt-1 font-mono text-sm font-bold text-sea">
                +$42.8M (Aggressive Buys)
              </p>
              <span className="text-[10px] text-slate-400">15m Window</span>
            </div>

            <div className="rounded-xl border border-black/5 bg-slate-50/70 p-3 dark:border-white/5 dark:bg-slate-800/60">
              <span className="text-[10px] uppercase font-bold text-slate-400">Whale Activity Alert</span>
              <p className="mt-1 font-mono text-sm font-bold text-coral">
                3 Block Fills &gt; $5M
              </p>
              <span className="text-[10px] text-slate-400">Ask Absorption</span>
            </div>
          </div>
        </div>

        {/* Right Column: Deep AI Intelligence & Scenarios (5 cols) */}
        <div className="space-y-4 xl:col-span-5">
          <div className="glass-panel rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-black/5 pb-3 dark:border-white/5">
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
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Predictive Scenario Planning</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">92% Conviction</span>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-50/50 p-3.5 text-xs text-slate-800 dark:bg-emerald-950/20 dark:text-slate-200">
                <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Primary Case: Bullish Continuation</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                  Sustained spot volume above moving average with liquidation cascade absorption creates a liquidity vacuum toward next resistance target.
                </p>
              </div>

              <div className="rounded-xl border border-rose-500/20 bg-rose-50/50 p-3.5 text-xs text-slate-800 dark:bg-rose-950/20 dark:text-slate-200">
                <div className="flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-400 mb-1">
                  <Activity className="h-3.5 w-3.5" />
                  <span>Invalidation Level</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                  A 15-minute close below key absorption support invalidates immediate upward expansion bias.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
