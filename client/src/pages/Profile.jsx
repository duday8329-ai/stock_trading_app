import { useAuth } from '../hooks/useAuth.jsx';
import { formatMoney } from '../services/api.js';

export default function Profile() {
  const { user } = useAuth();
  return (
    <section className="panel max-w-xl">
      <h2 className="text-xl font-bold">Profile</h2>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between gap-4"><dt className="text-slate-500">Name</dt><dd className="font-medium">{user.name}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-slate-500">Email</dt><dd className="font-medium">{user.email}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-slate-500">Cash balance</dt><dd className="font-medium">{formatMoney(user.cashBalance)}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-slate-500">Created</dt><dd className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</dd></div>
      </dl>
      <p className="mt-6 rounded-md bg-mist p-3 text-sm text-slate-700">SB Stocks is a paper-trading simulation. No real funds or brokerage orders are used.</p>
    </section>
  );
}
