'use client';

import { Sparkles, Shield } from 'lucide-react';

interface ComparisonRow {
  dimension: string;
  narrivex: string;
  bloomberg: string;
  tradingview: string;
  telegramBots: string;
  highlight?: boolean;
}

const comparisonData: ComparisonRow[] = [
  {
    dimension: 'AI Narrative & Catalyst Synthesis',
    narrivex: 'Instant (<50ms) AI breakdown explaining WHY price moved (order book, liquidations, SEC news)',
    bloomberg: 'Manual terminal news feed; requires human analyst synthesis',
    tradingview: 'None. Only raw price alerts (e.g. crossing moving average)',
    telegramBots: 'Unverified spam or lagging manual admin posts',
    highlight: true,
  },
  {
    dimension: 'Delivery & Ingestion Latency',
    narrivex: '<25ms Global WebSocket streaming straight to browser / webhook',
    bloomberg: '<20ms Proprietary hardware feed',
    tradingview: '1,000ms – 5,000ms polling latency',
    telegramBots: '10s – 60s broadcast delay',
  },
  {
    dimension: 'Cross-Asset Ingestion Scope',
    narrivex: 'Unified Crypto + Equities + FX + Commodities in one engine',
    bloomberg: 'All assets (requires complex custom terminal queries)',
    tradingview: 'Charting-first; alerts fragmented across individual charts',
    telegramBots: 'Single crypto or single stock channels only',
  },
  {
    dimension: 'Dark Pool & Liquidation Intelligence',
    narrivex: 'Built-in real-time dark pool prints + multi-exchange liquidation cascades',
    bloomberg: 'Available with specialized add-on subscriptions',
    tradingview: 'Limited or third-party paid indicator scripts',
    telegramBots: 'None or stale screenshot dumps',
    highlight: true,
  },
  {
    dimension: 'Developer REST & WebSocket API',
    narrivex: 'Included on Pro plan with programmatic rule triggers',
    bloomberg: 'Enterprise Bloomberg B-PIPE ($$$$ / month)',
    tradingview: 'Webhook only; no programmatic AI narrative payloads',
    telegramBots: 'None',
  },
  {
    dimension: 'Monthly Cost',
    narrivex: '$29 – $99 / mo (7-Day Free Trial)',
    bloomberg: '$2,500+ / mo (Multi-year institutional lock-in)',
    tradingview: '$15 – $60 / mo (Alert limits apply)',
    telegramBots: '$50 – $200 / mo (Unregulated signal groups)',
    highlight: true,
  },
];

export function InstitutionalComparison() {
  return (
    <section className="mb-20 rounded-3xl border border-black/10 bg-white/70 px-6 py-12 backdrop-blur sm:px-10 dark:border-white/10 dark:bg-slate-900/60">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sea">
          <Shield className="h-3.5 w-3.5" />
          The Intelligence Advantage
        </div>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-slate-900 dark:text-white">
          Narrivex vs. Legacy Terminals & Standard Tools
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-300">
          Why quantitative traders and modern market operators are upgrading to Narrivex AI intelligence.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white/95 shadow-md dark:border-white/10 dark:bg-slate-950/90">
        <table className="w-full min-w-[760px] text-left text-xs sm:text-sm">
          <thead className="bg-slate-50/90 dark:bg-slate-900/90 border-b border-black/10 dark:border-white/10">
            <tr>
              <th className="px-5 py-4 font-display text-sm font-bold text-slate-700 dark:text-slate-300 w-1/4">
                Capability
              </th>
              <th className="px-5 py-4 font-display text-sm font-bold text-sea bg-sea/10 dark:bg-sea/15 border-x border-sea/20 w-1/3">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" />
                  <span>Narrivex Intelligence</span>
                </div>
              </th>
              <th className="px-5 py-4 font-display text-sm font-bold text-slate-600 dark:text-slate-400 w-1/5">
                Bloomberg Terminal
              </th>
              <th className="px-5 py-4 font-display text-sm font-bold text-slate-600 dark:text-slate-400 w-1/5">
                TradingView Alerts
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {comparisonData.map((row, idx) => (
              <tr
                key={idx}
                className={row.highlight ? 'bg-sea/5 dark:bg-sea/5 font-medium' : 'hover:bg-slate-50/50 dark:hover:bg-slate-900/40'}
              >
                <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">
                  {row.dimension}
                </td>
                <td className="px-5 py-4 text-slate-900 dark:text-emerald-300 bg-sea/10 dark:bg-sea/15 border-x border-sea/20 font-semibold leading-relaxed">
                  ✓ {row.narrivex}
                </td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                  {row.bloomberg}
                </td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                  {row.tradingview}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
