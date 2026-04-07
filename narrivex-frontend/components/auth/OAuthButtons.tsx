'use client';

import { Github, Chrome } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

export function OAuthButtons({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-3">
      <Button
        type="button"
        className="w-full h-11 font-medium bg-slate-900 hover:bg-slate-800 text-white"
        disabled={disabled}
        onClick={() => {
          trackEvent('login_oauth_click', { provider: 'github' });
          signIn('github', { callbackUrl: '/dashboard' });
        }}
      >
        <Github className="mr-2 h-5 w-5" />
        Continue with GitHub
      </Button>
      <Button
        type="button"
        className="w-full h-11 font-medium border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
        variant="outline"
        disabled={disabled}
        onClick={() => {
          trackEvent('login_oauth_click', { provider: 'google' });
          signIn('google', { callbackUrl: '/dashboard' });
        }}
      >
        <Chrome className="mr-2 h-5 w-5 text-blue-600" />
        Continue with Google
      </Button>
    </div>
  );
}