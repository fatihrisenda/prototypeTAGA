import { useContext, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ArrowLeft, CreditCard, Copy, Check } from 'lucide-react';

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { destinations, addBooking, t } = useContext(AppContext);
  
  const destination = destinations.find(d => d.id === parseInt(id));
  const { visitors = 1, date = new Date().toISOString().split('T')[0] } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState('Virtual Account');
  const [copied, setCopied] = useState(false);

  if (!destination) return <div>Not found</div>;

  const total = destination.price * visitors;

  const handlePay = () => {
    const booking = {
      destination,
      visitors,
      date,
      totalPrice: total,
      paymentMethod
    };
    const savedBooking = addBooking(booking);
    navigate('/payment-process', { state: { booking: savedBooking } });
  };

  const copyVA = () => {
    navigator.clipboard.writeText('1234567890123456');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)' }}>
      <div className="app-header white-header">
        <ArrowLeft onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
        <span className="header-title">Payment</span>
      </div>

      <div className="scrollable" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', color: 'var(--text-gray)' }}>Order Summary</h3>
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: 'var(--text-gray)' }}>{destination.name} Ticket x{visitors}</span>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Rp {total.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', color: 'var(--text-gray)' }}>Audio Device</span>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Rp 0</span>
          </div>
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{t('total')}</span>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--primary)' }}>Rp {total.toLocaleString()}</span>
          </div>
        </div>

        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px', color: 'var(--text-gray)' }}>Payment Method</h3>
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <button 
              style={{ flex: 1, padding: '12px', borderRadius: '8px', border: paymentMethod === 'Virtual Account' ? '1px solid var(--primary)' : '1px solid var(--border-color)', background: paymentMethod === 'Virtual Account' ? '#eff6ff' : 'white', cursor: 'pointer', fontWeight: '600' }}
              onClick={() => setPaymentMethod('Virtual Account')}
            >
              Virtual Account
            </button>
            <button 
              style={{ flex: 1, padding: '12px', borderRadius: '8px', border: paymentMethod === 'Credit Card' ? '1px solid var(--primary)' : '1px solid var(--border-color)', background: paymentMethod === 'Credit Card' ? '#eff6ff' : 'white', cursor: 'pointer', fontWeight: '600' }}
              onClick={() => setPaymentMethod('Credit Card')}
            >
              Credit Card
            </button>
          </div>

          {paymentMethod === 'Virtual Account' ? (
            <div>
              <p style={{ fontSize: '14px', color: 'var(--text-gray)', marginBottom: '8px' }}>BCA Virtual Account</p>
              <div style={{ background: 'var(--bg-color)', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', letterSpacing: '1px' }}>1234 5678 9012 3456</span>
                <span style={{ fontSize: '12px', color: copied ? 'var(--success)' : 'var(--primary)', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={copyVA}>
                  {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div className="input-group">
                <input type="text" className="input-field" placeholder="Card Number" />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input type="text" className="input-field" placeholder="MM/YY" style={{ flex: 1 }} />
                <input type="text" className="input-field" placeholder="CVC" style={{ flex: 1 }} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '20px', background: 'var(--white)', borderTop: '1px solid var(--border-color)' }}>
        <button className="btn btn-primary" onClick={handlePay}>
          {t('confirmPay')} Rp {total.toLocaleString()} →
        </button>
        <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-gray)', marginTop: '12px' }}>
          Secure payment powered by AudioGuide Pay
        </p>
      </div>
    </div>
  );
}
