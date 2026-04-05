'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OAuthButtons } from './OAuthButtons';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.ok) {
      toast.success('Welcome back');
      router.push('/dashboard');
    } else {
      toast.error('Invalid credentials');
    }
    setIsLoading(false);
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-5 rounded-2xl border border-black/10 bg-white/80 p-8 shadow-sm">
      <div>
        <h1 className="font-display text-3xl font-bold">Welcome back</h1>
        <p className="mt-1 text-slate-600">Sign in to continue to Narrivex.</p>
      </div>

      <OAuthButtons disabled={isLoading} />

      <div className="text-center text-xs text-slate-500">or use email and password</div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input type="email" placeholder="you@example.com" disabled={isLoading} {...register('email')} />
          {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
        </div>
        <div>
          <Input type="password" placeholder="Password" disabled={isLoading} {...register('password')} />
          {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password.message}</p> : null}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <p className="text-sm text-slate-600">
        New here?{' '}
        <Link href="/signup" className="font-semibold text-sea">
          Create an account
        </Link>
      </p>
    </div>
  );
}