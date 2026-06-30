import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api, formatMoney } from '../services/api.js';

export default function StockDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const ticker = (params.ticker || 'AAPL').toUpperCase();
  const [quote, setQuote] = useState(null);
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [side, setSide] = useState('buy');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [trading, setTrading] = useState(false);

  const loadStock = async () => {
    setLoading(true);
    setError('');
    try {
      const [quoteData, historyData] = await Promise.all([
        api(`/stocks/quote/${ticker}`),
        api(`/stocks/history/${ticker}?range=3m`)
      ]);
      setQuote(quoteData.quote);
      setHistory(historyData.history);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStock();
  }, [ticker]);

  const runSearch = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    if (!search.trim()) return setError('Enter a ticker or company name.');
    try {
      const data = await api(`/stocks/search?q=${encodeURIComponent(search)}`);
      setResults(data.results);
      if (!data.results.length) setError('No matching stocks found.');
    } catch (err) {
      setError(err.message);
    }
  };

  const submitTrade = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    const amount = Number(quantity);
    if (!Number.isFinite(amount) || amount <= 0) return setError('Enter a positive share quantity.');
    setTrading(true);
    try {
      const data = await api(`/trade/${side}`, { method: 'POST', body: JSON.stringify({ ticker, quantity: amount }) });
      setMessage(data.message);
      setQuantity('');
      await loadStock();
    } catch (err) {
      setError(err.message);
    } finally {
      setTrading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <section className="space-y-6">
        <form onSubmit={runSearch} className="panel">
          <label className="text-sm font-medium">Search stocks</label>
          <div className="mt-2 flex gap-2">
            <input className="field" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="AAPL or Apple" />
            <button className="btn-primary" aria-label="Search"><Search size={16} /> Search</button>
          </div>
          {results.length > 0 && (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {results.map((item) => (
                <button key={item.symbol} type="button" className="rounded-md border border-slate-200 p-3 text-left hover:border-pine" onClick={() => navigate(`/stock/${item.symbol}`)}>
                  <div className="font-semibold">{item.symbol}</div>
                  <div className="truncate text-sm text-slate-500">{item.description}</div>
                </button>
              ))}
            </div>
          )}
        </form>

        <section className="panel">
          {loading && <div>Loading quote...</div>}
          {!loading && error && !quote && <div className="text-red-700">{error}</div>}
          {quote && (
            <>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-3xl font-bold">{ticker}</h2>
                  <p className="text-sm text-slate-500">{quote.delayed ? 'Delayed or demo quote' : 'Live quote'}</p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-3xl font-bold">{formatMoney(quote.price)}</div>
                  <div className={quote.change >= 0 ? 'text-pine' : 'text-coral'}>
                    {quote.change} ({quote.percentChange}%)
                  </div>
                </div>
              </div>
              <div className="mt-6 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={history}>
                    <XAxis dataKey="date" minTickGap={32} tick={{ fontSize: 12 }} />
                    <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => formatMoney(value)} />
                    <Line type="monotone" dataKey="close" stroke="#0f766e" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </section>
      </section>

      <aside className="panel h-fit">
        <h2 className="text-xl font-bold">Trade {ticker}</h2>
        <form onSubmit={submitTrade} className="mt-5 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button type="button" className={side === 'buy' ? 'btn-primary' : 'btn-ghost'} onClick={() => setSide('buy')}>Buy</button>
            <button type="button" className={side === 'sell' ? 'btn-primary' : 'btn-ghost'} onClick={() => setSide('sell')}>Sell</button>
          </div>
          <label className="block text-sm font-medium">
            Shares
            <input className="field mt-1" type="number" min="0" step="0.000001" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </label>
          {quote && quantity && <div className="rounded-md bg-mist p-3 text-sm">Estimated value: {formatMoney(Number(quantity) * quote.price)}</div>}
          {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}
          {message && <div className="rounded-md bg-emerald-50 p-3 text-sm text-pine">{message} View it in <Link className="font-semibold underline" to="/transactions">history</Link>.</div>}
          <button className="btn-primary w-full" disabled={trading}>{trading ? 'Submitting...' : `${side === 'buy' ? 'Buy' : 'Sell'} shares`}</button>
        </form>
      </aside>
    </div>
  );
}
