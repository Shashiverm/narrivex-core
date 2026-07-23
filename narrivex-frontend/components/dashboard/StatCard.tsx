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

  const iconBgMap = {
    sea: 'bg-sea/10 text-sea',
    electric: 'bg-electric/10 text-electric',
    coral: 'bg-coral/10 text-coral',
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={`glass-panel stat-card-accent stat-card-accent--${accent} rounded-2xl p-5`}
    >
      <div className="flex items-start justify-between">
        <p className="dashboard-panel-label text-xs font-medium uppercase tracking-wider text-slate-500">
          {label}
        </p>
        <div className={`rounded-xl p-2 ${iconBgMap[accent]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <p className="dashboard-panel-value font-display text-3xl font-bold text-slate-900">
          {displayValue}
        </p>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            isPositive
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-rose-50 text-rose-600'
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
      </div>
    </motion.article>
  );
}
