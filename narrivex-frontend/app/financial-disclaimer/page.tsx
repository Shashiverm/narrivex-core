export default function FinancialDisclaimerPage() {
  return (
    <main className="compliance-page min-h-screen bg-grain pb-24">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="mb-3 inline-block rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
          Legal & Compliance
        </p>
        <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">Financial Disclaimer</h1>
        <p className="mt-4 text-slate-600">Effective date: April 7, 2026</p>

        <div className="mt-8 space-y-4 rounded-3xl border border-black/10 bg-white/75 p-8 text-slate-700 backdrop-blur">
          <p className="leading-relaxed">
            Narrivex content is for informational and educational purposes only.
          </p>
          <p className="leading-relaxed">
            It is not financial advice, investment advice, legal advice, or tax advice.
          </p>
          <p className="leading-relaxed">
            No fiduciary, advisor-client, or broker-client relationship is created by use of this platform.
          </p>
          <p className="leading-relaxed">
            You should perform independent research and consult licensed professionals before making financial decisions.
          </p>
        </div>
      </div>
    </main>
  );
}
