'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Mail, Lock, ArrowRight, MailOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OAuthButtons } from './OAuthButtons';
import { OTPLoginForm } from './OTPLoginForm';
import { trackEvent } from '@/lib/analytics';

const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

type AuthMethod = 'options' | 'password' | 'otp';
type FeedbackTone = 'info' | 'success' | 'error';

export function LoginForm() {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('options');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: FeedbackTone; message: string } | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const feedbackClassName =
    feedback?.tone === 'error'
      ? 'border-red-200 bg-red-50 text-red-700'
      : feedback?.tone === 'success'
        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
        : 'border-sea/20 bg-sea/5 text-slate-700';

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setFeedback(null);
    trackEvent('login_attempt', { method: 'credentials' });

    try {
      const response = await fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        const errorMessage = typeof errorPayload?.error === 'string' ? errorPayload.error : '';

        if (response.status === 404 || /not registered|not found/i.test(errorMessage)) {
          const message = 'No account found for this email. Create a new account or use OTP if you already registered.';
          setFeedback({ tone: 'error', message });
          toast.error(message);
        } else if (response.status === 401 || /invalid credentials|incorrect password/i.test(errorMessage)) {
          const message = 'Account found, but the password is incorrect. Try again or use OTP from your registered email.';
          setFeedback({ tone: 'error', message });
          toast.error(message);
        } else {
          const message = 'Unable to sign in right now. Please check your details and try again.';
          setFeedback({ tone: 'error', message });
          toast.error(message);
        }

        trackEvent('login_failed', {
          method: 'credentials',
          error: errorMessage || `http_${response.status}`,
        });
        return;
      }

      setFeedback({ tone: 'success', message: 'Account verified. Signing you in now.' });

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.ok) {
        trackEvent('login_success', { method: 'credentials' });
        toast.success('Welcome back! 🎉');
        router.push('/dashboard');
        return;
      }

      trackEvent('login_failed', {
        method: 'credentials',
        error: result?.error || 'nextauth_signin_failed',
      });
      const message = 'We verified the account, but could not finish the sign-in. Please try again.';
      setFeedback({ tone: 'error', message });
      toast.error(message);
    } catch {
      trackEvent('login_failed', {
        method: 'credentials',
        error: 'network_error',
      });
      const message = 'Network error. Please try again in a moment.';
      setFeedback({ tone: 'error', message });
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (authMethod === 'otp') {
    return <OTPLoginForm onBack={() => setAuthMethod('options')} />;
  }

  if (authMethod === 'password') {
    return (
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <button
            onClick={() => setAuthMethod('options')}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors mb-4"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to login options
          </button>
          <h2 className="font-display text-3xl font-bold text-ink">Sign in with password</h2>
          <p className="text-slate-600">Enter your email and password to continue.</p>
        </div>

        {feedback && (
          <div className={`rounded-xl border px-4 py-3 text-sm leading-6 ${feedbackClassName}`}>
            {feedback.message}
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-ink">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
              <Input
                type="email"
                placeholder="you@example.com"
                disabled={isLoading}
                className="pl-10"
                {...register('email')}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 flex items-center gap-1 text-sm text-red-600">
                <span className="inline-block h-1 w-1 rounded-full bg-red-600" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-ink">Password</label>
              <Link href="/forgot-password" className="text-sm text-sea hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                disabled={isLoading}
                className="pl-10 pr-10"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 flex items-center gap-1 text-sm text-red-600">
                <span className="inline-block h-1 w-1 rounded-full bg-red-600" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full py-6 text-base font-semibold" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center">
          <p className="text-sm text-slate-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold text-sea hover:text-sea/80 transition-colors">
              Create one in seconds
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // Default: Show all auth method options
  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold text-ink">Welcome back</h1>
        <p className="text-slate-600">Choose how you&apos;d like to sign in to your account.</p>
      </div>

      <div className="rounded-xl border border-sea/20 bg-sea/5 px-4 py-3 text-sm text-slate-700">
        Sign in with your Google or GitHub account. Email and password login will be available soon.
      </div>

      {/* OAuth Buttons */}
      <div className="space-y-3">
        <OAuthButtons disabled={isLoading} />
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center border-t border-slate-200" />
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-slate-500">or use email</span>
        </div>
      </div>

      {/* Email Auth Options (temporarily disabled) */}
      <div className="grid gap-3">
        {/* Email + Password Button — disabled */}
        <button
          disabled
          className="flex items-center gap-3 w-full px-4 py-4 rounded-lg border-2 border-slate-200 text-left font-medium text-ink opacity-50 cursor-not-allowed"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sea/10 text-sea flex-shrink-0">
            <Lock className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Email & Password</p>
            <p className="text-xs text-slate-600">Sign in with your email and password</p>
          </div>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Coming soon</span>
        </button>

        {/* Email + OTP Button — disabled */}
        <button
          disabled
          className="flex items-center gap-3 w-full px-4 py-4 rounded-lg border-2 border-slate-200 text-left font-medium text-ink opacity-50 cursor-not-allowed"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-coral/10 text-coral flex-shrink-0">
            <MailOpen className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Email & OTP</p>
            <p className="text-xs text-slate-600">Get a one-time code sent to your email</p>
          </div>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Coming soon</span>
        </button>
      </div>

      {/* Sign Up Link */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center">
        <p className="text-sm text-slate-600">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-semibold text-sea hover:text-sea/80 transition-colors">
            Create one in seconds
          </Link>
        </p>
      </div>
    </div>
  );
}