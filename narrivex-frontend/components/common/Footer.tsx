import Link from 'next/link';
import { APP_VERSION } from '@/lib/changelog';

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-black/10 bg-white/85 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 text-xs text-slate-600 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>Narrivex</span>
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:underline">
            Terms of Service / Conditions
          </Link>
          <Link href="/financial-disclaimer" className="hover:underline">
            Financial Disclaimer
          </Link>
          <Link href="/cookie-policy" className="hover:underline">
            Cookie Policy
          </Link>
          <Link href="/changelog" className="font-semibold text-sea hover:underline">
            v{APP_VERSION}
          </Link>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
          <span>Contact: info@navviex.tech</span>
          <span>New Delhi, India</span>
        </div>
      </div>
    </footer>
  );
}