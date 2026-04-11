export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <section className="dashboard-panel rounded-2xl border bg-white p-6">
        <h1 className="dashboard-card-heading font-display text-2xl font-bold">Settings</h1>
        <p className="dashboard-card-text mt-2 text-slate-600">
          Configure profile preferences, alert delivery, and AI narrative sensitivity.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="dashboard-panel rounded-2xl border bg-white p-6">
          <h2 className="dashboard-card-heading font-display text-xl font-bold">Notification channels</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <label className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
              <span>Email alerts</span>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
              <span>Push notifications</span>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
              <span>Daily summary digest</span>
              <input type="checkbox" className="h-4 w-4" />
            </label>
          </div>
        </div>

        <div className="dashboard-panel rounded-2xl border bg-white p-6">
          <h2 className="dashboard-card-heading font-display text-xl font-bold">Narrative tuning</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <label className="block">
              <span className="mb-1 block text-slate-600">Tone</span>
              <select className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2">
                <option>Balanced</option>
                <option>Conservative</option>
                <option>Aggressive</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-slate-600">Sensitivity</span>
              <input type="range" min="1" max="10" defaultValue="6" className="w-full" />
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}