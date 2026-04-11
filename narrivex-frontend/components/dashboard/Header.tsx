'use client';

import { Menu } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { data: session } = useSession();

  return (
    <header className="dashboard-header border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-start gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h1 className="dashboard-heading truncate font-display text-2xl font-bold">Narrivex</h1>
            <p className="dashboard-subheading text-sm text-slate-500">Realtime narrative dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="dashboard-user-email hidden text-sm text-slate-600 sm:inline">{session?.user?.email}</span>
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
  );
}