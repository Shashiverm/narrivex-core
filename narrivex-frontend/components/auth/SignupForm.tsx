'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Github, Chrome, ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function SignupForm() {
  const handleOAuthSignup = (provider: 'github' | 'google') => {
    trackEvent('signup_oauth_click', { provider });
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold text-ink">Create account</h1>
        <p className="text-slate-600">Join thousands of traders getting smarter market insights with Narrivex.</p>
      </div>

      {/* Benefits */}
      <div className="rounded-lg bg-gradient-to-br from-sea/5 to-coral/5 p-4 space-y-3">
        <div className="flex gap-2">
          <svg className="h-5 w-5 text-sea flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-slate-700">Real-time market narratives</span>
        </div>
        <div className="flex gap-2">
          <svg className="h-5 w-5 text-coral flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-slate-700">Instant alerts on price movements</span>
        </div>
        <div className="flex gap-2">
          <svg className="h-5 w-5 text-sea flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-slate-700">Premium security with OAuth</span>
        </div>
      </div>

      {/* OAuth Signup Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => handleOAuthSignup('github')}
          className="flex items-center justify-center gap-3 w-full px-4 py-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors"
        >
          <Github className="h-5 w-5" />
          Sign up with GitHub
          <ArrowRight className="h-5 w-5 ml-auto" />
        </button>

        <button
          onClick={() => handleOAuthSignup('google')}
          className="flex items-center justify-center gap-3 w-full px-4 py-4 rounded-lg border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 font-semibold transition-all"
        >
          <Chrome className="h-5 w-5 text-blue-600" />
          Sign up with Google
          <ArrowRight className="h-5 w-5 ml-auto opacity-50" />
        </button>
      </div>

      {/* Info Text */}
      <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 space-y-2">
        <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">One-click setup</p>
        <p className="text-sm text-slate-600">
          Sign up instantly with your GitHub or Google account. No password needed—your account is set up immediately with secure OAuth authentication.
        </p>
      </div>

      {/* Sign In Link */}
      <div className="text-center border-t border-slate-200 pt-6">
        <p className="text-sm text-slate-600">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-sea hover:text-sea/80 transition-colors">
            Sign in instead
          </Link>
        </p>
      </div>

      {/* Terms */}
      <p className="text-xs text-center text-slate-500">
        By signing up, you agree to our{' '}
        <Link href="/terms" className="underline hover:text-slate-700">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="underline hover:text-slate-700">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}