export default function RiskDisclosurePage() {
  return (
    <main className="min-h-screen bg-grain pb-24">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="mb-3 inline-block rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
          Legal & Compliance
        </p>
        <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">Risk Disclosure</h1>
        <p className="mt-4 text-slate-600">Effective date: April 7, 2026</p>

        <div className="mt-8 space-y-4 rounded-3xl border border-black/10 bg-white/75 p-8 text-slate-700 backdrop-blur">
          <p className="leading-relaxed">
            Market trading and investing involve substantial risk, including potential loss of principal.
          </p>
          <p className="leading-relaxed">
            Past performance does not guarantee future results.
          </p>
          <p className="leading-relaxed">
            Narrivex does not guarantee profitability, performance, or specific market outcomes.
          </p>
          <p className="leading-relaxed">
            You should evaluate your financial situation, risk tolerance, and seek independent professional advice before making investment decisions.
          </p>
        </div>
      </div>
    </main>
  );
}
