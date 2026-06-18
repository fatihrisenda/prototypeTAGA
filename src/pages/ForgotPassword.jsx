import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Check } from 'lucide-react';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passError, setPassError] = useState('');

  const handleSendOTP = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setOtpError(false);
    if (otp.join('') === '1234') {
      setStep(3);
    } else {
      setOtpError(true);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setPassError('');
    if (newPass.length < 6) { setPassError('Password must be at least 6 characters.'); return; }
    if (newPass !== confirmPass) { setPassError('Passwords do not match.'); return; }
    setStep(4);
  };

  const stepTitles = {
    1: 'Forgot your password? 🔑',
    2: 'Verify Code 📩',
    3: 'Create New Password 🔒',
  };
  const stepSubtitles = {
    1: 'Enter your registered email address and we\'ll send you a verification code.',
    2: `A 4-digit code was sent to ${email || 'your email'}. Hint: use 1234`,
    3: 'Enter your new password. Make sure it\'s at least 6 characters.',
  };

  if (step === 4) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <Check size={50} color="var(--success)" strokeWidth={3} />
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px', textAlign: 'center' }}>Password Changed! 🎉</h2>
        <p style={{ color: 'var(--text-gray)', textAlign: 'center', marginBottom: '32px', fontSize: '14px', lineHeight: '1.6' }}>
          Your password has been successfully updated. You can now sign in with your new password.
        </p>
        <button onClick={() => navigate('/login')} className="btn btn-primary" style={{ borderRadius: '14px' }}>Back to Login</button>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)' }}>
      <div className="app-header white-header">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0 }}>
          <ArrowLeft size={22} color="var(--text-dark)" />
        </button>
        <span style={{ fontSize: '16px', fontWeight: '700', flex: 1, textAlign: 'center' }}>Reset Password</span>
        <div style={{ width: 22 }} />
      </div>

      {/* Step progress */}
      <div style={{ padding: '16px 24px 0', display: 'flex', gap: '8px' }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{ flex: 1, height: '4px', borderRadius: '2px', background: s <= step ? 'var(--primary)' : 'var(--border-color)', transition: 'background 0.3s' }} />
        ))}
      </div>

      <div className="scrollable" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '6px' }}>{stepTitles[step]}</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-gray)', marginBottom: '28px', lineHeight: '1.6' }}>{stepSubtitles[step]}</p>

        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <div className="input-group" style={{ marginBottom: '24px' }}>
              <label>Email Address</label>
              <input type="email" className="input-field" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: '14px' }}>Send OTP Code</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            {otpError && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: 'var(--danger)', padding: '12px 16px', borderRadius: '12px', fontSize: '13px', marginBottom: '20px' }}>
                ⚠️ Invalid OTP code. Please try again. (Hint: 1234)
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '28px' }}>
              {[0, 1, 2, 3].map(i => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength="1"
                  value={otp[i]}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[i] = e.target.value.replace(/[^0-9]/g, '');
                    setOtp(newOtp);
                    setOtpError(false);
                    if (e.target.value && i < 3) document.getElementById(`otp-${i + 1}`)?.focus();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !otp[i] && i > 0) document.getElementById(`otp-${i - 1}`)?.focus();
                  }}
                  style={{
                    width: '64px', height: '64px', textAlign: 'center', fontSize: '24px', fontWeight: '800',
                    borderRadius: '16px', border: `2px solid ${otp[i] ? 'var(--primary)' : 'var(--border-color)'}`,
                    outline: 'none', transition: 'border-color 0.2s', background: 'var(--white)'
                  }}
                />
              ))}
            </div>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: '14px', marginBottom: '16px' }}>Verify Code</button>
            <button type="button" onClick={() => setOtp(['', '', '', ''])}
              style={{ width: '100%', background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '600', fontSize: '14px', cursor: 'pointer', padding: '8px' }}>
              Resend OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleReset}>
            {passError && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: 'var(--danger)', padding: '12px 16px', borderRadius: '12px', fontSize: '13px', marginBottom: '16px' }}>
                ⚠️ {passError}
              </div>
            )}
            <div className="input-group">
              <label>New Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showNew ? 'text' : 'password'} className="input-field" placeholder="Min. 6 characters" value={newPass} onChange={(e) => setNewPass(e.target.value)} style={{ width: '100%', paddingRight: '48px' }} required />
                <button type="button" onClick={() => setShowNew(!showNew)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-gray)', display: 'flex', padding: 0 }}>
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="input-group" style={{ marginBottom: '24px' }}>
              <label>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showConfirm ? 'text' : 'password'} className="input-field" placeholder="Re-enter new password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} style={{ width: '100%', paddingRight: '48px' }} required />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-gray)', display: 'flex', padding: 0 }}>
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: '14px' }}>Save New Password</button>
          </form>
        )}
      </div>
    </div>
  );
}
