'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const allocations = [
  { label: 'BTC', pct: 30, value: '$37,374', pnl: '+$1,794', color: '#f97316' },
  { label: 'ETH', pct: 20, value: '$24,916', pnl: '+$1,520', color: '#6366f1' },
  { label: 'AAPL', pct: 25, value: '$31,145', pnl: '-$124', color: '#0ea5e9' },
  { label: 'EUR/USD', pct: 25, value: '$31,145', pnl: '-$850', color: '#f59e0b' },
];

function buildConicGradient(items: typeof allocations, activeLabel?: string) {
  let acc = 0;
  const stops = items.map((item) => {
    const start = acc;
    acc += item.pct;
    const isMuted = activeLabel && activeLabel !== item.label;
    const color = isMuted ? `${item.color}44` : item.color;
    return `${color} ${start}% ${acc}%`;
  });
  return `conic-gradient(${stops.join(', ')})`;
}

export function PortfolioSummary() {
  const [activeAsset, setActiveAsset] = useState<typeof allocations[0] | null>(null);
  const totalValue = '$124,580';
  const pnlAmount = '+$2,340';
  const pnlPct = '+1.91%';
  const isPositive = true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="glass-panel group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xs backdrop-blur-md transition-all duration-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900/80 hover:border-sea/40"
    >
      <div className="flex items-center justify-between">
        <p className="dashboard-panel-label text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Portfolio Value & Risk
        </p>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <ShieldAlert className="h-3 w-3 text-emerald-500" />
          Sharpe 2.4 · Beta 1.08
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <div>
          <p className="dashboard-panel-value font-display text-3xl font-bold text-slate-900 dark:text-white">
            {activeAsset ? activeAsset.value : totalValue}
          </p>
          <div className="mt-1 flex items-center gap-2">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-rose-500" />
            )}
            <span
              className={`text-sm font-semibold ${
                (activeAsset ? activeAsset.pnl.startsWith('+') : isPositive)
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              {activeAsset ? activeAsset.pnl : `${pnlAmount} (${pnlPct})`}
            </span>
            <span className="text-xs text-slate-400">
              {activeAsset ? `${activeAsset.label} 24h P&L` : '24h Total'}
            </span>
          </div>
        </div>

        {/* Donut chart with interactive hover */}
        <div
          className="donut-chart shrink-0 transition-transform duration-300 group-hover:scale-105"
          style={{ background: buildConicGradient(allocations, activeAsset?.label) }}
        >
          <div className="donut-chart-center bg-white dark:bg-slate-900">
            <span className="font-mono text-[11px] font-bold text-slate-700 dark:text-slate-200">
              {activeAsset ? `${activeAsset.pct}%` : '4 Assets'}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive asset allocation pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {allocations.map((a) => {
          const isSelected = activeAsset?.label === a.label;
          return (
            <button
              type="button"
              key={a.label}
              onMouseEnter={() => setActiveAsset(a)}
              onMouseLeave={() => setActiveAsset(null)}
              onClick={() => setActiveAsset(isSelected ? null : a)}
              className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs transition-all ${
                isSelected
                  ? 'border-sea bg-sea/10 text-sea dark:bg-sea/20 dark:text-white font-bold ring-1 ring-sea/30'
                  : 'border-slate-200/60 bg-slate-50/70 text-slate-600 hover:border-slate-300 dark:border-white/5 dark:bg-slate-800/60 dark:text-slate-300'
              }`}
            >
              <span
                className="inline-block h-2 w-2 rounded-full shrink-0"
                style={{ background: a.color }}
              />
              <span className="font-semibold">{a.label}</span>
              <span className="font-mono text-[11px] text-slate-400">{a.pct}%</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
