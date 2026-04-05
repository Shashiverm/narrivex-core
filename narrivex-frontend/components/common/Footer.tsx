import Link from 'next/link';
import { APP_VERSION } from '@/lib/changelog';

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-black/10 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs text-slate-600 sm:px-6">
        <span>Narrivex</span>
        <Link href="/changelog" className="font-semibold text-sea hover:underline">
          v{APP_VERSION}
        </Link>
      </div>
    </footer>
  );
}