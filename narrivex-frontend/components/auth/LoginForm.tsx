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

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

type AuthMethod = 'options' | 'password' | 'otp';

export function LoginForm() {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('options');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    trackEvent('login_attempt', { method: 'credentials' });
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.ok) {
      trackEvent('login_success', { method: 'credentials' });
      toast.success('Welcome back! 🎉');
      router.push('/dashboard');
    } else {
      trackEvent('login_failed', {
        method: 'credentials',
        error: result?.error || 'invalid_credentials',
      });
      toast.error('Invalid email or password. Please try again.');
    }
    setIsLoading(false);
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

      {/* Email Auth Options */}
      <div className="grid gap-3">
        {/* Email + Password Button */}
        <button
          onClick={() => {
            trackEvent('login_method_selected', { method: 'password' });
            setAuthMethod('password');
          }}
          className="flex items-center gap-3 w-full px-4 py-4 rounded-lg border-2 border-slate-200 hover:border-sea hover:bg-sea/5 transition-all text-left font-medium text-ink"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sea/10 text-sea flex-shrink-0">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold">Email & Password</p>
            <p className="text-xs text-slate-600">Sign in with your email and password</p>
          </div>
        </button>

        {/* Email + OTP Button */}
        <button
          onClick={() => {
            trackEvent('login_method_selected', { method: 'otp' });
            setAuthMethod('otp');
          }}
          className="flex items-center gap-3 w-full px-4 py-4 rounded-lg border-2 border-slate-200 hover:border-coral hover:bg-coral/5 transition-all text-left font-medium text-ink"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-coral/10 text-coral flex-shrink-0">
            <MailOpen className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold">Email & OTP</p>
            <p className="text-xs text-slate-600">Get a one-time code sent to your email</p>
          </div>
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