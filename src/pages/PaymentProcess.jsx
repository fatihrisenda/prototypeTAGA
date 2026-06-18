import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, XCircle, Home } from 'lucide-react';

export default function PaymentProcess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('success');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Reset when retrying
  useEffect(() => {
    if (status === 'pending') {
      const timer = setTimeout(() => {
        setStatus('success');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  if (!booking) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <p>No booking data found.</p>
      <button className="btn btn-primary" style={{ marginTop: '16px', width: 'auto', padding: '12px 28px', borderRadius: '12px' }} onClick={() => navigate('/home')}>Go Home</button>
    </div>
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)' }}>
      <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

        {status === 'pending' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 28px' }}>
              <div style={{ width: '80px', height: '80px', border: '4px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '10px' }}>Processing Payment...</h2>
            <p style={{ color: 'var(--text-gray)', fontSize: '14px', lineHeight: '1.6' }}>
              Please wait while we confirm your payment.<br />Do not close this page.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '24px' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)', animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite both` }} />
              ))}
              <style>{`@keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }`}</style>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div style={{ textAlign: 'center', width: '100%' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <Check size={50} color="var(--success)" strokeWidth={3} />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '8px' }}>Payment Successful! 🎉</h2>
            <p style={{ color: 'var(--text-gray)', fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
              Your booking has been confirmed!<br />Check your tickets in the Activity tab.
            </p>

            {booking.destination && (
              <div className="card" style={{ marginTop: '20px', padding: '16px', textAlign: 'left' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <img src={booking.destination.image} alt={booking.destination.name} style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '700' }}>{booking.destination.name}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-gray)', marginTop: '2px' }}>Ticket ID: {booking.id}</p>
                  </div>
                </div>
                <div style={{ borderTop: '1px dashed var(--border-color)', marginTop: '12px', paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-gray)' }}>Total Paid</span>
                  <span style={{ fontWeight: '800', color: 'var(--primary)' }}>Rp {(booking.totalPrice || 0).toLocaleString()}</span>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
              <button className="btn btn-outline" onClick={() => navigate('/home')} style={{ flex: 1, borderRadius: '12px', gap: '6px' }}>
                <Home size={16} /> Home
              </button>
              <button className="btn btn-primary" onClick={() => navigate('/bookings')} style={{ flex: 1, borderRadius: '12px' }}>
                View My Ticket
              </button>
            </div>
          </div>
        )}

        {status === 'failed' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <XCircle size={50} color="var(--danger)" />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '8px' }}>Payment Failed ⚠️</h2>
            <p style={{ color: 'var(--text-gray)', fontSize: '14px', lineHeight: '1.6', marginBottom: '28px' }}>
              We couldn't process your payment.<br />Please try again or use a different method.
            </p>
            <button className="btn btn-primary" style={{ backgroundColor: 'var(--danger)', borderRadius: '14px' }} onClick={() => setStatus('pending')}>Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
}
