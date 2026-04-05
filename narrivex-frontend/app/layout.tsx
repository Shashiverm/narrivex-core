import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Providers from './providers';
import { Footer } from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'Narrivex',
  description: 'AI-powered market narratives in real time',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen pb-12">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
