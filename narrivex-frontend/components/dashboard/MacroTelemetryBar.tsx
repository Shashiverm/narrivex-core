'use client';

import { Gauge, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface MacroMetric {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  status: string;
}

const macroMetrics: MacroMetric[] = [
  { name: 'Fear & Greed Index', value: '72 (Greed)', change: '+4 pts', isPositive: true, status: 'Bullish Expansion' },
  { name: '24h Total Liquidations', value: '$184.2M', change: '84% Shorts', isPositive: true, status: 'Squeeze Active' },
  { name: 'VIX Volatility', value: '14.82', change: '-3.2%', isPositive: true, status: 'Low Risk' },
  { name: 'US 10Y Yield', value: '4.28%', change: '+2 bps', isPositive: false, status: 'Yield Flattening' },
  { name: 'DXY Dollar Index', value: '103.45', change: '-0.15%', isPositive: true, status: 'Risk-On Tailwinds' },
];

export function MacroTelemetryBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel rounded-2xl border border-black/5 bg-white/70 p-4 shadow-xs backdrop-blur dark:border-white/10 dark:bg-slate-900/70"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 pb-3 dark:border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-sea/15 text-sea">
            <Gauge className="h-3.5 w-3.5" />
          </div>
          <span className="font-display text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Global Market Regime & Macro Telemetry
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
            SYNCHRONIZED (18ms)
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <Sparkles className="h-3.5 w-3.5 text-sea" />
          <span>Macro AI Takeaway: <strong className="text-slate-800 dark:text-slate-200">Broad Cross-Asset Risk-On Bias</strong></span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {macroMetrics.map((item) => (
          <div
            key={item.name}
            className="rounded-xl border border-black/5 bg-slate-50/60 p-2.5 dark:border-white/5 dark:bg-slate-800/50"
          >
            <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400">
              <span>{item.name}</span>
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                {item.value}
              </span>
              <span
                className={`text-[10px] font-bold ${
                  item.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
                }`}
              >
                {item.change}
              </span>
            </div>
            <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400 truncate">
              {item.status}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
