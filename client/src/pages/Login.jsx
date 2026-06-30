import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (!form.email || !form.password) return setError('Email and password are required.');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-mist px-4">
      <form onSubmit={submit} className="panel w-full max-w-md">
        <p className="text-xs font-semibold uppercase tracking-wide text-pine">Paper trading</p>
        <h1 className="mt-1 text-3xl font-bold">SB Stocks</h1>
        <div className="mt-6 space-y-4">
          <label className="block text-sm font-medium">
            Email
            <input className="field mt-1" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label className="block text-sm font-medium">
            Password
            <input className="field mt-1" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </label>
          {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}
          <button className="btn-primary w-full" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
        </div>
        <p className="mt-4 text-center text-sm text-slate-600">
          New here? <Link className="font-semibold text-pine" to="/register">Create an account</Link>
        </p>
      </form>
    </main>
  );
}
