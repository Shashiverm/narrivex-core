'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Settings, Bell, WalletCards, Zap, Globe } from 'lucide-react';
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
    <aside className={cn('dashboard-sidebar flex w-64 flex-col border-r border-slate-200 bg-white', className)}>
      {/* Brand lockup */}
      <div className="border-b border-slate-100 px-5 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sea to-mint shadow-md shadow-sea/20">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="dashboard-heading font-display text-lg font-bold leading-tight tracking-tight">
              Narrivex
            </h2>
            <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">
              AI Narratives
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          Menu
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
                  ? 'dashboard-nav-active sidebar-active-glow bg-sea/10 text-sea'
                  : 'dashboard-nav-idle text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              )}
            >
              <Icon className={cn('h-[18px] w-[18px] transition', isActive ? 'text-sea' : 'text-slate-400 group-hover:text-slate-600')} />
              {item.name}
              {item.badge && (
                <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-coral/15 px-1.5 text-[10px] font-bold text-coral">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Plan badge */}
      <div className="border-t border-slate-100 px-5 py-4">
        <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sea/5 to-mint/5 px-3 py-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-sea/15">
            <Zap className="h-3.5 w-3.5 text-sea" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-700 dashboard-card-heading">Pro Plan</p>
            <p className="text-[10px] text-slate-500 dashboard-card-text">All features unlocked</p>
          </div>
        </div>
      </div>
    </aside>
  );
}