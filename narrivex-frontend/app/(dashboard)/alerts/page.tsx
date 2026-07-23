'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Bell, Plus, Trash2, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface AlertRule {
  id: string;
  symbol: string;
  ruleType: 'price_above' | 'price_below' | 'volatility_spike' | 'trend_change';
  threshold: number;
  channel: 'email' | 'push' | 'digest';
  enabled: boolean;
  createdAt: string;
}

const INITIAL_RULES: AlertRule[] = [
  {
    id: 'rule-1',
    symbol: 'BTC',
    ruleType: 'price_above',
    threshold: 70000,
    channel: 'email',
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rule-2',
    symbol: 'ETH',
    ruleType: 'price_below',
    threshold: 3500,
    channel: 'push',
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rule-3',
    symbol: 'AAPL',
    ruleType: 'volatility_spike',
    threshold: 2.5,
    channel: 'email',
    enabled: false,
    createdAt: new Date().toISOString(),
  },
];

export default function AlertsPage() {
  const searchParams = useSearchParams();
  const prefilledSymbol = searchParams.get('symbol') || '';

  const [rules, setRules] = useState<AlertRule[]>([]);
  const [isCreating, setIsCreating] = useState(Boolean(prefilledSymbol));
  const [symbol, setSymbol] = useState(prefilledSymbol || 'BTC');
  const [ruleType, setRuleType] = useState<AlertRule['ruleType']>('price_above');
  const [threshold, setThreshold] = useState<number>(68000);
  const [channel, setChannel] = useState<AlertRule['channel']>('email');

  useEffect(() => {
    const saved = localStorage.getItem('narrivex_alert_rules');
    if (saved) {
      try {
        setRules(JSON.parse(saved));
      } catch {
        setRules(INITIAL_RULES);
      }
    } else {
      setRules(INITIAL_RULES);
      localStorage.setItem('narrivex_alert_rules', JSON.stringify(INITIAL_RULES));
    }
  }, []);

  const saveRules = (updated: AlertRule[]) => {
    setRules(updated);
    localStorage.setItem('narrivex_alert_rules', JSON.stringify(updated));
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol) return toast.error('Please enter a symbol');

    const newRule: AlertRule = {
      id: `rule-${Date.now()}`,
      symbol: symbol.toUpperCase().trim(),
      ruleType,
      threshold: Number(threshold),
      channel,
      enabled: true,
      createdAt: new Date().toISOString(),
    };

    saveRules([newRule, ...rules]);
    toast.success(`Alert created for ${newRule.symbol}`);
    setIsCreating(false);
  };

  const toggleRule = (id: string) => {
    const updated = rules.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r));
    saveRules(updated);
    toast.success('Alert updated');
  };

  const deleteRule = (id: string) => {
    const updated = rules.filter((r) => r.id !== id);
    saveRules(updated);
    toast.success('Alert deleted');
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Header Banner */}
      <div className="glass-panel flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl bg-coral/10 p-2.5 text-coral">
              <Bell className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
                Alert Rules Manager
              </h1>
              <p className="text-sm text-slate-500">
                Configure real-time automated triggers for price movements & technical patterns.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="inline-flex items-center gap-2 rounded-xl bg-sea px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sea/90 shadow-md shadow-sea/20"
        >
          <Plus className="h-4 w-4" /> {isCreating ? 'Cancel' : 'Create Alert Rule'}
        </button>
      </div>

      {/* Create Rule Form */}
      <AnimatePresence>
        {isCreating && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleCreateRule}
            className="glass-panel overflow-hidden rounded-2xl p-6 space-y-4"
          >
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sliders className="h-5 w-5 text-sea" /> Configure New Alert Trigger
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Asset Symbol
                </label>
                <input
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  placeholder="e.g. BTC, AAPL"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm uppercase font-semibold text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 focus:outline-none focus:border-sea"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Trigger Condition
                </label>
                <select
                  value={ruleType}
                  onChange={(e) => setRuleType(e.target.value as AlertRule['ruleType'])}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 focus:outline-none focus:border-sea"
                >
                  <option value="price_above">Price Rises Above ($)</option>
                  <option value="price_below">Price Drops Below ($)</option>
                  <option value="volatility_spike">Volatility Spike (%)</option>
                  <option value="trend_change">Trend Direction Change</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Threshold Target
                </label>
                <input
                  type="number"
                  step="any"
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 focus:outline-none focus:border-sea"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Delivery Channel
                </label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value as AlertRule['channel'])}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 focus:outline-none focus:border-sea"
                >
                  <option value="email">Email Notification</option>
                  <option value="push">Browser Push Alert</option>
                  <option value="digest">Daily Digest</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-sea px-5 py-2 text-sm font-semibold text-white hover:bg-sea/90"
              >
                Save Trigger Rule
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Alert Rules List */}
      <div className="glass-panel rounded-2xl p-6">
        <h2 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
          Active Alert Triggers ({rules.filter((r) => r.enabled).length} Enabled)
        </h2>

        {rules.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            No alert rules created yet. Click &quot;Create Alert Rule&quot; to set up your first price trigger.
          </div>
        ) : (
          <div className="space-y-3">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200/80 bg-white/70 p-4 transition dark:border-slate-800 dark:bg-slate-900/60"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold text-xs ${
                      rule.enabled ? 'bg-sea/15 text-sea' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'
                    }`}
                  >
                    {rule.symbol}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {rule.symbol}
                      </span>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {rule.ruleType.replace('_', ' ')}
                      </span>
                      <span className="text-sm font-semibold text-sea">
                        ${rule.threshold.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Channel: <span className="capitalize">{rule.channel}</span> · Created{' '}
                      {new Date(rule.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleRule(rule.id)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      rule.enabled ? 'bg-sea' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                        rule.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>

                  <button
                    onClick={() => deleteRule(rule.id)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
