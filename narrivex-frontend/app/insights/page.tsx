import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Trading Insights and Market Education',
  description:
    'Read practical guides on AI market narratives, trading alerts, and cross-asset workflows for crypto, equities, and forex.',
  alternates: {
    canonical: '/insights',
  },
};

const guides = [
  {
    href: '/insights/how-to-read-market-narratives',
    title: 'How to Read Market Narratives for Better Trading Decisions',
    description:
      'Learn a repeatable framework for interpreting AI-generated market narratives before placing a trade.',
  },
  {
    href: '/insights/best-crypto-alert-tools-2026',
    title: 'Best Crypto Alert Tools in 2026: What Traders Should Compare',
    description:
      'A practical comparison checklist for choosing reliable, low-latency alert tooling in modern crypto markets.',
  },
];

export default function InsightsPage() {
  return (
    <main className="insights-page mx-auto min-h-screen max-w-5xl px-6 py-14">
      <header className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sea">Narrivex Insights</p>
        <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">Trading Education and Market Intelligence Guides</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-700">
          Explore practical resources created for traders and analysts who want to use AI narratives and real-time alerts with discipline.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {guides.map((guide) => (
          <article key={guide.href} className="rounded-2xl border border-black/10 bg-white/80 p-6 backdrop-blur">
            <h2 className="font-display text-2xl font-semibold">{guide.title}</h2>
            <p className="mt-3 text-slate-600">{guide.description}</p>
            <Link href={guide.href} className="mt-5 inline-block font-semibold text-sea hover:underline">
              Read guide
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
