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
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LiveMarketTicker } from '@/components/landing/LiveMarketTicker';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
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
  title: 'Narrivex | Real-Time Market Intelligence & Order Flow Synthesizer',
  description:
    'Narrivex decodes order book depth, dark pool prints, and liquidation cascades across Crypto, Equities, and Forex into actionable narratives in under 50ms.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Narrivex | Real-Time Market Intelligence & Alerts',
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
    title: 'Narrivex | Real-Time Market Intelligence & Alerts',
    description:
      'Institutional-grade market intelligence for traders and analysts across crypto, equities, and forex.',
    creator: '@narrivex',
    site: '@narrivex',
    images: ['/twitter-image'],
  },
};

const trustSignals = [
  'Crypto Prop Desks',
  'Equities & Options Analysts',
  'Interbank FX Desks',
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
          'Narrivex is a real-time market intelligence platform delivering order flow synthesis and actionable alerts across crypto, equities, and forex.',
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#080c14] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Script id="ld-json-home" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Top Global Live Ticker Bar */}
      <LiveMarketTicker />

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
        {/* Navigation Bar */}
        <LandingNavbar statusUrl={statusUrl} />

        {/* Hero Section */}
        <section className="mb-16 sm:mb-24 grid gap-8 lg:gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-3 py-1 font-mono text-[11px] sm:text-xs font-semibold text-sea">
              <Terminal className="h-3.5 w-3.5 shrink-0" />
              <span>Sub-50ms Ingestion • Order Flow Synthesizer</span>
            </div>

            <h1 className="font-display text-3xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight">
              Real-time trading intelligence with <span className="text-sea dark:text-sky-400">grounded market context</span>.
            </h1>

            <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Stop guessing why prices move. Narrivex decodes order book depth, dark pool prints, and liquidation cascades across Crypto, Equities, and Forex into clear, actionable narratives in <strong>under 50ms</strong>.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto font-bold px-7 bg-sea hover:bg-sea/90 text-white shadow-md">
                  Start 7-Day Free Trial
                  <ChevronRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#product-preview" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto dark:border-white/[0.1] dark:hover:bg-white/[0.05]">
                  Explore Live Workspace
                </Button>
              </Link>
            </div>

            {/* Target Audience Badges */}
            <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-slate-200/80 dark:border-white/[0.08]">
              <p className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-sea" />
                Engineered for High-Conviction Operators
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono">
                {trustSignals.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-slate-200/80 bg-white/80 px-2 sm:px-2.5 py-1 text-slate-700 dark:border-white/[0.08] dark:bg-[#0d1424] dark:text-slate-300 shadow-2xs"
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

        {/* 4-Layer Architecture Breakdown */}
        <div id="pipeline">
          <ArchitecturePipeline />
        </div>

        {/* Product Preview Image & Interactive Telemetry */}
        <section
          id="product-preview"
          className="mb-16 sm:mb-24 scroll-mt-24 rounded-3xl border border-slate-200/80 bg-white/80 px-4 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-12 dark:border-white/[0.08] dark:bg-[#0d131f]/70"
        >
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-3 py-1 font-mono text-xs font-semibold text-sea">
              <BarChart3 className="h-3.5 w-3.5" />
              Live Workspace Preview
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold md:text-5xl text-slate-900 dark:text-white">
              Institutional Clarity at Your Fingertips
            </h2>
            <p className="mt-3 text-xs sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Real-time candlestick charts paired side-by-side with continuous order flow breakdowns and actionable alert triggers.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-[#060910] shadow-2xl dark:border-white/[0.08]">
            <Image
              src="/dashboard_image.png"
              alt="Narrivex dashboard preview showing real-time trading alerts and watchlist context"
              width={1200}
              height={630}
              className="h-auto w-full object-cover"
              unoptimized
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060910] via-transparent to-transparent" />
            <div className="pointer-events-none absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-3">
              <div className="rounded-xl border border-white/[0.08] bg-[#0c121e]/90 px-3 py-2 sm:px-4 sm:py-3 text-left backdrop-blur shadow-lg font-mono">
                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400">Latency P99</p>
                <p className="mt-0.5 text-xs sm:text-sm font-bold text-emerald-400">&lt;25ms global stream</p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-[#0c121e]/90 px-3 py-2 sm:px-4 sm:py-3 text-left backdrop-blur shadow-lg font-mono">
                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400">Narrative Grounding</p>
                <p className="mt-0.5 text-xs sm:text-sm font-bold text-sea">Grounded Telemetry</p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-[#0c121e]/90 px-3 py-2 sm:px-4 sm:py-3 text-left backdrop-blur shadow-lg font-mono">
                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400">Coverage Scope</p>
                <p className="mt-0.5 text-xs sm:text-sm font-bold text-coral">Crypto • Equities • Forex</p>
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
        <section className="mb-16 sm:mb-20 rounded-3xl border border-white/[0.08] bg-[#090d16] p-6 text-center text-white shadow-2xl sm:p-12 lg:p-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sea/40 bg-sea/10 px-3 py-1 font-mono text-xs font-semibold text-sea mb-4">
            <Layers className="h-3.5 w-3.5" />
            7-Day Risk-Free Sandbox Access
          </div>
          <h2 className="font-display text-2xl font-bold sm:text-4xl md:text-5xl text-white">
            Upgrade Your Market Reaction Speed Today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-xs sm:text-base text-slate-300 leading-relaxed">
            Join quantitative researchers, day traders, and institutional desks who execute high-conviction decisions with Narrivex.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto font-bold px-8 bg-sea hover:bg-sea/90 text-white shadow-md">
                Start 7-Day Free Trial
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
            <a href="mailto:sales@narrivex.tech" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto dark:border-white/[0.1] dark:hover:bg-white/[0.05]">
                Contact Institutional Sales
              </Button>
            </a>
          </div>
          <p className="mt-4 font-mono text-[10px] sm:text-xs text-slate-400">
            Instant sandbox activation • No credit card required • Cancel anytime with one click
          </p>
        </section>

        {/* Comprehensive SEO & Resource Navigation */}
        <section className="mb-12 sm:mb-16 rounded-2xl border border-slate-200/80 bg-white/60 p-4 sm:p-6 backdrop-blur dark:border-white/[0.08] dark:bg-[#0d131f]/60">
          <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            Explore Narrivex Platform Resources
          </h3>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
            Access documentation, market research articles, policy disclosures, and operational telemetry.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 sm:gap-x-5 gap-y-2 font-mono text-xs text-sea">
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
            <Link href="/status" className="hover:underline">
              Public Status Page
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

