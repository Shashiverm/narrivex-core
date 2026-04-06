import Link from 'next/link';
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
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-grain">
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
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-coral/30 bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
              <Sparkles className="h-4 w-4" />
              AI-Powered Market Intelligence
            </p>
            <h1 className="font-display text-5xl font-bold leading-tight md:text-7xl">
              See the market story before everyone else.
            </h1>
            <p className="mt-6 max-w-xl text-xl text-slate-700">
              Narrivex transforms noisy market data into clear, actionable narratives and alerts. Perfect for traders and analysts who need real-time insights without the noise.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/signup">
                <Button size="lg">
                  Launch Dashboard
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
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
            <h2 className="font-display text-4xl font-bold md:text-5xl">Powerful features for traders</h2>
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

        {/* Benefits Section */}
        <section className="mb-20 rounded-3xl border border-black/10 bg-white/50 px-8 py-16 backdrop-blur">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl font-bold">Why traders choose Narrivex</h2>
              <p className="mt-4 text-lg text-slate-600">Stop drowning in data. Start making informed trades.</p>

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

            <div className="rounded-2xl bg-gradient-to-br from-sea/10 to-coral/10 p-8">
              <div className="space-y-6">
                <div className="rounded-lg bg-white/60 p-4">
                  <div className="flex items-center gap-2 font-semibold">
                    <Zap className="h-4 w-4 text-coral" />
                    50ms average latency
                  </div>
                  <p className="mt-1 text-sm text-slate-600">On WebSocket connections worldwide</p>
                </div>
                <div className="rounded-lg bg-white/60 p-4">
                  <div className="flex items-center gap-2 font-semibold">
                    <TrendingUp className="h-4 w-4 text-sea" />
                    10,000+ traders
                  </div>
                  <p className="mt-1 text-sm text-slate-600">Using Narrivex daily for market analysis</p>
                </div>
                <div className="rounded-lg bg-white/60 p-4">
                  <div className="flex items-center gap-2 font-semibold">
                    <AlertCircle className="h-4 w-4 text-coral" />
                    99.9% uptime
                  </div>
                  <p className="mt-1 text-sm text-slate-600">Enterprise-grade infrastructure</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold md:text-5xl">Loved by traders worldwide</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <TestimonialCard
              quote="Narrivex cut my research time in half. The AI narratives are spot-on."
              author="Alex Chen"
              role="Crypto Trader"
              rating={5}
            />
            <TestimonialCard
              quote="Finally a tool that makes sense of all the market noise. Best platform I've used."
              author="Jordan Smith"
              role="Day Trader"
              rating={5}
            />
            <TestimonialCard quote="The alerts are incredibly reliable. I've increased my win rate by 40%." author="Sam Rodriguez" role="Equity Analyst" rating={5} />
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="mb-20 rounded-3xl bg-gradient-to-br from-sea/5 to-coral/5 px-8 py-16">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold">Simple, transparent pricing</h2>
            <p className="mt-4 text-lg text-slate-600">No setup fees. No hidden charges. Cancel anytime.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <PricingCard title="Starter" price="$29" description="Perfect for learning" features={['Real-time alerts', 'Basic narratives', '10 watchlist items', 'Email support']} />
            <PricingCard
              title="Professional"
              price="$99"
              description="For active traders"
              features={['Everything in Starter', 'Advanced filtering', 'Unlimited watchlists', 'Priority support', 'API access']}
              highlighted
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              description="For institutions"
              features={['Everything in Professional', 'Custom integrations', 'Dedicated account manager', 'SLA guarantee', 'On-premise option']}
            />
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
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Contact sales
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-black/10 pt-8 pb-20 text-center text-sm text-slate-600">
          <p>&copy; 2026 Narrivex. All rights reserved.</p>
        </footer>
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

function TestimonialCard({ quote, author, role, rating }: { quote: string; author: string; role: string; rating: number }) {
  return (
    <Card className="border-black/10 bg-white/70 p-6 backdrop-blur">
      <div className="mb-4 flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-coral text-coral" />
        ))}
      </div>
      <p className="italic text-slate-700">&ldquo;{quote}&rdquo;</p>
      <p className="mt-4 font-semibold">{author}</p>
      <p className="text-sm text-slate-600">{role}</p>
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
    <Card className={`relative border-black/10 p-8 backdrop-blur transition-all ${highlighted ? 'scale-105 border-sea bg-white/90 shadow-lg' : 'bg-white/70'}`}>
      {highlighted && <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sea to-coral rounded-t-2xl" />}
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
