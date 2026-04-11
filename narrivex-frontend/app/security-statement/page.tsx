export default function SecurityStatementPage() {
  return (
    <main className="compliance-page min-h-screen bg-grain pb-24">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="mb-3 inline-block rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
          Legal & Compliance
        </p>
        <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">Security Statement</h1>
        <p className="mt-4 text-slate-600">Effective date: April 7, 2026</p>

        <div className="mt-8 space-y-6 rounded-3xl border border-black/10 bg-white/75 p-8 text-slate-700 backdrop-blur">
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">1. Authentication and Access</h2>
            <p className="mt-2 leading-relaxed">
              Narrivex uses OAuth flows and JWT-backed APIs for secure access control and session validation.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">2. Encryption and Transport Security</h2>
            <p className="mt-2 leading-relaxed">
              Data in transit is protected with modern transport encryption. Sensitive data handling follows secure engineering practices.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">3. Credential Handling</h2>
            <p className="mt-2 leading-relaxed">
              Passwords are never stored in plain text. We use strong hashing and access controls for credential safety.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
