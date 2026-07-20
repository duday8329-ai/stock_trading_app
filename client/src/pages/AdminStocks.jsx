import { Pencil, Plus, Trash2, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api.js';

const emptyForm = { ticker: '', name: '', sector: '', active: true };

export default function AdminStocks() {
  const [stocks, setStocks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const data = await api('/admin/stocks');
      setStocks(data.stocks);
    } catch (err) {
      setError(err.message);
    }
  }, []);
  useEffect(() => { load(); }, [load]);

  const submit = async (event) => {
    event.preventDefault();
    try {
      await api(editing ? `/admin/stocks/${editing}` : '/admin/stocks', {
        method: editing ? 'PUT' : 'POST',
        body: JSON.stringify(form)
      });
      setForm(emptyForm);
      setEditing(null);
      setError('');
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const edit = (stock) => {
    setEditing(stock._id);
    setForm({ ticker: stock.ticker, name: stock.name, sector: stock.sector, active: stock.active });
  };

  const remove = async (id) => {
    try {
      await api(`/admin/stocks/${id}`, { method: 'DELETE' });
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <form className="panel h-fit space-y-4" onSubmit={submit}>
        <h2 className="text-xl font-bold">{editing ? 'Edit stock' : 'Add stock'}</h2>
        <input className="field" placeholder="Ticker" value={form.ticker} onChange={(e) => setForm({ ...form, ticker: e.target.value })} />
        <input className="field" placeholder="Company name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="field" placeholder="Sector" value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })} />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Active</label>
        {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        <div className="flex gap-2">
          <button className="btn-primary flex-1"><Plus size={16} /> {editing ? 'Save' : 'Add'}</button>
          {editing && <button type="button" className="btn-ghost" onClick={() => { setEditing(null); setForm(emptyForm); }}><X size={16} /></button>}
        </div>
      </form>
      <section>
        <h2 className="mb-4 text-2xl font-bold">Managed stocks</h2>
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50"><tr><th className="p-3">Ticker</th><th className="p-3">Name</th><th className="p-3">Sector</th><th className="p-3">Status</th><th className="p-3">Actions</th></tr></thead>
            <tbody>{stocks.map((stock) => <tr key={stock._id} className="border-t"><td className="p-3 font-bold">{stock.ticker}</td><td className="p-3">{stock.name}</td><td className="p-3">{stock.sector}</td><td className="p-3">{stock.active ? 'Active' : 'Inactive'}</td><td className="p-3"><div className="flex gap-2"><button className="btn-ghost" onClick={() => edit(stock)}><Pencil size={15} /></button><button className="btn-ghost text-red-700" onClick={() => remove(stock._id)}><Trash2 size={15} /></button></div></td></tr>)}</tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
