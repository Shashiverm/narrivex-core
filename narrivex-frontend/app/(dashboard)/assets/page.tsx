const watchlist = [
  { symbol: 'BTC', type: 'Crypto', allocation: '30%', alert: 'Volatility spike' },
  { symbol: 'ETH', type: 'Crypto', allocation: '20%', alert: 'Breakout watch' },
  { symbol: 'AAPL', type: 'Equity', allocation: '25%', alert: 'Earnings sentiment' },
  { symbol: 'EUR/USD', type: 'Forex', allocation: '25%', alert: 'Range compression' },
];

export default function AssetsPage() {
  return (
    <div className="space-y-6">
      <section className="dashboard-panel rounded-2xl border bg-white p-6">
        <h1 className="dashboard-card-heading font-display text-2xl font-bold">Assets</h1>
        <p className="dashboard-card-text mt-2 text-slate-600">
          Manage your live watchlist and track how each position contributes to your strategy.
        </p>
      </section>

      <section className="dashboard-panel rounded-2xl border bg-white p-6">
        <h2 className="dashboard-card-heading font-display text-xl font-bold">Watchlist</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-2 py-2 font-medium">Symbol</th>
                <th className="px-2 py-2 font-medium">Type</th>
                <th className="px-2 py-2 font-medium">Allocation</th>
                <th className="px-2 py-2 font-medium">Alert focus</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((asset) => (
                <tr key={asset.symbol} className="border-b border-slate-100 last:border-none">
                  <td className="px-2 py-3 font-semibold text-slate-800">{asset.symbol}</td>
                  <td className="px-2 py-3 text-slate-600">{asset.type}</td>
                  <td className="px-2 py-3 text-slate-600">{asset.allocation}</td>
                  <td className="px-2 py-3 text-slate-600">{asset.alert}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}