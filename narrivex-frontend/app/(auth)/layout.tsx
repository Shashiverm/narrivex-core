import type { ReactNode } from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth-page flex min-h-screen bg-grain">
      {/* Left Sidebar - Branding & Benefits */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between bg-gradient-to-br from-sea/10 to-coral/10 px-12 py-12 backdrop-blur">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 font-display text-2xl font-bold text-ink hover:opacity-80 transition-opacity">
            <Sparkles className="h-6 w-6 text-sea" />
            Narrivex
          </Link>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight text-ink">
              Market intelligence, simplified
            </h2>
            <p className="mt-4 text-lg text-slate-700">
              Join thousands of traders making smarter decisions with real-time alerts and AI-generated market narratives.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sea/20 text-sea flex-shrink-0">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-ink">Real-time alerts</p>
                <p className="text-sm text-slate-600">Get notified instantly when markets move</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-coral/20 text-coral flex-shrink-0">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-ink">AI narratives</p>
                <p className="text-sm text-slate-600">Understand market movements instantly</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sea/20 text-sea flex-shrink-0">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-ink">Enterprise security</p>
                <p className="text-sm text-slate-600">Your data is encrypted and protected</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-black/10 bg-white/40 p-4 backdrop-blur">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-ink">1,000+ traders</span> already using Narrivex daily
          </p>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex w-full items-center justify-center px-4 py-10 sm:px-6 lg:w-1/2 lg:px-10 lg:py-12">
        {children}
      </div>
    </div>
  );
}