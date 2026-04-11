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
      ? 'border-red-200 bg-red-50 text-red-700'
      : notice?.tone === 'success'
        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
        : 'border-sea/20 bg-sea/5 text-slate-700';

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors mb-4"
        >
          <RotateCcw className="h-4 w-4" />
          Back to login options
        </button>
        <h2 className="font-display text-3xl font-bold text-ink">Sign in with OTP</h2>
        <p className="text-slate-600">We&apos;ll send a code to your email for verification.</p>
      </div>

      {notice && <div className={`rounded-xl border px-4 py-3 text-sm leading-6 ${noticeClassName}`}>{notice.message}</div>}

      {step === 'email' ? (
        <form className="space-y-5" onSubmit={handleSendOTP}>
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
                Send OTP
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>
      ) : (
        <form className="space-y-5" onSubmit={handleVerifyOTP}>
          <div>
            <label className="mb-2 block text-sm font-medium text-ink">Enter OTP</label>
            <p className="text-sm text-slate-600 mb-3">Check your email for the 6-digit code</p>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="000000"
                disabled={isLoading}
                className="pl-10 text-3xl tracking-widest font-mono text-center"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                required
              />
            </div>
          </div>

          <div className="text-center text-sm text-slate-600">
            Didn&apos;t receive the code?{' '}
            <button
              type="button"
              disabled={resendCountdown > 0 || isLoading}
              onClick={handleSendOTP}
              className="font-semibold text-sea hover:text-sea/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : 'Resend OTP'}
            </button>
          </div>

          <Button type="submit" className="w-full py-6 text-base font-semibold" disabled={isLoading || otp.length !== 6}>
            {isLoading ? (
              <>
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>

          <button
            type="button"
            onClick={() => setStep('email')}
            className="w-full py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors border border-slate-200 rounded-lg"
          >
            Use different email
          </button>
        </form>
      )}
    </div>
  );
}
