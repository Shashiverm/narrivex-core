import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'default' | 'outline' | 'ghost';
type ButtonSize = 'default' | 'sm' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ className, variant = 'default', size = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'default' && 'bg-sea px-4 py-2 text-white hover:bg-sea/90',
        variant === 'outline' && 'border border-slate-300 bg-white px-4 py-2 text-slate-900 hover:bg-slate-50',
        variant === 'ghost' && 'px-4 py-2 text-slate-700 hover:bg-white/70',
        size === 'sm' && 'h-8 px-3 text-xs',
        size === 'default' && 'h-10',
        size === 'lg' && 'h-12 px-6 text-base',
        className
      )}
      {...props}
    />
  );
}
