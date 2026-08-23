'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Home,
  Terminal,
  Activity,
  Search,
  Zap,
  Bell,
  BookOpen,
  History,
  Radio,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  TrendingUp,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickLinkItem {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  isExternal?: boolean;
}

const QUICK_LINKS: QuickLinkItem[] = [
  {
    title: 'Market Terminal',
    description: 'Launch real-time cross-asset intelligence & AI narratives.',
    href: '/dashboard',
    icon: Terminal,
    badge: 'Live',
  },
  {
    title: 'Market Scanner',
    description: 'Explore live multi-market feeds for crypto, equities & forex.',
    href: '/markets',
    icon: Activity,
  },
  {
    title: 'AI Alert Hub',
    description: 'Configure volatility anomalies & automated order triggers.',
    href: '/alerts',
    icon: Bell,
    badge: 'Signals',
  },
  {
    title: 'Trading Insights',
    description: 'Practical guides & methodology for trading market narratives.',
    href: '/insights',
    icon: BookOpen,
  },
  {
    title: 'Platform Changelog',
    description: 'Track recent core engine features, model improvements & APIs.',
    href: '/changelog',
    icon: History,
  },
  {
    title: 'Pricing & Plans',
    description: 'Compare institutional & professional tier features.',
    href: '/#pricing',
    icon: Zap,
  },
];

