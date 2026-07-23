'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

const allocations = [
  { label: 'BTC', pct: 30, color: '#f97316' },
  { label: 'ETH', pct: 20, color: '#6366f1' },
  { label: 'AAPL', pct: 25, color: '#00a0a0' },
  { label: 'EUR/USD', pct: 25, color: '#f59e0b' },
];

function buildConicGradient(items: typeof allocations) {
  let acc = 0;
  const stops = items.map((item) => {
    const start = acc;
    acc += item.pct;
    return `${item.color} ${start}% ${acc}%`;
  });
  return `conic-gradient(${stops.join(', ')})`;
}

export function PortfolioSummary() {
  const totalValue = '$124,580';
  const pnlAmount = '+$2,340';
  const pnlPct = '+1.91%';
  const isPositive = true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="glass-panel stat-card-accent stat-card-accent--sea rounded-2xl p-5"
    >
      <p className="dashboard-panel-label text-xs font-medium uppercase tracking-wider text-slate-500">
        Portfolio Value
      </p>

      <div className="mt-3 flex items-center justify-between gap-4">
        <div>
          <p className="dashboard-panel-value font-display text-3xl font-bold text-slate-900">
            {totalValue}
          </p>
          <div className="mt-1.5 flex items-center gap-2">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-rose-500" />
            )}
            <span
              className={`text-sm font-semibold ${
                isPositive ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {pnlAmount} ({pnlPct})
            </span>
            <span className="text-xs text-slate-400">24h</span>
          </div>
        </div>

        <div className="donut-chart shrink-0" style={{ background: buildConicGradient(allocations) }}>
          <div className="donut-chart-center">
            <span className="text-[10px] font-bold text-slate-500">4 assets</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {allocations.map((a) => (
          <div key={a.label} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: a.color }}
            />
            <span className="text-xs text-slate-500 dashboard-card-text">
              {a.label} {a.pct}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
