export default function CookiePolicyPage() {
  return (
    <main className="compliance-page min-h-screen bg-grain pb-24">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="mb-3 inline-block rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
          Legal & Compliance
        </p>
        <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">Cookie Policy</h1>
        <p className="mt-4 text-slate-600">Last updated: April 7, 2026</p>

        <div className="mt-8 space-y-6 rounded-3xl border border-black/10 bg-white/75 p-8 text-slate-700 backdrop-blur">
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">1. Cookie Choices</h2>
            <p className="mt-2 leading-relaxed">
              You can accept or reject optional cookies using the cookie consent prompt. Essential cookies remain enabled for security and basic functionality.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">2. Why We Use Cookies</h2>
            <p className="mt-2 leading-relaxed">
              Cookies support secure login, real-time feed stability, and analytical tools that help us improve performance and user experience.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">3. Policy Updates</h2>
            <p className="mt-2 leading-relaxed">
              We may update this Cookie Policy from time to time. The date above reflects the latest update.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
