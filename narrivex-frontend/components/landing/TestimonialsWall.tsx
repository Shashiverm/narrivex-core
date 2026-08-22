'use client';

import { Star, ShieldCheck } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  firm: string;
  impactMetric: string;
  assetFocus: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'When BTC dumped 4%, I used to waste 15 minutes scrambling between Twitter, liquidation heatmaps, and Telegram groups. Narrivex delivers the exact $54M liquidation cascade breakdown in under 30ms. It has fundamentally transformed how our prop desk executes.',
    author: 'Marcus Vance',
    role: 'Managing Partner',
    firm: 'Aegis Digital Assets',
    impactMetric: 'Saved ~14 hrs/week',
    assetFocus: 'Crypto Derivatives',
  },
  {
    quote:
      'The dark pool block absorption alerts on mega-cap equities alone have paid for our annual subscription multiple times over. The contextual AI narrative doesn’t just report the print; it tells you if it’s ask-side absorption with grounded order flow metrics.',
    author: 'Elena Rostova',
    role: 'Senior Equities Analyst',
    firm: 'Vanguard Alpha Research',
    impactMetric: '+320% Faster Reaction',
    assetFocus: 'US Equities & Options',
  },
  {
    quote:
      'Narrivex is the first intelligence engine that successfully correlates FX sovereign rate shifts with on-chain crypto liquidity rotations. Having ECB and Fed rate expectations synthesized alongside mempool velocity is an asymmetric edge.',
    author: 'Kaelen Thorne',
    role: 'Quantitative Strategist',
    firm: 'Meridian Capital Desk',
    impactMetric: 'Zero Hallucinated Catalysts',
    assetFocus: 'Cross-Asset Macro',
  },
];

export function TestimonialsWall() {
  return (
    <section className="mb-24">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-3 py-1 font-mono text-xs font-semibold text-sea">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          Verified Desk Feedback
        </div>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-slate-900 dark:text-white">
          Trusted by High-Conviction Operators
        </h2>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          See how active quantitative analysts and prop traders build asymmetric conviction with Narrivex.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-xs backdrop-blur transition hover:border-slate-300 dark:border-slate-800/80 dark:bg-slate-900/60 dark:hover:border-slate-700"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800/80">
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="h-3 w-3" />
                  {item.impactMetric}
                </span>
                <span className="font-mono text-[10px] text-slate-400">{item.assetFocus}</span>
              </div>

              <div className="mt-3 flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                ))}
              </div>

              <p className="mt-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300 font-sans italic">
                &quot;{item.quote}&quot;
              </p>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-3 dark:border-slate-800/80">
              <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                {item.author}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {item.role}, <span className="font-semibold text-slate-700 dark:text-slate-300">{item.firm}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
