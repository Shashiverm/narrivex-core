'use client';

import { useState } from 'react';
import { Database, Cpu, Sparkles, Send, Binary, CheckCircle2 } from 'lucide-react';

interface PipelineStage {
  id: string;
  step: string;
  name: string;
  title: string;
  icon: typeof Database;
  description: string;
  inputFormat: string;
  outputFormat: string;
  latencySpec: string;
  features: string[];
  samplePayload: string;
}

const stages: PipelineStage[] = [
  {
    id: 'stage-1',
    step: '01',
    name: 'Direct L3 Ingestion',
    title: 'Co-Located Multi-Venue Socket Ring',
    icon: Database,
    description:
      'Co-located sockets ingest Level 3 order book deltas, DEX mempool transactions, SEC EDGAR 8-K filings, and central bank speeches in native binary protocols.',
    inputFormat: 'Raw FIX 4.4 / Binary WebSocket / REST',
    outputFormat: 'Normalized Memory Ring-Buffer',
    latencySpec: '< 5ms ingestion ping',
    features: ['120+ Connected Venues', 'Binary Protocol Decoders', 'Zero-Allocation Buffers'],
    samplePayload: `// INGESTION RING BUFFER [BINANCE_FUTURES_L3]
{
  "seq": 84920194,
  "venue": "BINANCE",
  "symbol": "BTCUSDT",
  "bids": [[96410.5, 14.2], [96410.0, 42.8]],
  "asks": [[96411.0, 3.1], [96411.5, 8.4]],
  "liq_cluster": { "side": "SELL", "vol_usd": 54200000 }
}`,
  },
  {
    id: 'stage-2',
    step: '02',
    name: 'Quantitative Isolation',
    title: 'Non-Linear Microstructure Anomaly Engine',
    icon: Binary,
    description:
      'Statistical time-series algorithms calculate rolling Z-scores, dark pool print absorption ratios, and cumulative volume delta (CVD) divergences to filter out baseline noise.',
    inputFormat: 'Normalized Order Stream',
    outputFormat: 'Triggered Anomaly Vector',
    latencySpec: '< 8ms mathematical isolation',
    features: ['Rolling Z-Score > 3.0σ', 'Dark Pool Absorption Index', 'CVD Drift Engine'],
    samplePayload: `// ANOMALY VECTOR [Z-SCORE: +3.84σ]
{
  "metric": "LIQUIDATION_CASCADE_SWEEP",
  "delta_15m_vol": "+340%",
  "cvd_taker_buy_pct": 82.4,
  "confidence_score": 0.96,
  "absorption_status": "ASK_RESISTANCE_CLEARED"
}`,
  },
  {
    id: 'stage-3',
    step: '03',
    name: 'Contextual Synthesis',
    title: 'Fine-Tuned Financial Reasoning Engine',
    icon: Sparkles,
    description:
      'Structured anomaly telemetry is passed into our fine-tuned financial reasoning model to synthesize a deterministic, human-readable narrative explaining WHY the price moved.',
    inputFormat: 'Structured Quantitative Anomaly',
    outputFormat: 'Actionable Market Narrative',
    latencySpec: '28ms inference latency',
    features: ['Zero Hallucination Grounding', 'Multi-Asset Correlation', 'Actionable Invalidation Targets'],
    samplePayload: `// SYNTHESIS ENGINE OUTPUT
{
  "narrative": "Spot volume surged 340% following a $54M short liquidation cluster across Binance and OKX. Aggressive taker buy dominance cleared ask-side depth.",
  "invalidation_level": "$94,200 (vwap)",
  "regime": "BULLISH_MOMENTUM_EXPANSION"
}`,
  },
  {
    id: 'stage-4',
    step: '04',
    name: 'Sub-50ms Broadcast',
    title: 'Low-Latency Stream & Webhook Dispatch',
    icon: Send,
    description:
      'The synthesized narrative is packaged into typed JSON payloads and broadcast to connected web terminals, automated trading bots, and institutional webhooks.',
    inputFormat: 'Synthesized Alert Payload',
    outputFormat: 'WebSocket Frame / HTTP Webhook',
    latencySpec: '< 12ms broadcast transit',
    features: ['Persistent WebSocket Subscriptions', 'HMAC-Signed Webhooks', 'REST Event Replay API'],
    samplePayload: `// DISPATCH BROADCAST [/v2/stream/alpha]
{
  "event_id": "evt_btc_96k_cascade_01",
  "timestamp": "2026-08-24T18:42:19.402Z",
  "total_latency_ms": 46.8,
  "payload": { ... }
}`,
  },
];

