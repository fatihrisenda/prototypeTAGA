import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Headset } from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80',
    title: 'Explore the beauty of the world!',
    subtitle: 'Discover hidden gems with our audio tour guide.',
  },
  {
    image: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=800&q=80',
    title: "Let's make your dream travel",
    subtitle: 'Personalized audio guides for every destination.',
  },
  {
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
    title: 'Enjoy your travel experience',
    subtitle: 'Book, connect, and listen. It\'s that simple.',
  }
];

export default function Splash() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src={slides[currentSlide].image}
          alt="Slide"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.5s ease' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.85) 100%)' }} />
      </div>

      {/* Top bar */}
      <div style={{ position: 'relative', zIndex: 1, padding: '48px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'var(--primary)', padding: '10px', borderRadius: '14px' }}>
            <Headset size={24} color="white" />
          </div>
          <span style={{ color: 'white', fontWeight: '700', fontSize: '18px', letterSpacing: '-0.3px' }}>AudioGuide</span>
        </div>
        <button
          onClick={() => navigate('/login')}
          style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '8px 18px', borderRadius: '20px', cursor: 'pointer', fontWeight: '500', fontSize: '13px' }}
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 24px 48px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'white', lineHeight: '1.2', marginBottom: '12px', letterSpacing: '-0.5px' }}>
          {slides[currentSlide].title}
        </h1>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', marginBottom: '40px', lineHeight: '1.6' }}>
          {slides[currentSlide].subtitle}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Dots */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentSlide(i)}
                style={{
                  width: i === currentSlide ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === currentSlide ? 'var(--primary)' : 'rgba(255,255,255,0.4)',
                  transition: 'all 0.35s ease',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            style={{
              padding: '16px 32px',
              borderRadius: '50px',
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              fontWeight: '700',
              fontSize: '15px',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(47, 128, 237, 0.5)',
              transition: 'transform 0.2s ease',
            }}
          >
            {currentSlide < slides.length - 1 ? 'Next →' : 'Get Started →'}
          </button>
        </div>
      </div>
    </div>
  );
}
