import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Globe, Accessibility, LogOut, X, ChevronRight, Moon } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'id', flag: '🇮🇩', name: 'Bahasa Indonesia' },
];

export default function AdminSettings() {
  const { lang, setLang, accessibility, setAccessibility, t, logout, showToast } = useContext(AppContext);
  const navigate = useNavigate();
  const [showLangModal, setShowLangModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '24px 24px 0' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '4px' }}>Admin Settings</h1>
        <p style={{ fontSize: '12px', color: 'var(--text-gray)', marginBottom: '24px' }}>Manage app preferences and accessibility.</p>
      </div>

      <div className="scrollable" style={{ flex: 1, padding: '0 24px 24px' }}>

        <h3 style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '10px' }}>Preferences</h3>
        <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '20px' }}>
          <div onClick={() => setShowLangModal(true)}
            style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: 'var(--bg-color)', padding: '8px', borderRadius: '8px' }}>
                <Globe size={18} color="var(--primary)" />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>{t('language')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-gray)' }}>{LANGUAGES.find(l => l.code === lang)?.flag} {LANGUAGES.find(l => l.code === lang)?.name}</span>
              <ChevronRight size={16} color="var(--text-gray)" />
            </div>
          </div>
        </div>

        <h3 style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '10px' }}>Accessibility</h3>
        <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '20px' }}>
          {[
            { icon: <Accessibility size={18} color="var(--primary)" />, label: t('highContrast'), key: 'highContrast' },
            { icon: <Moon size={18} color="var(--primary)" />, label: t('largeText'), key: 'largeText' },
          ].map((item, i) => (
            <div key={item.key} style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i === 0 ? '1px solid var(--border-color)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: 'var(--bg-color)', padding: '8px', borderRadius: '8px' }}>{item.icon}</div>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.label}</span>
              </div>
              <div onClick={() => setAccessibility({ ...accessibility, [item.key]: !accessibility[item.key] })}
                style={{ width: '44px', height: '24px', borderRadius: '12px', background: accessibility[item.key] ? 'var(--primary)' : 'var(--border-color)', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: '2px', left: accessibility[item.key] ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
              </div>
            </div>
          ))}
        </div>

        <button onClick={handleLogout}
          style={{ width: '100%', padding: '16px', borderRadius: '14px', background: '#FEF2F2', color: 'var(--danger)', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '14px' }}>
          <LogOut size={18} /> Logout Admin
        </button>
      </div>

      {showLangModal && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', zIndex: 100 }}>
          <div style={{ background: 'white', width: '100%', padding: '24px', borderTopLeftRadius: '28px', borderTopRightRadius: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: '800' }}>Select Language</h3>
              <button onClick={() => setShowLangModal(false)} style={{ background: 'var(--bg-color)', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex' }}><X size={18} /></button>
            </div>
            {LANGUAGES.map(l => (
              <button key={l.code} onClick={() => { setLang(l.code); setShowLangModal(false); showToast(`Language set to ${l.name}`); }}
                style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: lang === l.code ? '2px solid var(--primary)' : '1px solid var(--border-color)', background: lang === l.code ? 'rgba(47,128,237,0.07)' : 'transparent', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', marginBottom: '10px' }}>
                <span style={{ fontSize: '24px' }}>{l.flag}</span>
                <span style={{ fontWeight: lang === l.code ? '700' : '500', color: lang === l.code ? 'var(--primary)' : 'var(--text-dark)' }}>{l.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
