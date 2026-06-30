import { Link } from 'react-router-dom';
import MetricCard from '../components/MetricCard.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { api, formatMoney } from '../services/api.js';

export default function Dashboard() {
  const { data, loading, error } = useAsync(() => api('/portfolio'), []);
  if (loading) return <div className="panel">Loading portfolio...</div>;
  if (error) return <div className="panel text-red-700">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Cash balance" value={data.cashBalance} />
        <MetricCard label="Holdings value" value={data.holdingsValue} />
        <MetricCard label="Portfolio value" value={data.totalPortfolioValue} />
        <MetricCard label="Open gain/loss" value={data.overallGainLoss} tone={data.overallGainLoss >= 0 ? 'good' : 'bad'} />
      </div>
      <section className="panel overflow-x-auto">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Holdings</h2>
          <Link to="/stock/AAPL" className="btn-primary">Find stocks</Link>
        </div>
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b text-slate-500">
            <tr><th className="py-2">Ticker</th><th>Shares</th><th>Avg buy</th><th>Current</th><th>Market value</th><th>Gain/loss</th></tr>
          </thead>
          <tbody>
            {data.holdings.map((h) => (
              <tr key={h.id} className="border-b last:border-0">
                <td className="py-3 font-semibold"><Link className="text-pine" to={`/stock/${h.ticker}`}>{h.ticker}</Link></td>
                <td>{h.quantity}</td>
                <td>{formatMoney(h.avgBuyPrice)}</td>
                <td>{formatMoney(h.currentPrice)}</td>
                <td>{formatMoney(h.marketValue)}</td>
                <td className={h.gainLoss >= 0 ? 'text-pine' : 'text-coral'}>{formatMoney(h.gainLoss)} ({h.gainLossPercent}%)</td>
              </tr>
            ))}
            {!data.holdings.length && <tr><td className="py-6 text-slate-500" colSpan="6">No holdings yet.</td></tr>}
          </tbody>
        </table>
      </section>
    </div>
  );
}
