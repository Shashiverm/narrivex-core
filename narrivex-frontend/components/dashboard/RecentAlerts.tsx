'use client';

import { useState } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, Zap, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface AlertItem {
  id: string;
  symbol: string;
  type: string;
  time: string;
  icon: typeof Zap;
  severity: 'warning' | 'success' | 'danger';
}

const initialAlerts: AlertItem[] = [
  {
    id: '1',
    symbol: 'BTC',
    type: 'Volatility spike (+4.8% candle)',
    time: '2 min ago',
    icon: Zap,
    severity: 'warning',
  },
  {
    id: '2',
    symbol: 'ETH',
    type: 'Breakout above $3,400 resistance',
    time: '8 min ago',
    icon: TrendingUp,
    severity: 'success',
  },
  {
    id: '3',
    symbol: 'AAPL',
    type: 'Support level test ($231.50)',
    time: '15 min ago',
    icon: TrendingDown,
    severity: 'danger',
  },
  {
    id: '4',
    symbol: 'NVDA',
    type: 'Institutional volume surge (2.4x avg)',
    time: '22 min ago',
    icon: Zap,
    severity: 'warning',
  },
  {
    id: '5',
    symbol: 'SOL',
    type: 'RSI overbought divergence (84.2)',
    time: '35 min ago',
    icon: AlertTriangle,
    severity: 'danger',
  },
];

const severityColors = {
  warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
  success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
  danger: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
};

interface RecentAlertsProps {
  onSelectSymbol?: (symbol: string) => void;
}

export function RecentAlerts({ onSelectSymbol }: RecentAlertsProps) {
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [filter, setFilter] = useState<'all' | 'warning' | 'success' | 'danger'>('all');

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter((a) => a.severity === filter);

  const dismissAlert = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-panel rounded-2xl border border-slate-200/80 bg-white/85 p-5 shadow-xs backdrop-blur-md transition-colors dark:border-white/10 dark:bg-slate-900/85"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="dashboard-card-heading font-display text-base font-bold text-slate-900 dark:text-white sm:text-lg">
            Live Alert Feed
          </h2>
          <p className="dashboard-panel-label mt-0.5 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Real-time triggers
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          ACTIVE
        </div>
      </div>

      {/* Filter pills */}
      <div className="mt-3 flex gap-1 rounded-xl border border-slate-200/80 bg-slate-100/70 p-0.5 dark:border-white/10 dark:bg-slate-800/60">
        {(['all', 'warning', 'success', 'danger'] as const).map((lvl) => (
          <button
            key={lvl}
            onClick={() => setFilter(lvl)}
            className={`flex-1 rounded-lg py-1 text-[11px] font-semibold capitalize transition ${
              filter === lvl
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white font-bold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            {lvl === 'all' ? 'All' : lvl}
          </button>
        ))}
      </div>

      <ul className="mt-3.5 space-y-2">
        <AnimatePresence>
          {filteredAlerts.length === 0 ? (
            <p className="text-center py-4 text-xs text-slate-400">No alerts in this category</p>
          ) : (
            filteredAlerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <motion.li
                  key={alert.id}
                  layout
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => onSelectSymbol?.(alert.symbol)}
                  className={`group flex cursor-pointer items-center gap-2.5 rounded-xl border p-2.5 transition-all hover:scale-[1.01] ${severityColors[alert.severity]}`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{alert.symbol}</span>
                      <span className="text-[10px] opacity-70 font-mono">{alert.time}</span>
                    </div>
                    <p className="mt-0.5 truncate text-[11px] font-medium opacity-90">{alert.type}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => dismissAlert(e, alert.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white transition"
                    title="Dismiss alert"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.li>
              );
            })
          )}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
}
