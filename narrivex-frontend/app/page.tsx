import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  ChevronRight,
  Sparkles,
  ArrowRight,
  BarChart3,
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
  '⚡ Crypto Prop Traders',
  '📈 Equities & Options Analysts',
  '💱 Interbank Forex Desks',
  '🤖 Quantitative Research Teams',
  '🏛️ Macro Fund Managers',
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
    <div className="landing-page min-h-screen bg-grain transition-colors duration-500">
      <Script id="ld-json-home" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Top Global Live Ticker Bar */}
      <LiveMarketTicker />

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="mb-14 flex items-center justify-between rounded-full border border-black/10 bg-white/80 px-6 py-3 shadow-xs backdrop-blur-md dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-display text-2xl font-bold tracking-tight flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-sea animate-pulse" />
              <span>Narrivex</span>
            </Link>
            <div className="hidden md:flex items-center gap-5 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <Link href="#product-preview" className="hover:text-sea transition">
                Platform Demo
              </Link>
              <Link href="#matrix" className="hover:text-sea transition">
                Asset Matrix
              </Link>
              <Link href="#pricing" className="hover:text-sea transition">
                Pricing
              </Link>
              <Link href="/insights" className="hover:text-sea transition">
                Market Insights
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={statusUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              All Systems 99.99%
            </a>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="font-semibold">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-sea text-white hover:bg-sea/90 shadow-md font-bold">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="mb-24 grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sea shadow-xs">
              <Sparkles className="h-4 w-4" />
              <span>AI Market Intelligence • Sub-50ms Reaction Speed</span>
            </div>

            <h1 className="font-display text-4xl font-bold leading-[1.08] sm:text-6xl md:text-7xl text-slate-900 dark:text-white">
              Real-time trading alerts with <span className="text-transparent bg-clip-text bg-gradient-to-r from-sea to-emerald-500">instant AI reasoning</span>.
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Stop guessing why prices move. Narrivex decodes order book depth, dark pool prints, and liquidation cascades across Crypto, Equities, and Forex into plain-English narratives in <strong>under 50ms</strong>.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-sea text-white hover:bg-sea/90 shadow-xl shadow-sea/20 font-bold px-7">
                  Start 7-Day Free Trial
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#product-preview">
                <Button variant="outline" size="lg" className="font-semibold">
                  Watch Live Demo
                </Button>
              </Link>
            </div>

            {/* Target Audience Badges */}
            <div className="mt-10 pt-6 border-t border-black/10 dark:border-white/10">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                Engineered for High-Conviction Operators
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                {trustSignals.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white/80 px-3 py-1.5 text-slate-800 dark:bg-slate-800/80 dark:text-slate-200 border border-black/10 dark:border-white/10 shadow-xs"
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
        <ArchitecturePipeline />

        {/* Product Preview Image & Interactive Telemetry */}
        <section
          id="product-preview"
          className="mb-24 scroll-mt-28 rounded-3xl border border-black/10 bg-white/60 px-6 py-12 backdrop-blur sm:px-10 dark:border-white/10 dark:bg-slate-900/50"
        >
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sea">
              <BarChart3 className="h-3.5 w-3.5" />
              Live Workspace Preview
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-slate-900 dark:text-white">
              Institutional Clarity at Your Fingertips
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Real-time candlestick charts paired side-by-side with continuous AI order flow breakdowns and actionable alert triggers.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white/80 shadow-2xl dark:border-white/10 dark:bg-slate-900/80">
            <Image
              src="/dashboard_image.png"
              alt="Narrivex dashboard preview showing AI market narratives, real-time trading alerts, and watchlist context"
              width={1200}
              height={630}
              className="h-auto w-full object-cover"
              unoptimized
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/60" />
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-white/20 bg-slate-900/85 px-4 py-3 text-left backdrop-blur shadow-lg">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Latency P99</p>
                <p className="mt-1 font-mono text-base font-bold text-emerald-400">&lt;25ms global push</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-slate-900/85 px-4 py-3 text-left backdrop-blur shadow-lg">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Narratives</p>
                <p className="mt-1 font-mono text-base font-bold text-sea">100% Grounded Context</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-slate-900/85 px-4 py-3 text-left backdrop-blur shadow-lg">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Multi-Asset</p>
                <p className="mt-1 font-mono text-base font-bold text-coral">Crypto • Equities • Forex</p>
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
        <section className="mb-20 rounded-3xl border border-sea/30 bg-gradient-to-br from-sea/15 via-slate-900/90 to-slate-950 p-8 text-center text-white shadow-2xl backdrop-blur sm:p-14">
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Upgrade Your Market Reaction Speed Today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
            Join professional quant researchers, day traders, and institutional analysts who make high-conviction decisions with Narrivex.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-sea text-white hover:bg-sea/90 shadow-xl font-bold px-8">
                Start 7-Day Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="mailto:sales@narrivex.tech">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Talk to Institutional Sales
              </Button>
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            No credit card required for instant sandbox trial • Cancel anytime with one click
          </p>
        </section>

        {/* Comprehensive SEO & Resource Navigation */}
        <section className="mb-16 rounded-2xl border border-black/10 bg-white/60 p-6 backdrop-blur dark:border-white/10 dark:bg-slate-900/60">
          <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            Explore Narrivex Platform Resources
          </h3>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Access documentation, market research articles, policy disclosures, and operational telemetry.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5 text-xs font-semibold text-sea">
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
              Subscription & Refund Policy
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