export function NotFoundView() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedTrace, setCopiedTrace] = useState(false);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosticState, setDiagnosticState] = useState<'idle' | 'scanning' | 'complete'>('idle');

  const traceId = 'NX-404-DESYNC-8921';

  const filteredLinks = useMemo(() => {
    if (!searchQuery.trim()) return QUICK_LINKS;
    const q = searchQuery.toLowerCase();
    return QUICK_LINKS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.href.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleCopyTrace = async () => {
    try {
      await navigator.clipboard.writeText(
        `[NARRIVEX 404 TRACE]\nTrace ID: ${traceId}\nTimestamp: ${new Date().toISOString()}\nStatus: ROUTE_UNRESOLVED\nIngestion Bus: Operational`
      );
      setCopiedTrace(true);
      setTimeout(() => setCopiedTrace(false), 2000);
    } catch {
      // Ignore clipboard fallback
    }
  };

  const handleRunDiagnostic = () => {
    setIsDiagnosing(true);
    setDiagnosticState('scanning');
    setTimeout(() => {
      setIsDiagnosing(false);
      setDiagnosticState('complete');
      setTimeout(() => setDiagnosticState('idle'), 4000);
    }, 1200);
  };

  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="relative min-h-[90vh] overflow-hidden bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Background Decorative Gradients and Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-60 dark:opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[800px] rounded-full bg-gradient-to-b from-sea/20 via-electric/10 to-transparent blur-3xl dark:from-sea/15 dark:via-electric/5" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-coral/10 blur-3xl dark:bg-coral/5" />

      {/* Main Container */}
      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Top Header Strip */}
        <header className="mb-10 flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/75 px-5 py-3.5 shadow-xs backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-slate-900 transition hover:opacity-90 dark:text-white"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sea text-xs font-black font-mono text-white shadow-xs">
              NX
            </span>
            <span className="tracking-tight">Narrivex</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-600 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Core Ingestion 99.98%</span>
            </div>

            <Link href="/dashboard">
              <Button size="sm" variant="default" className="gap-1.5 font-mono text-xs">
                <Terminal className="h-3.5 w-3.5" />
                <span>Open Terminal</span>
              </Button>
            </Link>
          </div>
        </header>

        {/* Center Hero Section */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Telemetry Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1.5 text-xs font-mono font-medium text-rose-600 dark:text-rose-400 mb-6">
            <Radio className="h-3.5 w-3.5 animate-pulse text-rose-500" />
            <span className="font-semibold">ERR_404_ROUTE_DESYNC</span>
            <span className="text-slate-400 dark:text-slate-600">|</span>
            <span className="text-slate-600 dark:text-slate-300">STREAM UNREACHABLE</span>
          </div>

          {/* Large 404 Headline */}
          <div className="relative inline-block select-none mb-3">
            <span className="font-display text-7xl sm:text-9xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-sea to-slate-800 dark:from-white dark:via-sea dark:to-slate-400 bg-clip-text text-transparent drop-shadow-sm">
              404
            </span>
            <span className="absolute -top-1 -right-3 sm:-top-2 sm:-right-4 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-rose-500 text-white font-mono text-xs font-bold ring-4 ring-white dark:ring-[#07090e] shadow-md animate-bounce">
              !
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Market Stream Disconnected
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            The requested narrative endpoint or telemetry route could not be resolved across our market index.
            The stream may have concluded, relocated, or expired.
          </p>

          {/* Primary Action Button Cluster */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link href="/">
              <Button size="lg" variant="default" className="shadow-md shadow-sea/20">
                <Home className="h-4 w-4" />
                <span>Return to Home</span>
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                <TrendingUp className="h-4 w-4 text-sea" />
                <span>Launch Terminal</span>
              </Button>
            </Link>

            <Button size="lg" variant="ghost" onClick={handleGoBack} className="text-slate-600 dark:text-slate-300">
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </Button>
          </div>
        </div>

        {/* Live Telemetry / Diagnostic Console */}
        <div className="mt-10 mx-auto max-w-2xl">
          <div className="rounded-2xl border border-slate-200/80 bg-slate-900 text-slate-100 p-4 sm:p-5 shadow-xl font-mono text-xs relative overflow-hidden backdrop-blur-md">
            {/* Console Header Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3.5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-slate-400 text-[11px] font-semibold">narrivex-kernel // route_resolver.log</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRunDiagnostic}
                  disabled={isDiagnosing}
                  className="flex items-center gap-1.5 rounded-md bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition disabled:opacity-50"
                  title="Test Edge Nodes"
                >
                  <RefreshCw className={`h-3 w-3 ${isDiagnosing ? 'animate-spin text-sea' : ''}`} />
                  <span>{isDiagnosing ? 'Scanning...' : diagnosticState === 'complete' ? 'Nodes OK' : 'Test Nodes'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyTrace}
                  className="flex items-center gap-1.5 rounded-md bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
                  title="Copy Trace ID"
                >
                  {copiedTrace ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Trace ID</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Diagnostic Log Lines */}
            <div className="space-y-1.5 text-slate-300 leading-relaxed">
              <div className="flex items-center gap-2 text-slate-500">
                <span>[00:00:00.012]</span>
                <span className="text-emerald-400">INFO</span>
                <span>Ingestion bus active across 12 edge clusters.</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span>[00:00:00.045]</span>
                <span className="text-rose-400">WARN</span>
                <span className="text-rose-300">Route resolution failure: HTTP 404 Not Found.</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-800/80 text-[11px]">
                <span>
                  TRACE_ID: <span className="text-slate-200 font-semibold">{traceId}</span>
                </span>
                <span className="text-sea">INGESTION_LATENCY: 0.84ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Search & Recommended Directory */}
        <div className="mt-12 mx-auto max-w-4xl">
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="h-4 w-4 text-sea" />
                <span>Explore Active Intelligence Feeds</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Jump directly into real-time tools, market charts, or trading documentation.
              </p>
            </div>

            {/* Search Input Filter */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Filter endpoints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200/90 bg-white/90 pl-9 pr-3 py-1.5 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:border-sea focus:outline-none focus:ring-1 focus:ring-sea dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-sea/50 hover:bg-white hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/50 dark:hover:border-sea/50 dark:hover:bg-slate-900/90 backdrop-blur-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-sea/10 group-hover:text-sea dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-sea/20 dark:group-hover:text-sea">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      {item.badge && (
                        <span className="rounded-full border border-sea/30 bg-sea/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-sea">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-sm font-bold text-slate-900 transition group-hover:text-sea dark:text-white dark:group-hover:text-sea">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-1 font-mono text-[11px] font-semibold text-sea">
                    <span>Navigate</span>
                    <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredLinks.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center dark:border-slate-800">
              <HelpCircle className="mx-auto h-8 w-8 text-slate-400" />
              <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                No matching endpoint found for &ldquo;{searchQuery}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs font-semibold text-sea hover:underline"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>

        {/* Support & System Help Footer Note */}
        <div className="mt-14 text-center">
          <p className="font-mono text-xs text-slate-500 dark:text-slate-500">
            Need technical assistance or custom API feeds?{' '}
            <a
              href="mailto:support@narrivex.tech"
              className="text-sea underline underline-offset-4 hover:text-sea-dark transition-colors"
            >
              Contact Narrivex Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
