import { Chart } from '@/components/dashboard/Chart';
import { Narrative } from '@/components/dashboard/Narrative';

export default function DashboardPage() {
  return (
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
  );
}