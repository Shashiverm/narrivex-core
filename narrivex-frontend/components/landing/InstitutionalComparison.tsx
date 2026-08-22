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
    dimension: 'AI Catalyst & Order-Flow Synthesis',
    narrivex: 'Sub-50ms deterministic NLP explaining WHY price moved (order book, liquidations, SEC filings)',
    bloomberg: 'Raw terminal news feeds; requires dedicated human analyst synthesis',
    tradingview: 'None. Only raw price threshold crossing alerts (e.g. RSI > 70)',
    telegramBots: 'Unverified retail spam or delayed manual admin alerts',
    highlight: true,
  },
  {
    dimension: 'Delivery & Ingestion Latency',
    narrivex: '<25ms Global binary WebSocket streaming straight to browser / webhook',
    bloomberg: '<20ms Proprietary hardware appliance feed',
    tradingview: '1,000ms – 5,000ms polling latency',
    telegramBots: '15s – 60s broadcast delay',
  },
  {
    dimension: 'Cross-Asset Ingestion Scope',
    narrivex: 'Unified Crypto + Equities + FX + Commodities in one engine pipeline',
    bloomberg: 'All assets (requires complex proprietary command syntax)',
    tradingview: 'Charting-first; alerts fragmented across individual charts',
    telegramBots: 'Single crypto or single stock channels only',
  },
  {
    dimension: 'Dark Pool & Liquidation Intelligence',
    narrivex: 'Built-in real-time dark pool block prints + multi-venue liquidation cascades',
    bloomberg: 'Available with specialized expensive add-on modules',
    tradingview: 'Limited or third-party paid community indicator scripts',
    telegramBots: 'None or stale screenshot dumps',
    highlight: true,
  },
  {
    dimension: 'Developer REST & WebSocket API',
    narrivex: 'Included on Pro tier with typed JSON alert payloads and webhooks',
    bloomberg: 'Enterprise Bloomberg B-PIPE ($25,000+/yr)',
    tradingview: 'Webhook only; no contextual AI narrative payloads',
    telegramBots: 'None',
  },
  {
    dimension: 'Monthly Cost & Flexibility',
    narrivex: '$29 – $99 / mo (7-Day Risk-Free Trial, Cancel Anytime)',
    bloomberg: '$2,500+ / mo (Multi-year institutional contract lock-in)',
    tradingview: '$15 – $60 / mo (Strict active alert count limits)',
    telegramBots: '$50 – $200 / mo (Unregulated signal groups)',
    highlight: true,
  },
];

export function InstitutionalComparison() {
  return (
    <section className="mb-24 rounded-3xl border border-slate-200/80 bg-white/80 px-6 py-12 shadow-sm backdrop-blur sm:px-10 dark:border-slate-800/80 dark:bg-slate-900/60">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-3 py-1 font-mono text-xs font-semibold text-sea">
          <Shield className="h-3.5 w-3.5" />
          The Intelligence Advantage
        </div>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-slate-900 dark:text-white">
          Narrivex vs. Legacy Terminals & Standard Tools
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-400">
          Why quantitative traders and modern market operators are upgrading to Narrivex AI intelligence.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <table className="w-full min-w-[760px] text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 font-mono text-xs text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300">
            <tr>
              <th className="px-5 py-4 w-1/4">Capability Specification</th>
              <th className="px-5 py-4 w-1/3 bg-sea/10 dark:bg-sea/15 border-x border-sea/30 text-sea font-bold">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" />
                  <span>Narrivex Intelligence</span>
                </div>
              </th>
              <th className="px-5 py-4 w-1/5 text-slate-600 dark:text-slate-400">Bloomberg Terminal</th>
              <th className="px-5 py-4 w-1/5 text-slate-600 dark:text-slate-400">TradingView Alerts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {comparisonData.map((row, idx) => (
              <tr
                key={idx}
                className={
                  row.highlight
                    ? 'bg-sea/5 dark:bg-sea/5 font-medium'
                    : 'hover:bg-slate-50/50 dark:hover:bg-slate-900/40'
                }
              >
                <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                  {row.dimension}
                </td>
                <td className="px-5 py-4 text-slate-900 dark:text-emerald-300 bg-sea/10 dark:bg-sea/15 border-x border-sea/30 font-medium leading-relaxed">
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
