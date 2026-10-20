'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, Bell, Search, Wifi, WifiOff, Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';
import { SearchModal } from './SearchModal';
import Link from 'next/link';

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
    second: '2-digit',
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

const mockQuickAlerts = [
  { id: '1', title: 'BTC Volatility Surge', desc: '+4.8% move broke $96,000 psychological resistance', time: '2m ago', unread: true },
  { id: '2', title: 'ETH Whales Inflow', desc: '42,000 ETH accumulated on Coinbase Prime', time: '14m ago', unread: true },
  { id: '3', title: 'NVDA AI Narrative Updated', desc: 'Supply chain acceleration notes added', time: '38m ago', unread: false },
];

export function Header({ onMenuClick }: HeaderProps) {
  const { data: session } = useSession();
  const [now, setNow] = useState(new Date());
  const [isConnected, setIsConnected] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [unreadCount, setUnreadCount] = useState(2);
  const [alerts, setAlerts] = useState(mockQuickAlerts);
  const notifRef = useRef<HTMLDivElement>(null);

  // Sync theme on mount
  useEffect(() => {
    const storedTheme = window.localStorage.getItem('narrivex-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const activeTheme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : prefersDark ? 'dark' : 'light';
    setTheme(activeTheme);
    document.documentElement.classList.toggle('theme-dark', activeTheme === 'dark');
    document.documentElement.classList.toggle('theme-light', activeTheme === 'light');
    document.documentElement.classList.toggle('dark', activeTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    window.localStorage.setItem('narrivex-theme', nextTheme);
    document.documentElement.classList.toggle('theme-dark', nextTheme === 'dark');
    document.documentElement.classList.toggle('theme-light', nextTheme === 'light');
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    trackEvent('theme_toggle', { theme: nextTheme });
  };

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

    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('keydown', handleGlobalKeyDown);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const markAllRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, unread: false })));
    setUnreadCount(0);
    trackEvent('alerts_mark_all_read');
  };

  const firstName =
    session?.user?.name?.split(' ')[0] || session?.user?.email?.split('@')[0] || 'Trader';
  const initial = firstName.charAt(0).toUpperCase();

  return (
    <>
      <header className="dashboard-header sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl transition-colors duration-200 dark:border-white/10 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          {/* Left section: mobile hamburger & greeting */}
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={onMenuClick}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="dashboard-heading flex items-center gap-2 truncate font-display text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
                  {getGreeting()}, {firstName}
                </h1>
                <span className="hidden items-center gap-1 rounded-full border border-sea/30 bg-sea/10 px-2 py-0.5 text-[10px] font-bold text-sea dark:bg-sea/20 md:inline-flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-sea animate-pulse" />
                  PRO TERMINAL
                </span>
              </div>

              <div className="dashboard-subheading mt-0.5 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-mono font-medium">{formatTime(now)}</span>
                <span className="text-slate-300 dark:text-slate-600">·</span>
                <span className="hidden sm:inline">{formatDate(now)}</span>
                <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">·</span>
                <span className="flex items-center gap-1">
                  {isConnected ? (
                    <>
                      <Wifi className="h-3 w-3 text-emerald-500" />
                      <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        18ms · Live Feed
                      </span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-3 w-3 text-rose-500" />
                      <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                        Disconnected
                      </span>
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Right section: Search, theme toggle, notifications, profile */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick search button */}
            <button
              type="button"
              onClick={() => {
                trackEvent('search_trigger_click');
                setIsSearchOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-slate-50/80 px-2.5 py-1.5 text-xs text-slate-500 transition hover:border-sea/50 hover:bg-white dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:border-sea/40 dark:hover:bg-slate-800/90 sm:px-3 sm:py-2 sm:text-sm"
              aria-label="Search assets"
            >
              <Search className="h-4 w-4 text-sea" />
              <span className="hidden text-xs md:inline">Search assets…</span>
              <kbd className="hidden rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-400 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300 lg:inline">
                ⌘K
              </kbd>
            </button>

            {/* Dark / Light Mode Switcher */}
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/90 bg-white text-slate-600 shadow-2xs transition hover:border-sea/50 hover:bg-slate-50 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sea/40 dark:hover:bg-slate-800 dark:hover:text-white"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-amber-400 transition-transform duration-200 hover:rotate-45" />
              ) : (
                <Moon className="h-4 w-4 text-slate-700 transition-transform duration-200 hover:-rotate-12" />
              )}
            </button>

            {/* Notifications Popover */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/90 bg-white text-slate-600 shadow-2xs transition hover:border-sea/50 hover:bg-slate-50 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sea/40 dark:hover:bg-slate-800 dark:hover:text-white"
                aria-label="Notifications"
                aria-expanded={isNotificationsOpen}
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-coral text-[9px] font-bold text-white shadow-xs">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-bold text-slate-900 dark:text-white">
                        Live Notifications
                      </span>
                      {unreadCount > 0 && (
                        <span className="rounded-full bg-coral/15 px-2 py-0.5 text-[10px] font-bold text-coral">
                          {unreadCount} new
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        title={soundEnabled ? 'Mute alert sounds' : 'Enable alert sounds'}
                      >
                        {soundEnabled ? <Volume2 className="h-3.5 w-3.5 text-sea" /> : <VolumeX className="h-3.5 w-3.5 text-slate-400" />}
                      </button>
                      <button
                        type="button"
                        onClick={markAllRead}
                        className="text-[11px] font-semibold text-sea hover:underline"
                      >
                        Mark read
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 divide-y divide-slate-100 dark:divide-white/5 max-h-72 overflow-y-auto">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`group relative p-2.5 transition-colors rounded-xl ${
                          alert.unread ? 'bg-sea/5 dark:bg-sea/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {alert.unread && <span className="h-2 w-2 rounded-full bg-coral shrink-0" />}
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {alert.title}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 shrink-0">{alert.time}</span>
                        </div>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                          {alert.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 border-t border-slate-100 pt-2.5 text-center dark:border-white/5">
                    <Link
                      href="/alerts"
                      onClick={() => setIsNotificationsOpen(false)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-sea hover:underline"
                    >
                      View all custom alert rules →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar & Profile status */}
            <div className="hidden sm:flex items-center gap-2 rounded-xl border border-slate-200/90 bg-slate-50/70 p-1 pr-3 dark:border-white/10 dark:bg-slate-900/70">
              <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-sea to-electric text-xs font-bold text-white shadow-xs">
                {initial}
                <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-none">
                  {firstName}
                </span>
                <span className="text-[10px] text-slate-400 leading-none mt-0.5 truncate max-w-[110px]">
                  {session?.user?.email}
                </span>
              </div>
            </div>

            {/* Sign Out Button */}
            <Button
              variant="outline"
              size="sm"
              className="dashboard-signout h-9 text-xs font-semibold dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
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