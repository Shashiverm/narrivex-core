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
        <h1 className="font-display text-4xl font-bold text-slate-900 dark:text-white">Create account</h1>
        <p className="text-slate-600 dark:text-slate-400">Join thousands of traders getting smarter market insights with Narrivex.</p>
      </div>

      <div className="rounded-xl border border-sea/20 bg-sea/5 px-4 py-3 text-sm text-slate-700 dark:border-sea/30 dark:bg-sea/10 dark:text-slate-300">
        Continue with GitHub or Google to create your account instantly. If you already registered, use the login page instead.
      </div>

      {/* Benefits */}
      <div className="rounded-xl bg-gradient-to-br from-sea/5 to-coral/5 p-4 space-y-3 dark:from-sea/10 dark:to-coral/10 dark:border dark:border-slate-800/80">
        <div className="flex gap-2">
          <svg className="h-5 w-5 text-sea flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Real-time market narratives</span>
        </div>
        <div className="flex gap-2">
          <svg className="h-5 w-5 text-coral flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Instant alerts on price movements</span>
        </div>
        <div className="flex gap-2">
          <svg className="h-5 w-5 text-sea flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Premium security with OAuth</span>
        </div>
      </div>

      {/* OAuth Signup Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => handleOAuthSignup('github')}
          className="flex items-center justify-center gap-3 w-full px-4 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors dark:bg-slate-800 dark:hover:bg-slate-700 dark:border dark:border-slate-700"
        >
          <Github className="h-5 w-5" />
          Sign up with GitHub
          <ArrowRight className="h-5 w-5 ml-auto" />
        </button>

        <button
          onClick={() => handleOAuthSignup('google')}
          className="flex items-center justify-center gap-3 w-full px-4 py-4 rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 font-semibold transition-all dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:border-slate-600"
        >
          <Chrome className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Sign up with Google
          <ArrowRight className="h-5 w-5 ml-auto opacity-50" />
        </button>
      </div>

      {/* Info Text */}
      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2 dark:bg-slate-900/50 dark:border-slate-800">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">One-click setup</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Sign up instantly with your GitHub or Google account. Your account is created automatically the first time you continue, and you can sign in with the same provider after that.
        </p>
      </div>

      {/* Sign In Link */}
      <div className="text-center border-t border-slate-200 pt-6 dark:border-slate-800">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-sea hover:text-sea/80 transition-colors">
            Sign in instead
          </Link>
        </p>
      </div>

      {/* Terms */}
      <p className="text-xs text-center text-slate-500 dark:text-slate-400">
        By signing up, you agree to our{' '}
        <Link href="/terms-and-conditions" className="underline hover:text-slate-700 dark:hover:text-slate-200">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy-policy" className="underline hover:text-slate-700 dark:hover:text-slate-200">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}