'use client';

import { useState } from 'react';
import { Gauge, Sparkles, ChevronDown, ChevronUp, ShieldCheck, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MacroMetric {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  status: string;
  detail: string;
}

const macroMetrics: MacroMetric[] = [
  {
    name: 'Fear & Greed Index',
    value: '72 (Greed)',
    change: '+4 pts',
    isPositive: true,
    status: 'Bullish Expansion',
    detail: 'Retail and institutional liquidity flows entering speculative risk assets. Momentum remains strongly skewed towards long positioning.',
  },
  {
    name: '24h Liquidations',
    value: '$184.2M',
    change: '84% Shorts',
    isPositive: true,
    status: 'Squeeze Active',
    detail: 'Aggressive short liquidation cascade observed across major crypto and equity derivatives, forcing price expansion.',
  },
  {
    name: 'VIX Volatility',
    value: '14.82',
    change: '-3.2%',
    isPositive: true,
    status: 'Low Risk Regime',
    detail: 'Implied volatility remains historically subdued, favoring carry trades, spot accumulation, and breakout strategies.',
  },
  {
    name: 'US 10Y Yield',
    value: '4.28%',
    change: '+2 bps',
    isPositive: false,
    status: 'Yield Flattening',
    detail: 'Treasury curve remains stable with limited hawkish pressure; market pricing an 82% probability of continued rate easing.',
  },
  {
    name: 'DXY Dollar Index',
    value: '103.45',
    change: '-0.15%',
    isPositive: true,
    status: 'Risk-On Tailwinds',
    detail: 'Dollar weakness continues to provide positive liquidity tailwinds for global equities, precious metals, and cryptocurrencies.',
  },
];

export function MacroTelemetryBar() {
  const [expanded, setExpanded] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<MacroMetric | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-xs backdrop-blur-md transition-colors dark:border-white/10 dark:bg-slate-900/80"
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 dark:border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sea/15 text-sea dark:bg-sea/25 dark:text-sea-light">
            <Gauge className="h-4 w-4" />
          </div>
          <div>
            <span className="font-display text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Macro Telemetry & Market Regime
            </span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
            SYNCHRONIZED (18ms)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 rounded-xl border border-sea/20 bg-sea/5 px-2.5 py-1 text-[11px] text-slate-700 dark:border-sea/30 dark:bg-sea/10 dark:text-slate-200">
            <Sparkles className="h-3.5 w-3.5 text-sea" />
            <span>AI Macro Bias: <strong className="text-sea dark:text-sea-light font-bold">Broad Risk-On Momentum</strong></span>
          </div>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white/60 px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <span className="text-[11px]">{expanded ? 'Hide Insights' : 'Inspect Insights'}</span>
            {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        {macroMetrics.map((item) => (
          <button
            type="button"
            key={item.name}
            onClick={() => setSelectedMetric(selectedMetric?.name === item.name ? null : item)}
            className={`group rounded-xl border p-2.5 text-left transition-all ${
              selectedMetric?.name === item.name
                ? 'border-sea bg-sea/10 ring-1 ring-sea/30 dark:bg-sea/15'
                : 'border-slate-200/60 bg-slate-50/70 hover:border-slate-300 hover:bg-white dark:border-white/5 dark:bg-slate-800/50 dark:hover:border-white/10 dark:hover:bg-slate-800/80'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 dark:text-slate-400">
              <span className="truncate">{item.name}</span>
              <Info className="h-3 w-3 opacity-0 group-hover:opacity-100 text-sea transition" />
            </div>

            <div className="mt-1 flex items-baseline justify-between gap-1">
              <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                {item.value}
              </span>
              <span
                className={`text-[10px] font-bold shrink-0 ${
                  item.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
                }`}
              >
                {item.change}
              </span>
            </div>

            {/* Mini progress meter for Fear & Greed */}
            {item.name.includes('Fear & Greed') && (
              <div className="mt-1.5 h-1 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 w-[72%]" />
              </div>
            )}

            <p className="mt-1 text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate">
              {item.status}
            </p>
          </button>
        ))}
      </div>

      {/* Expandable Macro Details */}
      <AnimatePresence>
        {(expanded || selectedMetric) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden rounded-xl border border-sea/20 bg-sea/5 p-3.5 dark:border-sea/30 dark:bg-sea/10"
          >
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 text-sea shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold text-slate-900 dark:text-white">
                  {selectedMetric ? selectedMetric.name : 'Cross-Asset Market Regime Intelligence'}
                </p>
                <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedMetric
                    ? selectedMetric.detail
                    : 'Systemic liquidity conditions remain elevated across global desks. Risk assets exhibit positive asymmetry due to DXY softening and low VIX compression. Monitor short liquidation thresholds at key technical levels.'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
