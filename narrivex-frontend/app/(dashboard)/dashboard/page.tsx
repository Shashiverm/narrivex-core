'use client';

import { useState } from 'react';
import { Activity, Bell, BarChart3, LayoutGrid, Terminal, Columns2, Columns3, Square } from 'lucide-react';
import { motion } from 'framer-motion';
import { Chart } from '@/components/dashboard/Chart';
import { Narrative } from '@/components/dashboard/Narrative';
import { StatCard } from '@/components/dashboard/StatCard';
import { MarketOverview } from '@/components/dashboard/MarketOverview';
import { PortfolioSummary } from '@/components/dashboard/PortfolioSummary';
import { RecentAlerts } from '@/components/dashboard/RecentAlerts';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { MacroTelemetryBar } from '@/components/dashboard/MacroTelemetryBar';
import { ProTerminalDeepDive } from '@/components/dashboard/ProTerminalDeepDive';

const marketPulse = [
  { label: 'Signals Today', value: '38', trend: '+14%', icon: Activity, accent: 'sea' as const },
  { label: 'Monitored Rules', value: '12', trend: '+4', icon: Bell, accent: 'electric' as const },
  { label: 'AI Narratives Synthesized', value: '64', trend: '+22%', icon: BarChart3, accent: 'coral' as const },
];

