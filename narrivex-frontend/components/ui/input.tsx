import { cn } from '@/lib/utils';
import type { InputHTMLAttributes } from 'react';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none ring-sea/40 transition focus:ring-2',
        className
      )}
      {...props}
    />
  );
}
