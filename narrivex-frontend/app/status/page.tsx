'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Server,
  Clock,
  RefreshCw,
  ArrowLeft,
  Globe2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceStatus {
  name: string;
  category: string;
  status: 'Operational' | 'Degraded' | 'Maintenance';
  latency: string;
  uptime: string;
  description: string;
}

const SERVICES: ServiceStatus[] = [
  {
    name: 'Real-Time Ingestion Bus',
    category: 'Core Ingestion',
    status: 'Operational',
    latency: '0.42ms',
    uptime: '99.99%',
    description: 'Ultra-low latency market tick ingest for crypto, equities & FX feeds.',
  },
  {
    name: 'AI Narrative Synthesis Engine',
    category: 'Intelligence',
    status: 'Operational',
    latency: '18.4ms',
    uptime: '99.98%',
    description: 'LLM clustering, order flow imbalance reasoning & anomaly detection.',
  },
  {
    name: 'WebSocket Streaming Hub',
    category: 'Live Feeds',
    status: 'Operational',
    latency: '1.2ms',
    uptime: '99.99%',
    description: 'Full-duplex client event push and real-time terminal subscription feeds.',
  },
  {
    name: 'REST API & Auth Cluster',
    category: 'Platform API',
    status: 'Operational',
    latency: '4.8ms',
    uptime: '99.97%',
    description: 'Session authentication, user portfolios, alert webhooks and settings.',
  },
  {
    name: 'Cross-Asset Order Book Matrix',
    category: 'Market Data',
    status: 'Operational',
    latency: '0.8ms',
    uptime: '99.99%',
    description: 'Deep book depth reconstruction and taker buy/sell volume imbalances.',
  },
  {
    name: 'Distributed Database & Cache',
    category: 'Infrastructure',
    status: 'Operational',
    latency: '0.3ms',
    uptime: '100.0%',
    description: 'Distributed persistence layer, Redis clusters, and temporal time-series storage.',
  },
];

const INCIDENT_HISTORY = [
  {
    date: 'February 18, 2026',
    title: 'Routine Edge Gateway Load Balancer Optimization',
    status: 'Resolved',
    duration: '6 mins',
    impact: 'None — Automated failover routed all traffic without packet loss.',
  },
  {
    date: 'January 29, 2026',
    title: 'Exchange Feed Rate-Limit Throttling Adjustment',
    status: 'Resolved',
    duration: '12 mins',
    impact: 'Minor latency increase on secondary forex pairs for 12 minutes.',
  },
  {
    date: 'January 10, 2026',
    title: 'Scheduled Core AI Model Weights Update (v2.4.0)',
    status: 'Completed',
    duration: '15 mins',
    impact: 'Zero downtime rolling update across global nodes.',
  },
];

