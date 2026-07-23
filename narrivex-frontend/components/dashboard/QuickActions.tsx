'use client';

import { Plus, Bell, RefreshCw, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export function QuickActions() {
  const router = useRouter();

  const handleAction = (actionLabel: string) => {
    if (actionLabel === 'Search' || actionLabel === 'Add Asset') {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
      );
    } else if (actionLabel === 'Create Alert') {
      router.push('/alerts');
    } else if (actionLabel === 'Refresh AI') {
      window.location.reload();
    }
  };

  const actions = [
    { label: 'Add Asset', icon: Plus, description: 'Track a new symbol' },
    { label: 'Create Alert', icon: Bell, description: 'Set price alerts' },
    { label: 'Refresh AI', icon: RefreshCw, description: 'Re-generate narratives' },
    { label: 'Search', icon: Search, description: 'Find any asset' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-panel rounded-2xl p-5"
    >
      <h2 className="dashboard-card-heading font-display text-lg font-bold">Quick Actions</h2>
      <p className="dashboard-panel-label mt-0.5 text-xs uppercase tracking-wide text-slate-500">
        Common tasks
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              onClick={() => handleAction(action.label)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.06 }}
              className="quick-action-btn flex flex-col items-center gap-2 rounded-xl border border-slate-200/70 bg-white/50 px-3 py-3.5 text-center cursor-pointer hover:border-sea/40"
            >
              <div className="rounded-lg bg-sea/10 p-2">
                <Icon className="h-4 w-4 text-sea" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800 dashboard-card-heading">{action.label}</p>
                <p className="mt-0.5 text-[10px] text-slate-500 dashboard-card-text">{action.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
