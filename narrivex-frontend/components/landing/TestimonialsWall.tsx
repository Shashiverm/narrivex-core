'use client';

import { Star } from 'lucide-react';

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
      'Before Narrivex, when BTC dumped 4%, I had to scramble between Twitter, Coinglass, and Telegram to figure out why. Narrivex gives me the exact liquidation cascade breakdown in 30ms. It has fundamentally transformed our desk.',
    author: 'Marcus Vance',
    role: 'Managing Partner',
    firm: 'Aegis Digital Assets',
    impactMetric: 'Saved 14 hrs / week',
    assetFocus: 'Crypto Derivatives',
  },
  {
    quote:
      'The dark pool block absorption alerts on mega-cap tech alone have paid for our annual subscription 50 times over. The contextual AI narrative doesn’t just report the print; it tells you if it’s ask-side accumulation.',
    author: 'Elena Rostova',
    role: 'Senior Equities Analyst',
    firm: 'Vanguard Alpha Research',
    impactMetric: '+320% Faster Reaction',
    assetFocus: 'US Equities & Options',
  },
  {
    quote:
      'Narrivex is the first tool that successfully connects FX macro shifts with crypto liquidity rotations. Having ECB and Fed rate expectation shifts synthesized alongside on-chain DEX flow is unmatched.',
    author: 'Kaelen Thorne',
    role: 'Quant Strategist',
    firm: 'Meridian Capital Desk',
    impactMetric: 'Zero False Catalysts',
    assetFocus: 'Cross-Asset Macro',
  },
];

export function TestimonialsWall() {
  return (
    <section className="mb-20">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sea">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          Institutional Feedback
        </div>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-slate-900 dark:text-white">
          Trusted by Traders Across Global Desks
        </h2>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
          See how active market operators are building asymmetric conviction with Narrivex.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="relative flex flex-col justify-between rounded-2xl border border-black/10 bg-white/75 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-sea/40 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/70"
          >
            <div>
              <div className="flex items-center justify-between border-b border-black/5 pb-3 dark:border-white/5">
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {item.impactMetric}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">{item.assetFocus}</span>
              </div>

              <div className="mt-4 flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                ))}
              </div>

              <p className="mt-3 text-xs leading-relaxed text-slate-700 dark:text-slate-200 italic">
                &quot;{item.quote}&quot;
              </p>
            </div>

            <div className="mt-6 border-t border-black/5 pt-4 dark:border-white/5">
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
