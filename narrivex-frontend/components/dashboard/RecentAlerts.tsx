'use client';

import { AlertTriangle, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const alerts = [
  {
    id: '1',
    symbol: 'BTC',
    type: 'Volatility spike',
    time: '2 min ago',
    icon: Zap,
    severity: 'warning' as const,
  },
  {
    id: '2',
    symbol: 'ETH',
    type: 'Breakout detected',
    time: '8 min ago',
    icon: TrendingUp,
    severity: 'success' as const,
  },
  {
    id: '3',
    symbol: 'AAPL',
    type: 'Support level test',
    time: '15 min ago',
    icon: TrendingDown,
    severity: 'danger' as const,
  },
  {
    id: '4',
    symbol: 'NVDA',
    type: 'Volume surge',
    time: '22 min ago',
    icon: Zap,
    severity: 'warning' as const,
  },
  {
    id: '5',
    symbol: 'SOL',
    type: 'RSI overbought',
    time: '35 min ago',
    icon: AlertTriangle,
    severity: 'danger' as const,
  },
];

const severityColors = {
  warning: 'bg-amber-50 text-amber-600 border-amber-200/60',
  success: 'bg-emerald-50 text-emerald-600 border-emerald-200/60',
  danger: 'bg-rose-50 text-rose-600 border-rose-200/60',
};

export function RecentAlerts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-panel rounded-2xl p-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="dashboard-card-heading font-display text-lg font-bold">Recent Alerts</h2>
          <p className="dashboard-panel-label mt-0.5 text-xs uppercase tracking-wide text-slate-500">
            Live feed
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="pulse-dot bg-emerald-500" />
          <span className="text-xs font-medium text-emerald-600">Live</span>
        </div>
      </div>

      <ul className="mt-4 space-y-2.5">
        {alerts.map((alert, i) => {
          const Icon = alert.icon;
          return (
            <motion.li
              key={alert.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
              className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${severityColors[alert.severity]}`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{alert.symbol}</span>
                  <span className="text-[11px] opacity-70">{alert.time}</span>
                </div>
                <p className="mt-0.5 truncate text-xs opacity-80">{alert.type}</p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
