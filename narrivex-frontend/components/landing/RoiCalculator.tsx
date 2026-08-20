'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Clock, DollarSign, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function RoiCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(15);
  const [hourlyRate, setHourlyRate] = useState<number>(75);

  const hoursSavedPerWeek = hoursPerWeek * 0.8; // 80% reduction
  const monthlyHoursSaved = Math.round(hoursSavedPerWeek * 4.3);
  const monthlyDollarSavings = Math.round(monthlyHoursSaved * hourlyRate);
  const proPlanCost = 99;
  const roiMultiplier = Math.max(1, Math.round(monthlyDollarSavings / proPlanCost));

  return (
    <section className="mb-20 rounded-3xl border border-black/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 text-white shadow-2xl backdrop-blur sm:p-10 dark:border-white/15">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sea">
          <Calculator className="h-3.5 w-3.5" />
          Quantifiable Efficiency
        </div>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl text-white">
          Calculate Your Time & Capital Alpha
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
          See how replacing manual news hunting and chart staring with instant AI narratives translates directly into saved hours and higher conviction.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Sliders Area */}
        <div className="space-y-6 lg:col-span-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-200">
                Hours spent researching charts & news weekly
              </label>
              <span className="font-mono text-base font-bold text-sea">{hoursPerWeek} hrs/week</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sea"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
              <span>5 hrs (Part-time)</span>
              <span>25 hrs</span>
              <span>50 hrs (Full-time Desk)</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-200">
                Estimated value of your analytical / trading hour
              </label>
              <span className="font-mono text-base font-bold text-coral">${hourlyRate}/hr</span>
            </div>
            <input
              type="range"
              min="25"
              max="300"
              step="5"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-coral"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
              <span>$25/hr</span>
              <span>$150/hr</span>
              <span>$300/hr</span>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-6">
          <div className="rounded-2xl border border-sea/30 bg-gradient-to-b from-sea/10 to-slate-900/90 p-6 backdrop-blur">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-sea" />
                <span className="font-display font-bold text-white text-base">
                  Estimated Monthly Value
                </span>
              </div>
              <span className="rounded-full bg-sea/20 px-3 py-1 text-xs font-bold text-sea border border-sea/30">
                {roiMultiplier}x ROI on Pro Plan
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                  <Clock className="h-3.5 w-3.5 text-sea" />
                  <span>Research Time Saved</span>
                </div>
                <p className="mt-2 font-mono text-2xl font-bold text-emerald-400">
                  ~{monthlyHoursSaved} hrs
                </p>
                <span className="text-[10px] text-slate-500">per month saved</span>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                  <DollarSign className="h-3.5 w-3.5 text-coral" />
                  <span>Productivity Value</span>
                </div>
                <p className="mt-2 font-mono text-2xl font-bold text-coral">
                  ${monthlyDollarSavings.toLocaleString()}
                </p>
                <span className="text-[10px] text-slate-500">monthly efficiency</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 pt-4">
              <div className="text-xs text-slate-400">
                <span>Narrivex Pro: </span>
                <strong className="text-white font-mono">$99/month</strong>
                <span> • 7-Day Risk-Free Trial</span>
              </div>

              <Link href="/signup" className="w-full sm:w-auto">
                <Button className="w-full bg-sea text-white hover:bg-sea/90 shadow-lg font-bold">
                  Claim 7-Day Trial
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
