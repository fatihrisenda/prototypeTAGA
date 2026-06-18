import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Search, Bell, MapPin, Star, Heart } from 'lucide-react';

const categories = [
  { name: 'All', icon: '🌐' },
  { name: 'Temple', icon: '🏛️' },
  { name: 'Nature', icon: '🌲' },
  { name: 'Palace', icon: '👑' },
  { name: 'Beach', icon: '🏖️' },
  { name: 'Gallery', icon: '🖼️' },
  { name: 'Culinary', icon: '🍽️' },
];

export default function Home() {
  const { user, destinations, t, favorites, toggleFavorite } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const featured = destinations[0];
  const nearby = destinations.slice(1).filter(d => activeCategory === 'All' || d.category === activeCategory);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="app-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: '13px', opacity: 0.8, marginBottom: '2px' }}>{t('greeting')}, 👋</p>
            <h1 style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.3px' }}>{user?.name?.split(' ')[0] || 'Explorer'}!</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', marginTop: '4px', opacity: 0.85 }}>
              <MapPin size={12} /> Yogyakarta, Indonesia
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => navigate('/profile')} style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', border: '2px solid rgba(255,255,255,0.4)', color: 'white', fontWeight: '800', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {user?.avatar || user?.name?.charAt(0) || 'U'}
            </button>
          </div>
        </div>

        <div style={{ position: 'relative', marginTop: '20px' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
          <input
            type="text"
            readOnly
            placeholder={t('searchPlaceholder')}
            onClick={() => navigate('/explore')}
            style={{ width: '100%', padding: '13px 16px 13px 42px', borderRadius: '12px', border: 'none', outline: 'none', fontSize: '14px', cursor: 'pointer', background: 'white' }}
          />
        </div>
      </div>

      <div className="scrollable" style={{ padding: '20px' }}>
        {/* Featured */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700' }}>{t('featured')}</h2>
        </div>

        {featured && (
          <Link to={`/destination/${featured.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ height: '190px', borderRadius: '20px', overflow: 'hidden', position: 'relative', marginBottom: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
              <img src={featured.image} alt={featured.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
              <div style={{ position: 'absolute', top: '14px', right: '14px', background: 'var(--primary)', color: 'white', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: '600' }}>
                #{featured.category}
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'white', marginBottom: '6px' }}>{featured.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: '6px' }}>
                      <Star size={11} color="#FFD700" fill="#FFD700" />
                      <span style={{ color: 'white', fontSize: '12px', fontWeight: '600' }}>{featured.rating}</span>
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>{featured.distance}</span>
                  </div>
                  <span style={{ color: 'white', fontWeight: '800', fontSize: '14px' }}>
                    {featured.price === 0 ? 'Free' : `Rp ${featured.price.toLocaleString()}`}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Nearby */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700' }}>{t('nearby')}</h2>
          <Link to="/explore" style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>{t('seeAll')}</Link>
        </div>

        {/* Category tabs */}
        <div className="tabs" style={{ marginBottom: '16px' }}>
          {categories.map(cat => (
            <div key={cat.name} className={`tab ${activeCategory === cat.name ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.name)}
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {cat.icon} {cat.name}
            </div>
          ))}
        </div>

        {/* Destination list */}
        {nearby.map(dest => (
          <div key={dest.id} style={{ position: 'relative' }}>
            <Link to={`/destination/${dest.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card" style={{ display: 'flex', gap: '12px', padding: '12px', marginBottom: '12px' }}>
                <img src={dest.image} alt={dest.name} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '3px' }}>{dest.name}</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-gray)', marginBottom: '8px' }}>{dest.distance} • {dest.category}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={12} color="#FFD700" fill="#FFD700" />
                      <span style={{ fontSize: '12px', fontWeight: '600' }}>{dest.rating}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-gray)' }}>({dest.reviews})</span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary)' }}>
                      {dest.price === 0 ? 'Free' : `Rp ${dest.price.toLocaleString()}`}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <button
              onClick={(e) => { e.preventDefault(); toggleFavorite(dest.id); }}
              style={{ position: 'absolute', top: '18px', right: '18px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <Heart size={18} fill={favorites.includes(dest.id) ? 'var(--danger)' : 'transparent'} color={favorites.includes(dest.id) ? 'var(--danger)' : 'var(--text-gray)'} />
            </button>
          </div>
        ))}
        {nearby.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-gray)' }}>
            <p>No destinations in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
