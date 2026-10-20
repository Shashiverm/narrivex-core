'use client';

import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  accent: 'sea' | 'electric' | 'coral';
  delay?: number;
}

export function StatCard({ label, value, trend, icon: Icon, accent, delay = 0 }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState('0');
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    const duration = 1200;
    const steps = 30;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += numericValue / steps;
      if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
      }
      setDisplayValue(Math.round(current).toString());
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  const isPositive = trend.startsWith('+');

  const accentStyles = {
    sea: {
      icon: 'bg-sea/10 text-sea dark:bg-sea/20 dark:text-sea-light',
      sparkline: isPositive ? '#0ea5e9' : '#f43f5e',
      borderGlow: 'hover:border-sea/40',
    },
    electric: {
      icon: 'bg-electric/10 text-electric dark:bg-electric/20 dark:text-indigo-400',
      sparkline: '#6366f1',
      borderGlow: 'hover:border-electric/40',
    },
    coral: {
      icon: 'bg-coral/10 text-coral dark:bg-coral/20 dark:text-orange-400',
      sparkline: '#f97316',
      borderGlow: 'hover:border-coral/40',
    },
  }[accent];

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={`glass-panel group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xs backdrop-blur-md transition-all duration-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900/80 ${accentStyles.borderGlow}`}
    >
      <div className="flex items-start justify-between">
        <p className="dashboard-panel-label text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <div className={`rounded-xl p-2.5 transition-transform duration-200 group-hover:scale-110 ${accentStyles.icon}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="dashboard-panel-value font-display text-3xl font-bold text-slate-900 dark:text-white">
            {displayValue}
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${
                isPositive
                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                  : 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
              }`}
            >
              <svg
                className={`h-3 w-3 ${isPositive ? '' : 'rotate-180'}`}
                viewBox="0 0 12 12"
                fill="none"
              >
                <path d="M6 2L10 7H2L6 2Z" fill="currentColor" />
              </svg>
              {trend}
            </span>
            <span className="text-[10px] text-slate-400">vs yesterday</span>
          </div>
        </div>

        {/* Mini sparkline indicator */}
        <div className="h-8 w-20 shrink-0 opacity-80 group-hover:opacity-100 transition">
          <svg viewBox="0 0 80 32" className="h-full w-full overflow-visible">
            <defs>
              <linearGradient id={`grad-${accent}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accentStyles.sparkline} stopOpacity="0.4" />
                <stop offset="100%" stopColor={accentStyles.sparkline} stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d={
                isPositive
                  ? 'M0 26 Q 15 24, 30 18 T 50 14 T 70 8 T 80 4'
                  : 'M0 6 Q 20 8, 35 15 T 55 22 T 80 28'
              }
              fill="none"
              stroke={accentStyles.sparkline}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </motion.article>
  );
}
