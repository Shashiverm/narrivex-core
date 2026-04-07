export default function AIDisclaimerPage() {
  return (
    <main className="min-h-screen bg-grain pb-24">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="mb-3 inline-block rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
          Legal & Compliance
        </p>
        <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">AI Disclaimer</h1>
        <p className="mt-4 text-slate-600">Effective date: April 7, 2026</p>

        <div className="mt-8 space-y-4 rounded-3xl border border-black/10 bg-white/75 p-8 text-slate-700 backdrop-blur">
          <p className="leading-relaxed">
            AI-generated narratives and analytics are produced by models that infer patterns from data and may be incomplete or incorrect.
          </p>
          <p className="leading-relaxed">
            AI outputs are not guaranteed, independently verified, or certain predictions of future market behavior.
          </p>
          <p className="leading-relaxed">
            Users are responsible for validating AI output before acting on it.
          </p>
        </div>
      </div>
    </main>
  );
}
