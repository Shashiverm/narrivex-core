'use client';

import { Suspense } from 'react';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen bg-grain">
      {/* Left Sidebar - Branding & Benefits */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between bg-gradient-to-br from-sea/10 to-coral/10 px-12 py-12 backdrop-blur">
        <div>
          <a href="/" className="inline-flex items-center gap-2 font-display text-2xl font-bold text-ink hover:opacity-80 transition-opacity">
            <svg className="h-6 w-6 text-sea" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Narrivex
          </a>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight text-ink">
              Secure your account
            </h2>
            <p className="mt-4 text-lg text-slate-700">
              Create a strong new password to protect your Narrivex account and all your market data.
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
                <p className="font-semibold text-ink">Strong password requirements</p>
                <p className="text-sm text-slate-600">We help you create a secure password</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-coral/20 text-coral flex-shrink-0">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-ink">Instant activation</p>
                <p className="text-sm text-slate-600">Your new password takes effect immediately</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sea/20 text-sea flex-shrink-0">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-ink">Keep your data safe</p>
                <p className="text-sm text-slate-600">Enterprise-grade encryption protects all alerts</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-black/10 bg-white/40 p-4 backdrop-blur">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-ink">Password security tip:</span> Use a unique password you don&apos;t use anywhere else and include uppercase, lowercase, numbers, and symbols.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12">
        <Suspense fallback={<div className="text-center"><div className="inline-block h-8 w-8 border-2 border-sea border-t-transparent rounded-full animate-spin" /></div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
