'use client';

import { Activity, Bell, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Chart } from '@/components/dashboard/Chart';
import { Narrative } from '@/components/dashboard/Narrative';
import { StatCard } from '@/components/dashboard/StatCard';
import { MarketOverview } from '@/components/dashboard/MarketOverview';
import { PortfolioSummary } from '@/components/dashboard/PortfolioSummary';
import { RecentAlerts } from '@/components/dashboard/RecentAlerts';
import { QuickActions } from '@/components/dashboard/QuickActions';

const marketPulse = [
  { label: 'Signals today', value: '28', trend: '+12%', icon: Activity, accent: 'sea' as const },
  { label: 'Active alerts', value: '6', trend: '+2', icon: Bell, accent: 'electric' as const },
  { label: 'Narratives generated', value: '43', trend: '+18%', icon: BarChart3, accent: 'coral' as const },
];

const topMovers = [
  { symbol: 'BTC', move: '+3.4%', sentiment: 'Bullish', color: 'bg-emerald-500' },
  { symbol: 'ETH', move: '+1.1%', sentiment: 'Neutral', color: 'bg-slate-400' },
  { symbol: 'AAPL', move: '-0.8%', sentiment: 'Cautious', color: 'bg-amber-500' },
  { symbol: 'NVDA', move: '+2.6%', sentiment: 'Bullish', color: 'bg-emerald-500' },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Market Overview Ticker */}
      <MarketOverview />

      {/* Stat Cards + Portfolio Summary */}
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

      {/* Main Content Grid */}
      <section className="grid gap-6 xl:grid-cols-4">
        {/* Charts Column (3/4 width) */}
        <div className="space-y-6 xl:col-span-3">
          {/* Charts Grid */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <section className="space-y-4">
              <Chart symbol="BTC" delay={0} />
              <Narrative symbol="BTC" delay={0} />
            </section>
            <section className="space-y-4">
              <Chart symbol="ETH" delay={1} />
              <Narrative symbol="ETH" delay={1} />
            </section>
            <section className="space-y-4">
              <Chart symbol="AAPL" delay={2} />
              <Narrative symbol="AAPL" delay={2} />
            </section>
          </div>
        </div>

        {/* Right Sidebar (1/4 width) */}
        <aside className="space-y-6">
          {/* Top Movers */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-panel rounded-2xl p-5"
          >
            <h2 className="dashboard-card-heading font-display text-lg font-bold">Top Movers</h2>
            <p className="dashboard-panel-label mt-0.5 text-xs uppercase tracking-wide text-slate-500">
              Last 60 minutes
            </p>
            <ul className="mt-4 space-y-2.5">
              {topMovers.map((asset, i) => (
                <motion.li
                  key={asset.symbol}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
                  className="group cursor-pointer rounded-xl border border-slate-200/70 bg-white/60 px-3 py-2.5 transition-all hover:border-sea/30 hover:bg-sea/5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className={`inline-block h-2 w-2 rounded-full ${asset.color}`} />
                      <span className="text-sm font-bold text-slate-800 dashboard-card-heading">
                        {asset.symbol}
                      </span>
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        asset.move.startsWith('+') ? 'text-emerald-600' : 'text-rose-500'
                      }`}
                    >
                      {asset.move}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dashboard-card-text">
                    Sentiment: {asset.sentiment}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Actions */}
          <QuickActions />

          {/* Recent Alerts */}
          <RecentAlerts />
        </aside>
      </section>
    </div>
  );
}