import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Headphones, CheckCircle, Bluetooth, Wifi } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function AudioConnect() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { addActivity } = useContext(AppContext);
  const [step, setStep] = useState(1);

  const handleConnect = () => {
    setStep(2);
    setTimeout(() => setStep(3), 2500);
  };

  const handleStartTour = () => {
    addActivity('Started audio tour');
    navigate(`/audio-player/${ticketId}`);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)' }}>
      <div className="app-header white-header">
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0 }}>
          <ArrowLeft size={22} color="var(--text-dark)" />
        </button>
        <span style={{ fontSize: '16px', fontWeight: '700', flex: 1, textAlign: 'center' }}>Connect Audio Device</span>
        <div style={{ width: 22 }} />
      </div>

      <div style={{ flex: 1, padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Step indicator */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{ width: s <= step ? '28px' : '8px', height: '8px', borderRadius: '4px', background: s <= step ? 'var(--primary)' : 'var(--border-color)', transition: 'all 0.35s ease' }} />
          ))}
        </div>

        {/* Icon */}
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: step === 3 ? '#ECFDF5' : 'var(--white)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', marginBottom: '32px', transition: 'background 0.3s' }}>
          {step === 1 && <Headphones size={44} color="var(--primary)" />}
          {step === 2 && <Bluetooth size={44} color="var(--primary)" style={{ animation: 'pulse 1.5s infinite' }} />}
          {step === 3 && <CheckCircle size={44} color="var(--success)" />}
          <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }`}</style>
        </div>

        {step === 1 && (
          <div style={{ width: '100%' }}>
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', textAlign: 'center' }}>How to Connect</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { num: '1', text: 'Turn on your audio device', icon: '🎧' },
                  { num: '2', text: 'Enable Bluetooth on your phone', icon: '📱' },
                  { num: '3', text: 'Select AudioGuide-XXXX from list', icon: '🔗' },
                ].map(item => (
                  <div key={item.num} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#EFF6FF', color: 'var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '800', fontSize: '14px', flexShrink: 0 }}>
                      {item.num}
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.text}</span>
                    <span style={{ marginLeft: 'auto', fontSize: '20px' }}>{item.icon}</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="btn btn-primary" style={{ marginTop: '24px', borderRadius: '14px' }} onClick={handleConnect}>
              🔊 Start Connection
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="card" style={{ width: '100%', padding: '32px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '10px' }}>Searching for device...</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-gray)', lineHeight: '1.6' }}>Make sure your audio device is powered on and within range.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '24px' }}>
              <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'var(--bg-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Wifi size={16} color="var(--primary)" style={{ animation: 'pulse 1s infinite' }} />
                <span style={{ fontSize: '13px', fontWeight: '600' }}>Scanning...</span>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ width: '100%', textAlign: 'center' }}>
            <div className="card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '10px' }}>Connected! 🎉</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-gray)', marginBottom: '16px', lineHeight: '1.6' }}>
                <strong>AudioGuide A20</strong> is connected and ready.<br />Your immersive tour is about to begin!
              </p>
              <div style={{ background: '#ECFDF5', padding: '12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--success)' }} />
                <span style={{ fontSize: '12px', color: 'var(--success)', fontWeight: '700' }}>Device Connected • Battery 95%</span>
              </div>
            </div>
            <button className="btn" style={{ backgroundColor: 'var(--success)', color: 'white', marginTop: '24px', borderRadius: '14px' }} onClick={handleStartTour}>
              🎧 Start Tour
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
