import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  ChevronRight,
  ArrowRight,
  BarChart3,
  Terminal,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LiveMarketTicker } from '@/components/landing/LiveMarketTicker';
import { HeroTerminalPreview } from '@/components/landing/HeroTerminalPreview';
import { GlobalInfrastructureMap } from '@/components/landing/GlobalInfrastructureMap';
import { ArchitecturePipeline } from '@/components/landing/ArchitecturePipeline';
import { CoverageMatrix } from '@/components/landing/CoverageMatrix';
import { InstitutionalComparison } from '@/components/landing/InstitutionalComparison';
import { RoiCalculator } from '@/components/landing/RoiCalculator';
import { TestimonialsWall } from '@/components/landing/TestimonialsWall';
import { PricingSection } from '@/components/landing/PricingSection';
import { FaqAccordion } from '@/components/landing/FaqAccordion';

const siteUrl = 'https://narrivex.tech';
const xUrl = 'https://x.com/narrivex';
const statusUrl = 'https://status.narrivex.tech';

export const metadata: Metadata = {
  title: 'Real-Time AI Trading Alerts for Crypto, Equities, and Forex',
  description:
    'Narrivex gives traders real-time AI trading alerts, market narratives, and cross-asset intelligence across crypto, equities, and forex with a 7-day free trial.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Narrivex | AI Market Narratives and Alerts',
    description:
      'Cut research time and detect market-moving patterns with real-time narratives and actionable alerting.',
    url: siteUrl,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Narrivex AI market intelligence dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Narrivex | AI Market Narratives and Alerts',
    description:
      'AI-powered market intelligence for traders and analysts across crypto, equities, and forex.',
    creator: '@narrivex',
    site: '@narrivex',
    images: ['/twitter-image'],
  },
};

const trustSignals = [
  'Crypto Prop Desks',
  'Equities & Options Analysts',
  'Interbank Forex Desks',
  'Quantitative Research Teams',
  'Macro Fund Managers',
];

