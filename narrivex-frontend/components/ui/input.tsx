import { cn } from '@/lib/utils';
import type { InputHTMLAttributes } from 'react';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition duration-150 focus:border-sea focus:ring-2 focus:ring-sea/25 dark:border-white/[0.08] dark:bg-[#0c121e] dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-sea shadow-2xs',
        className
      )}
      {...props}
    />
  );
}

