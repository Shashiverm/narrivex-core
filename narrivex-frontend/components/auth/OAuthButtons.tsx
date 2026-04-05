'use client';

import { Github, Chrome } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function OAuthButtons({ disabled }: { disabled?: boolean }) {
  return (
    <div className="space-y-3">
      <Button className="w-full" variant="outline" disabled={disabled} onClick={() => signIn('github', { callbackUrl: '/dashboard' })}>
        <Github className="mr-2 h-4 w-4" />
        Continue with GitHub
      </Button>
      <Button className="w-full" variant="outline" disabled={disabled} onClick={() => signIn('google', { callbackUrl: '/dashboard' })}>
        <Chrome className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
    </div>
  );
}