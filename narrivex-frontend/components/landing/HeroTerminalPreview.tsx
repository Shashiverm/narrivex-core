'use client';

import { useState, useMemo } from 'react';
import {
  Terminal,
  Activity,
  CheckCircle2,
  Code2,
  Sliders,
  Layers,
  Pause,
  Play,
  Copy,
  Check,
  Zap,
} from 'lucide-react';

interface SignalItem {
  id: string;
  category: 'Crypto' | 'Equities' | 'Forex' | 'Macro';
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  trigger: string;
  timeAgo: string;
  confidence: number;
  impact: 'Critical' | 'High Volatility' | 'Standard';
  venue: string;
  aiExplanation: string;
  catalystSummary: string;
  metrics: {
    volumeSurge: string;
    orderImbalance: string;
    catalystType: string;
    invalidationLevel: string;
    takerBuyRatio: number; // percentage 0-100
  };
  jsonPayload: {
    event_id: string;
    timestamp_utc: string;
    latency_ingestion_ms: number;
    feed_venue: string;
    instrument: string;
    anomaly_detection: {
      type: string;
      z_score: number;
      volume_multiplier: number;
    };
    nlp_reasoning_synthesis: string;
  };
}

const mockSignals: SignalItem[] = [
  {
    id: 'sig-1',
    category: 'Crypto',
    symbol: 'BTC/USDT',
    name: 'Bitcoin Perpetual',
    price: '$96,420.50',
    change: '+4.82%',
    isPositive: true,
    trigger: '$54M Short Liquidation Cascade & Ask Sweep',
    timeAgo: '12s ago',
    confidence: 96,
    impact: 'High Volatility',
    venue: 'Binance Perpetual L3',
    catalystSummary: 'Derivatives Squeeze + Spot CVD Aggression',
    aiExplanation:
      'Spot aggregate volume surged 340% above the 20-period baseline following an abrupt $54M short liquidation cluster across Binance and OKX. Cumulative Volume Delta (CVD) shows aggressive taker buy dominance absorbing all ask-side resistance up to $96,800.',
    metrics: {
      volumeSurge: '+340% (15m)',
      orderImbalance: '82% Buy / 18% Sell',
      catalystType: 'Derivatives Short Cascade',
      invalidationLevel: '$94,200 (vwap support)',
      takerBuyRatio: 82,
    },
    jsonPayload: {
      event_id: 'evt_btc_96k_cascade_01',
      timestamp_utc: '2026-08-24T18:42:19.402Z',
      latency_ingestion_ms: 12.4,
      feed_venue: 'BINANCE_FUTURES_L3',
      instrument: 'BTCUSDT.P',
      anomaly_detection: {
        type: 'LIQUIDATION_CASCADE_OUTLIER',
        z_score: 3.84,
        volume_multiplier: 3.4,
      },
      nlp_reasoning_synthesis:
        'Ask wall absorption initiated by 54.2M USD short liquidation cascade. Spot buyer delta confirmed.',
    },
  },
  {
    id: 'sig-2',
    category: 'Equities',
    symbol: 'NVDA',
    name: 'NVIDIA Corp',
    price: '$138.65',
    change: '+3.45%',
    isPositive: true,
    trigger: 'Dark Pool Block Absorption (480K shares)',
    timeAgo: '45s ago',
    confidence: 93,
    impact: 'Critical',
    venue: 'FINRA ADF / NASDAQ',
    catalystSummary: 'Dark Pool Print + Supplier Node Expansion',
    aiExplanation:
      'Aggregated institutional print of 480k shares executed above prevailing ask across dark pools. Correlates with pre-market Taiwan semiconductor advanced packaging capacity expansion.',
    metrics: {
      volumeSurge: '+210% vs 5d avg',
      orderImbalance: '74% Buy Block',
      catalystType: 'Institutional Block Accumulation',
      invalidationLevel: '$135.20 (dark pool base)',
      takerBuyRatio: 74,
    },
    jsonPayload: {
      event_id: 'evt_nvda_darkpool_02',
      timestamp_utc: '2026-08-24T18:41:45.118Z',
      latency_ingestion_ms: 18.2,
      feed_venue: 'FINRA_ADF_DARK_POOL',
      instrument: 'NVDA.US',
      anomaly_detection: {
        type: 'DARK_POOL_PRINT_SURGE',
        z_score: 3.12,
        volume_multiplier: 2.1,
      },
      nlp_reasoning_synthesis:
        '480K share institutional block execution above prevailing ask. Strong absorption dynamics.',
    },
  },
  {
    id: 'sig-3',
    category: 'Forex',
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    price: '1.0842',
    change: '-0.38%',
    isPositive: false,
    trigger: 'US 10Y Yield Rebound & ECB Policy Divergence',
    timeAgo: '2m ago',
    confidence: 91,
    impact: 'Standard',
    venue: 'EBS Interbank Dealing',
    catalystSummary: 'Macro Yield Spread Expansion',
    aiExplanation:
      'Hawkish US 10-year Treasury yield rebound (+6bps) triggered rapid cross-currency unwinding against Eurozone sovereign debt. Algorithmic sell wall established at 1.0870 with heavy order book bid absorption.',
    metrics: {
      volumeSurge: '+185% interbank vol',
      orderImbalance: '68% Sell Volume',
      catalystType: 'Sovereign Yield Spread',
      invalidationLevel: '1.0885 (interbank pivot)',
      takerBuyRatio: 32,
    },
    jsonPayload: {
      event_id: 'evt_eurusd_yield_03',
      timestamp_utc: '2026-08-24T18:40:12.890Z',
      latency_ingestion_ms: 21.0,
      feed_venue: 'EBS_INTERBANK',
      instrument: 'EURUSD.FX',
      anomaly_detection: {
        type: 'MACRO_SPREAD_DIVERGENCE',
        z_score: 2.76,
        volume_multiplier: 1.85,
      },
      nlp_reasoning_synthesis:
        '10Y Treasury spread widening vs German Bunds triggered algorithmic spot selling.',
    },
  },
  {
    id: 'sig-4',
    category: 'Crypto',
    symbol: 'SOL/USDT',
    name: 'Solana Spot',
    price: '$194.80',
    change: '+8.95%',
    isPositive: true,
    trigger: 'DEX Pool Velocity Spike & Mempool Surge',
    timeAgo: '4m ago',
    confidence: 95,
    impact: 'Critical',
    venue: 'Raydium / Binance',
    catalystSummary: 'On-Chain Liquidity Velocity Spike',
    aiExplanation:
      'On-chain DEX turnover hit $1.2B in 4 hours driven by high-velocity liquidity rotations. Perp funding rates reset positive with open interest expanding by $180M within two 15-minute intervals.',
    metrics: {
      volumeSurge: '+420% DEX pool turnover',
      orderImbalance: '89% Taker Volume',
      catalystType: 'On-Chain Velocity Outlier',
      invalidationLevel: '$186.50 (on-chain support)',
      takerBuyRatio: 89,
    },
    jsonPayload: {
      event_id: 'evt_sol_velocity_04',
      timestamp_utc: '2026-08-24T18:38:05.654Z',
      latency_ingestion_ms: 9.8,
      feed_venue: 'SOLANA_RPC_RAYDIUM',
      instrument: 'SOLUSDT.P',
      anomaly_detection: {
        type: 'ON_CHAIN_DEX_OUTLIER',
        z_score: 4.15,
        volume_multiplier: 4.2,
      },
      nlp_reasoning_synthesis:
        'DEX liquidity rotation with $1.2B 4h volume surge. Open interest expanding aggressively.',
    },
  },
];

