'use client';

import { useEffect, useMemo, useState } from 'react';
import { APP_VERSION, CHANGELOG } from '@/lib/changelog';

type ComplianceKey =
  | 'privacy'
  | 'terms'
  | 'financial'
  | 'ai'
  | 'subscription'
  | 'api'
  | 'security'
  | 'risk'
  | 'cookie'
  | 'changelog';

type ComplianceDoc = {
  title: string;
  updated: string;
  points: string[];
};

const DOCS: Record<Exclude<ComplianceKey, 'changelog'>, ComplianceDoc> = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'April 7, 2026',
    points: [
      'We collect account information, profile data, and service usage metadata needed to run the platform.',
      'API logs and analytics tracking may include request timestamps, error traces, and performance metrics.',
      'We may use third-party services for hosting, monitoring, and authentication under contractual safeguards.',
      'Where applicable, data practices align with India DPDP Act 2023 and GDPR principles.',
      'Users may request access, correction, deletion, or export of personal data by contacting support.',
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    updated: 'April 7, 2026',
    points: [
      'Narrivex is not a financial advisor and does not provide investment recommendations.',
      'Outputs may contain delays or inaccuracies, and no guarantee is made for accuracy or completeness.',
      'Users are responsible for decisions made using platform output and data.',
      'API usage is subject to fair-use limits and abuse controls.',
      'Accounts may be suspended for policy violations, abuse, or suspicious activity.',
    ],
  },
  financial: {
    title: 'Financial Disclaimer',
    updated: 'April 7, 2026',
    points: [
      'Content is provided for informational and educational purposes only.',
      'Nothing on Narrivex constitutes financial, investment, legal, or tax advice.',
      'No advisor-client or broker-client relationship is created by using the platform.',
      'Always consult licensed professionals before making financial decisions.',
    ],
  },
  ai: {
    title: 'AI Disclaimer',
    updated: 'April 7, 2026',
    points: [
      'AI output is probabilistic and may be incomplete, incorrect, or unverified.',
      'Model-generated narratives are based on detected patterns, not certainty.',
      'Narrivex does not guarantee AI predictions or market outcomes.',
      'Users should independently validate output before taking action.',
    ],
  },
  subscription: {
    title: 'Subscription Policy',
    updated: 'April 7, 2026',
    points: [
      'Pricing and billing period are shown before checkout for transparency.',
      'Paid plans can auto-renew unless canceled before the next billing cycle.',
      'Refund eligibility follows applicable law and any written commercial agreement.',
    ],
  },
  api: {
    title: 'API Terms',
    updated: 'April 7, 2026',
    points: [
      'Rate limits apply per key and account, with throttling when limits are exceeded.',
      'No abuse, scraping of restricted data, or attempt to bypass access controls.',
      'API keys may be revoked or rotated for compromise, abuse, or policy violations.',
      'Commercial redistribution may require separate written permission.',
    ],
  },
  security: {
    title: 'Security Statement',
    updated: 'April 7, 2026',
    points: [
      'Secure authentication is supported via OAuth and JWT-backed APIs.',
      'Data transport uses modern encryption standards.',
      'Credentials are protected with secure hashing and are not stored in plain text.',
    ],
  },
  risk: {
    title: 'Risk Disclosure',
    updated: 'April 7, 2026',
    points: [
      'Market trading and investing involve significant risk, including loss of capital.',
      'Past performance does not guarantee future results.',
      'Narrivex does not guarantee profitability or specific outcomes.',
    ],
  },
  cookie: {
    title: 'Cookie Policy',
    updated: 'April 7, 2026',
    points: [
      'You can accept or reject optional cookies from the consent prompt.',
      'Essential cookies are used for secure authentication and core app functionality.',
      'Optional cookies may improve real-time feeds and analytical tools.',
      'Cookie policy updates are published with the latest update date.',
    ],
  },
};

const LINK_ITEMS: { key: ComplianceKey; label: string }[] = [
  { key: 'privacy', label: 'Privacy Policy' },
  { key: 'terms', label: 'Terms of Service / Conditions' },
  { key: 'financial', label: 'Financial Disclaimer' },
  { key: 'ai', label: 'AI Disclaimer' },
  { key: 'subscription', label: 'Subscription Policy' },
  { key: 'api', label: 'API Terms' },
  { key: 'security', label: 'Security Statement' },
  { key: 'risk', label: 'Risk Disclosure' },
  { key: 'cookie', label: 'Cookie Policy' },
  { key: 'changelog', label: `v${APP_VERSION}` },
];

export function ComplianceModalLinks({ className = '' }: { className?: string }) {
  const [activeKey, setActiveKey] = useState<ComplianceKey | null>(null);

  useEffect(() => {
    if (!activeKey) {
      document.body.style.overflow = '';
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveKey(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeKey]);

  const activeDoc = useMemo(() => {
    if (!activeKey || activeKey === 'changelog') {
      return null;
    }

    return DOCS[activeKey];
  }, [activeKey]);

  const closeModal = () => setActiveKey(null);

  return (
    <>
      <div className={className}>
        {LINK_ITEMS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setActiveKey(item.key)}
            className={`hover:underline ${item.key === 'changelog' ? 'font-semibold text-sea' : ''}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {activeKey && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-black/10 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-ink">
                  {activeKey === 'changelog' ? 'Changelog' : activeDoc?.title}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {activeKey === 'changelog' ? `Current version: v${APP_VERSION}` : `Last updated: ${activeDoc?.updated}`}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="mt-4 max-h-[60vh] overflow-auto pr-1">
              {activeKey === 'changelog' ? (
                <div className="space-y-4">
                  {CHANGELOG.map((entry) => (
                    <section key={entry.version} className="rounded-xl border border-black/10 bg-slate-50/70 p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-xl font-semibold text-ink">v{entry.version}</h3>
                        <span className="text-xs text-slate-500">{entry.date}</span>
                      </div>
                      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                        {entry.notes.map((note) => (
                          <li key={note}>{note}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              ) : (
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                  {activeDoc?.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <button type="button" className="absolute inset-0 -z-10" aria-label="Close dialog background" onClick={closeModal} />
        </div>
      )}
    </>
  );
}
