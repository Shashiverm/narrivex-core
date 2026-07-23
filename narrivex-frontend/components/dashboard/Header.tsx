'use client';

import { useEffect, useState } from 'react';
import { Menu, Bell, Search, Wifi, WifiOff } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';
import { SearchModal } from './SearchModal';

interface HeaderProps {
  onMenuClick?: () => void;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function Header({ onMenuClick }: HeaderProps) {
  const { data: session } = useSession();
  const [now, setNow] = useState(new Date());
  const [isConnected, setIsConnected] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsConnected(true);
    const handleOffline = () => setIsConnected(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  const firstName =
    session?.user?.name?.split(' ')[0] || session?.user?.email?.split('@')[0] || 'Trader';

  return (
    <>
      <header className="dashboard-header border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={onMenuClick}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <h1 className="dashboard-heading flex items-center gap-2 truncate font-display text-xl font-bold sm:text-2xl">
                {getGreeting()}, {firstName}
                <span className="hidden text-sm font-normal text-slate-400 sm:inline">
                  — {formatDate(now)}
                </span>
              </h1>
              <p className="dashboard-subheading flex items-center gap-2 text-sm text-slate-500">
                <span className="font-display font-medium tracking-tight">{formatTime(now)}</span>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1">
                  {isConnected ? (
                    <>
                      <Wifi className="h-3 w-3 text-emerald-500" />
                      <span className="text-xs text-emerald-600">Connected</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-3 w-3 text-rose-500" />
                      <span className="text-xs text-rose-600">Offline</span>
                    </>
                  )}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                trackEvent('search_trigger_click');
                setIsSearchOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-sm text-slate-500 transition hover:border-sea/50 hover:bg-white"
              aria-label="Search assets"
            >
              <Search className="h-4 w-4 text-sea" />
              <span className="hidden text-xs md:inline">Search markets…</span>
              <kbd className="hidden rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 lg:inline">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-coral text-[9px] font-bold text-white">
                3
              </span>
            </button>

            <span className="dashboard-user-email hidden text-sm text-slate-600 sm:inline">
              {session?.user?.email}
            </span>

            <Button
              variant="outline"
              className="dashboard-signout"
              onClick={() => {
                trackEvent('sign_out_click');
                signOut({ callbackUrl: '/' });
              }}
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}