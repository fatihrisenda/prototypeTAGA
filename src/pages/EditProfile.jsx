import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function EditProfile() {
  const { user, updateUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e?.preventDefault();
    setShowConfirm(false);
    updateUser(form);
    setSaved(true);
    setTimeout(() => { setSaved(false); navigate('/profile'); }, 1800);
  };

  if (saved) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', gap: '16px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Check size={40} color="var(--success)" strokeWidth={3} />
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: '800' }}>Profile Updated! ✅</h2>
        <p style={{ color: 'var(--text-gray)', textAlign: 'center', fontSize: '14px' }}>Your profile has been successfully updated.</p>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)' }}>
      {/* Header */}
      <div className="app-header white-header" style={{ justifyContent: 'space-between' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0 }}>
          <ArrowLeft size={22} color="var(--text-dark)" />
        </button>
        <span style={{ fontSize: '16px', fontWeight: '700', flex: 1, textAlign: 'center' }}>Edit Profile</span>
        <button onClick={() => setShowConfirm(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontWeight: '700', fontSize: '14px' }}>
          Save
        </button>
      </div>

      <div className="scrollable" style={{ padding: '24px' }}>
        {/* Avatar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '84px', height: '84px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: '800', boxShadow: '0 4px 16px rgba(47,128,237,0.35)' }}>
              {user?.avatar || user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </div>

        <h3 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>Edit Information</h3>

        <form onSubmit={(e) => { e.preventDefault(); setShowConfirm(true); }}>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="input-group">
            <label>Date of Birth</label>
            <input type="date" className="input-field" value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="input-group">
            <label>Phone Number</label>
            <input type="tel" className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '8px', borderRadius: '14px' }}>Save Changes</button>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 100 }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '32px 24px', textAlign: 'center', width: '100%' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>💾</div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Save Changes?</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-gray)', marginBottom: '24px' }}>Are you sure you want to update your profile information?</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowConfirm(false)} style={{ flex: 1, padding: '14px', borderRadius: '12px', background: 'var(--bg-color)', border: 'none', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleSave} style={{ flex: 1, padding: '14px', borderRadius: '12px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Yes, Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