const availableAssets = [
  { symbol: 'BTC', name: 'Bitcoin', category: 'Crypto', price: '$96,420', move: '+4.8%', sentiment: 'Bullish' },
  { symbol: 'ETH', name: 'Ethereum', category: 'Crypto', price: '$3,450', move: '+6.1%', sentiment: 'Bullish' },
  { symbol: 'SOL', name: 'Solana', category: 'Crypto', price: '$194.80', move: '+8.9%', sentiment: 'Strong Bullish' },
  { symbol: 'NVDA', name: 'NVIDIA', category: 'Equities', price: '$138.65', move: '+3.4%', sentiment: 'Bullish' },
  { symbol: 'AAPL', name: 'Apple', category: 'Equities', price: '$231.90', move: '-0.4%', sentiment: 'Cautious' },
  { symbol: 'TSLA', name: 'Tesla', category: 'Equities', price: '$248.30', move: '-1.8%', sentiment: 'Neutral' },
  { symbol: 'EUR/USD', name: 'Euro / USD', category: 'Forex', price: '1.0842', move: '-0.15%', sentiment: 'Neutral' },
  { symbol: 'GOLD', name: 'Gold Spot', category: 'Commodities', price: '$2,742', move: '+1.2%', sentiment: 'Bullish' },
];

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'terminal'>('grid');
  const [selectedSymbol, setSelectedSymbol] = useState<string>('BTC');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Crypto' | 'Equities' | 'Forex'>('All');
  const [gridColumns, setGridColumns] = useState<1 | 2 | 3>(3);
  const [moverFilter, setMoverFilter] = useState<'all' | 'gainers' | 'losers'>('all');
  const [refreshKey, setRefreshKey] = useState(0);

  const filteredAssets = categoryFilter === 'All'
    ? availableAssets
    : availableAssets.filter((a) => a.category === categoryFilter);

  // Multi-grid selected symbols
  const [gridSymbols, setGridSymbols] = useState<string[]>(['BTC', 'NVDA', 'SOL']);

  const handleAssetClick = (symbol: string) => {
    setSelectedSymbol(symbol);
    if (!gridSymbols.includes(symbol)) {
      setGridSymbols([symbol, gridSymbols[0] || 'BTC', gridSymbols[1] || 'ETH'].slice(0, 3));
    }
  };

  const displayedMovers = availableAssets.filter((asset) => {
    if (moverFilter === 'gainers') return asset.move.startsWith('+');
    if (moverFilter === 'losers') return asset.move.startsWith('-');
    return true;
  });

  return (
    <div key={refreshKey} className="mx-auto max-w-[1600px] space-y-6">
      {/* Market Overview Ticker */}
      <MarketOverview onSelectSymbol={handleAssetClick} />

      {/* Global Macro Telemetry & Sentiment Regime */}
      <MacroTelemetryBar />

      {/* Workspace Controls & View Mode Selector */}
      <div className="glass-panel flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-xs backdrop-blur-md transition-colors dark:border-white/10 dark:bg-slate-900/85">
        {/* Category & Asset Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-xl border border-slate-200/80 bg-slate-100/70 p-1 dark:border-white/10 dark:bg-slate-800/80">
            {(['All', 'Crypto', 'Equities', 'Forex'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                  categoryFilter === cat
                    ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

          {/* Asset quick-selection pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {filteredAssets.map((asset) => {
              const isSelected = selectedSymbol === asset.symbol;
              const inGrid = gridSymbols.includes(asset.symbol);
              return (
                <button
                  key={asset.symbol}
                  type="button"
                  onClick={() => handleAssetClick(asset.symbol)}
                  className={`flex items-center gap-1.5 rounded-xl border px-3 py-1 text-xs font-bold transition-all ${
                    isSelected
                      ? 'border-sea bg-sea/10 text-sea ring-1 ring-sea/30 dark:bg-sea/20 dark:text-sea-light'
                      : inGrid
                      ? 'border-slate-300 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                      : 'border-slate-200/60 bg-white/70 text-slate-600 hover:border-sea/30 dark:border-white/5 dark:bg-slate-800/60 dark:text-slate-400'
                  }`}
                >
                  <span>{asset.symbol}</span>
                  <span
                    className={`text-[10px] font-semibold ${
                      asset.move.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
                    }`}
                  >
                    {asset.move}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* View Mode & Grid Controls Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {viewMode === 'grid' && (
            <div className="hidden sm:flex items-center gap-1 rounded-xl border border-slate-200/80 bg-slate-100/70 p-1 dark:border-white/10 dark:bg-slate-800/80">
              <button
                type="button"
                onClick={() => setGridColumns(1)}
                title="Single Focus Chart"
                className={`rounded-lg p-1.5 text-xs font-bold transition ${
                  gridColumns === 1
                    ? 'bg-white text-sea shadow-xs dark:bg-slate-900 dark:text-white'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Square className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setGridColumns(2)}
                title="2-Chart Split"
                className={`rounded-lg p-1.5 text-xs font-bold transition ${
                  gridColumns === 2
                    ? 'bg-white text-sea shadow-xs dark:bg-slate-900 dark:text-white'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Columns2 className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setGridColumns(3)}
                title="3-Chart Multi-Grid"
                className={`rounded-lg p-1.5 text-xs font-bold transition ${
                  gridColumns === 3
                    ? 'bg-white text-sea shadow-xs dark:bg-slate-900 dark:text-white'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Columns3 className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-100/70 p-1 dark:border-white/10 dark:bg-slate-800/80">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Multi-Grid</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('terminal')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                viewMode === 'terminal'
                  ? 'bg-sea text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Pro Terminal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Stat Cards + Portfolio Allocation */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {marketPulse.map((item, i) => (
          <StatCard
            key={item.label}
            label={item.label}
            value={item.value}
            trend={item.trend}
            icon={item.icon}
            accent={item.accent}
            delay={i}
          />
        ))}
        <PortfolioSummary />
      </section>

      {/* Main Workspace Layout */}
      {viewMode === 'terminal' ? (
        /* Pro Terminal Mode */
        <ProTerminalDeepDive symbol={selectedSymbol} onSymbolChange={setSelectedSymbol} />
      ) : (
        /* Multi-Grid Workspace Mode */
        <section className="grid gap-6 xl:grid-cols-4">
          {/* Charts Column (3/4 width) */}
          <div className="space-y-6 xl:col-span-3">
            <div
              className={`grid gap-6 ${
                gridColumns === 1
                  ? 'grid-cols-1'
                  : gridColumns === 2
                  ? 'grid-cols-1 md:grid-cols-2'
                  : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
              }`}
            >
              {gridSymbols.slice(0, gridColumns).map((sym, idx) => (
                <section key={sym} className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-slate-900 dark:text-white">
                        {sym} / USD
                      </span>
                      <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        LIVE
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSymbol(sym);
                        setViewMode('terminal');
                      }}
                      className="text-xs font-semibold text-sea hover:underline"
                    >
                      Focus Pro Terminal →
                    </button>
                  </div>
                  <Chart symbol={sym} delay={idx} />
                  <Narrative symbol={sym} delay={idx} />
                </section>
              ))}
            </div>
          </div>

          {/* Right Sidebar (1/4 width) */}
          <aside className="space-y-6">
            {/* Top Movers with 1-Click Focus */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-panel rounded-2xl border border-slate-200/80 bg-white/85 p-5 shadow-xs backdrop-blur-md transition-colors dark:border-white/10 dark:bg-slate-900/85"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="dashboard-card-heading font-display text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                    Top Movers
                  </h2>
                  <p className="dashboard-panel-label mt-0.5 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Real-time delta
                  </p>
                </div>
                <span className="rounded-full bg-sea/10 px-2 py-0.5 text-[10px] font-bold text-sea dark:bg-sea/20 dark:text-sea-light">
                  1-CLICK FOCUS
                </span>
              </div>

              {/* Mover Tabs */}
              <div className="mt-3 flex gap-1 rounded-xl border border-slate-200/80 bg-slate-100/70 p-0.5 dark:border-white/10 dark:bg-slate-800/60">
                {(['all', 'gainers', 'losers'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setMoverFilter(tab)}
                    className={`flex-1 rounded-lg py-1 text-[11px] font-semibold capitalize transition ${
                      moverFilter === tab
                        ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white font-bold'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <ul className="mt-3 space-y-2">
                {displayedMovers.slice(0, 5).map((asset, i) => (
                  <motion.li
                    key={asset.symbol}
                    onClick={() => handleAssetClick(asset.symbol)}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: 0.3 + i * 0.05 }}
                    className={`group cursor-pointer rounded-xl border p-2.5 transition-all ${
                      selectedSymbol === asset.symbol
                        ? 'border-sea bg-sea/10 ring-1 ring-sea/30 dark:bg-sea/20'
                        : 'border-slate-200/70 bg-white/60 hover:border-sea/30 hover:bg-sea/5 dark:border-white/10 dark:bg-slate-800/60 dark:hover:bg-slate-800/90'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`inline-block h-2 w-2 rounded-full ${
                            asset.move.startsWith('+') ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                        />
                        <span className="text-xs font-bold text-slate-800 dark:text-white">
                          {asset.symbol}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">{asset.price}</span>
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          asset.move.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
                        }`}
                      >
                        {asset.move}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>Sentiment: <strong className="text-slate-700 dark:text-slate-200">{asset.sentiment}</strong></span>
                      <span className="text-sea opacity-0 group-hover:opacity-100 transition font-semibold">Focus →</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Actions */}
            <QuickActions onRefreshAll={() => setRefreshKey((k) => k + 1)} />

            {/* Recent Alerts Feed */}
            <RecentAlerts onSelectSymbol={handleAssetClick} />
          </aside>
        </section>
      )}
    </div>
  );
}