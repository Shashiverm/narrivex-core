'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Mail, Lock, ArrowRight, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trackEvent } from '@/lib/analytics';

const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export function OTPLoginForm({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [notice, setNotice] = useState<{ tone: 'info' | 'success' | 'error'; message: string } | null>(null);
  const router = useRouter();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      const message = 'Please enter your email address first.';
      setNotice({ tone: 'error', message });
      toast.error(message);
      return;
    }

    setIsLoading(true);
    setNotice(null);
    trackEvent('otp_send_attempt');
    try {
      const response = await fetch(`${apiBase}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }

      const payload = (await response.json()) as { devOtp?: string };

      trackEvent('otp_send_success');
      const devHint = payload.devOtp ? ` Dev code: ${payload.devOtp}` : '';
      const message = `If this email is registered, we have sent a 6-digit code to your inbox.${devHint}`;
      setNotice({ tone: 'success', message });
      toast.success(message);
      setStep('otp');
      setResendCountdown(60);
      const interval = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      trackEvent('otp_send_failed');
      const message = 'Failed to send the code. Please try again.';
      setNotice({ tone: 'error', message });
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      const message = 'Please enter the 6-digit code from your email.';
      setNotice({ tone: 'error', message });
      toast.error(message);
      return;
    }

    setIsLoading(true);
    setNotice(null);
    trackEvent('otp_verify_attempt');
    try {
      const result = await signIn('credentials', {
        email,
        otp,
        mode: 'otp',
        redirect: false,
      });

      if (!result?.ok) {
        throw new Error('Invalid OTP');
      }

      trackEvent('otp_verify_success');
      toast.success('Signed in successfully! 🎉');

      router.push('/dashboard');
    } catch {
      trackEvent('otp_verify_failed');
      const message = 'The code is invalid or expired. Please try again.';
      setNotice({ tone: 'error', message });
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const noticeClassName =
    notice?.tone === 'error'
      ? 'border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300'
      : notice?.tone === 'success'
        ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300'
        : 'border-sea/20 bg-sea/5 text-slate-700 dark:border-sea/30 dark:bg-sea/10 dark:text-slate-300';

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-2"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Back to login options
        </button>
        <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Sign in with OTP</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 font-sans">We will send a 6-digit verification code directly to your email.</p>
      </div>

      {notice && <div className={`rounded-xl border px-4 py-3 text-xs font-mono leading-relaxed ${noticeClassName}`}>{notice.message}</div>}

      {step === 'email' ? (
        <form className="space-y-5" onSubmit={handleSendOTP}>
          <div>
            <label className="mb-2 block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <Input
                type="email"
                placeholder="operator@desk.com"
                disabled={isLoading}
                className="pl-10 dark:border-white/[0.08] dark:bg-[#0c121e] text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full py-5 text-sm font-bold bg-sea hover:bg-sea/90 text-white shadow-sm" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Sending verification code...
              </>
            ) : (
              <>
                Send OTP Code
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      ) : (
        <form className="space-y-5" onSubmit={handleVerifyOTP}>
          <div>
            <label className="mb-2 block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">Enter 6-Digit Code</label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-mono">Check your inbox for the one-time code</p>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <Input
                type="text"
                placeholder="000000"
                disabled={isLoading}
                className="pl-10 text-2xl tracking-[0.3em] font-mono text-center dark:border-white/[0.08] dark:bg-[#0c121e]"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                required
              />
            </div>
          </div>

          <div className="text-center text-xs font-mono text-slate-500 dark:text-slate-400">
            Didn&apos;t receive the code?{' '}
            <button
              type="button"
              disabled={resendCountdown > 0 || isLoading}
              onClick={handleSendOTP}
              className="font-bold text-sea hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : 'Resend Code'}
            </button>
          </div>

          <Button type="submit" className="w-full py-5 text-sm font-bold bg-sea hover:bg-sea/90 text-white shadow-sm" disabled={isLoading || otp.length !== 6}>
            {isLoading ? (
              <>
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Verifying code...
              </>
            ) : (
              <>
                Confirm & Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <button
            type="button"
            onClick={() => setStep('email')}
            className="w-full py-2.5 text-xs font-mono font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/[0.04] transition-colors border border-slate-200 dark:border-white/[0.08] rounded-xl"
          >
            Use different email
          </button>
        </form>
      )}
    </div>
  );
}

