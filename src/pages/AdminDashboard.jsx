import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { BarChart3, Users, TrendingUp, LogOut, Activity, Map } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { activities, transactions, logout, destinations } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const revenue = transactions.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="app-header" style={{ borderBottomLeftRadius: '0', borderBottomRightRadius: '0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '13px', opacity: 0.8 }}>Welcome back,</p>
            <h1 style={{ fontSize: '20px', fontWeight: '800' }}>Admin Panel 👨‍💼</h1>
          </div>
          <button onClick={handleLogout}
            style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '8px 14px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      </div>

      <div className="scrollable" style={{ padding: '20px' }}>
        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <div className="card" style={{ padding: '16px', marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{ background: '#EFF6FF', padding: '6px', borderRadius: '8px' }}>
                <Map size={16} color="var(--primary)" />
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-gray)', fontWeight: '500' }}>Destinations</span>
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-dark)' }}>{destinations.length}</h2>
            <p style={{ fontSize: '11px', color: 'var(--success)', fontWeight: '500', marginTop: '4px' }}>↑ 2 this week</p>
          </div>
          <div className="card" style={{ padding: '16px', marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{ background: '#F0FDF4', padding: '6px', borderRadius: '8px' }}>
                <TrendingUp size={16} color="var(--success)" />
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-gray)', fontWeight: '500' }}>Revenue</span>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-dark)' }}>Rp {(revenue / 1000).toFixed(0)}K</h2>
            <p style={{ fontSize: '11px', color: 'var(--success)', fontWeight: '500', marginTop: '4px' }}>↑ +12% vs last month</p>
          </div>
          <div className="card" style={{ padding: '16px', marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{ background: '#FFF7ED', padding: '6px', borderRadius: '8px' }}>
                <Users size={16} color="#F97316" />
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-gray)', fontWeight: '500' }}>Active Users</span>
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-dark)' }}>1,240</h2>
            <p style={{ fontSize: '11px', color: 'var(--success)', fontWeight: '500', marginTop: '4px' }}>↑ 3.2% this week</p>
          </div>
          <div className="card" style={{ padding: '16px', marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{ background: '#FDF4FF', padding: '6px', borderRadius: '8px' }}>
                <BarChart3 size={16} color="#A855F7" />
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-gray)', fontWeight: '500' }}>Transactions</span>
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-dark)' }}>{transactions.length}</h2>
            <p style={{ fontSize: '11px', color: 'var(--success)', fontWeight: '500', marginTop: '4px' }}>All successful</p>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <Link to="/admin/destinations" style={{ flex: 1, background: 'var(--primary)', color: 'white', padding: '12px', borderRadius: '12px', textDecoration: 'none', textAlign: 'center', fontSize: '13px', fontWeight: '700' }}>
            + Add Destination
          </Link>
          <Link to="/admin/transactions" style={{ flex: 1, background: 'var(--white)', color: 'var(--primary)', border: '2px solid var(--primary)', padding: '12px', borderRadius: '12px', textDecoration: 'none', textAlign: 'center', fontSize: '13px', fontWeight: '700' }}>
            View Transactions
          </Link>
        </div>

        {/* Live activity log */}
        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={16} color="var(--primary)" />
          <h3 style={{ fontSize: '15px', fontWeight: '700' }}>Live Activity Log</h3>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', marginLeft: 'auto', animation: 'pulse 2s infinite' }} />
          <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }`}</style>
        </div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {activities.slice(0, 8).map((act, i) => (
            <div key={act.id} style={{ padding: '14px 16px', borderBottom: i < Math.min(activities.length, 8) - 1 ? '1px solid var(--border-color)' : 'none', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px', flexShrink: 0 }}>
                {act.user?.charAt(0)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '13px', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <strong>{act.user}</strong> {act.action}
                </p>
                <p style={{ fontSize: '11px', color: 'var(--text-gray)', marginTop: '2px' }}>{act.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
