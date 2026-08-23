'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Lock, ArrowRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isValidating, setIsValidating] = useState(true);

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    // Validate that we have both token and email
    if (!token || !email) {
      setIsValid(false);
      setIsValidating(false);
    } else {
      setIsValid(true);
      setIsValidating(false);
    }
  }, [token, email]);

  const getPasswordStrength = () => {
    if (!newPassword) return 0;
    let strength = 0;
    if (newPassword.length >= 8) strength++;
    if (newPassword.length >= 12) strength++;
    if (/[A-Z]/.test(newPassword)) strength++;
    if (/[a-z]/.test(newPassword)) strength++;
    if (/[0-9]/.test(newPassword)) strength++;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength++;
    return Math.min(strength, 5);
  };

  const passwordRequirements = [
    { met: newPassword.length >= 6, text: 'At least 6 characters' },
    { met: /[A-Z]/.test(newPassword), text: 'One uppercase letter' },
    { met: /[a-z]/.test(newPassword), text: 'One lowercase letter' },
    { met: /[0-9]/.test(newPassword), text: 'One number' },
  ];

  const strength = getPasswordStrength();
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const strengthColors = ['bg-rose-500', 'bg-amber-500', 'bg-yellow-500', 'bg-emerald-500', 'bg-emerald-600'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${apiBase}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          email,
          password: newPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to reset password');
      }

      toast.success('Password reset successfully! Redirecting to sign in...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to reset password';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isValidating) {
    return (
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center font-mono">
          <div className="inline-block h-7 w-7 border-2 border-sea border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">Validating security token...</p>
        </div>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Invalid reset link</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">The password reset link is missing or expired.</p>
        </div>

        {/* Error Box */}
        <div className="rounded-2xl bg-rose-50/80 border border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/40 p-5 space-y-3">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex-shrink-0">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-rose-900 dark:text-rose-200 text-sm">Security token invalid</p>
              <p className="text-xs text-rose-700 dark:text-rose-400 mt-1 leading-relaxed">
                Please request a fresh password reset link. Reset tokens automatically expire after 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/forgot-password" className="block w-full">
            <Button className="w-full bg-sea hover:bg-sea/90 text-white font-bold py-5">Request new reset link</Button>
          </Link>
          <Link href="/login" className="block w-full">
            <Button variant="outline" className="w-full dark:border-white/[0.08] dark:hover:bg-white/[0.04]">
              Back to sign in
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Create new password</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">Enter a secure, unique password below.</p>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* New Password */}
        <div>
          <label className="mb-2 block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">New password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              disabled={isLoading}
              className="pl-10 pr-10 dark:border-white/[0.08] dark:bg-[#0c121e] text-sm"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {newPassword && (
            <div className="mt-3 space-y-2.5 font-mono text-xs">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">Password strength:</span>
                  <span className="font-bold text-slate-200">{strengthLabels[strength - 1] || 'Weak'}</span>
                </div>
                <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${strengthColors[strength - 1] || 'bg-slate-400'}`}
                    style={{ width: `${(strength / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                {passwordRequirements.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px]">
                    <div
                      className={`h-3.5 w-3.5 rounded-full flex items-center justify-center ${
                        req.met ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-100 text-slate-400 dark:bg-white/[0.06] dark:text-slate-500'
                      }`}
                    >
                      {req.met && <Check className="h-2.5 w-2.5" />}
                    </div>
                    <span className={req.met ? 'text-slate-700 dark:text-slate-300 font-medium' : 'text-slate-400 dark:text-slate-500'}>{req.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-2 block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">Confirm password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              disabled={isLoading}
              className="pl-10 pr-10 dark:border-white/[0.08] dark:bg-[#0c121e] text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
              disabled={isLoading}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {confirmPassword && newPassword !== confirmPassword && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-500 font-mono">
              <span className="inline-block h-1 w-1 rounded-full bg-rose-500" />
              Passwords do not match
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full py-5 text-sm font-bold bg-sea hover:bg-sea/90 text-white shadow-sm" disabled={isLoading || newPassword !== confirmPassword || !newPassword}>
          {isLoading ? (
            <>
              <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Resetting password...
            </>
          ) : (
            <>
              Confirm New Password
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      {/* Help Text */}
      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-center dark:bg-[#0c121e]/80 dark:border-white/[0.06]">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Did you not request this?{' '}
          <Link href="/login" className="font-semibold text-sea hover:underline transition-colors">
            Sign in to your account
          </Link>
        </p>
      </div>
    </div>
  );
}