export function HeroTerminalPreview() {
  const [selectedId, setSelectedId] = useState<string>('sig-1');
  const [viewMode, setViewMode] = useState<'narrative' | 'telemetry' | 'json'>('narrative');
  const [isLive, setIsLive] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Crypto' | 'Equities' | 'Forex'>('All');

  const filteredSignals = useMemo(() => {
    return activeCategory === 'All' ? mockSignals : mockSignals.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const activeSignal = useMemo(() => {
    return mockSignals.find((s) => s.id === selectedId) || mockSignals[0];
  }, [selectedId]);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(activeSignal.jsonPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="terminal-window relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#090d16] text-slate-100 shadow-terminal-elevated">
      {/* Terminal Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-white/[0.06] bg-[#0c121e]/95 px-3 py-2 sm:px-4 sm:py-2.5">
        {/* Left: Window Controls + Stream Identifier */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>

          <div className="h-4 w-[1px] bg-white/[0.08] mx-0.5 hidden sm:block" />

          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs text-slate-300">
            <Terminal className="h-3.5 w-3.5 text-sea" />
            <span className="font-semibold text-slate-200 truncate max-w-[120px] sm:max-w-none">narrivex-core::telemetry</span>
            <span className="rounded bg-white/[0.06] px-1.5 py-0.2 text-[10px] text-slate-400 font-mono hidden xs:inline">
              v2.4
            </span>
          </div>
        </div>

        {/* Right: Live Stream Status + Stream Toggle + Mode Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar max-w-full">
          <button
            type="button"
            onClick={() => setIsLive(!isLive)}
            className={`inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 sm:px-2 sm:py-1 font-mono text-[10px] sm:text-[11px] font-semibold transition ${
              isLive
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-white/[0.05] text-slate-400 border border-white/[0.08]'
            }`}
          >
            {isLive ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                <Pause className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                <span>LIVE</span>
              </>
            ) : (
              <>
                <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-400" />
                <span>PAUSED</span>
              </>
            )}
          </button>

          {/* View Mode Switcher */}
          <div className="flex shrink-0 rounded-md border border-white/[0.08] bg-[#080c14] p-0.5 font-mono text-[10px] sm:text-[11px]">
            <button
              onClick={() => setViewMode('narrative')}
              className={`flex items-center gap-1 rounded px-2 py-0.5 sm:px-2.5 sm:py-1 transition ${
                viewMode === 'narrative'
                  ? 'bg-white/[0.1] text-white font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="h-3 w-3 text-sea" />
              <span>Synthesis</span>
            </button>
            <button
              onClick={() => setViewMode('telemetry')}
              className={`flex items-center gap-1 rounded px-2 py-0.5 sm:px-2.5 sm:py-1 transition ${
                viewMode === 'telemetry'
                  ? 'bg-white/[0.1] text-white font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sliders className="h-3 w-3 text-coral" />
              <span>Order Flow</span>
            </button>
            <button
              onClick={() => setViewMode('json')}
              className={`flex items-center gap-1 rounded px-2 py-0.5 sm:px-2.5 sm:py-1 transition ${
                viewMode === 'json'
                  ? 'bg-white/[0.1] text-white font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="h-3 w-3 text-emerald-400" />
              <span>JSON</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Terminal Workspace */}
      <div className="grid gap-0 lg:grid-cols-12 min-h-[390px]">
        {/* Left Column: Stream Event Log */}
        <div className="border-b border-white/[0.06] p-3 lg:col-span-5 lg:border-b-0 lg:border-r">
          <div className="mb-2.5 flex items-center justify-between px-1 font-mono text-[11px] text-slate-400">
            <span>LIVE ANOMALIES</span>
            <div className="flex gap-1">
              {(['All', 'Crypto', 'Equities'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${
                    activeCategory === cat
                      ? 'bg-sea/20 text-sea font-bold border border-sea/30'
                      : 'hover:text-slate-300 text-slate-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 max-h-[220px] sm:max-h-[300px] lg:max-h-none overflow-y-auto pr-0.5">
            {filteredSignals.map((signal) => {
              const isSelected = signal.id === activeSignal.id;
              return (
                <div
                  key={signal.id}
                  onClick={() => setSelectedId(signal.id)}
                  className={`cursor-pointer rounded-xl p-2.5 border transition-all duration-150 ${
                    isSelected
                      ? 'border-sea/60 bg-sea/10 shadow-sm ring-1 ring-sea/30'
                      : 'border-white/[0.05] bg-[#0c121e]/80 hover:border-white/[0.12] hover:bg-[#101726]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono text-xs font-bold text-slate-100">{signal.symbol}</span>
                      <span
                        className={`font-mono text-[10px] font-semibold px-1 rounded ${
                          signal.isPositive
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : 'bg-rose-500/15 text-rose-400'
                        }`}
                      >
                        {signal.change}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-500">{signal.timeAgo}</span>
                  </div>

                  <p className="mt-1 text-[11px] text-slate-300 font-medium line-clamp-1">
                    {signal.trigger}
                  </p>

                  <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-slate-400">
                    <span className="truncate max-w-[140px] text-slate-500">{signal.venue}</span>
                    <span className="text-emerald-400 font-semibold">{signal.confidence}% conv</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Synthesis / Order Flow / JSON Inspector */}
        <div className="p-3.5 sm:p-4 lg:col-span-7 flex flex-col justify-between bg-[#080c14]/90">
          <div>
            {/* Active Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-white/[0.06] pb-3">
              <div>
                <div className="flex items-center gap-2 font-mono flex-wrap">
                  <h4 className="text-base font-bold text-white">{activeSignal.symbol}</h4>
                  <span className="text-xs text-slate-400">({activeSignal.name})</span>
                  <span className="text-xs font-bold text-slate-200">{activeSignal.price}</span>
                  <span
                    className={`rounded px-1.5 py-0.2 text-[10px] font-bold ${
                      activeSignal.isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {activeSignal.change}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-1.5 font-mono text-[11px] text-coral">
                  <Layers className="h-3 w-3 shrink-0" />
                  <span className="line-clamp-1">{activeSignal.catalystSummary}</span>
                </div>
              </div>

              <div className="self-start sm:self-auto sm:text-right">
                <span className="inline-flex items-center gap-1 rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] font-bold text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" />
                  {activeSignal.confidence}% Conviction
                </span>
              </div>
            </div>

            {/* TAB 1: Grounded Narrative Synthesis */}
            {viewMode === 'narrative' && (
              <div className="mt-3.5 space-y-3">
                <div className="rounded-xl border border-sea/25 bg-[#0e1626]/90 p-3 sm:p-3.5">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-sea flex items-center gap-1.5">
                      <Zap className="h-3 w-3" />
                      Contextual Market Reasoning
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      Latency: {activeSignal.jsonPayload.latency_ingestion_ms}ms
                    </span>
                  </div>

                  <p className="mt-2.5 text-xs text-slate-200 leading-relaxed font-sans">
                    {activeSignal.aiExplanation}
                  </p>
                </div>

                {/* Quantitative Metric Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <div className="rounded-lg border border-white/[0.06] bg-[#0c121e] p-2.5">
                    <span className="text-[10px] text-slate-500 uppercase">Volume Anomaly</span>
                    <p className="mt-0.5 font-bold text-white">{activeSignal.metrics.volumeSurge}</p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-[#0c121e] p-2.5">
                    <span className="text-[10px] text-slate-500 uppercase">Invalidation Level</span>
                    <p className="mt-0.5 font-bold text-amber-400">{activeSignal.metrics.invalidationLevel}</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Order Flow & Microstructure Telemetry */}
            {viewMode === 'telemetry' && (
              <div className="mt-3.5 space-y-3 font-mono text-xs">
                <div className="rounded-xl border border-white/[0.06] bg-[#0e1626] p-3 sm:p-3.5">
                  <div className="flex justify-between items-center mb-2 text-[11px]">
                    <span className="text-slate-400">Taker Order Book Imbalance</span>
                    <span className="text-emerald-400 font-bold">{activeSignal.metrics.orderImbalance}</span>
                  </div>

                  {/* Visual Buyer / Seller Ratio Bar */}
                  <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden flex shadow-inner">
                    <div
                      style={{ width: `${activeSignal.metrics.takerBuyRatio}%` }}
                      className="bg-emerald-500 h-full transition-all duration-500"
                    />
                    <div
                      style={{ width: `${100 - activeSignal.metrics.takerBuyRatio}%` }}
                      className="bg-rose-500 h-full transition-all duration-500"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1.5">
                    <span className="text-emerald-400">Taker Buy: {activeSignal.metrics.takerBuyRatio}%</span>
                    <span className="text-rose-400">Taker Sell: {100 - activeSignal.metrics.takerBuyRatio}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg border border-white/[0.06] bg-[#0c121e] p-2.5">
                    <span className="text-[10px] text-slate-500 uppercase">Anomaly Z-Score</span>
                    <p className="mt-0.5 font-bold text-sea">+{activeSignal.jsonPayload.anomaly_detection.z_score}σ</p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-[#0c121e] p-2.5">
                    <span className="text-[10px] text-slate-500 uppercase">Venue Ingestion</span>
                    <p className="mt-0.5 font-bold text-slate-200 truncate">{activeSignal.venue}</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Raw JSON Payloads for Developers */}
            {viewMode === 'json' && (
              <div className="mt-3.5 relative">
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded border border-white/[0.1] bg-[#111928] px-2 py-1 font-mono text-[10px] text-slate-300 hover:bg-[#162134] transition-colors"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? 'COPIED' : 'COPY JSON'}</span>
                </button>

                <pre className="max-h-[175px] overflow-auto rounded-xl border border-white/[0.06] bg-[#060910] p-3 font-mono text-[10px] sm:text-[11px] text-emerald-400/90 leading-tight">
                  {JSON.stringify(activeSignal.jsonPayload, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 border-t border-white/[0.06] pt-2.5 font-mono text-[9px] sm:text-[10px] text-slate-500">
            <span>SOCKET STREAM: /v2/stream/alpha-events</span>
            <span className="text-sea">PACKET ID: #{activeSignal.jsonPayload.event_id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

