export default function SubscriptionPolicyPage() {
  return (
    <main className="compliance-page min-h-screen bg-grain pb-24">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="mb-3 inline-block rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
          Legal & Compliance
        </p>
        <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">Subscription Policy</h1>
        <p className="mt-4 text-slate-600">Effective date: April 7, 2026</p>

        <div className="mt-8 space-y-6 rounded-3xl border border-black/10 bg-white/75 p-8 text-slate-700 backdrop-blur">
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">1. Pricing Transparency</h2>
            <p className="mt-2 leading-relaxed">
              Plan pricing, features, and billing periods are shown before purchase. Taxes may apply depending on your location.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">2. Auto-Renewal</h2>
            <p className="mt-2 leading-relaxed">
              Paid plans renew automatically at the end of each billing cycle unless canceled before renewal.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">3. Refund Rules</h2>
            <p className="mt-2 leading-relaxed">
              Fees are generally non-refundable except where required by applicable law or explicitly stated in a written agreement.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
