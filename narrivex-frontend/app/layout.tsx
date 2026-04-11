import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import Providers from './providers';
import { CookieConsentBanner } from '@/components/common/CookieConsentBanner';
import { Footer } from '@/components/common/Footer';
import { AnalyticsTracker } from '@/components/common/AnalyticsTracker';

const siteUrl = 'https://narrivex.tech';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Narrivex | AI Market Intelligence Platform',
    template: '%s | Narrivex',
  },
  description:
    'Narrivex transforms market data into real-time AI narratives, alerts, and trading intelligence for crypto, equities, and forex.',
  applicationName: 'Narrivex',
  keywords: [
    'AI market intelligence',
    'real-time trading alerts',
    'market narratives',
    'crypto analysis platform',
    'equity insights',
    'forex monitoring',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Narrivex',
    title: 'Narrivex | AI Market Intelligence Platform',
    description:
      'Track markets in real time with AI-powered narratives, smart alerts, and cross-asset intelligence.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Narrivex AI market intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Narrivex | AI Market Intelligence Platform',
    description:
      'Real-time AI narratives and alerts for traders and analysts across crypto, equities, and forex.',
    creator: '@narrivex',
    site: '@narrivex',
    images: ['/twitter-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'cxw_hkCCcBAfAsMAcfE2M9Ymt2inofGjnntJ9Okea7A',
  },
  category: 'finance',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="theme-light">
      <body>
        <Providers>
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
          <div className="min-h-screen pb-28">{children}</div>
          <Footer />
          <CookieConsentBanner />
        </Providers>
      </body>
    </html>
  );
}
