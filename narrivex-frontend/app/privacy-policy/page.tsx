import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-grain pb-24">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="mb-3 inline-block rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
          Legal & Compliance
        </p>
        <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-slate-600">Effective date: April 7, 2026</p>

        <div className="mt-8 space-y-6 rounded-3xl border border-black/10 bg-white/75 p-8 text-slate-700 backdrop-blur">
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">1. Information We Collect</h2>
            <p className="mt-2 leading-relaxed">
              We collect account details, profile information, authentication metadata, and usage data required to operate and improve Narrivex.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">2. API Logs and Analytics Tracking</h2>
            <p className="mt-2 leading-relaxed">
              We maintain API logs (request metadata, error logs, and latency traces) and product analytics to monitor reliability, detect abuse, and improve service quality.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">3. How We Use Information</h2>
            <p className="mt-2 leading-relaxed">
              Data is used for core functionality, fraud prevention, account security, compliance obligations, and customer support.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">4. Third-Party Services</h2>
            <p className="mt-2 leading-relaxed">
              We use trusted third-party service providers (such as hosting, authentication, and monitoring providers). These vendors process data only as needed to deliver services on our behalf.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">5. Data Sharing and Retention</h2>
            <p className="mt-2 leading-relaxed">
              We do not sell personal data. We retain data only as long as required for service delivery, legal compliance, dispute handling, and security operations.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">6. India DPDP Act 2023</h2>
            <p className="mt-2 leading-relaxed">
              Where applicable, we process personal data in line with India&apos;s Digital Personal Data Protection Act, 2023, including lawful processing, purpose limitation, and rights handling.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">7. GDPR Compliance</h2>
            <p className="mt-2 leading-relaxed">
              For users in the EEA and UK, we align processing practices with GDPR principles, including lawful basis, minimization, data subject rights, and cross-border safeguards.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">8. Your Rights and Contact</h2>
            <p className="mt-2 leading-relaxed">
              Depending on your jurisdiction, you may request access, correction, deletion, restriction, or export of your personal data by contacting info@navviex.tech.
            </p>
          </section>
        </div>

        <p className="mt-8 text-sm text-slate-600">
          Review our <Link href="/terms-and-conditions" className="font-semibold text-sea hover:underline">Terms &amp; Conditions</Link> for service terms.
        </p>
      </div>
    </main>
  );
}
