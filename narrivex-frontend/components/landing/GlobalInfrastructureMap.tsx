'use client';

import { useState, useEffect } from 'react';
import { Server, Wifi, Radio } from 'lucide-react';

interface NetworkNode {
  city: string;
  region: string;
  assetFocus: string;
  ping: number;
  status: 'OPTIMAL' | 'ACTIVE';
  load: string;
  x: number; // percentage on map
  y: number; // percentage on map
}

const networkNodes: NetworkNode[] = [
  { city: 'New York', region: 'US East (Equities & Options)', assetFocus: 'NYSE, NASDAQ, CME, Dark Pools', ping: 11, status: 'OPTIMAL', load: '38%', x: 28, y: 34 },
  { city: 'London', region: 'Europe (FX & Sovereign Debt)', assetFocus: 'LSE, Interbank Forex, Commodities', ping: 18, status: 'OPTIMAL', load: '44%', x: 48, y: 26 },
  { city: 'Frankfurt', region: 'Europe Central (Macro & ECB)', assetFocus: 'Deutsche Börse, Eurex, ECB Macro', ping: 21, status: 'OPTIMAL', load: '32%', x: 53, y: 29 },
  { city: 'Tokyo', region: 'Asia Pacific (Equities)', assetFocus: 'TSE, Nikkei Futures, JPY FX', ping: 29, status: 'OPTIMAL', load: '49%', x: 84, y: 36 },
  { city: 'Singapore', region: 'Asia SE (Crypto & Regional FX)', assetFocus: 'Binance, OKX, Bybit, SGX', ping: 24, status: 'OPTIMAL', load: '58%', x: 76, y: 58 },
  { city: 'Global RPC', region: 'Decentralized High-Speed Nodes', assetFocus: 'Ethereum, Solana, Arbitrum, Base', ping: 8, status: 'OPTIMAL', load: '67%', x: 40, y: 65 },
];

export function GlobalInfrastructureMap() {
  const [activeNode, setActiveNode] = useState<NetworkNode>(networkNodes[0]);
  const [pulseCount, setPulseCount] = useState<number>(1842901240);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount((prev) => prev + Math.floor(Math.random() * 450) + 120);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mb-20 overflow-hidden rounded-3xl border border-black/10 bg-slate-950 p-6 text-white shadow-2xl backdrop-blur sm:p-10 dark:border-white/15">
      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sea">
            <Radio className="h-3.5 w-3.5 animate-pulse" />
            Global Low-Latency Infrastructure
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl text-white">
            Engineered for Sub-50ms Global Synthesis
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Narrivex operates proprietary co-located ingestion engines directly in tier-1 financial data centers, ensuring your AI narratives arrive before the broader market reacts.
          </p>
        </div>

        {/* Live Counters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-right">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Live Data Ingested (24h)
            </span>
            <p className="font-mono text-lg font-bold text-sea">
              {pulseCount.toLocaleString()} <span className="text-xs text-slate-500">pkts</span>
            </p>
          </div>
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-right">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
              Global SLA Uptime
            </span>
            <p className="font-mono text-lg font-bold text-emerald-400">99.999%</p>
          </div>
        </div>
      </div>

      {/* World Map & Node Explorer */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* World Network Canvas Map Simulation */}
        <div className="relative min-h-[320px] rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 lg:col-span-7 flex items-center justify-center overflow-hidden">
          {/* Subtle Grid Background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(0, 160, 160, 0.4) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Glowing Center Ring */}
          <div className="absolute h-64 w-64 rounded-full border border-sea/10 bg-sea/5 blur-xl pointer-events-none" />

          {/* Interactive World Map Points */}
          <div className="relative h-full w-full min-h-[280px]">
            {networkNodes.map((node) => {
              const isSelected = activeNode.city === node.city;
              return (
                <div
                  key={node.city}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 transform cursor-pointer transition-all duration-300 group z-20"
                  onClick={() => setActiveNode(node)}
                >
                  <div className="relative flex items-center justify-center">
                    {isSelected && (
                      <span className="absolute h-8 w-8 animate-ping rounded-full bg-sea/40" />
                    )}
                    <span
                      className={`h-4 w-4 rounded-full border-2 transition ${
                        isSelected
                          ? 'border-white bg-sea shadow-[0_0_15px_#00a0a0]'
                          : 'border-slate-700 bg-slate-800 hover:border-sea hover:bg-sea/50'
                      }`}
                    />
                  </div>

                  <div
                    className={`mt-1.5 whitespace-nowrap rounded-md px-2 py-0.5 text-[10px] font-mono font-bold shadow-lg transition ${
                      isSelected
                        ? 'bg-sea text-white'
                        : 'bg-slate-950/80 text-slate-300 border border-slate-800 group-hover:border-sea/40'
                    }`}
                  >
                    {node.city} • {node.ping}ms
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Node Detail Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 backdrop-blur">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-sea" />
                <div>
                  <h4 className="font-display text-base font-bold text-white">
                    {activeNode.city} Node
                  </h4>
                  <span className="text-xs text-slate-400">{activeNode.region}</span>
                </div>
              </div>
              <span className="flex items-center gap-1 rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                <Wifi className="h-3 w-3" />
                {activeNode.status}
              </span>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Co-located Feeds:</span>
                <span className="font-semibold text-white">{activeNode.assetFocus}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Mean Ingestion Ping:</span>
                <span className="font-mono font-bold text-emerald-400">{activeNode.ping} ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Real-Time Node Capacity:</span>
                <span className="font-mono text-slate-200">{activeNode.load} utilized</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <p className="text-[11px] text-slate-400 leading-relaxed">
                ✓ Continuous Level 3 Order Book streaming & instant NLP tokenization with redundancy failover across all geographic clusters.
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-center">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Latency</span>
              <p className="mt-1 font-mono text-base font-bold text-sea">&lt;25ms</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-center">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Venues</span>
              <p className="mt-1 font-mono text-base font-bold text-coral">120+ Feeds</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-center">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Protocols</span>
              <p className="mt-1 font-mono text-base font-bold text-emerald-400">WS / REST / FIX</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
