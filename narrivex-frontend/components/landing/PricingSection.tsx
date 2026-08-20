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
    description: 'Dedicated low-latency node co-location, custom quant models, and SLA.',
    features: [
      'Everything in Professional, plus:',
      'Dedicated Private Co-located Ingestion Node',
      'Custom LLM Fine-Tuning on Proprietary Indicators',
      'Sub-10ms Direct FIX & WebSocket Protocol Feeds',
      'Unlimited Team Seats & Audit Logging',
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
    <section id="pricing" className="mb-20 rounded-3xl bg-gradient-to-br from-sea/5 via-slate-900/5 to-coral/5 px-6 py-16 sm:px-10 dark:from-slate-900/40 dark:to-slate-950/60 border border-black/10 dark:border-white/10">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sea">
          <Zap className="h-3.5 w-3.5" />
          Transparent Institutional Pricing
        </div>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-slate-900 dark:text-white">
          Invest in Asymmetric Market Conviction
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          7-day full access trial on all plans. No lock-in contracts. Cancel anytime.
        </p>

        {/* Billing Switcher Toggle */}
        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/80 p-1.5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
          <button
            type="button"
            onClick={() => setIsAnnual(false)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              !isAnnual
                ? 'bg-slate-900 text-white shadow-xs dark:bg-white dark:text-slate-900'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            type="button"
            onClick={() => setIsAnnual(true)}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
              isAnnual
                ? 'bg-sea text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <span>Annual Billing</span>
            <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-300">
              SAVE 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid gap-8 lg:grid-cols-3 items-stretch">
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
              className={`relative flex flex-col justify-between rounded-2xl p-7 transition-all duration-300 ${
                isHighlighted
                  ? 'border-2 border-sea bg-white shadow-2xl ring-4 ring-sea/20 dark:bg-slate-900 dark:ring-sea/30 lg:-translate-y-2'
                  : 'border border-black/10 bg-white/70 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/60 hover:border-black/20 dark:hover:border-white/20'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-sea to-emerald-500 px-3.5 py-1 text-[11px] font-bold tracking-wider text-white shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                    {plan.name}
                  </h3>
                </div>

                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 min-h-[36px]">
                  {plan.description}
                </p>

                <div className="mt-6 border-y border-black/5 py-4 dark:border-white/5">
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-4xl font-bold text-slate-900 dark:text-white">
                      {displayPrice}
                    </span>
                    {typeof plan.monthlyPrice === 'number' && (
                      <span className="text-xs text-slate-500">
                        / month {isAnnual ? '(billed annually)' : ''}
                      </span>
                    )}
                  </div>
                  {isAnnual && typeof plan.monthlyPrice === 'number' && (
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      Billed as ${(plan.annualPrice as number) * 12}/year • Save ${(plan.monthlyPrice - (plan.annualPrice as number)) * 12}/yr
                    </span>
                  )}
                </div>

                {/* Features List */}
                <div className="mt-6 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Included Capabilities
                  </span>
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200">
                      <Check className="h-4 w-4 shrink-0 text-sea mt-0.5" />
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
                        ? 'bg-sea text-white hover:bg-sea/90 shadow-md'
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

      {/* Legal and Compliance Disclaimers */}
      <div className="mt-12 rounded-2xl border border-amber-200/80 bg-amber-50/70 p-5 text-xs text-amber-900 backdrop-blur dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200">
        <div className="flex items-center gap-2 font-bold mb-2">
          <Shield className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <span>Regulatory Transparency & Compliance Disclosures</span>
        </div>
        <p className="leading-relaxed">
          Narrivex operates purely as a high-frequency informational analytics engine and market intelligence software provider. We do not provide financial, investment, or brokerage advice, nor do we execute trades on behalf of users. Market participants must assess risks independently.
        </p>
        <div className="mt-3 flex flex-wrap gap-4 font-semibold text-sea dark:text-emerald-400">
          <Link href="/financial-disclaimer" className="hover:underline">
            Full Financial Disclaimer →
          </Link>
          <Link href="/risk-disclosure" className="hover:underline">
            Risk Disclosure Terms →
          </Link>
          <Link href="/subscription-policy" className="hover:underline">
            Subscription & Refund Policy →
          </Link>
        </div>
      </div>
    </section>
  );
}
