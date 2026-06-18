import { Outlet, NavLink } from 'react-router-dom';
import { Home, Compass, CalendarCheck, User } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function MainLayout() {
  const { t } = useContext(AppContext);

  const navItems = [
    { to: '/home', icon: Home, label: t('home') },
    { to: '/explore', icon: Compass, label: t('explore') },
    { to: '/bookings', icon: CalendarCheck, label: t('bookings') },
    { to: '/profile', icon: User, label: t('profile') },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="scrollable" style={{ flex: 1, paddingBottom: '70px' }}>
        <Outlet />
      </div>

      <div className="bottom-nav">
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <item.icon size={22} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
