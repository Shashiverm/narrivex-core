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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-200 bg-white">
      <div className="space-y-6 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => trackEvent('sidebar_nav_click', { destination: item.href, label: item.name })}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 font-semibold transition',
                isActive ? 'bg-sea/10 text-sea' : 'text-slate-700 hover:bg-slate-100'
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