import type { ReactNode } from 'react';
import Link from 'next/link';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth-page flex min-h-screen bg-slate-50 dark:bg-[#080c14]">
      {/* Left Sidebar - High Conviction Desk Branding */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between bg-gradient-to-br from-[#0c121e] to-[#080c14] px-12 py-12 backdrop-blur border-r border-slate-200/80 dark:border-white/[0.08] text-slate-100">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5 font-display text-2xl font-bold text-white hover:opacity-90 transition-opacity">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sea text-white font-mono text-xs font-black shadow-sm">
              NX
            </span>
            <span>Narrivex</span>
          </Link>
        </div>

        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-sea/30 bg-sea/10 px-3 py-1 font-mono text-xs font-semibold text-sea mb-4">
              <Activity className="h-3.5 w-3.5" />
              Sub-50ms Market Intelligence
            </div>
            <h2 className="font-display text-4xl font-bold leading-tight text-white tracking-tight">
              Institutional clarity for active operators
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed font-sans">
              Join quantitative researchers and prop desks making high-conviction decisions with real-time order flow narratives.
            </p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="flex items-center gap-3.5 rounded-xl border border-white/[0.06] bg-[#0d1424]/80 p-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sea/15 text-sea flex-shrink-0">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-white">Sub-25ms WebSocket Feeds</p>
                <p className="text-[11px] text-slate-400 font-sans">Direct L3 order book depth & dark pool absorption</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-xl border border-white/[0.06] bg-[#0d1424]/80 p-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 flex-shrink-0">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-white">Deterministic Grounding</p>
                <p className="text-[11px] text-slate-400 font-sans">Every narrative tied directly to verifiable mathematical anomalies</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-[#0c121e]/80 p-4 font-mono text-xs text-slate-400 flex items-center justify-between">
          <span>7-Day Risk-Free Trial</span>
          <span className="text-emerald-400 font-bold">99.999% SLA</span>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex w-full items-center justify-center px-4 py-10 sm:px-6 lg:w-1/2 lg:px-10 lg:py-12">
        {children}
      </div>
    </div>
  );
}