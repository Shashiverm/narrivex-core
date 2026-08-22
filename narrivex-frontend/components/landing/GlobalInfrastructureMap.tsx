'use client';

import { useState, useEffect } from 'react';
import { Server, ShieldCheck, Cpu } from 'lucide-react';

interface EdgeNode {
  id: string;
  city: string;
  datacenter: string;
  region: string;
  primaryVenues: string;
  pingMs: number;
  jitterMs: number;
  packetLoss: string;
  loadPercent: number;
  protocols: string[];
  x: number; // percentage coordinate 0-100
  y: number; // percentage coordinate 0-100
}

const edgeNodes: EdgeNode[] = [
  {
    id: 'nyc',
    city: 'New York (Secaucus NY4)',
    datacenter: 'Equinix NY4 Cross-Connect',
    region: 'North America East',
    primaryVenues: 'NYSE, NASDAQ, CME, Cboe, Direct Dark Pools',
    pingMs: 9.4,
    jitterMs: 0.12,
    packetLoss: '0.000%',
    loadPercent: 42,
    protocols: ['FIX 4.4', 'Binary L3 WS', 'REST v2'],
    x: 27,
    y: 36,
  },
  {
    id: 'lon',
    city: 'London (Slough LD4)',
    datacenter: 'Equinix LD4 Interconnect',
    region: 'Europe West',
    primaryVenues: 'LSE, Interbank Forex EBS, Metal Spot, Euronext',
    pingMs: 14.2,
    jitterMs: 0.18,
    packetLoss: '0.000%',
    loadPercent: 48,
    protocols: ['FIX 4.4', 'Binary L3 WS', 'EBS Feed'],
    x: 48,
    y: 28,
  },
  {
    id: 'fra',
    city: 'Frankfurt (Equinix FR2)',
    datacenter: 'FR2 Financial Cluster',
    region: 'Europe Central',
    primaryVenues: 'Deutsche Börse, Eurex, ECB Macro Telemetry',
    pingMs: 16.8,
    jitterMs: 0.15,
    packetLoss: '0.000%',
    loadPercent: 36,
    protocols: ['FIX 4.4', 'L3 WS', 'REST v2'],
    x: 54,
    y: 31,
  },
  {
    id: 'tyo',
    city: 'Tokyo (TY3 Colocation)',
    datacenter: 'Equinix TY3 Tokyo Hub',
    region: 'Asia Pacific',
    primaryVenues: 'TSE, OSE Nikkei Futures, JPY Interbank Dealing',
    pingMs: 28.5,
    jitterMs: 0.24,
    packetLoss: '0.000%',
    loadPercent: 54,
    protocols: ['Binary L3 WS', 'REST v2'],
    x: 84,
    y: 38,
  },
  {
    id: 'sgp',
    city: 'Singapore (SG1 Core)',
    datacenter: 'Equinix SG1 Asia Mesh',
    region: 'Southeast Asia',
    primaryVenues: 'Binance, OKX, Bybit, Hyperliquid, SGX Derivatives',
    pingMs: 22.1,
    jitterMs: 0.19,
    packetLoss: '0.000%',
    loadPercent: 62,
    protocols: ['DEX RPC FastPath', 'L3 WS', 'REST v2'],
    x: 77,
    y: 58,
  },
  {
    id: 'zur',
    city: 'Zurich (ZH4 Hub)',
    datacenter: 'Equinix ZH4 Banking Grid',
    region: 'Europe Central',
    primaryVenues: 'SIX Swiss Exchange, Crypto Brokerage Gateways',
    pingMs: 18.2,
    jitterMs: 0.14,
    packetLoss: '0.000%',
    loadPercent: 29,
    protocols: ['FIX 4.4', 'L3 WS'],
    x: 51,
    y: 34,
  },
];

