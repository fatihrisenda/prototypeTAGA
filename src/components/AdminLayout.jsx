import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map, FileText, Settings } from 'lucide-react';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Overview', exact: true },
  { to: '/admin/destinations', icon: Map, label: 'Destinations' },
  { to: '/admin/transactions', icon: FileText, label: 'Transactions' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)', position: 'relative' }}>
      <div className="scrollable" style={{ flex: 1, paddingBottom: '70px' }}>
        <Outlet />
      </div>

      <nav className="bottom-nav">
        {navItems.map(item => {
          const isActive = item.exact
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to);
          return (
            <Link key={item.to} to={item.to}
              className={`nav-item ${isActive ? 'active' : ''}`}>
              <item.icon size={20} />
              <span style={{ fontSize: '10px' }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
