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
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-600'];

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
        <div className="space-y-2 text-center">
          <div className="inline-block h-8 w-8 border-2 border-sea border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 mt-4">Validating reset link...</p>
        </div>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-bold text-ink">Invalid reset link</h1>
          <p className="text-slate-600">The password reset link is missing or invalid.</p>
        </div>

        {/* Error Box */}
        <div className="rounded-lg bg-red-50 border border-red-200 p-6 space-y-4">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 flex-shrink-0">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-red-900">Reset link is invalid</p>
              <p className="text-sm text-red-700 mt-1">
                Please request a new password reset link and try again. Reset links expire after 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/forgot-password" className="block w-full">
            <Button className="w-full">Request new reset link</Button>
          </Link>
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
        <h1 className="font-display text-3xl font-bold text-ink">Create new password</h1>
        <p className="text-slate-600">Enter a new password below. Make sure it&apos;s strong and unique.</p>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* New Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-ink">New password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              disabled={isLoading}
              className="pl-10 pr-10"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
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

          {/* Password Strength Indicator */}
          {newPassword && (
            <div className="mt-3 space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Password strength</span>
                  <span className={`font-semibold`}>{strengthLabels[strength - 1] || 'Weak'}</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${strengthColors[strength - 1] || 'bg-slate-300'}`}
                    style={{ width: `${(strength / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                {passwordRequirements.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <div
                      className={`h-4 w-4 rounded-full flex items-center justify-center ${
                        req.met ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-300'
                      }`}
                    >
                      {req.met && <Check className="h-3 w-3" />}
                    </div>
                    <span className={req.met ? 'text-slate-700' : 'text-slate-500'}>{req.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-ink">Confirm password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              disabled={isLoading}
              className="pl-10 pr-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors"
              disabled={isLoading}
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {confirmPassword && newPassword !== confirmPassword && (
            <p className="mt-1.5 flex items-center gap-1 text-sm text-red-600">
              <span className="inline-block h-1 w-1 rounded-full bg-red-600" />
              Passwords do not match
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full py-6 text-base font-semibold" disabled={isLoading || newPassword !== confirmPassword || !newPassword}>
          {isLoading ? (
            <>
              <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Resetting password...
            </>
          ) : (
            <>
              Reset password
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>

      {/* Help Text */}
      <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-center">
        <p className="text-sm text-slate-600">
          Did you not request this?{' '}
          <Link href="/login" className="font-semibold text-sea hover:text-sea/80 transition-colors">
            Sign in to your account
          </Link>
        </p>
      </div>
    </div>
  );
}
