'use client';

import { useEffect, useRef, useState } from 'react';
import { ComplianceModalLinks } from '@/components/common/ComplianceModal';
import { trackEvent } from '@/lib/analytics';

export function Footer() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('narrivex-theme');
    const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : preferredDark ? 'dark' : 'light';

    setTheme(initialTheme);
    document.documentElement.classList.toggle('theme-dark', initialTheme === 'dark');
    document.documentElement.classList.toggle('theme-light', initialTheme === 'light');
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const updateViewportFlags = () => {
      setIsMobile(mediaQuery.matches);
    };

    const updateCookieState = () => {
      setIsCookieBannerVisible(document.body.dataset.cookieBannerVisible === 'true');
    };

    updateViewportFlags();
    updateCookieState();
    mediaQuery.addEventListener('change', updateViewportFlags);
    window.addEventListener('cookie-banner-visibility', updateCookieState as EventListener);

    return () => {
      mediaQuery.removeEventListener('change', updateViewportFlags);
      window.removeEventListener('cookie-banner-visibility', updateCookieState as EventListener);
    };
  }, []);

  useEffect(() => {
    if (isMobile || isCookieBannerVisible) {
      setIsVisible(true);
    }
  }, [isMobile, isCookieBannerVisible]);

  useEffect(() => {
    if (isMobile) {
      return;
    }

    const handleScroll = () => {
      const currentY = window.scrollY;
      const directionDelta = currentY - lastScrollY.current;
      const nearTop = currentY < 40;
      const nearBottom = window.innerHeight + currentY >= document.documentElement.scrollHeight - 140;

      if (nearTop || nearBottom) {
        setIsVisible(true);
      } else if (directionDelta > 8) {
        setIsVisible(false);
      } else if (directionDelta < -8) {
        setIsVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    window.localStorage.setItem('narrivex-theme', nextTheme);
    document.documentElement.classList.toggle('theme-dark', nextTheme === 'dark');
    document.documentElement.classList.toggle('theme-light', nextTheme === 'light');
    trackEvent('theme_toggle', { theme: nextTheme });
  };

  return (
    <>
      {!isVisible && !isMobile && (
        <button
          type="button"
          onClick={() => setIsVisible(true)}
          className="footer-reveal-btn fixed right-4 bottom-4 z-[65] rounded-full border border-black/15 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-700 shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:border-sea/50 hover:text-sea"
        >
          Open footer
        </button>
      )}

      <footer
        className={`footer-shell fixed bottom-0 left-0 right-0 border-t border-black/10 bg-white/85 backdrop-blur transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[calc(100%+8px)] opacity-0'
        }`}
      >
        <div className="footer-content mx-auto max-w-6xl px-4 py-3 text-xs text-slate-600 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span>Narrivex</span>
              <ComplianceModalLinks className="flex flex-wrap items-center gap-x-4 gap-y-2" />
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="theme-toggle-btn group inline-flex w-fit items-center gap-2 self-start rounded-full border border-black/15 bg-gradient-to-r from-slate-100 to-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sea/50 hover:shadow-md sm:self-auto"
            >
              <span className="theme-toggle-track relative h-5 w-9 rounded-full bg-slate-300/90 p-[2px] transition-colors duration-300">
                <span
                  className={`block h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-300 ${
                    theme === 'dark' ? 'translate-x-4 bg-sky-100' : 'translate-x-0 bg-amber-100'
                  }`}
                />
              </span>
              <span className="tracking-wide">
                {theme === 'dark' ? 'Dark' : 'Light'} mode
              </span>
            </button>
          </div>
          <div className="footer-meta mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
            <span>Contact: info@narrivex.tech</span>
            <span>New Delhi, India</span>
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