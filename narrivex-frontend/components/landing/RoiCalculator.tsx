'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function RoiCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(15);
  const [hourlyRate, setHourlyRate] = useState<number>(75);

  const presets = [
    { label: 'Retail Day Trader', hours: 10, rate: 45 },
    { label: 'Prop Firm Trader', hours: 20, rate: 100 },
    { label: 'Macro / Quant Desk', hours: 35, rate: 180 },
  ];

  const calculations = useMemo(() => {
    // 80% reduction in manual searching & chart cross-referencing
    const hoursSavedPerWeek = hoursPerWeek * 0.8;
    const monthlyHoursSaved = Math.round(hoursSavedPerWeek * 4.3);
    const monthlyDollarSavings = Math.round(monthlyHoursSaved * hourlyRate);
    const proPlanCost = 99;
    const roiMultiplier = Math.max(1, Math.round(monthlyDollarSavings / proPlanCost));

    return {
      monthlyHoursSaved,
      monthlyDollarSavings,
      roiMultiplier,
      annualSavings: monthlyDollarSavings * 12,
    };
  }, [hoursPerWeek, hourlyRate]);

  return (
    <section className="mb-24 rounded-3xl border border-slate-800/80 bg-slate-950 p-6 text-slate-100 shadow-2xl sm:p-10">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-3 py-1 font-mono text-xs font-semibold text-sea">
          <Calculator className="h-3.5 w-3.5" />
          Quantifiable Analytical Efficiency
        </div>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl text-white">
          Calculate Your Time & Conviction Alpha
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
          Replace manual news scraping and fragmented chart staring with instant AI narrative synthesis.
        </p>

        {/* Preset profiles */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-slate-500 font-mono mr-1">Quick Presets:</span>
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setHoursPerWeek(p.hours);
                setHourlyRate(p.rate);
              }}
              className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1 font-mono text-xs text-slate-300 transition hover:border-sea/50 hover:text-white"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Sliders Area */}
        <div className="space-y-6 lg:col-span-6 font-mono">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300">
                Hours spent researching charts & news weekly:
              </label>
              <span className="text-sm font-bold text-sea tabular-nums">{hoursPerWeek} hrs/wk</span>
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
            <div className="flex justify-between text-[10px] text-slate-500 mt-1.5">
              <span>5 hrs (Part-time)</span>
              <span>25 hrs</span>
              <span>50 hrs (Full-time Desk)</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300">
                Estimated value of your analytical / trading hour:
              </label>
              <span className="text-sm font-bold text-coral tabular-nums">${hourlyRate}/hr</span>
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
            <div className="flex justify-between text-[10px] text-slate-500 mt-1.5">
              <span>$25/hr</span>
              <span>$150/hr</span>
              <span>$300/hr</span>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-6">
          <div className="rounded-2xl border border-sea/30 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="font-mono text-xs font-bold text-slate-300">
                ESTIMATED MONTHLY EFFICIENCY
              </div>
              <span className="rounded-full border border-sea/40 bg-sea/15 px-3 py-1 font-mono text-xs font-bold text-sea">
                {calculations.roiMultiplier}x ROI on Pro Plan
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-center font-mono">
              <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4">
                <div className="flex items-center justify-center gap-1 text-xs text-slate-400">
                  <Clock className="h-3.5 w-3.5 text-sea" />
                  <span>Time Reclaimed</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-emerald-400 tabular-nums">
                  ~{calculations.monthlyHoursSaved} hrs
                </p>
                <span className="text-[10px] text-slate-500">monthly time savings</span>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4">
                <div className="flex items-center justify-center gap-1 text-xs text-slate-400">
                  <DollarSign className="h-3.5 w-3.5 text-coral" />
                  <span>Productivity Value</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-coral tabular-nums">
                  ${calculations.monthlyDollarSavings.toLocaleString()}
                </p>
                <span className="text-[10px] text-slate-500">monthly alpha equivalent</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 pt-4">
              <div className="text-xs text-slate-400 font-mono">
                <span>Narrivex Pro: </span>
                <strong className="text-white font-bold">$99/mo</strong>
                <span> • 7-Day Risk-Free Trial</span>
              </div>

              <Link href="/signup" className="w-full sm:w-auto">
                <Button className="w-full font-bold">
                  Start 7-Day Trial
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
