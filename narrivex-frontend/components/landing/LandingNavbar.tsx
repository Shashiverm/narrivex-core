'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Terminal, Globe2, Cpu, Zap, LineChart, ChevronRight, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingNavbarProps {
  statusUrl: string;
}

export function LandingNavbar({ statusUrl }: LandingNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Terminal', href: '#product-preview', icon: Terminal },
    { label: 'Asset Matrix', href: '#matrix', icon: Globe2 },
    { label: 'Pipeline', href: '#pipeline', icon: Cpu },
    { label: 'Pricing', href: '#pricing', icon: Zap },
    { label: 'Insights', href: '/insights', icon: LineChart },
  ];

  return (
    <header className="relative mb-10 sm:mb-14 z-50">
      <nav className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 px-3.5 py-2.5 sm:px-5 sm:py-3 shadow-xs backdrop-blur-md dark:border-white/[0.08] dark:bg-[#0d131f]/80">
        {/* Brand Logo & Desktop Links */}
        <div className="flex items-center gap-4 sm:gap-7">
          <Link href="/" className="font-display text-lg sm:text-xl font-bold tracking-tight flex items-center gap-2 text-slate-900 dark:text-white group">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sea text-white font-mono text-xs font-black shadow-sm group-hover:scale-105 transition-transform">
              NX
            </span>
            <span>Narrivex</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-300 font-mono">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-sea transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right side CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={statusUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
            99.99% Feed Uptime
          </a>

          <Link href="/login" className="hidden sm:inline-block">
            <Button variant="ghost" size="sm" className="font-medium text-xs sm:text-sm">
              Sign In
            </Button>
          </Link>

          <Link href="/signup">
            <Button size="sm" className="font-bold bg-sea hover:bg-sea/90 text-white shadow-sm px-2.5 sm:px-3 text-xs sm:text-sm">
              <span className="hidden xs:inline">Start Free Trial</span>
              <span className="xs:hidden">Free Trial</span>
            </Button>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex md:hidden items-center justify-center p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/[0.06] transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-xl backdrop-blur-lg dark:border-white/[0.1] dark:bg-[#0d131f]/95 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1 font-mono text-xs">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/[0.06] transition-colors font-medium"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-sea" />
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.06] space-y-2">
            <a
              href={statusUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-semibold"
            >
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                99.99% Feed Uptime (LD4 & NY4)
              </span>
              <Activity className="h-3.5 w-3.5" />
            </a>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button variant="outline" size="sm" className="w-full text-xs font-semibold dark:border-white/[0.1]">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button size="sm" className="w-full text-xs font-bold bg-sea hover:bg-sea/90 text-white shadow-sm">
                  Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
