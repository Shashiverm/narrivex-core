'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Settings, Bell, WalletCards, Zap, Globe, Sparkles, Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Markets', href: '/markets', icon: Globe },
  { name: 'Assets', href: '/assets', icon: WalletCards },
  { name: 'Alerts', href: '/alerts', icon: Bell, badge: 3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'dashboard-sidebar flex w-64 flex-col border-r border-slate-200/80 bg-white/90 backdrop-blur-xl transition-colors duration-200 dark:border-white/10 dark:bg-slate-950/90',
        className
      )}
    >
      {/* Brand lockup */}
      <div className="border-b border-slate-100 px-5 py-5 dark:border-white/5">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sea via-teal-400 to-mint shadow-md shadow-sea/20 transition-transform duration-200 group-hover:scale-105">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="dashboard-heading font-display text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
              Narrivex
            </h2>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-sea dark:text-sea-light">
              AI Market Terminal
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Main Workspace
        </p>
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => {
                onNavigate?.();
                trackEvent('sidebar_nav_click', { destination: item.href, label: item.name });
              }}
              className={cn(
                'dashboard-nav-link group relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200',
                isActive
                  ? 'dashboard-nav-active bg-sea/10 text-sea dark:bg-sea/15 dark:text-sea-light font-bold ring-1 ring-sea/30'
                  : 'dashboard-nav-idle text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100'
              )}
            >
              <Icon
                className={cn(
                  'h-[18px] w-[18px] transition',
                  isActive
                    ? 'text-sea dark:text-sea-light'
                    : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                )}
              />
              <span>{item.name}</span>
              {item.badge && (
                <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-coral/15 px-1.5 text-[10px] font-bold text-coral">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* Quick shortcut indicator */}
        <div className="mt-8 px-3">
          <div className="rounded-xl border border-slate-200/60 bg-slate-50/70 p-3 dark:border-white/5 dark:bg-slate-900/60">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <Command className="h-3.5 w-3.5 text-sea" />
              <span>Quick Commands</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Press <kbd className="rounded border border-slate-300 bg-white px-1 font-mono text-[10px] dark:border-white/10 dark:bg-slate-800">⌘K</kbd> to search assets, narratives, or launch rules.
            </p>
          </div>
        </div>
      </nav>

      {/* Gemini AI Status & Plan Badge */}
      <div className="border-t border-slate-100 p-4 space-y-2 dark:border-white/5">
        <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-sea/10 to-mint/10 p-2.5 border border-sea/20">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sea text-white shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">Gemini 1.5 Pro</p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Active · 99.9% SLA</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
            ONLINE
          </span>
        </div>
      </div>
    </aside>
  );
}