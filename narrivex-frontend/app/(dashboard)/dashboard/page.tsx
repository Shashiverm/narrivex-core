import { Chart } from '@/components/dashboard/Chart';
import { Narrative } from '@/components/dashboard/Narrative';

const marketPulse = [
  { label: 'Signals today', value: '28', trend: '+12%' },
  { label: 'Active alerts', value: '6', trend: '+2' },
  { label: 'Narratives generated', value: '43', trend: '+18%' },
];

const topMovers = [
  { symbol: 'BTC', move: '+3.4%', sentiment: 'Bullish' },
  { symbol: 'ETH', move: '+1.1%', sentiment: 'Neutral' },
  { symbol: 'AAPL', move: '-0.8%', sentiment: 'Cautious' },
  { symbol: 'NVDA', move: '+2.6%', sentiment: 'Bullish' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {marketPulse.map((item) => (
          <article key={item.label} className="dashboard-panel rounded-2xl border bg-white p-4">
            <p className="dashboard-panel-label text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
            <div className="mt-2 flex items-end justify-between">
              <p className="dashboard-panel-value font-display text-3xl font-bold text-slate-900">{item.value}</p>
              <p className="text-sm font-semibold text-emerald-600">{item.trend}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-4">
        <div className="space-y-6 xl:col-span-3">
          <div className="grid gap-6 lg:grid-cols-3">
            <section className="space-y-4">
              <Chart symbol="BTC" />
              <Narrative symbol="BTC" />
            </section>
            <section className="space-y-4">
              <Chart symbol="ETH" />
              <Narrative symbol="ETH" />
            </section>
            <section className="space-y-4">
              <Chart symbol="AAPL" />
              <Narrative symbol="AAPL" />
            </section>
          </div>
        </div>

        <aside className="dashboard-panel h-fit rounded-2xl border bg-white p-5">
          <h2 className="dashboard-card-heading font-display text-xl font-bold">Top movers</h2>
          <p className="dashboard-panel-label mt-1 text-xs uppercase tracking-wide text-slate-500">Last 60 minutes</p>
          <ul className="mt-4 space-y-3">
            {topMovers.map((asset) => (
              <li key={asset.symbol} className="rounded-xl border border-slate-200/70 bg-slate-50/70 px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{asset.symbol}</span>
                  <span className={asset.move.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}>{asset.move}</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">Sentiment: {asset.sentiment}</p>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
}