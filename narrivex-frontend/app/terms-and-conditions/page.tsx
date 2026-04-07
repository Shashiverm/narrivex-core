import Link from 'next/link';

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-grain pb-24">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="mb-3 inline-block rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
          Legal & Compliance
        </p>
        <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">Terms & Conditions</h1>
        <p className="mt-4 text-slate-600">Effective date: April 7, 2026</p>

        <div className="mt-8 space-y-6 rounded-3xl border border-black/10 bg-white/75 p-8 text-slate-700 backdrop-blur">
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">1. Acceptance of Terms</h2>
            <p className="mt-2 leading-relaxed">
              By using Narrivex, you agree to these Terms & Conditions. If you do not agree, do not use the service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">2. Use of the Platform</h2>
            <p className="mt-2 leading-relaxed">
              You agree to use the platform lawfully and not attempt to disrupt service, compromise security, or misuse market data and generated narratives.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">3. Account Responsibilities</h2>
            <p className="mt-2 leading-relaxed">
              You are responsible for maintaining account confidentiality and for activities occurring under your account credentials.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">4. No Financial Advisor Relationship</h2>
            <p className="mt-2 leading-relaxed">
              Narrivex is not a financial advisor. The platform provides information for educational and informational purposes only and does not provide investment recommendations.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">5. Accuracy and No Guarantee</h2>
            <p className="mt-2 leading-relaxed">
              Narratives, alerts, and analytics may contain delays, omissions, or errors. We do not guarantee completeness, timeliness, or accuracy of any output.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">6. User Data and Usage Risk</h2>
            <p className="mt-2 leading-relaxed">
              You use the service and submit data at your own risk. You are responsible for validating decisions based on platform output.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">7. API Usage Limits</h2>
            <p className="mt-2 leading-relaxed">
              API access is subject to rate limits, fair-use controls, and endpoint restrictions. Excessive usage may be throttled or blocked.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">8. Account Suspension and Termination</h2>
            <p className="mt-2 leading-relaxed">
              We may suspend or terminate accounts for abuse, suspicious behavior, policy violations, non-payment, or unauthorized access attempts.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">9. Limitation of Liability</h2>
            <p className="mt-2 leading-relaxed">
              To the maximum extent permitted by law, Narrivex is not liable for indirect, incidental, special, or consequential damages resulting from service use.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">10. Changes to Terms</h2>
            <p className="mt-2 leading-relaxed">
              We may update these terms periodically. Continued use after updates means you accept the revised terms.
            </p>
          </section>
        </div>

        <div className="mt-8 text-sm text-slate-600">
          <p>
            For privacy practices, review our{' '}
            <Link href="/privacy-policy" className="font-semibold text-sea hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <p className="mt-2">
            Related documents: <Link href="/financial-disclaimer" className="font-semibold text-sea hover:underline">Financial Disclaimer</Link> and{' '}
            <Link href="/risk-disclosure" className="font-semibold text-sea hover:underline">
              Risk Disclosure
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
