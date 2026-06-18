import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Check } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function ChangePassword() {
  const navigate = useNavigate();
  const { user, showToast } = useContext(AppContext);
  const [form, setForm] = useState({ current: '', newPass: '', confirm: '' });
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const dummyPasswords = {
    'yoel@email.com': 'yoel123',
    'fatih@email.com': 'fatih123',
    'admin@audioguide.com': 'admin123',
  };

  const validateAndSubmit = (e) => {
    e?.preventDefault();
    setError('');
    const correctPass = dummyPasswords[user?.email];
    if (form.current !== correctPass) {
      setError('Current password is incorrect.');
      return;
    }
    if (form.newPass.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    if (form.newPass !== form.confirm) {
      setError('Passwords do not match. Please try again.');
      return;
    }
    setShowConfirm(true);
  };

  const handleSave = () => {
    setShowConfirm(false);
    setSaved(true);
    setTimeout(() => { setSaved(false); navigate('/profile'); }, 1800);
  };

  const passwordTips = [
    'At least 8 characters',
    'Mix letters, numbers & symbols',
    "Don't reuse old passwords",
  ];

  if (saved) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', gap: '16px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Check size={40} color="var(--success)" strokeWidth={3} />
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: '800' }}>Password Changed! 🔒</h2>
        <p style={{ color: 'var(--text-gray)', textAlign: 'center', fontSize: '14px' }}>Your password has been successfully updated. Keep it safe!</p>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)' }}>
      <div className="app-header white-header">
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0 }}>
          <ArrowLeft size={22} color="var(--text-dark)" />
        </button>
        <span style={{ fontSize: '16px', fontWeight: '700', flex: 1, textAlign: 'center' }}>Change Password</span>
        <div style={{ width: 22 }} />
      </div>

      <div className="scrollable" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>Update Your Password</h3>
        <p style={{ fontSize: '13px', color: 'var(--text-gray)', marginBottom: '24px' }}>Choose a strong password — at least 8 characters with numbers and symbols.</p>

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: 'var(--danger)', padding: '12px 16px', borderRadius: '12px', fontSize: '13px', marginBottom: '16px' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={validateAndSubmit}>
          {[
            { key: 'current', label: 'Current Password', placeholder: '••••••••' },
            { key: 'newPass', label: 'New Password', placeholder: 'Min. 6 characters' },
            { key: 'confirm', label: 'Confirm New Password', placeholder: 'Re-enter new password' },
          ].map(field => (
            <div className="input-group" key={field.key}>
              <label>{field.label}</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={show[field.key] ? 'text' : 'password'}
                  className="input-field"
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  style={{ width: '100%', paddingRight: '48px' }}
                  required
                />
                <button type="button"
                  onClick={() => setShow({ ...show, [field.key]: !show[field.key] })}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-gray)', display: 'flex', padding: 0 }}>
                  {show[field.key] ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          ))}

          {/* Password tips */}
          <div style={{ background: 'var(--white)', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px', border: '1px solid var(--border-color)' }}>
            <p style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px' }}>Password Tips:</p>
            {passwordTips.map(tip => (
              <div key={tip} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: 'var(--text-gray)' }}>{tip}</span>
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary" style={{ borderRadius: '14px' }}>Save New Password</button>
        </form>
      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 100 }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '32px 24px', textAlign: 'center', width: '100%' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔑</div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Change Password?</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-gray)', marginBottom: '24px' }}>Are you sure you want to update your password?</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowConfirm(false)} style={{ flex: 1, padding: '14px', borderRadius: '12px', background: 'var(--bg-color)', border: 'none', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleSave} style={{ flex: 1, padding: '14px', borderRadius: '12px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Yes, Change</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
