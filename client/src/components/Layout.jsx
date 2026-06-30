import { BarChart3, History, LogOut, Search, User } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const links = [
  { to: '/', label: 'Dashboard', icon: BarChart3 },
  { to: '/stock/AAPL', label: 'Stocks', icon: Search },
  { to: '/transactions', label: 'History', icon: History },
  { to: '/profile', label: 'Profile', icon: User }
];

export default function Layout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-pine">Simulation only</p>
            <h1 className="text-2xl font-bold text-ink">SB Stocks</h1>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={({ isActive }) => `btn-ghost ${isActive ? 'border-pine text-pine' : ''}`}>
                <Icon size={16} /> {label}
              </NavLink>
            ))}
            <button
              className="btn-ghost"
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              <LogOut size={16} /> Logout
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-5 text-sm text-slate-600">Signed in as {user?.name}</div>
        <Outlet />
      </main>
    </div>
  );
}
