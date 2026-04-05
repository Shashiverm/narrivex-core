'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      await apiClientSignup(data);
      toast.success('Account created. Please sign in.');
      router.push('/login');
    } catch {
      toast.error('Signup failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-5 rounded-2xl border border-black/10 bg-white/80 p-8 shadow-sm">
      <div>
        <h1 className="font-display text-3xl font-bold">Create account</h1>
        <p className="mt-1 text-slate-600">Start your narrative intelligence workspace.</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input placeholder="Your name" disabled={isLoading} {...register('name')} />
          {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name.message}</p> : null}
        </div>
        <div>
          <Input type="email" placeholder="you@example.com" disabled={isLoading} {...register('email')} />
          {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
        </div>
        <div>
          <Input type="password" placeholder="Password" disabled={isLoading} {...register('password')} />
          {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password.message}</p> : null}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create account'}
        </Button>
      </form>

      <p className="text-sm text-slate-600">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-sea">
          Sign in
        </Link>
      </p>
    </div>
  );
}

async function apiClientSignup(payload: SignupFormData) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/auth/signup`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Signup failed');
  }

  return response.json();
}