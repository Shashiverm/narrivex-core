import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export const metadata = {
  title: 'Forgot Password - Narrivex',
  description: 'Reset your Narrivex password',
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen bg-grain dark:bg-none dark:bg-[#07090e]">
      {/* Left Sidebar - Branding & Benefits */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between bg-gradient-to-br from-sea/10 to-coral/10 dark:from-sea/5 dark:to-slate-900/80 px-12 py-12 backdrop-blur border-r border-slate-200/50 dark:border-slate-800/80">
        <div>
          <a href="/" className="inline-flex items-center gap-2 font-display text-2xl font-bold text-slate-900 dark:text-white hover:opacity-80 transition-opacity">
            <svg className="h-6 w-6 text-sea" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
            Narrivex
          </a>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight text-slate-900 dark:text-white">
              Regain access to your account
            </h2>
            <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
              We&apos;ll send you a secure link to reset your password in just a few minutes.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sea/20 text-sea flex-shrink-0">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Secure reset link</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">24-hour expiration for safety</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-coral/20 text-coral flex-shrink-0">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Instant email delivery</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Reset link sent to your inbox immediately</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sea/20 text-sea flex-shrink-0">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Full account control</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Complete control over your security</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white/60 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-white">Trouble accessing Narrivex?</span> We&apos;re here to help you recover your account quickly and securely.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
