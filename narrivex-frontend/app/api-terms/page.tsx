export default function APITermsPage() {
  return (
    <main className="compliance-page min-h-screen bg-grain pb-24">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="mb-3 inline-block rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
          Legal & Compliance
        </p>
        <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">API Terms</h1>
        <p className="mt-4 text-slate-600">Effective date: April 7, 2026</p>

        <div className="mt-8 space-y-6 rounded-3xl border border-black/10 bg-white/75 p-8 text-slate-700 backdrop-blur">
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">1. Rate Limits</h2>
            <p className="mt-2 leading-relaxed">
              API requests are subject to per-key and per-account limits. We may throttle requests that exceed limits.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">2. No Abuse or Scraping</h2>
            <p className="mt-2 leading-relaxed">
              You must not abuse endpoints, bypass controls, scrape restricted content, or attempt to disrupt API operations.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">3. Key Revocation</h2>
            <p className="mt-2 leading-relaxed">
              API keys can be revoked or rotated at any time for security incidents, policy violations, or compromised credentials.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">4. Commercial Usage Restrictions</h2>
            <p className="mt-2 leading-relaxed">
              Commercial redistribution, resale, or repackaging of API output may require explicit written permission.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
