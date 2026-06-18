import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { QrCode, Ticket, History, PlayCircle, ArrowLeft } from 'lucide-react';

export default function BookingsList() {
  const { bookings, t, user } = useContext(AppContext);
  const navigate = useNavigate();
  const [tab, setTab] = useState('Ticket');

  const myBookings = bookings.filter(b => b.userName === user?.name);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)' }}>
      <div style={{ padding: '24px 20px 16px', background: 'var(--white)', borderBottom: '1px solid var(--border-color)' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800' }}>Activity Destination</h1>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ display: 'flex', background: 'var(--white)', borderRadius: '12px', padding: '4px', border: '1px solid var(--border-color)', marginBottom: '0' }}>
          <button
            onClick={() => setTab('Ticket')}
            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: tab === 'Ticket' ? 'var(--primary)' : 'transparent', color: tab === 'Ticket' ? 'white' : 'var(--text-gray)', fontWeight: '700', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s' }}>
            <Ticket size={16} /> {t('myTickets')}
          </button>
          <button
            onClick={() => setTab('History')}
            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: tab === 'History' ? 'var(--primary)' : 'transparent', color: tab === 'History' ? 'white' : 'var(--text-gray)', fontWeight: '700', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s' }}>
            <History size={16} /> {t('history')}
          </button>
        </div>
      </div>

      <div className="scrollable" style={{ flex: 1, padding: '16px 20px' }}>
        {tab === 'Ticket' ? (
          <div>
            {myBookings.filter(b => b.status === 'Completed').length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-gray)' }}>
                <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎫</div>
                <p style={{ fontWeight: '600', marginBottom: '6px' }}>No Tickets Yet</p>
                <p style={{ fontSize: '13px' }}>Book a destination to get your ticket.</p>
                <button onClick={() => navigate('/explore')} className="btn btn-primary" style={{ marginTop: '20px', width: 'auto', padding: '12px 28px', borderRadius: '12px' }}>Explore Now</button>
              </div>
            ) : (
              myBookings.filter(b => b.status === 'Completed').map(booking => (
                <div key={booking.id} className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '20px' }}>
                  <div style={{ background: 'var(--primary)', color: 'white', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontWeight: '800', fontSize: '14px' }}>Electronic Ticket</p>
                      <p style={{ fontSize: '11px', opacity: 0.8, marginTop: '2px' }}>{booking.id}</p>
                    </div>
                    <QrCode size={28} />
                  </div>

                  <div style={{ padding: '16px', display: 'flex', gap: '14px' }}>
                    <img src={booking.destination.image} alt={booking.destination.name} style={{ width: '72px', height: '72px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>{booking.destination.name}</h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-gray)' }}>Entrance + Audio Guide</p>
                    </div>
                  </div>

                  <div style={{ padding: '0 16px 16px', display: 'flex', gap: '16px' }}>
                    {[{ label: t('date'), value: booking.date }, { label: 'Time', value: '09:00 AM' }, { label: t('visitors'), value: `${booking.visitors || 1} pax` }].map(item => (
                      <div key={item.label} style={{ flex: 1 }}>
                        <p style={{ fontSize: '11px', color: 'var(--text-gray)', marginBottom: '3px' }}>{item.label}</p>
                        <p style={{ fontSize: '12px', fontWeight: '700' }}>{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '2px dashed var(--border-color)', padding: '14px 16px' }}>
                    <button className="btn btn-primary" onClick={() => navigate(`/audio-connect/${booking.id}`)} style={{ borderRadius: '12px' }}>
                      🎧 Connect to Audio Guide
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div>
            {myBookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-gray)' }}>
                <div style={{ fontSize: '56px', marginBottom: '16px' }}>📜</div>
                <p style={{ fontWeight: '600' }}>No history yet.</p>
              </div>
            ) : (
              myBookings.map(booking => (
                <div key={booking.id} className="card" style={{ display: 'flex', gap: '12px', padding: '14px', marginBottom: '12px' }}>
                  <img src={booking.destination.image} alt={booking.destination.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{booking.destination.name}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-gray)', marginTop: '2px' }}>{booking.date}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                      <span style={{ fontSize: '10px', background: '#ECFDF5', color: 'var(--success)', padding: '2px 8px', borderRadius: '5px', fontWeight: '700' }}>✓ Completed</span>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)' }}>Rp {(booking.totalPrice || 0).toLocaleString()}</span>
                    </div>
                  </div>
                  <button onClick={() => navigate(`/audio-player/${booking.id}`)}
                    style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--primary)', color: 'var(--primary)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap', alignSelf: 'center' }}>
                    <PlayCircle size={14} /> Replay
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
