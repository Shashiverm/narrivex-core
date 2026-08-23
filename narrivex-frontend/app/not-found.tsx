import type { Metadata } from 'next';
import { NotFoundView } from '@/components/common/NotFoundView';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Narrivex',
  description:
    'The requested page or market telemetry feed could not be found on the Narrivex platform.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundView />;
}
