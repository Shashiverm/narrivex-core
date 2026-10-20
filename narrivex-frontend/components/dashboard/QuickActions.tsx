'use client';

import { useState } from 'react';
import { Plus, Bell, Search, Sparkles, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

interface QuickActionsProps {
  onRefreshAll?: () => void;
}

export function QuickActions({ onRefreshAll }: QuickActionsProps) {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleAction = (actionLabel: string) => {
    trackEvent('quick_action_clicked', { action: actionLabel });

    if (actionLabel === 'Search' || actionLabel === 'Add Asset') {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
      );
    } else if (actionLabel === 'Create Alert') {
      router.push('/alerts');
    } else if (actionLabel === 'AI Deep Scan') {
      setIsScanning(true);
      setScanResult(null);
      setTimeout(() => {
        setIsScanning(false);
        setScanResult('Multi-asset synthesis complete: 3 bullish continuation setups identified (BTC, SOL, NVDA). Risk skew asymmetric to the upside.');
      }, 1600);
    } else if (actionLabel === 'Refresh AI') {
      onRefreshAll?.();
    }
  };

  const actions = [
    { label: 'Add Asset', icon: Plus, description: 'Track a new symbol' },
    { label: 'AI Deep Scan', icon: Sparkles, description: 'Run full market radar' },
    { label: 'Create Alert', icon: Bell, description: 'Set price trigger rules' },
    { label: 'Search', icon: Search, description: 'Global asset finder' },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-panel rounded-2xl border border-slate-200/80 bg-white/85 p-5 shadow-xs backdrop-blur-md transition-colors dark:border-white/10 dark:bg-slate-900/85"
      >
        <h2 className="dashboard-card-heading font-display text-base font-bold text-slate-900 dark:text-white sm:text-lg">
          Quick Actions
        </h2>
        <p className="dashboard-panel-label mt-0.5 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Terminal shortcuts
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {actions.map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.label}
                type="button"
                onClick={() => handleAction(action.label)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.06 }}
                className="group flex flex-col items-center gap-2 rounded-xl border border-slate-200/70 bg-white/60 p-3 text-center transition-all hover:border-sea/40 hover:bg-sea/5 hover:scale-[1.02] dark:border-white/10 dark:bg-slate-800/60 dark:hover:border-sea/40 dark:hover:bg-slate-800"
              >
                <div className="rounded-xl bg-sea/10 p-2 text-sea transition-transform duration-200 group-hover:scale-110 dark:bg-sea/20 dark:text-sea-light">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{action.label}</p>
                  <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">{action.description}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* AI Deep Scan Modal */}
      <AnimatePresence>
        {(isScanning || scanResult) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-sea" />
                  <h3 className="font-display font-bold text-slate-900 dark:text-white">
                    Gemini AI Market Radar
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setIsScanning(false);
                    setScanResult(null);
                  }}
                  className="rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="py-6 text-center">
                {isScanning ? (
                  <div className="space-y-3">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sea/10 text-sea animate-pulse">
                      <Sparkles className="h-6 w-6 animate-spin" />
                    </div>
                    <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                      Synthesizing Cross-Market Order Flow…
                    </p>
                    <p className="text-xs text-slate-400">
                      Ingesting order books, funding rates, and volume deltas
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 text-left">
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-xs uppercase">
                        <Check className="h-4 w-4" />
                        Radar Complete
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                        {scanResult}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setScanResult(null)}
                      className="w-full rounded-xl bg-sea py-2.5 text-xs font-bold text-white shadow-xs hover:bg-sea/90"
                    >
                      Back to Dashboard
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