export default function StatusPage() {
  const [lastRefreshed, setLastRefreshed] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setLastRefreshed(new Date().toLocaleTimeString());
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastRefreshed(new Date().toLocaleTimeString());
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Background Decorative Grid */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-60 dark:opacity-40" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[450px] w-[800px] rounded-full bg-gradient-to-b from-emerald-500/10 via-sea/10 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Top Breadcrumb / Nav */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-slate-600 hover:text-sea dark:text-slate-400 dark:hover:text-sea transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Narrivex</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-slate-500">
              Updated: <span className="text-slate-700 dark:text-slate-300">{lastRefreshed || 'Just now'}</span>
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="gap-1.5 font-mono text-xs"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin text-sea' : ''}`} />
              <span>Refresh</span>
            </Button>
          </div>
        </div>

        {/* Global Operational Hero Card */}
        <div className="mb-10 overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-white/80 to-teal-500/5 p-6 sm:p-8 shadow-lg backdrop-blur-md dark:from-emerald-950/30 dark:via-slate-900/90 dark:to-teal-950/20 dark:border-emerald-500/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-md shadow-emerald-500/30 flex-shrink-0">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    All Systems Operational
                  </h1>
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Global ingestion bus, real-time AI reasoning clusters, and WebSocket feeds are running at peak performance.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 border-t sm:border-t-0 sm:border-l border-emerald-500/20 pt-4 sm:pt-0 sm:pl-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">90-Day Uptime</p>
                <p className="font-display text-2xl font-bold text-emerald-600 dark:text-emerald-400">99.98%</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">Mean Latency</p>
                <p className="font-display text-2xl font-bold text-sea">1.2ms</p>
              </div>
            </div>
          </div>

          {/* 90-Day Visual Uptime Bars */}
          <div className="mt-8 border-t border-slate-200/80 dark:border-slate-800/80 pt-5">
            <div className="flex items-center justify-between font-mono text-[11px] text-slate-500 mb-2">
              <span>90 days ago</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Uptime Today</span>
              <span>Today</span>
            </div>
            <div className="grid grid-cols-45 sm:grid-cols-90 gap-0.5 sm:gap-1 h-7 items-end">
              {Array.from({ length: 60 }).map((_, idx) => (
                <div
                  key={idx}
                  title={`Day ${60 - idx}: 100% Operational`}
                  className="h-full w-full rounded-xs bg-emerald-500 hover:bg-emerald-400 transition-colors cursor-pointer opacity-90"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Core Services Breakdown */}
        <section className="mb-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Server className="h-5 w-5 text-sea" />
              <span>Subsystem Status & Latency</span>
            </h2>
            <span className="font-mono text-xs text-slate-500">6 of 6 Monitored</span>
          </div>

          <div className="space-y-3">
            {SERVICES.map((svc) => (
              <div
                key={svc.name}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-4 sm:px-6 shadow-xs backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80 transition hover:border-slate-300 dark:hover:border-slate-700"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5 sm:mt-0">
                    <CheckCircle2 className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                        {svc.name}
                      </h3>
                      <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-600 dark:text-slate-400">
                        {svc.category}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      {svc.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 font-mono text-xs border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase text-slate-400 block">Latency</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{svc.latency}</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase text-slate-400 block">Uptime</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{svc.uptime}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>{svc.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Edge Ingestion Nodes */}
        <section className="mb-12">
          <div className="rounded-3xl border border-slate-200/80 bg-white/70 p-6 sm:p-7 shadow-xs backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/60">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
              <Globe2 className="h-5 w-5 text-sea" />
              <span>Global Ingestion Node Clusters</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-5">
              Direct low-latency co-location nodes for Binance, Coinbase, Nasdaq, CME & FX providers.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="rounded-xl border border-slate-200/60 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 p-3">
                <div className="flex items-center justify-between text-slate-500 text-[11px] mb-1">
                  <span>US-EAST (NY4)</span>
                  <span className="text-emerald-500 font-bold">● OK</span>
                </div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">0.31 ms</p>
              </div>

              <div className="rounded-xl border border-slate-200/60 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 p-3">
                <div className="flex items-center justify-between text-slate-500 text-[11px] mb-1">
                  <span>US-WEST (LD4)</span>
                  <span className="text-emerald-500 font-bold">● OK</span>
                </div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">0.44 ms</p>
              </div>

              <div className="rounded-xl border border-slate-200/60 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 p-3">
                <div className="flex items-center justify-between text-slate-500 text-[11px] mb-1">
                  <span>EU-WEST (Frankfurt)</span>
                  <span className="text-emerald-500 font-bold">● OK</span>
                </div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">0.52 ms</p>
              </div>

              <div className="rounded-xl border border-slate-200/60 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 p-3">
                <div className="flex items-center justify-between text-slate-500 text-[11px] mb-1">
                  <span>AP-EAST (Tokyo TY3)</span>
                  <span className="text-emerald-500 font-bold">● OK</span>
                </div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">0.68 ms</p>
              </div>
            </div>
          </div>
        </section>

        {/* Past Incidents & Maintenance Log */}
        <section className="mb-12">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-sea" />
            <span>Recent Operational Logs & Maintenance</span>
          </h2>

          <div className="space-y-4">
            {INCIDENT_HISTORY.map((inc, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 shadow-xs backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/60"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                    {inc.title}
                  </h3>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-slate-500">{inc.date}</span>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-600 dark:text-emerald-400">
                      {inc.status}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {inc.impact}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Need Assistance Footer */}
        <div className="text-center border-t border-slate-200/80 dark:border-slate-800/80 pt-8">
          <p className="font-mono text-xs text-slate-500">
            For critical incident escalation or direct API telemetry alerts:{' '}
            <a href="mailto:support@narrivex.tech" className="text-sea underline underline-offset-4 hover:text-sea-dark">
              support@narrivex.tech
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
