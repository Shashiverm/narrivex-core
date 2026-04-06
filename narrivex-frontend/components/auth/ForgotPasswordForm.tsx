'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Mail, ArrowRight, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${apiBase}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reset email');
      }

      toast.success('Reset link sent! Check your email.');
      setSubmitted(true);
      setEmail('');
    } catch (error) {
      toast.error('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-bold text-ink">Check your email</h1>
          <p className="text-slate-600">We've sent a password reset link to your email address.</p>
        </div>

        {/* Success Message */}
        <div className="rounded-lg bg-green-50 border border-green-200 p-6 space-y-4">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 flex-shrink-0">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-green-900">Email sent successfully</p>
              <p className="text-sm text-green-700 mt-1">
                Click the link in your email to reset your password. The link expires in 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-4 text-sm text-slate-600">
          <p>If you don't see the email:</p>
          <ul className="list-disc list-inside space-y-2 text-slate-600">
            <li>Check your spam or junk folders</li>
            <li>Make sure you entered the correct email address</li>
            <li>Wait a few minutes for the email to arrive</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => setSubmitted(false)}
            className="w-full py-3 rounded-lg border-2 border-slate-200 hover:border-slate-300 font-medium text-slate-700 transition-colors"
          >
            Didn't receive the email? Try another address
          </button>
          <Link href="/login" className="block w-full">
            <Button variant="outline" className="w-full">
              Back to sign in
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors mb-4">
          <RotateCcw className="h-4 w-4" />
          Back to sign in
        </Link>
        <h1 className="font-display text-3xl font-bold text-ink">Reset your password</h1>
        <p className="text-slate-600">Enter your email address and we'll send you a link to reset your password.</p>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-ink">Email address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
            <Input
              type="email"
              placeholder="you@example.com"
              disabled={isLoading}
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full py-6 text-base font-semibold" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Sending...
            </>
          ) : (
            <>
              Send reset link
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>

      {/* Help Text */}
      <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-center">
        <p className="text-sm text-slate-600">
          Remember your password?{' '}
          <Link href="/login" className="font-semibold text-sea hover:text-sea/80 transition-colors">
            Sign in instead
          </Link>
        </p>
      </div>
    </div>
  );
}