export default function LandingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Narrivex',
        url: siteUrl,
        sameAs: [xUrl],
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Narrivex',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        url: siteUrl,
        description:
          'Narrivex is an AI market intelligence platform with real-time narratives and alerts across crypto, equities, and forex.',
        offers: [
          {
            '@type': 'Offer',
            name: 'Starter',
            price: '29',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            name: 'Professional',
            price: '99',
            priceCurrency: 'USD',
          },
        ],
        publisher: {
          '@type': 'Organization',
          name: 'Narrivex',
          url: siteUrl,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Script id="ld-json-home" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Top Global Live Ticker Bar */}
      <LiveMarketTicker />

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="mb-14 flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-3 shadow-xs backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
          <div className="flex items-center gap-7">
            <Link href="/" className="font-display text-xl font-bold tracking-tight flex items-center gap-2 text-slate-900 dark:text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-sea text-white font-mono text-xs font-black">
                NX
              </span>
              <span>Narrivex</span>
            </Link>
            <div className="hidden md:flex items-center gap-5 text-xs font-semibold text-slate-600 dark:text-slate-300 font-mono">
              <Link href="#product-preview" className="hover:text-sea transition-colors">
                Platform Demo
              </Link>
              <Link href="#matrix" className="hover:text-sea transition-colors">
                Asset Matrix
              </Link>
              <Link href="#pipeline" className="hover:text-sea transition-colors">
                Architecture
              </Link>
              <Link href="#pricing" className="hover:text-sea transition-colors">
                Pricing
              </Link>
              <Link href="/insights" className="hover:text-sea transition-colors">
                Insights
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={statusUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              All Feeds 99.99%
            </a>
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="font-bold">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="mb-24 grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-3.5 py-1 font-mono text-xs font-semibold text-sea">
              <Terminal className="h-3.5 w-3.5" />
              <span>Sub-50ms Ingestion • Grounded NLP Synthesis</span>
            </div>

            <h1 className="font-display text-4xl font-bold leading-[1.08] sm:text-6xl text-slate-900 dark:text-white">
              Real-time trading alerts with <span className="text-sea dark:text-teal-400">instant AI reasoning</span>.
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Stop guessing why prices move. Narrivex decodes order book depth, dark pool prints, and liquidation cascades across Crypto, Equities, and Forex into deterministic narratives in <strong>under 50ms</strong>.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link href="/signup">
                <Button size="lg" className="font-bold px-6">
                  Start 7-Day Free Trial
                  <ChevronRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#product-preview">
                <Button variant="outline" size="lg">
                  Watch Workspace Demo
                </Button>
              </Link>
            </div>

            {/* Target Audience Badges */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Engineered for High-Conviction Operators
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {trustSignals.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-slate-200/80 bg-white/80 px-2.5 py-1 text-slate-700 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 shadow-2xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Interactive AI Terminal */}
          <div className="lg:col-span-6">
            <HeroTerminalPreview />
          </div>
        </section>

        {/* Global Low Latency Infrastructure Mesh */}
        <GlobalInfrastructureMap />

        {/* Cross-Asset Coverage Matrix */}
        <div id="matrix">
          <CoverageMatrix />
        </div>

        {/* 4-Layer AI Architecture Breakdown */}
        <div id="pipeline">
          <ArchitecturePipeline />
        </div>

        {/* Product Preview Image & Interactive Telemetry */}
        <section
          id="product-preview"
          className="mb-24 scroll-mt-24 rounded-3xl border border-slate-200/80 bg-white/80 px-6 py-12 shadow-sm backdrop-blur sm:px-10 dark:border-slate-800/80 dark:bg-slate-900/60"
        >
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-3 py-1 font-mono text-xs font-semibold text-sea">
              <BarChart3 className="h-3.5 w-3.5" />
              Live Workspace Preview
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-slate-900 dark:text-white">
              Institutional Clarity at Your Fingertips
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Real-time candlestick charts paired side-by-side with continuous AI order flow breakdowns and actionable alert triggers.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-950 shadow-2xl dark:border-slate-800">
            <Image
              src="/dashboard_image.png"
              alt="Narrivex dashboard preview showing AI market narratives, real-time trading alerts, and watchlist context"
              width={1200}
              height={630}
              className="h-auto w-full object-cover"
              unoptimized
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-left backdrop-blur shadow-lg font-mono">
                <p className="text-[10px] uppercase tracking-wider text-slate-400">Latency P99</p>
                <p className="mt-0.5 text-sm font-bold text-emerald-400">&lt;25ms global stream</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-left backdrop-blur shadow-lg font-mono">
                <p className="text-[10px] uppercase tracking-wider text-slate-400">Narrative Grounding</p>
                <p className="mt-0.5 text-sm font-bold text-sea">Deterministic Telemetry</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-left backdrop-blur shadow-lg font-mono">
                <p className="text-[10px] uppercase tracking-wider text-slate-400">Coverage Scope</p>
                <p className="mt-0.5 text-sm font-bold text-coral">Crypto • Equities • Forex</p>
              </div>
            </div>
          </div>
        </section>

        {/* ROI and Alpha Calculator */}
        <RoiCalculator />

        {/* Institutional Comparison Table */}
        <InstitutionalComparison />

        {/* Testimonials Wall */}
        <TestimonialsWall />

        {/* Pricing Section with Annual Toggle */}
        <PricingSection />

        {/* Interactive FAQ with Search & Accordions */}
        <FaqAccordion />

        {/* Bottom CTA Banner */}
        <section className="mb-20 rounded-3xl border border-slate-800 bg-slate-950 p-8 text-center text-white shadow-2xl sm:p-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sea/40 bg-sea/10 px-3 py-1 font-mono text-xs font-semibold text-sea mb-4">
            <Layers className="h-3.5 w-3.5" />
            7-Day Risk-Free Sandbox Access
          </div>
          <h2 className="font-display text-3xl font-bold md:text-5xl text-white">
            Upgrade Your Market Reaction Speed Today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
            Join quantitative researchers, day traders, and institutional desks who execute high-conviction decisions with Narrivex.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link href="/signup">
              <Button size="lg" className="font-bold px-8">
                Start 7-Day Free Trial
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
            <a href="mailto:sales@narrivex.tech">
              <Button size="lg" variant="outline">
                Contact Institutional Sales
              </Button>
            </a>
          </div>
          <p className="mt-4 font-mono text-xs text-slate-400">
            Instant sandbox activation • No credit card required • Cancel anytime with one click
          </p>
        </section>

        {/* Comprehensive SEO & Resource Navigation */}
        <section className="mb-16 rounded-2xl border border-slate-200/80 bg-white/60 p-6 backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/60">
          <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
            Explore Narrivex Platform Resources
          </h3>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
            Access documentation, market research articles, policy disclosures, and operational telemetry.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5 font-mono text-xs text-sea">
            <Link href="/insights" className="hover:underline">
              Market Insights & Reports
            </Link>
            <Link href="/changelog" className="hover:underline">
              Engine Changelog
            </Link>
            <Link href="/security-statement" className="hover:underline">
              Security & Infrastructure
            </Link>
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/financial-disclaimer" className="hover:underline">
              Financial Disclaimer
            </Link>
            <Link href="/risk-disclosure" className="hover:underline">
              Risk Disclosure
            </Link>
            <Link href="/subscription-policy" className="hover:underline">
              Subscription Policy
            </Link>
            <Link href="/api-terms" className="hover:underline">
              API License Terms
            </Link>
            <a href={xUrl} target="_blank" rel="noreferrer" className="hover:underline">
              X (Twitter): @narrivex
            </a>
            <a href={statusUrl} target="_blank" rel="noreferrer" className="hover:underline">
              Public Status Page
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
