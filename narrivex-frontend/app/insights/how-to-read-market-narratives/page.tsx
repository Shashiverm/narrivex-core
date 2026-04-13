import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Read Market Narratives for Better Trading Decisions',
  description:
    'Understand how to validate AI market narratives, confirm setups with structure, and avoid reactive entries.',
  alternates: {
    canonical: '/insights/how-to-read-market-narratives',
  },
};

export default function HowToReadNarrativesPage() {
  return (
    <main className="insights-page mx-auto min-h-screen max-w-3xl px-6 py-14">
      <article>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sea">Guide</p>
        <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">How to Read Market Narratives for Better Trading Decisions</h1>

        <p className="mt-6 text-lg text-slate-700">
          AI narratives are useful only when they improve decision quality. Use the framework below to convert narrative output into a
          disciplined trading workflow.
        </p>

        <h2 className="mt-10 font-display text-3xl font-semibold">1. Start with context before direction</h2>
        <p className="mt-3 text-slate-700">
          A narrative should tell you why price is moving: liquidity imbalance, sentiment shock, macro headline, or cross-asset rotation.
          If the context is unclear, treat the signal as weak regardless of excitement.
        </p>

        <h2 className="mt-10 font-display text-3xl font-semibold">2. Verify with market structure</h2>
        <p className="mt-3 text-slate-700">
          Validate the narrative against structure: trend, support or resistance, and volume behavior. A strong narrative that conflicts
          with structure often needs more confirmation.
        </p>

        <h2 className="mt-10 font-display text-3xl font-semibold">3. Convert narrative to a scenario plan</h2>
        <p className="mt-3 text-slate-700">
          Define entry trigger, invalidation level, and expected reaction zone before execution. Narratives should sharpen your plan, not
          replace risk management.
        </p>

        <h2 className="mt-10 font-display text-3xl font-semibold">4. Review outcomes weekly</h2>
        <p className="mt-3 text-slate-700">
          Track which narrative types produce your best expectancy. Over time, this separates high-signal contexts from noise and helps
          improve consistency.
        </p>

        <p className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Narrivex provides informational analytics and does not provide investment advice.
        </p>

        <Link href="/insights" className="mt-8 inline-block font-semibold text-sea hover:underline">
          Back to insights
        </Link>
      </article>
    </main>
  );
}