export function ArchitecturePipeline() {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const activeStage = stages[activeStageIdx];

  return (
    <section className="mb-24 rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-[#0d131f]/70 sm:p-10">
      {/* Title & Badge */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-3 py-1 font-mono text-xs font-semibold text-sea">
          <Cpu className="h-3.5 w-3.5" />
          The Intelligence Pipeline Architecture
        </div>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl text-slate-900 dark:text-white">
          From Market Noise to Actionable Conviction
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-400">
          Deterministic 4-layer quantitative-to-NLP pipeline operating under 50 milliseconds end-to-end.
        </p>
      </div>

      {/* Stage Selector Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stages.map((stage, idx) => {
          const isSelected = activeStageIdx === idx;
          const Icon = stage.icon;
          return (
            <div
              key={stage.id}
              onClick={() => setActiveStageIdx(idx)}
              className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 ${
                isSelected
                  ? 'border-sea/80 bg-sea/10 shadow-sm ring-1 ring-sea/40 dark:bg-sea/15'
                  : 'border-slate-200/80 bg-white/70 hover:border-slate-300 dark:border-white/[0.06] dark:bg-[#090d16]/80 dark:hover:border-white/[0.12]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-sea">STAGE {stage.step}</span>
                <span
                  className={`rounded-lg p-1.5 transition ${
                    isSelected
                      ? 'bg-sea text-white'
                      : 'bg-slate-100 text-slate-600 dark:bg-white/[0.06] dark:text-slate-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
              </div>

              <h4 className="mt-3 font-display text-sm font-bold text-slate-900 dark:text-white">
                {stage.name}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                {stage.title}
              </p>

              <div className="mt-3 border-t border-slate-100 pt-2 dark:border-white/[0.06]">
                <span className="font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  ⚡ {stage.latencySpec}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stage Deep Dive Inspector */}
      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-6 dark:border-white/[0.06] dark:bg-[#070b12]">
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          {/* Stage Details */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <span className="font-mono text-xs font-bold text-sea">STAGE {activeStage.step} DEEP DIVE</span>
              <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {activeStage.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeStage.description}
              </p>
            </div>

            {/* In / Out Specs */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-white/[0.08] dark:bg-[#0c121e]">
                <span className="text-[10px] text-slate-400 uppercase">Input Stream</span>
                <p className="mt-0.5 font-semibold text-slate-800 dark:text-slate-200 truncate">{activeStage.inputFormat}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-white/[0.08] dark:bg-[#0c121e]">
                <span className="text-[10px] text-slate-400 uppercase">Output Result</span>
                <p className="mt-0.5 font-semibold text-sea truncate">{activeStage.outputFormat}</p>
              </div>
            </div>

            {/* Key Features list */}
            <div className="space-y-2 pt-1">
              {activeStage.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-sea shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Data Transformation Payload */}
          <div className="lg:col-span-6">
            <div className="rounded-xl border border-white/[0.06] bg-[#090d16] p-4 font-mono text-xs shadow-lg">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 mb-3">
                <span className="text-[11px] font-bold text-slate-400">DATA PAYLOAD TRANSFORMATION</span>
                <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-emerald-400">
                  {activeStage.latencySpec}
                </span>
              </div>
              <pre className="overflow-x-auto text-[11px] leading-relaxed text-slate-300">
                {activeStage.samplePayload}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

