import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Globe, Shield, HelpCircle, Info, Accessibility, X, ChevronRight, Moon } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const LANGUAGES = [
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'id', flag: '🇮🇩', name: 'Bahasa Indonesia' },
];

export default function SettingsPage() {
  const navigate = useNavigate();
  const { lang, setLang, accessibility, setAccessibility, t, showToast } = useContext(AppContext);
  const [showLangModal, setShowLangModal] = useState(false);
  const [showAccModal, setShowAccModal] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const settingsGroups = [
    {
      title: 'Preferences',
      items: [
        {
          icon: <Bell size={18} color="var(--primary)" />,
          label: 'Notifications',
          value: notifications ? 'On' : 'Off',
          right: (
            <div onClick={() => { setNotifications(!notifications); showToast((!notifications ? 'Notifications enabled' : 'Notifications muted')); }}
              style={{ width: '44px', height: '24px', borderRadius: '12px', background: notifications ? 'var(--primary)' : 'var(--border-color)', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
              <div style={{ position: 'absolute', top: '2px', left: notifications ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }} />
            </div>
          ),
        },
        {
          icon: <Globe size={18} color="var(--primary)" />,
          label: t('language'),
          value: LANGUAGES.find(l => l.code === lang)?.flag + ' ' + LANGUAGES.find(l => l.code === lang)?.name,
          onClick: () => setShowLangModal(true),
        },
      ]
    },
    {
      title: 'Accessibility',
      items: [
        {
          icon: <Accessibility size={18} color="var(--primary)" />,
          label: t('highContrast'),
          right: (
            <div onClick={() => setAccessibility({ ...accessibility, highContrast: !accessibility.highContrast })}
              style={{ width: '44px', height: '24px', borderRadius: '12px', background: accessibility.highContrast ? 'var(--primary)' : 'var(--border-color)', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
              <div style={{ position: 'absolute', top: '2px', left: accessibility.highContrast ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
            </div>
          ),
        },
        {
          icon: <Moon size={18} color="var(--primary)" />,
          label: t('largeText'),
          right: (
            <div onClick={() => setAccessibility({ ...accessibility, largeText: !accessibility.largeText })}
              style={{ width: '44px', height: '24px', borderRadius: '12px', background: accessibility.largeText ? 'var(--primary)' : 'var(--border-color)', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
              <div style={{ position: 'absolute', top: '2px', left: accessibility.largeText ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
            </div>
          ),
        },
      ]
    },
    {
      title: 'About',
      items: [
        { icon: <Shield size={18} color="var(--primary)" />, label: 'Privacy & Policy', onClick: () => showToast('Opening Privacy Policy...') },
        { icon: <HelpCircle size={18} color="var(--primary)" />, label: 'Help & Support', onClick: () => showToast('Opening Help Center...') },
        { icon: <Info size={18} color="var(--primary)" />, label: 'About AudioGuide', value: 'v3.0.0', onClick: () => showToast('AudioGuide v3.0.0 — Tourism Audio App') },
      ]
    }
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)' }}>
      <div className="app-header white-header">
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0 }}>
          <ArrowLeft size={22} color="var(--text-dark)" />
        </button>
        <span style={{ fontSize: '16px', fontWeight: '700', flex: 1, textAlign: 'center' }}>{t('settings')}</span>
        <div style={{ width: 22 }} />
      </div>

      <div className="scrollable" style={{ padding: '20px' }}>
        {settingsGroups.map(group => (
          <div key={group.title} style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '10px', paddingLeft: '4px' }}>
              {group.title}
            </h3>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {group.items.map((item, i) => (
                <div key={item.label}
                  onClick={item.onClick}
                  style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i < group.items.length - 1 ? '1px solid var(--border-color)' : 'none', cursor: item.onClick ? 'pointer' : 'default' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: 'var(--bg-color)', padding: '8px', borderRadius: '8px' }}>
                      {item.icon}
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {item.value && <span style={{ fontSize: '12px', color: 'var(--text-gray)' }}>{item.value}</span>}
                    {item.right && item.right}
                    {item.onClick && !item.right && <ChevronRight size={16} color="var(--text-gray)" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Language Modal */}
      {showLangModal && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', zIndex: 100 }}>
          <div style={{ background: 'var(--white)', width: '100%', padding: '24px', borderTopLeftRadius: '28px', borderTopRightRadius: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: '800', fontSize: '16px' }}>Select Language</h3>
              <button onClick={() => setShowLangModal(false)} style={{ background: 'var(--bg-color)', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex' }}>
                <X size={18} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {LANGUAGES.map(l => (
                <button key={l.code}
                  onClick={() => { setLang(l.code); setShowLangModal(false); showToast(`Language changed to ${l.name}`); }}
                  style={{ padding: '14px 16px', borderRadius: '12px', border: lang === l.code ? '2px solid var(--primary)' : '1px solid var(--border-color)', background: lang === l.code ? 'rgba(47,128,237,0.07)' : 'transparent', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontSize: '24px' }}>{l.flag}</span>
                  <span style={{ fontWeight: lang === l.code ? '700' : '500', fontSize: '15px', color: lang === l.code ? 'var(--primary)' : 'var(--text-dark)' }}>{l.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
