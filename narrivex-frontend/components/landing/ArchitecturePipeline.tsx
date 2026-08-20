'use client';

import { useState } from 'react';
import { Database, Cpu, Sparkles, Send, Binary } from 'lucide-react';

interface PipelineStep {
  step: string;
  title: string;
  subtitle: string;
  icon: typeof Database;
  description: string;
  telemetry: string;
  tags: string[];
}

const pipelineSteps: PipelineStep[] = [
  {
    step: '01',
    title: 'High-Frequency Ingestion',
    subtitle: '120+ Exchanges & On-Chain RPCs',
    icon: Database,
    description:
      'Direct socket connections ingest Level 2/3 order books, DEX mempools, SEC 8-K filings, and central bank communications at microsecond speeds.',
    telemetry: '1.8B events/day • <5ms ping',
    tags: ['Binance', 'NASDAQ', 'CME', 'Solana RPC', 'SEC EDGAR'],
  },
  {
    step: '02',
    title: 'Quantitative Anomaly Engine',
    subtitle: 'Z-Score Volatility & Order Imbalance',
    icon: Binary,
    description:
      'Statistical models detect non-linear spikes, dark pool absorption blocks, short squeezes, and cross-market lead-lag divergences in real-time.',
    telemetry: 'Sub-10ms anomaly isolation',
    tags: ['Volume Outliers', 'Liquidation Cascades', 'CVD Drift'],
  },
  {
    step: '03',
    title: 'Financial LLM Synthesis',
    subtitle: 'Proprietary Market Narrative Model',
    icon: Sparkles,
    description:
      'Our fine-tuned LLM synthesizes raw quantitative parameters into structured, actionable explanations explaining the EXACT catalyst behind price movements.',
    telemetry: '38ms inference speed',
    tags: ['Context Generation', 'Catalyst Verification', 'Conviction Score'],
  },
  {
    step: '04',
    title: 'Low-Latency Broadcast',
    subtitle: 'Actionable Alerts via WS & Webhook',
    icon: Send,
    description:
      'Instantaneous multi-channel dispatch to your browser, mobile device, or proprietary trading bot via sub-50ms WebSocket pipelines.',
    telemetry: '<50ms end-to-end delivery',
    tags: ['WebSockets', 'Webhooks', 'Telegram', 'Trading API'],
  },
];

export function ArchitecturePipeline() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="mb-20 rounded-3xl border border-black/10 bg-white/60 p-6 backdrop-blur sm:p-10 dark:border-white/10 dark:bg-slate-900/60">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sea">
          <Cpu className="h-3.5 w-3.5" />
          The Intelligence Engine
        </div>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl text-slate-900 dark:text-white">
          How Narrivex Turns Raw Market Chaos into Clear Signals
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
          From microsecond order book anomalies to nuanced AI explanations in under 50 milliseconds.
        </p>
      </div>

      {/* Interactive Step Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {pipelineSteps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === idx;
          return (
            <div
              key={step.step}
              onClick={() => setActiveStep(idx)}
              className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                isActive
                  ? 'border-sea bg-sea/5 shadow-lg ring-1 ring-sea/40 dark:bg-sea/10'
                  : 'border-black/5 bg-white/80 hover:border-black/15 dark:border-white/5 dark:bg-slate-800/50 dark:hover:border-white/15'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-sea">{step.step}</span>
                <span className="rounded-lg bg-sea/15 p-2 text-sea">
                  <Icon className="h-4 w-4" />
                </span>
              </div>

              <h3 className="mt-4 font-display text-base font-bold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-xs font-semibold text-coral dark:text-orange-400 mt-0.5">
                {step.subtitle}
              </p>

              <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {step.description}
              </p>

              <div className="mt-4 border-t border-black/5 pt-3 dark:border-white/5">
                <span className="font-mono text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  ⚡ {step.telemetry}
                </span>
                <div className="mt-2 flex flex-wrap gap-1">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
