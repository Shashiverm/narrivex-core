'use client';

import { useEffect, useState } from 'react';
import { ComplianceModalLinks } from '@/components/common/ComplianceModal';
import { trackEvent } from '@/lib/analytics';
import { Sun, Moon } from 'lucide-react';

export function Footer() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('narrivex-theme');
    const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : preferredDark ? 'dark' : 'light';
    const shouldShowFooter = window.localStorage.getItem('narrivex-footer-open') === 'true';

    setTheme(initialTheme);
    setIsVisible(shouldShowFooter);
    document.documentElement.classList.toggle('theme-dark', initialTheme === 'dark');
    document.documentElement.classList.toggle('theme-light', initialTheme === 'light');
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  useEffect(() => {
    window.localStorage.setItem('narrivex-footer-open', isVisible ? 'true' : 'false');
  }, [isVisible]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    window.localStorage.setItem('narrivex-theme', nextTheme);
    document.documentElement.classList.toggle('theme-dark', nextTheme === 'dark');
    document.documentElement.classList.toggle('theme-light', nextTheme === 'light');
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    trackEvent('theme_toggle', { theme: nextTheme });
  };

  return (
    <>
      {!isVisible && (
        <button
          type="button"
          onClick={() => setIsVisible(true)}
          className="fixed right-4 bottom-4 z-[65] rounded-full border border-slate-200/80 bg-white/90 px-3.5 py-1.5 font-mono text-xs font-semibold text-slate-700 shadow-lg backdrop-blur transition hover:border-sea/50 hover:text-sea dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300"
        >
          Options
        </button>
      )}

      <footer
        className={`fixed inset-x-0 bottom-0 z-[60] border-t border-slate-200/80 bg-white/90 shadow-xl backdrop-blur transition-all duration-300 dark:border-slate-800/80 dark:bg-slate-950/90 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[calc(100%+8px)] opacity-0 pointer-events-none'
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-2.5 px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] text-xs text-slate-600 dark:text-slate-400 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-display font-bold text-slate-900 dark:text-white">Narrivex Intelligence</span>
              <ComplianceModalLinks className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px]" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 font-mono text-[11px] font-semibold text-slate-700 transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700"
              >
                {theme === 'dark' ? <Moon className="h-3 w-3 text-sky-400" /> : <Sun className="h-3 w-3 text-amber-500" />}
                <span>{theme === 'dark' ? 'Dark' : 'Light'} Mode</span>
              </button>
              <button
                type="button"
                onClick={() => setIsVisible(false)}
                className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 font-mono text-[11px] font-semibold text-slate-600 transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
              >
                Hide
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-slate-400">
            <span>Engineering & Infrastructure Desk</span>
            <span>•</span>
            <span>Contact: info@narrivex.tech</span>
            <span>•</span>
            <a
              href="https://x.com/narrivex"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-sea hover:underline"
              onClick={() => trackEvent('footer_social_click', { platform: 'x' })}
            >
              X: @narrivex
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}