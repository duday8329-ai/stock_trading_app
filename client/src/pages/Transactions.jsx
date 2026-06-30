import { useAsync } from '../hooks/useAsync.js';
import { api, formatMoney } from '../services/api.js';

export default function Transactions() {
  const { data, loading, error } = useAsync(() => api('/transactions'), []);
  if (loading) return <div className="panel">Loading transactions...</div>;
  if (error) return <div className="panel text-red-700">{error}</div>;

  return (
    <section className="panel overflow-x-auto">
      <h2 className="mb-4 text-xl font-bold">Transaction History</h2>
      <table className="w-full min-w-[680px] text-left text-sm">
        <thead className="border-b text-slate-500"><tr><th className="py-2">Date</th><th>Ticker</th><th>Type</th><th>Shares</th><th>Price</th><th>Total</th></tr></thead>
        <tbody>
          {data.transactions.map((tx) => (
            <tr key={tx._id} className="border-b last:border-0">
              <td className="py-3">{new Date(tx.timestamp).toLocaleString()}</td>
              <td className="font-semibold">{tx.ticker}</td>
              <td className={tx.type === 'buy' ? 'text-pine' : 'text-coral'}>{tx.type.toUpperCase()}</td>
              <td>{tx.quantity}</td>
              <td>{formatMoney(tx.price)}</td>
              <td>{formatMoney(tx.price * tx.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
