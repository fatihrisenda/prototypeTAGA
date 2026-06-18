import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { LogOut, Edit3, Lock, ChevronRight, Settings, BookOpen, Star, Heart } from 'lucide-react';

export default function Profile() {
  const { user, logout, bookings, favorites } = useContext(AppContext);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const userBookings = bookings.filter(b => b.userName === user?.name || b.destination);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: 'var(--primary)', padding: '48px 24px 32px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <h1 style={{ color: 'white', fontSize: '20px', fontWeight: '800' }}>My Profile</h1>
          <button onClick={() => navigate('/settings')}
            style={{ background: 'rgba(255,255,255,0.2)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Settings size={18} color="white" />
          </button>
        </div>

        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', border: '3px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '800', color: 'white', flexShrink: 0 }}>
            {user?.avatar || user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'white', marginBottom: '2px' }}>{user?.name || 'User'}</h2>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>{user?.email || 'user@email.com'}</p>
          </div>
        </div>
      </div>

      <div className="scrollable" style={{ flex: 1, padding: '20px' }}>
        {/* Stats */}
        <div className="card" style={{ display: 'flex', justifyContent: 'space-around', padding: '16px', marginBottom: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary)' }}>{userBookings.length}</h3>
            <p style={{ fontSize: '11px', color: 'var(--text-gray)', marginTop: '2px' }}>Tours Done</p>
          </div>
          <div style={{ width: '1px', background: 'var(--border-color)' }} />
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary)' }}>{favorites.length}</h3>
            <p style={{ fontSize: '11px', color: 'var(--text-gray)', marginTop: '2px' }}>Favorites</p>
          </div>
          <div style={{ width: '1px', background: 'var(--border-color)' }} />
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary)' }}>4.8</h3>
            <p style={{ fontSize: '11px', color: 'var(--text-gray)', marginTop: '2px' }}>Avg Rating</p>
          </div>
        </div>

        {/* Personal Info */}
        <div style={{ marginBottom: '12px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Personal Info</h3>
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            {[
              { label: 'Full Name', value: user?.name },
              { label: 'Date of Birth', value: user?.dateOfBirth || '—' },
              { label: 'Email', value: user?.email },
              { label: 'Phone', value: user?.phone || '—' },
            ].map((item, i, arr) => (
              <div key={item.label} style={{ padding: '14px 16px', borderBottom: i < arr.length - 1 ? '1px solid var(--border-color)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-gray)' }}>{item.label}</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-dark)', maxWidth: '60%', textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div style={{ marginBottom: '12px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Security</h3>
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            {[
              { label: 'Edit Profile', icon: <Edit3 size={16} color="var(--primary)" />, path: '/edit-profile' },
              { label: 'Change Password', icon: <Lock size={16} color="var(--primary)" />, path: '/change-password' },
            ].map((item, i) => (
              <div key={item.label} onClick={() => navigate(item.path)}
                style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i === 0 ? '1px solid var(--border-color)' : 'none', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ background: 'var(--bg-color)', padding: '8px', borderRadius: '8px' }}>{item.icon}</div>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.label}</span>
                </div>
                <ChevronRight size={16} color="var(--text-gray)" />
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button onClick={() => setShowLogoutModal(true)}
          style={{ width: '100%', padding: '16px', borderRadius: '14px', background: '#FEF2F2', color: 'var(--danger)', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '14px' }}>
          <LogOut size={18} /> Log Out
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 100 }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '32px 24px', textAlign: 'center', width: '100%' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>👋</div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Log Out?</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-gray)', marginBottom: '24px' }}>Are you sure you want to log out of your account?</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowLogoutModal(false)} style={{ flex: 1, padding: '14px', borderRadius: '12px', background: 'var(--bg-color)', border: 'none', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleLogout} style={{ flex: 1, padding: '14px', borderRadius: '12px', background: 'var(--danger)', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Yes, Log Out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
