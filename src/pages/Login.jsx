import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Headset, Eye, EyeOff } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e?.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password, role);
      setLoading(false);
      if (result.success) {
        navigate(role === 'admin' ? '/admin' : '/home');
      } else {
        setError(result.message);
      }
    }, 1200);
  };

  const handleQuickFill = (preset) => {
    const presets = {
      yoel: { email: 'yoel@email.com', password: 'yoel123', role: 'user' },
      fatih: { email: 'fatih@email.com', password: 'fatih123', role: 'user' },
      admin: { email: 'admin@audioguide.com', password: 'admin123', role: 'admin' },
    };
    const p = presets[preset];
    setEmail(p.email); setPassword(p.password); setRole(p.role); setError('');
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--primary)', position: 'relative', overflow: 'hidden' }}>
      {/* Loading overlay */}
      {loading && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.9)', zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', border: '4px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <p style={{ color: 'var(--text-gray)', fontWeight: '500' }}>Signing in...</p>
          <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
      <div style={{ position: 'absolute', top: '60px', right: '30px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />

      {/* Logo area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', position: 'relative', zIndex: 1 }}>
        <div style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', padding: '20px', borderRadius: '24px', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.3)' }}>
          <Headset size={40} color="white" />
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: '800', letterSpacing: '-0.5px' }}>AudioGuide</h1>
        <p style={{ fontSize: '13px', opacity: 0.75, marginTop: '4px' }}>Your pocket audio companion</p>
      </div>

      {/* Card */}
      <div style={{ background: 'var(--white)', padding: '32px 24px 24px', borderTopLeftRadius: '32px', borderTopRightRadius: '32px', flex: '0 0 auto' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '4px', letterSpacing: '-0.3px' }}>Welcome Back 👋</h2>
        <p style={{ color: 'var(--text-gray)', fontSize: '13px', marginBottom: '24px' }}>Sign in to continue your journey</p>

        {/* Quick fill demo buttons */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-gray)', display: 'flex', alignItems: 'center' }}>Quick:</span>
          {['yoel', 'fatih', 'admin'].map(p => (
            <button key={p} onClick={() => handleQuickFill(p)}
              style={{ padding: '4px 10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', fontSize: '11px', cursor: 'pointer', fontWeight: '600', color: 'var(--text-dark)', textTransform: 'capitalize' }}>
              {p}
            </button>
          ))}
        </div>

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: 'var(--danger)', padding: '12px 16px', borderRadius: '12px', fontSize: '13px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" className="input-field" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', paddingRight: '48px' }}
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-gray)', display: 'flex', padding: 0 }}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              {['user', 'admin'].map(r => (
                <label key={r} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', color: role === r ? 'var(--primary)' : 'var(--text-gray)', fontWeight: role === r ? '600' : '400' }}>
                  <input type="radio" name="role" value={r} checked={role === r} onChange={() => setRole(r)} style={{ accentColor: 'var(--primary)' }} />
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </label>
              ))}
            </div>
            <Link to="/forgot-password" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>Forgot Password?</Link>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: '20px', borderRadius: '14px', fontSize: '15px' }}>
            Sign In
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
          <span style={{ fontSize: '12px', color: 'var(--text-gray)' }}>or continue with</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <button className="btn btn-outline" style={{ flex: 1, borderColor: 'var(--border-color)', color: 'var(--text-dark)', borderRadius: '12px', gap: '8px' }}
            onClick={() => { setEmail('yoel@email.com'); setPassword('yoel123'); setRole('user'); handleLogin(); }}>
            🇬 Google
          </button>
          <button className="btn btn-outline" style={{ flex: 1, borderColor: 'var(--border-color)', color: 'var(--text-dark)', borderRadius: '12px', gap: '8px' }}
            onClick={() => { setEmail('fatih@email.com'); setPassword('fatih123'); setRole('user'); handleLogin(); }}>
            𝔽 Facebook
          </button>
        </div>

        <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-gray)' }}>
          Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '700' }}>Sign Up →</Link>
        </p>
      </div>
    </div>
  );
}
