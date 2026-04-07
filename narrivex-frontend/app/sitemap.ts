import type { MetadataRoute } from 'next';

const siteUrl = 'https://narrivex.tech';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/changelog',
    '/privacy-policy',
    '/terms-and-conditions',
    '/cookie-policy',
    '/financial-disclaimer',
    '/ai-disclaimer',
    '/subscription-policy',
    '/api-terms',
    '/security-statement',
    '/risk-disclosure',
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'monthly',
    priority: route === '' ? 1 : 0.6,
  }));
}
