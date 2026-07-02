import { Eye, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, formatMoney } from '../services/api.js';

export default function Watchlist() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await api('/watchlist');
      setStocks(data.stocks);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (ticker) => {
    try {
      await api(`/watchlist/${ticker}`, { method: 'DELETE' });
      setStocks((current) => current.filter((stock) => stock.ticker !== ticker));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-bold">Watchlist</h2>
        <p className="text-sm text-slate-500">Stocks you are following.</p>
      </div>
      {loading && <div className="panel">Loading watchlist...</div>}
      {error && <div className="mb-4 rounded-md bg-red-50 p-3 text-red-700">{error}</div>}
      {!loading && !stocks.length && <div className="panel">Your watchlist is empty. Add a stock from its detail page.</div>}
      <div className="grid gap-3">
        {stocks.map((stock) => (
          <article key={stock.ticker} className="panel flex items-center justify-between gap-4">
            <div>
              <div className="font-bold">{stock.ticker}</div>
              <div className="text-sm text-slate-500">{stock.unavailable ? 'Quote unavailable' : formatMoney(stock.price)}</div>
            </div>
            <div className="flex gap-2">
              <Link className="btn-ghost" to={`/stock/${stock.ticker}`} aria-label={`View ${stock.ticker}`}><Eye size={16} /></Link>
              <button className="btn-ghost text-red-700" onClick={() => remove(stock.ticker)} aria-label={`Remove ${stock.ticker}`}><Trash2 size={16} /></button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
