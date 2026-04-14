import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import {
  ChevronRight,
  Sparkles,
  Radar,
  ShieldCheck,
  Zap,
  TrendingUp,
  AlertCircle,
  Check,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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

const trustSignals = ['Crypto Traders', 'Equities Analysts', 'Forex Desks', 'Quant Teams', 'Independent Researchers'];

const comparisonRows = [
  {
    label: 'Signal context',
    narrivex: 'AI narrative explains why the move is happening',
    generic: 'Raw alert with no interpretable reasoning',
  },
  {
    label: 'Cross-asset view',
    narrivex: 'Crypto, equities, and forex in one stream',
    generic: 'Single market focus with fragmented tooling',
  },
  {
    label: 'Reaction speed',
    narrivex: 'Low-latency delivery via real-time feeds',
    generic: 'Batch refresh intervals and delayed notifications',
  },
  {
    label: 'Workflow fit',
    narrivex: 'Dashboard plus API integrations for teams',
    generic: 'Limited customization and manual handoffs',
  },
];

const faqData = [
  {
    question: 'What does Narrivex do?',
    answer:
      'Narrivex converts fast-moving market data into AI-generated narratives and alert signals so you can identify context and opportunities faster.',
  },
  {
    question: 'Which assets can I track?',
    answer: 'You can monitor crypto, equities, and forex in one dashboard with real-time updates and configurable alerts.',
  },
  {
    question: 'Is Narrivex suitable for teams?',
    answer: 'Yes. Professional and enterprise plans support collaboration, API access, and custom workflow integrations.',
  },
  {
    question: 'Does Narrivex provide financial advice?',
    answer: 'No. Narrivex provides informational analytics and AI summaries, not investment advice.',
  },
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
      {
        '@type': 'FAQPage',
        mainEntity: faqData.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="landing-page min-h-screen bg-grain transition-colors duration-500">
      <Script id="ld-json-home" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Navigation */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        <nav className="mb-16 flex items-center justify-between rounded-full border border-black/10 bg-white/70 px-6 py-3 backdrop-blur">
          <div className="font-display text-2xl font-bold tracking-tight">Narrivex</div>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Start Free</Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="mb-20 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            {/* <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-coral/30 bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
              <Sparkles className="h-4 w-4" />
              AI-Powered Market Intelligence
            </p> */}
            <h1 className="font-display text-5xl font-bold leading-tight md:text-7xl">
              See the market story before everyone else.
            </h1>
            <p className="mt-6 max-w-xl text-xl text-slate-700 dark:text-slate-300">
              Narrivex transforms noisy market data into clear, actionable narratives and alerts. Perfect for traders and analysts who need real-time insights without the noise.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/signup">
                <Button size="lg">
                  Start Free
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#product-preview">
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </Link>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Demo opens the live product preview section below.</p>
          </div>

          <div className="grid gap-4">
            <Feature icon={<Radar className="h-5 w-5" />} title="Real-time feeds" text="Low-latency WebSocket updates across your watchlist." />
            <Feature icon={<Sparkles className="h-5 w-5" />} title="AI narratives" text="Human-readable explanations generated from indicators." />
            <Feature icon={<ShieldCheck className="h-5 w-5" />} title="Secure & reliable" text="OAuth + JWT-backed API with enterprise-grade security." />
          </div>
        </section>

        {/* Core Features Section */}
        <section className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold md:text-5xl">Real-Time AI Trading Alerts for Crypto and Equities</h2>
            <p className="mt-4 text-lg text-slate-600">Everything you need to make informed decisions faster</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-coral" />}
              title="Lightning-fast alerts"
              description="Get notified instantly when market conditions match your criteria. Never miss an opportunity."
            />
            <FeatureCard
              icon={<TrendingUp className="h-6 w-6 text-sea" />}
              title="Narrative generation"
              description="AI analyzes price action, volume, and sentiment to create coherent market narratives."
            />
            <FeatureCard
              icon={<AlertCircle className="h-6 w-6 text-coral" />}
              title="Smart filtering"
              description="Configure alerts with advanced filters to focus on signals that matter to your strategy."
            />
            <FeatureCard
              icon={<Radar className="h-6 w-6 text-sea" />}
              title="Multi-asset coverage"
              description="Monitor crypto, equities, and forex. All in one unified dashboard."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-6 w-6 text-coral" />}
              title="Institutional security"
              description="Enterprise-grade encryption, OAuth auth, and compliance-ready infrastructure."
            />
            <FeatureCard
              icon={<Sparkles className="h-6 w-6 text-sea" />}
              title="API-first design"
              description="Build custom dashboards and integrations with our powerful REST API."
            />
          </div>
        </section>

        {/* Product Preview */}
        <section
          id="product-preview"
          className="mb-20 scroll-mt-28 rounded-3xl border border-black/10 bg-white/60 px-6 py-10 backdrop-blur sm:px-8 dark:border-white/10 dark:bg-slate-900/50"
        >
          <div className="mb-8 text-center">
            <h2 className="font-display text-4xl font-bold md:text-5xl">See the Narrivex Dashboard Before You Sign Up</h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">Preview how real-time narratives, alerts, and watchlists appear in a live trading workflow.</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white/80 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
            <Image
              src="/dashboard_image.png"
              alt="Narrivex dashboard preview showing AI market narratives, real-time trading alerts, and watchlist context"
              width={1200}
              height={630}
              className="h-auto w-full object-cover"
              unoptimized
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/40" />
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-white/20 bg-slate-900/65 px-3 py-2 text-left backdrop-blur">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-300">Latency</p>
                <p className="mt-1 text-sm font-semibold text-white">50ms avg feed updates</p>
              </div>
              <div className="rounded-lg border border-white/20 bg-slate-900/65 px-3 py-2 text-left backdrop-blur">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-300">Narratives</p>
                <p className="mt-1 text-sm font-semibold text-white">Context + trigger summary</p>
              </div>
              <div className="rounded-lg border border-white/20 bg-slate-900/65 px-3 py-2 text-left backdrop-blur">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-300">Coverage</p>
                <p className="mt-1 text-sm font-semibold text-white">Crypto, equities, forex</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Strip */}
        <section className="mb-20 rounded-2xl border border-black/10 bg-white/60 px-6 py-5 backdrop-blur">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Used by active market operators</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {trustSignals.map((item) => (
              <span key={item} className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700">
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-20 rounded-3xl border border-black/10 bg-white/50 px-8 py-16 backdrop-blur dark:border-white/10 dark:bg-slate-900/40">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl font-bold">Why traders choose Narrivex</h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Stop drowning in data. Start making informed trades.</p>

              <div className="mt-10 space-y-4">
                {['Catch trends in real-time', 'Reduce research time by 80%', 'Eliminate information overload', 'Make data-driven decisions', 'Scale your trading strategy'].map(
                  (benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-sea flex-shrink-0" />
                      <span className="text-lg font-medium">{benefit}</span>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-sea/10 to-coral/10 p-8 dark:from-sea/20 dark:to-coral/20">
              <div className="space-y-6">
                <div className="rounded-lg bg-white/60 p-4 dark:bg-slate-900/60">
                  <div className="flex items-center gap-2 font-semibold">
                    <Zap className="h-4 w-4 text-coral" />
                    Real-time stream delivery
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Built for low-latency routing across market feeds</p>
                </div>
                <div className="rounded-lg bg-white/60 p-4 dark:bg-slate-900/60">
                  <div className="flex items-center gap-2 font-semibold">
                    <TrendingUp className="h-4 w-4 text-sea" />
                    Team-ready workflows
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Shared watchlists, alert rules, and API integrations</p>
                </div>
                <div className="rounded-lg bg-white/60 p-4 dark:bg-slate-900/60">
                  <div className="flex items-center gap-2 font-semibold">
                    <AlertCircle className="h-4 w-4 text-coral" />
                    Operational transparency
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Reliability details and incident history are published on our public status page.
                  </p>
                  <a
                    href={statusUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex text-sm font-semibold text-sea hover:underline"
                  >
                    View system status
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Validation Section */}
        <section className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold md:text-5xl">Built for transparent evaluation</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Validate platform behavior with a live preview, status visibility, and documented policies.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-slate-900/60">
              <h3 className="font-display text-2xl font-semibold">Watch the product first</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300">Use the live dashboard preview to assess signal context, UI clarity, and workflow fit before signing up.</p>
            </Card>
            <Card className="border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-slate-900/60">
              <h3 className="font-display text-2xl font-semibold">Track platform health</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300">Monitor incidents and uptime events directly via the public status page for operational transparency.</p>
              <a href={statusUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex font-semibold text-sea hover:underline">
                Open status page
              </a>
            </Card>
            <Card className="border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-slate-900/60">
              <h3 className="font-display text-2xl font-semibold">Review legal disclosures</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300">Before subscribing, review the risk and financial disclaimers to evaluate fit for your jurisdiction and strategy.</p>
            </Card>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold md:text-5xl">Built for real trading workflows</h2>
            <p className="mt-4 text-lg text-slate-600">From solo analysts to desks, Narrivex adapts to how you work.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-black/10 bg-white/70 p-6 backdrop-blur">
              <h3 className="font-display text-2xl font-semibold">Day traders</h3>
              <p className="mt-3 text-slate-600">
                Detect short-term momentum shifts, validate entries with narrative context, and react faster with signal-first alerts.
              </p>
            </Card>
            <Card className="border-black/10 bg-white/70 p-6 backdrop-blur">
              <h3 className="font-display text-2xl font-semibold">Research analysts</h3>
              <p className="mt-3 text-slate-600">
                Compress hours of chart review into concise summaries and keep cross-asset coverage centralized in one stream.
              </p>
            </Card>
            <Card className="border-black/10 bg-white/70 p-6 backdrop-blur">
              <h3 className="font-display text-2xl font-semibold">Trading teams</h3>
              <p className="mt-3 text-slate-600">
                Standardize watchlists, push rules through API integrations, and collaborate around the same live market narrative.
              </p>
            </Card>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="mb-20 rounded-3xl bg-gradient-to-br from-sea/5 to-coral/5 px-8 py-16">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold">Simple, transparent pricing</h2>
            <p className="mt-4 text-lg text-slate-600">Start with a 7-day free trial. No setup fees. No hidden charges. Cancel anytime.</p>
            <p className="mt-3 inline-flex rounded-full border border-sea/20 bg-sea/10 px-4 py-2 text-sm font-semibold text-sea">
              New users get full feature access during the trial period.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <PricingCard title="Starter" price="$29" description="Perfect for learning" features={['7-day free trial', 'Real-time alerts', 'Basic narratives', '10 watchlist items', 'Email support']} />
            <PricingCard
              title="Professional"
              price="$99"
              description="For active traders"
              features={['Everything in Starter', 'Advanced filtering', 'Unlimited watchlists', 'Priority support', 'API access', 'Team-ready workflows']}
              highlighted
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              description="For institutions"
              features={['Everything in Professional', 'Custom integrations', 'Dedicated account manager', 'SLA guarantee', 'On-premise option']}
            />
          </div>

          <div className="mt-8 grid gap-4 rounded-2xl border border-amber-200 bg-amber-50/80 p-5 text-sm text-amber-900 md:grid-cols-2">
            <p>
              Narrivex provides informational analytics and AI-generated market summaries. It does not provide investment advice, portfolio management, or execution.
            </p>
            <p>
              Regulatory note for India: Narrivex is presented as an analytics platform. Review our legal terms for disclosure context before subscribing.
            </p>
            <div className="md:col-span-2 flex flex-wrap gap-4 font-semibold">
              <Link href="/financial-disclaimer" className="hover:underline">
                Financial disclaimer
              </Link>
              <Link href="/risk-disclosure" className="hover:underline">
                Risk disclosure
              </Link>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="mb-20 rounded-3xl border border-black/10 bg-white/55 px-6 py-10 backdrop-blur sm:px-8">
          <div className="mb-8 text-center">
            <h2 className="font-display text-4xl font-bold md:text-5xl">Narrivex vs generic signal tools</h2>
            <p className="mt-3 text-lg text-slate-600">Build conviction faster with context-rich intelligence, not noise.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white/80">
            <table className="w-full min-w-[620px] text-left">
              <thead className="bg-slate-50/90">
                <tr className="text-sm">
                  <th className="px-4 py-3 font-display text-base">Capability</th>
                  <th className="px-4 py-3 font-display text-base text-sea">Narrivex</th>
                  <th className="px-4 py-3 font-display text-base text-slate-600">Generic alternatives</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="border-t border-black/10 align-top text-sm sm:text-base">
                    <td className="px-4 py-4 font-semibold text-ink">{row.label}</td>
                    <td className="px-4 py-4 text-slate-700">{row.narrivex}</td>
                    <td className="px-4 py-4 text-slate-600">{row.generic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-12 rounded-3xl border border-black/10 bg-white/50 px-8 py-16 backdrop-blur">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Ready to see the full picture?</h2>
            <p className="mt-4 text-lg text-slate-600">Join thousands of traders making smarter decisions with Narrivex.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/signup">
                <Button size="lg">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Contact sales
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <div className="mb-10 text-center">
            <h2 className="font-display text-4xl font-bold md:text-5xl">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {faqData.map((item) => (
              <Card key={item.question} className="border-black/10 bg-white/70 p-6 backdrop-blur">
                <h3 className="font-display text-xl font-semibold">{item.question}</h3>
                <p className="mt-2 text-slate-600">{item.answer}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Internal SEO Links */}
        <section className="mb-16 rounded-2xl border border-black/10 bg-white/60 p-6 backdrop-blur">
          <h2 className="font-display text-2xl font-bold">Explore Narrivex resources</h2>
          <p className="mt-2 text-slate-600">Learn with practical market guides, product updates, compliance pages, and live updates on X.</p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-sea">
            <Link href="/insights" className="hover:underline">
              Market insights
            </Link>
            <Link href="/changelog" className="hover:underline">
              Product changelog
            </Link>
            <Link href="/security-statement" className="hover:underline">
              Security statement
            </Link>
            <Link href="/privacy-policy" className="hover:underline">
              Privacy policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:underline">
              Terms and conditions
            </Link>
            <Link href="/risk-disclosure" className="hover:underline">
              Risk disclosure
            </Link>
            <Link href="/api-terms" className="hover:underline">
              API terms
            </Link>
            <a href={xUrl} target="_blank" rel="noreferrer" className="hover:underline">
              Narrivex on X
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <Card className="flex items-start gap-4 border-black/10 bg-white/70 p-6 backdrop-blur">
      <div className="rounded-lg bg-sea/10 p-2 text-sea">{icon}</div>
      <div>
        <h3 className="font-display text-xl font-semibold">{title}</h3>
        <p className="mt-1 text-slate-600">{text}</p>
      </div>
    </Card>
  );
}

function FeatureCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <Card className="border-black/10 bg-white/70 p-6 backdrop-blur hover:bg-white/90 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-slate-600">{description}</p>
    </Card>
  );
}

function PricingCard({
  title,
  price,
  description,
  features,
  highlighted,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <Card className={`relative border-black/10 p-8 backdrop-blur transition-all ${highlighted ? 'scale-105 border-sea/40 bg-white/90 shadow-lg ring-1 ring-sea/20' : 'bg-white/70'}`}>
      <h3 className="font-display text-2xl font-bold">{title}</h3>
      <p className="text-slate-600">{description}</p>
      <div className="my-6">
        <span className="font-display text-4xl font-bold">{price}</span>
        {price !== 'Custom' && <span className="text-slate-600">/month</span>}
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <Check className="h-5 w-5 text-sea flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full" variant={highlighted ? 'default' : 'outline'}>
        Get started
      </Button>
    </Card>
  );
}
