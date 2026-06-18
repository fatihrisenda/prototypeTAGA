import { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ArrowLeft, Star, MapPin, Share2, Heart, X, Clock, Headphones, Users } from 'lucide-react';

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { destinations, t, favorites, toggleFavorite, showToast } = useContext(AppContext);
  const destination = destinations.find(d => d.id === parseInt(id));

  const [visitors, setVisitors] = useState(2);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showShareModal, setShowShareModal] = useState(false);

  if (!destination) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ fontSize: '56px', marginBottom: '16px' }}>🗺️</div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Destination Not Found</h2>
        <p style={{ color: 'var(--text-gray)', marginBottom: '24px' }}>The destination you're looking for doesn't exist.</p>
        <button className="btn btn-primary" onClick={() => navigate('/explore')} style={{ width: 'auto', padding: '12px 28px', borderRadius: '12px' }}>Explore Destinations</button>
      </div>
    );
  }

  const isFav = favorites.includes(destination.id);

  const handleProceed = () => {
    navigate(`/booking/${id}`, { state: { visitors, date } });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: destination.name, text: `Check out ${destination.name} on AudioGuide!`, url: window.location.href }).catch(() => {});
    } else {
      setShowShareModal(true);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Hero Image */}
      <div style={{ position: 'relative', height: '280px', flexShrink: 0 }}>
        <img src={destination.image} alt={destination.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.4) 100%)' }} />

        {/* Top bar */}
        <div style={{ position: 'absolute', top: 0, width: '100%', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="btn-icon" onClick={() => navigate(-1)} style={{ backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.85)' }}>
            <ArrowLeft size={18} />
          </button>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-icon" onClick={handleShare} style={{ backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.85)' }}>
              <Share2 size={18} />
            </button>
            <button className="btn-icon" onClick={() => toggleFavorite(destination.id)} style={{ backdropFilter: 'blur(8px)', background: isFav ? '#FEE2E2' : 'rgba(255,255,255,0.85)' }}>
              <Heart size={18} fill={isFav ? "var(--danger)" : "transparent"} color={isFav ? "var(--danger)" : "currentColor"} />
            </button>
          </div>
        </div>

        {/* Category badge */}
        <div style={{ position: 'absolute', bottom: '50px', left: '20px', background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}>
          #{destination.category}
        </div>
      </div>

      {/* Content card */}
      <div style={{ flex: 1, backgroundColor: 'var(--white)', marginTop: '-28px', borderTopLeftRadius: '28px', borderTopRightRadius: '28px', zIndex: 10, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <div className="scrollable" style={{ flex: 1, padding: '28px 20px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.3px', marginBottom: '6px' }}>{destination.name}</h1>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px' }}>
              <Star size={14} color="#FFD700" fill="#FFD700" /> <span style={{ fontWeight: '700' }}>{destination.rating}</span> <span style={{ color: 'var(--text-gray)' }}>({destination.reviews} reviews)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'var(--text-gray)' }}>
              <MapPin size={14} /> {destination.distance}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'var(--text-gray)' }}>
              <Clock size={14} /> {destination.audioDuration}
            </div>
          </div>

          <p style={{ color: 'var(--text-gray)', fontSize: '13px', lineHeight: '1.7', marginBottom: '20px' }}>{destination.description}</p>

          {/* Highlights */}
          {destination.highlights && destination.highlights.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>Highlights</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {destination.highlights.map(h => (
                  <span key={h} style={{ background: '#EFF6FF', color: 'var(--primary)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600' }}>
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Booking section */}
          <div style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: '16px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '14px' }}>Book This Tour</h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users size={16} color="var(--primary)" />
                <span style={{ fontSize: '13px', fontWeight: '500' }}>{t('visitors')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0', background: 'var(--white)', borderRadius: '10px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                <button onClick={() => setVisitors(v => Math.max(1, v - 1))} style={{ width: '36px', height: '36px', border: 'none', background: 'none', fontSize: '18px', cursor: 'pointer', fontWeight: '700', color: visitors > 1 ? 'var(--primary)' : 'var(--border-color)' }}>−</button>
                <span style={{ padding: '0 12px', fontWeight: '800', fontSize: '15px', minWidth: '24px', textAlign: 'center' }}>{visitors}</span>
                <button onClick={() => setVisitors(v => v + 1)} style={{ width: '36px', height: '36px', border: 'none', background: 'none', fontSize: '18px', cursor: 'pointer', fontWeight: '700', color: 'var(--primary)' }}>+</button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: '500' }}>{t('date')}</span>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '13px', background: 'var(--white)' }} />
            </div>
          </div>

          {/* Price summary */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: '14px 16px', background: '#EFF6FF', borderRadius: '12px' }}>
            <div>
              <p style={{ fontSize: '11px', color: 'var(--text-gray)', marginBottom: '2px' }}>{t('price')}</p>
              <p style={{ fontSize: '16px', fontWeight: '800', color: 'var(--primary)' }}>
                {destination.price === 0 ? t('free') : `Rp ${destination.price.toLocaleString()}`} <span style={{ fontSize: '11px', color: 'var(--text-gray)', fontWeight: '400' }}>/ person</span>
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '11px', color: 'var(--text-gray)', marginBottom: '2px' }}>{t('total')}</p>
              <p style={{ fontSize: '18px', fontWeight: '800' }}>Rp {(destination.price * visitors).toLocaleString()}</p>
            </div>
          </div>

          <button className="btn btn-primary" onClick={handleProceed} style={{ borderRadius: '14px', fontSize: '15px' }}>
            {t('payNow')} →
          </button>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', zIndex: 100 }}>
          <div style={{ background: 'var(--white)', width: '100%', padding: '24px', borderTopLeftRadius: '28px', borderTopRightRadius: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: '800', fontSize: '16px' }}>Share This Tour</h3>
              <button onClick={() => setShowShareModal(false)} style={{ background: 'var(--bg-color)', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex' }}>
                <X size={18} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              {[
                { icon: '🔗', label: 'Copy Link', action: () => { navigator.clipboard.writeText(window.location.href); showToast('Link copied!'); setShowShareModal(false); } },
                { icon: '📸', label: 'Instagram', action: () => { showToast('Opening Instagram...'); setShowShareModal(false); } },
                { icon: '💬', label: 'WhatsApp', action: () => { showToast('Opening WhatsApp...'); setShowShareModal(false); } },
              ].map(s => (
                <div key={s.label} onClick={s.action} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{s.icon}</div>
                  <span style={{ fontSize: '11px', color: 'var(--text-gray)', fontWeight: '500' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
