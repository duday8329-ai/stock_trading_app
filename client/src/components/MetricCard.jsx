import { formatMoney } from '../services/api.js';

export default function MetricCard({ label, value, tone = 'default' }) {
  const color = tone === 'good' ? 'text-pine' : tone === 'bad' ? 'text-coral' : 'text-ink';
  return (
    <div className="panel">
      <div className="text-sm text-slate-500">{label}</div>
      <div className={`mt-2 text-2xl font-bold ${color}`}>{typeof value === 'number' ? formatMoney(value) : value}</div>
    </div>
  );
}
