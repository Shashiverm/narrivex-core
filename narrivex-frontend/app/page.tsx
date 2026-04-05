import Link from 'next/link';
import type { ReactNode } from 'react';
import { ChevronRight, Sparkles, Radar, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-grain">
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

        <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-coral/30 bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
              <Sparkles className="h-4 w-4" />
              Fast narrative intelligence
            </p>
            <h1 className="font-display text-5xl font-bold leading-tight md:text-7xl">
              See the market story before everyone else.
            </h1>
            <p className="mt-6 max-w-xl text-xl text-slate-700">
              Narrivex turns noisy data into clear, actionable narratives and alerts across crypto and equities.
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
            <Feature icon={<ShieldCheck className="h-5 w-5" />} title="Secure access" text="OAuth + JWT-backed API authorization with guardrails." />
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
