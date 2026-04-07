'use client';

import { ComplianceModalLinks } from '@/components/common/ComplianceModal';

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-black/10 bg-white/85 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 text-xs text-slate-600 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>Narrivex</span>
          <ComplianceModalLinks className="flex flex-wrap items-center gap-x-4 gap-y-2" />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
          <span>Contact: info@narrivex.tech</span>
          <span>New Delhi, India</span>
          <a href="https://x.com/narrivex" target="_blank" rel="noreferrer" className="font-semibold text-sea hover:underline">
            X: @narrivex
          </a>
        </div>
      </div>
    </footer>
  );
}