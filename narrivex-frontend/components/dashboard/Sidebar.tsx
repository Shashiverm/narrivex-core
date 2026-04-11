'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Settings, Bell, WalletCards } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Assets', href: '/assets', icon: WalletCards },
  { name: 'Alerts', href: '/dashboard', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn('dashboard-sidebar w-64 border-r border-slate-200 bg-white', className)}>
      <div className="space-y-6 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                onNavigate?.();
                trackEvent('sidebar_nav_click', { destination: item.href, label: item.name });
              }}
              className={cn(
                'dashboard-nav-link flex items-center gap-3 rounded-lg px-4 py-3 font-semibold transition',
                isActive ? 'dashboard-nav-active bg-sea/10 text-sea' : 'dashboard-nav-idle text-slate-700 hover:bg-slate-100'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}