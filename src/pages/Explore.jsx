import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Filter, X, Heart } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const categories = ['All', 'Temple', 'Nature', 'Palace', 'Beach', 'Gallery', 'Culinary'];
const catIcons = { All: '🌐', Temple: '🏛️', Nature: '🌲', Palace: '👑', Beach: '🏖️', Gallery: '🖼️', Culinary: '🍽️' };

export default function Explore() {
  const { destinations, t, favorites, toggleFavorite } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [sortBy, setSortBy] = useState('rating');

  const filtered = destinations.filter(d => {
    const matchTab = activeTab === 'All' || d.category === activeTab;
    const matchSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPrice = d.price <= maxPrice;
    return matchTab && matchSearch && matchPrice;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    return 0;
  });

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '24px 20px 16px', background: 'var(--white)', borderBottom: '1px solid var(--border-color)' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>{t('explore')}</h1>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '13px', background: 'var(--bg-color)' }}
            />
          </div>
          <button onClick={() => setShowFilter(true)}
            style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--primary)', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <Filter size={18} color="white" />
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveTab(cat)}
              style={{ padding: '8px 14px', borderRadius: '20px', border: activeTab === cat ? '2px solid var(--primary)' : '1px solid var(--border-color)', background: activeTab === cat ? 'var(--primary)' : 'transparent', color: activeTab === cat ? 'white' : 'var(--text-gray)', fontWeight: activeTab === cat ? '700' : '400', fontSize: '12px', whiteSpace: 'nowrap', cursor: 'pointer' }}>
              {catIcons[cat]} {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="scrollable" style={{ flex: 1, padding: '16px 20px' }}>
        <p style={{ fontSize: '12px', color: 'var(--text-gray)', marginBottom: '14px', fontWeight: '500' }}>
          {filtered.length} destination{filtered.length !== 1 ? 's' : ''} found
        </p>

        {filtered.map(dest => (
          <div key={dest.id} style={{ position: 'relative' }}>
            <Link to={`/destination/${dest.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card" style={{ display: 'flex', gap: '12px', padding: '12px', marginBottom: '12px' }}>
                <img src={dest.image} alt={dest.name} style={{ width: '82px', height: '82px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{dest.name}</h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-gray)', marginBottom: '6px' }}>{dest.distance} • {dest.category}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={11} color="#FFD700" fill="#FFD700" />
                      <span style={{ fontSize: '12px', fontWeight: '600' }}>{dest.rating}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-gray)' }}>({dest.reviews})</span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary)' }}>
                      {dest.price === 0 ? t('free') : `Rp ${dest.price.toLocaleString()}`}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <button onClick={() => toggleFavorite(dest.id)}
              style={{ position: 'absolute', top: '18px', right: '18px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <Heart size={18} fill={favorites.includes(dest.id) ? 'var(--danger)' : 'transparent'} color={favorites.includes(dest.id) ? 'var(--danger)' : 'var(--text-gray)'} />
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-gray)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <p style={{ fontWeight: '600', marginBottom: '6px' }}>No destinations found</p>
            <p style={{ fontSize: '13px' }}>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      {showFilter && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', zIndex: 100 }}>
          <div style={{ background: 'var(--white)', width: '100%', padding: '24px', borderTopLeftRadius: '28px', borderTopRightRadius: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontWeight: '800', fontSize: '16px' }}>Filter & Sort</h3>
              <button onClick={() => setShowFilter(false)} style={{ background: 'var(--bg-color)', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex' }}>
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '12px' }}>Sort by</p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              {[['rating', 'Top Rated'], ['price_asc', 'Price ↑'], ['price_desc', 'Price ↓']].map(([val, label]) => (
                <button key={val} onClick={() => setSortBy(val)}
                  style={{ flex: 1, padding: '10px', borderRadius: '10px', border: sortBy === val ? '2px solid var(--primary)' : '1px solid var(--border-color)', background: sortBy === val ? 'rgba(47,128,237,0.07)' : 'transparent', color: sortBy === val ? 'var(--primary)' : 'var(--text-gray)', fontWeight: sortBy === val ? '700' : '400', cursor: 'pointer', fontSize: '12px' }}>
                  {label}
                </button>
              ))}
            </div>

            <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '8px' }}>Max Price</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-gray)' }}>Rp 0</span>
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)' }}>Rp {maxPrice === 200000 ? '200K (All)' : maxPrice.toLocaleString()}</span>
            </div>
            <input type="range" min="0" max="200000" step="10000" value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              style={{ width: '100%', marginBottom: '24px', accentColor: 'var(--primary)' }} />

            <button className="btn btn-primary" onClick={() => setShowFilter(false)} style={{ borderRadius: '14px' }}>Apply Filter</button>
          </div>
        </div>
      )}
    </div>
  );
}
