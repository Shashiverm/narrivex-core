import { CHANGELOG } from '@/lib/changelog';

export default function ChangelogPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10 pb-20">
      <h1 className="font-display text-4xl font-bold">Version History</h1>
      <p className="mt-2 text-slate-600">Click app version in the footer anytime to view updates.</p>

      <div className="mt-8 space-y-6">
        {CHANGELOG.map((entry) => (
          <section key={entry.version} className="rounded-2xl border border-black/10 bg-white/80 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">v{entry.version}</h2>
              <span className="text-sm text-slate-500">{entry.date}</span>
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
              {entry.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}