export function GlobalInfrastructureMap() {
  const [selectedNode, setSelectedNode] = useState<EdgeNode>(edgeNodes[0]);
  const [packetsProcessed, setPacketsProcessed] = useState<number>(2419082400);

  useEffect(() => {
    const interval = setInterval(() => {
      setPacketsProcessed((prev) => prev + Math.floor(Math.random() * 850) + 240);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mb-24 rounded-3xl border border-slate-800/80 bg-slate-950 p-6 text-slate-100 shadow-2xl sm:p-10">
      {/* Header telemetry info */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-3 py-1 font-mono text-xs font-semibold text-sea">
            <Cpu className="h-3.5 w-3.5" />
            Co-Located High-Frequency Ingestion Mesh
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl text-white">
            Sub-50ms Global Event Synthesis
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl font-sans">
            Narrivex operates proprietary ingestion nodes inside tier-1 financial data centers, enabling real-time NLP reasoning before standard retail alerts trigger.
          </p>
        </div>

        {/* Real-time counters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-right font-mono">
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Events Processed (24h)</span>
            <p className="text-base font-bold text-sea tabular-nums">
              {packetsProcessed.toLocaleString()} <span className="text-xs text-slate-500">pkts</span>
            </p>
          </div>
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-right font-mono">
            <span className="text-[10px] uppercase tracking-wider text-emerald-400">Global Mesh SLA</span>
            <p className="text-base font-bold text-emerald-400">99.999%</p>
          </div>
        </div>
      </div>

      {/* Network Mesh Simulation & Node Details */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12 items-center">
        {/* World Network Canvas Topology */}
        <div className="relative min-h-[340px] rounded-2xl border border-slate-800 bg-slate-900/40 p-4 lg:col-span-7 flex items-center justify-center overflow-hidden">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-tech-grid opacity-60 pointer-events-none" />

          {/* SVG Connection Lines between hubs */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none z-10">
            {/* New York to London */}
            <line x1="27%" y1="36%" x2="48%" y2="28%" stroke="rgba(0, 160, 160, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* London to Frankfurt */}
            <line x1="48%" y1="28%" x2="54%" y2="31%" stroke="rgba(0, 160, 160, 0.5)" strokeWidth="1.5" />
            {/* Frankfurt to Zurich */}
            <line x1="54%" y1="31%" x2="51%" y2="34%" stroke="rgba(0, 160, 160, 0.4)" strokeWidth="1.5" />
            {/* Frankfurt to Singapore */}
            <line x1="54%" y1="31%" x2="77%" y2="58%" stroke="rgba(0, 160, 160, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Singapore to Tokyo */}
            <line x1="77%" y1="58%" x2="84%" y2="38%" stroke="rgba(0, 160, 160, 0.45)" strokeWidth="1.5" />
            {/* Tokyo to New York Transpacific */}
            <line x1="84%" y1="38%" x2="98%" y2="37%" stroke="rgba(0, 160, 160, 0.25)" strokeWidth="1" strokeDasharray="2 2" />
          </svg>

          {/* Interactive Hub Node Dots */}
          <div className="relative h-full w-full min-h-[290px]">
            {edgeNodes.map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <div
                  key={node.id}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  onClick={() => setSelectedNode(node)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 transform cursor-pointer z-20 group"
                >
                  <div className="relative flex items-center justify-center">
                    {isSelected && (
                      <span className="absolute h-8 w-8 animate-ping rounded-full bg-sea/30" />
                    )}
                    <span
                      className={`h-3.5 w-3.5 rounded-full border-2 transition-all duration-200 ${
                        isSelected
                          ? 'border-white bg-sea shadow-[0_0_12px_#00a0a0]'
                          : 'border-slate-600 bg-slate-800 hover:border-sea hover:bg-sea/60'
                      }`}
                    />
                  </div>

                  <div
                    className={`mt-1.5 whitespace-nowrap rounded-md px-2 py-0.5 font-mono text-[10px] font-bold shadow-md transition ${
                      isSelected
                        ? 'bg-sea text-white'
                        : 'bg-slate-950/90 text-slate-300 border border-slate-800 group-hover:border-sea/50'
                    }`}
                  >
                    {node.id.toUpperCase()} • {node.pingMs}ms
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Hub Inspector Card */}
        <div className="lg:col-span-5 space-y-3 font-mono text-xs">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sea/15 text-sea">
                  <Server className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-white">{selectedNode.city}</h4>
                  <span className="text-[11px] text-slate-400">{selectedNode.datacenter}</span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                <ShieldCheck className="h-3 w-3" />
                ACTIVE
              </span>
            </div>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Co-Located Feeds:</span>
                <span className="font-semibold text-slate-200 text-right truncate max-w-[200px]">
                  {selectedNode.primaryVenues}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Average Ingestion Ping:</span>
                <span className="font-bold text-emerald-400">{selectedNode.pingMs} ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Jitter Variance:</span>
                <span className="text-slate-300">±{selectedNode.jitterMs} ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Packet Loss Rate:</span>
                <span className="text-emerald-400">{selectedNode.packetLoss}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Node Load Factor:</span>
                <span className="text-slate-300">{selectedNode.loadPercent}% utilized</span>
              </div>
            </div>

            {/* Protocol Support Badges */}
            <div className="mt-4 border-t border-slate-800 pt-3">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Supported Ingestion Protocols:</span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {selectedNode.protocols.map((proto) => (
                  <span
                    key={proto}
                    className="rounded border border-slate-700 bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-200"
                  >
                    {proto}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5">
              <span className="text-[10px] text-slate-500 uppercase">P99 Latency</span>
              <p className="mt-0.5 text-sm font-bold text-sea">&lt;25ms</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5">
              <span className="text-[10px] text-slate-500 uppercase">Direct Venues</span>
              <p className="mt-0.5 text-sm font-bold text-coral">120+ Hubs</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5">
              <span className="text-[10px] text-slate-500 uppercase">Failover</span>
              <p className="mt-0.5 text-sm font-bold text-emerald-400">&lt;500μs Auto</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
