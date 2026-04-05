'use client';

import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Narrivex</h1>
          <p className="text-sm text-slate-500">Realtime narrative dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-600">{session?.user?.email}</span>
          <Button variant="outline" onClick={() => signOut({ callbackUrl: '/' })}>
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
}