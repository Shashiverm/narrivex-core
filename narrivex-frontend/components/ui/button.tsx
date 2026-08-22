import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'secondary' | 'terminal';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ className, variant = 'default', size = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium tracking-tight select-none transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea/50 disabled:pointer-events-none disabled:opacity-50',
        
        // Variant: Default / Primary
        variant === 'default' &&
          'bg-sea text-white shadow-sm hover:bg-sea/90 border border-sea-dark/20 dark:border-sea/30 font-semibold',

        // Variant: Secondary
        variant === 'secondary' &&
          'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700/80 border border-slate-200/60 dark:border-slate-700/60',

        // Variant: Outline
        variant === 'outline' &&
          'border border-slate-300/80 bg-white/80 text-slate-800 shadow-xs hover:bg-slate-50 hover:border-slate-400/80 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800/80 dark:hover:border-slate-700 backdrop-blur-xs',

        // Variant: Ghost
        variant === 'ghost' &&
          'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white',

        // Variant: Terminal
        variant === 'terminal' &&
          'font-mono border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 shadow-xs',

        // Sizes
        size === 'sm' && 'h-8 px-3 text-xs rounded-lg gap-1.5',
        size === 'default' && 'h-9.5 px-4 py-2 text-xs sm:text-sm rounded-xl gap-2',
        size === 'lg' && 'h-11 px-6 text-sm sm:text-base rounded-xl gap-2 font-semibold',
        size === 'icon' && 'h-9 w-9 p-0 rounded-lg',

        className
      )}
      {...props}
    />
  );
}
