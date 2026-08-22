'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Zap, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Plan {
  id: string;
  name: string;
  monthlyPrice: number | 'Custom';
  annualPrice: number | 'Custom';
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  ctaText: string;
  ctaHref: string;
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 29,
    annualPrice: 23,
    description: 'Essential real-time alerts and AI context for active individual traders.',
    features: [
      '7-Day Full Access Free Trial',
      'Real-Time Alert Feed (Crypto & FX)',
      'Instant AI Narrative Breakdown',
      'Up to 15 Active Watchlist Alerts',
      'Browser Push & Mobile Webhook',
      'Standard Ingestion Latency (<100ms)',
      'Community & Email Support',
    ],
    ctaText: 'Start 7-Day Free Trial',
    ctaHref: '/signup?plan=starter',
  },
  {
    id: 'professional',
    name: 'Professional',
    monthlyPrice: 99,
    annualPrice: 79,
    description: 'Institutional-grade speed, multi-asset coverage, and unlimited custom rules.',
    highlighted: true,
    badge: 'MOST POPULAR FOR PROS',
    features: [
      'Everything in Starter, plus:',
      'Full Multi-Asset Coverage (Crypto + Equities + FX + Gold)',
      'Ultra Low-Latency WebSocket Stream (<25ms)',
      'Unlimited Watchlists & Custom Alert Rules',
      'Dark Pool & Whale Liquidation Filters',
      'REST API & WebSocket SDK Access',
      'Cross-Market Macro Correlation Engine',
      'Priority 24/7 Desk Support',
    ],
    ctaText: 'Start Free Pro Trial',
    ctaHref: '/signup?plan=professional',
  },
  {
    id: 'enterprise',
    name: 'Enterprise / Funds',
    monthlyPrice: 'Custom',
    annualPrice: 'Custom',
    description: 'Dedicated low-latency node co-location, custom quant models, and guaranteed SLA.',
    features: [
      'Everything in Professional, plus:',
      'Dedicated Private Co-located Ingestion Node',
      'Custom LLM Fine-Tuning on Proprietary Indicators',
      'Sub-10ms Direct FIX & Binary WebSocket Protocol',
      'Unlimited Team Seats & Granular Audit Logging',
      '99.999% Guaranteed SLA Uptime',
      'Dedicated Quant Engineer & Account Manager',
    ],
    ctaText: 'Contact Institutional Sales',
    ctaHref: 'mailto:sales@narrivex.tech',
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  return (
    <section id="pricing" className="mb-24 scroll-mt-20">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-3 py-1 font-mono text-xs font-semibold text-sea">
          <Zap className="h-3.5 w-3.5" />
          Transparent Institutional Pricing
        </div>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-slate-900 dark:text-white">
          Invest in Asymmetric Market Conviction
        </h2>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          7-day full access trial on all tiers. No lock-in contracts. Cancel with one click anytime.
        </p>

        {/* Billing Switcher Toggle */}
        <div className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 p-1 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <button
            type="button"
            onClick={() => setIsAnnual(false)}
            className={`rounded-full px-4 py-1.5 font-mono text-xs font-semibold transition ${
              !isAnnual
                ? 'bg-slate-900 text-white shadow-xs dark:bg-slate-100 dark:text-slate-900'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            type="button"
            onClick={() => setIsAnnual(true)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-xs font-semibold transition ${
              isAnnual
                ? 'bg-sea text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <span>Annual Billing</span>
            <span className="rounded-full bg-emerald-400/20 px-2 py-0.2 text-[10px] font-bold text-emerald-600 dark:text-emerald-300">
              SAVE 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid gap-6 lg:grid-cols-3 items-stretch">
        {plans.map((plan) => {
          const isHighlighted = plan.highlighted;
          const displayPrice =
            typeof plan.monthlyPrice === 'number'
              ? isAnnual
                ? `$${plan.annualPrice}`
                : `$${plan.monthlyPrice}`
              : plan.monthlyPrice;

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-2xl p-7 transition-all duration-200 ${
                isHighlighted
                  ? 'border-2 border-sea bg-white shadow-xl ring-2 ring-sea/20 dark:bg-slate-900 dark:ring-sea/30'
                  : 'border border-slate-200/80 bg-white/80 shadow-xs dark:border-slate-800 dark:bg-slate-900/60'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sea px-3 py-0.5 font-mono text-[10px] font-bold tracking-wider text-white shadow-sm">
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  {plan.name}
                </h3>

                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 min-h-[32px]">
                  {plan.description}
                </p>

                <div className="mt-5 border-y border-slate-100 py-4 dark:border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-4xl font-bold text-slate-900 dark:text-white">
                      {displayPrice}
                    </span>
                    {typeof plan.monthlyPrice === 'number' && (
                      <span className="font-mono text-xs text-slate-500">
                        / month {isAnnual ? '(annual)' : ''}
                      </span>
                    )}
                  </div>
                  {isAnnual && typeof plan.monthlyPrice === 'number' && (
                    <span className="text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 block mt-1">
                      ${(plan.annualPrice as number) * 12}/yr • Save ${(plan.monthlyPrice - (plan.annualPrice as number)) * 12}/yr
                    </span>
                  )}
                </div>

                {/* Features List */}
                <div className="mt-6 space-y-2.5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Included Capabilities
                  </span>
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="h-3.5 w-3.5 shrink-0 text-sea mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <Link href={plan.ctaHref} className="w-full">
                  <Button
                    size="lg"
                    className={`w-full font-bold ${
                      isHighlighted
                        ? 'bg-sea text-white hover:bg-sea/90'
                        : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700'
                    }`}
                  >
                    {plan.ctaText}
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Compliance Disclaimers */}
      <div className="mt-10 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-5 text-xs text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-300">
        <div className="flex items-center gap-2 font-bold mb-1.5">
          <Shield className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <span>Informational Analytics & Compliance Disclosures</span>
        </div>
        <p className="leading-relaxed font-sans text-xs">
          Narrivex operates strictly as a high-frequency market intelligence and data analytics software provider. We do not provide financial, investment, or brokerage advice. Market participants must assess risks independently.
        </p>
        <div className="mt-2.5 flex flex-wrap gap-4 font-mono text-[11px] font-semibold text-sea dark:text-emerald-400">
          <Link href="/financial-disclaimer" className="hover:underline">
            Financial Disclaimer →
          </Link>
          <Link href="/risk-disclosure" className="hover:underline">
            Risk Disclosure →
          </Link>
          <Link href="/subscription-policy" className="hover:underline">
            Subscription & Refund Policy →
          </Link>
        </div>
      </div>
    </section>
  );
}
