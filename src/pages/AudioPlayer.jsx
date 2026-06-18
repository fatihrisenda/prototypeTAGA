import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, Info, X, List, Repeat } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const chapters = [
  { title: 'Introduction', startPercent: 0 },
  { title: 'Historical Background', startPercent: 15 },
  { title: 'Architecture & Design', startPercent: 35 },
  { title: 'Cultural Significance', startPercent: 55 },
  { title: 'Visitor Experience', startPercent: 75 },
  { title: 'Closing Narration', startPercent: 90 },
];

export default function AudioPlayer() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { bookings, lang, setLang } = useContext(AppContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showVolume, setShowVolume] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const [volume, setVolume] = useState(80);
  const [playbackRate, setPlaybackRate] = useState(1);

  const booking = bookings.find(b => b.id === ticketId) || bookings[0];
  const dest = booking?.destination;

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) { setIsPlaying(false); return 100; }
          return p + (0.5 * playbackRate);
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackRate]);

  if (!dest) return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1A1A2E', color: 'white' }}>
      <p>No tour data found.</p>
    </div>
  );

  const totalMinutes = parseInt(dest.audioDuration) || 30;
  const currentMinute = Math.floor((progress / 100) * totalMinutes);
  const currentSecond = Math.floor(((progress / 100) * totalMinutes * 60) % 60);
  const currentChapter = [...chapters].reverse().find(c => progress >= c.startPercent);

  const toggleLanguage = () => setLang(lang === 'en' ? 'id' : 'en');
  const cyclePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const idx = rates.indexOf(playbackRate);
    setPlaybackRate(rates[(idx + 1) % rates.length]);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#1A1A2E', color: 'white', position: 'relative' }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
        <button onClick={() => navigate('/home')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '8px', borderRadius: '10px', cursor: 'pointer', display: 'flex' }}>
          <ArrowLeft size={20} color="white" />
        </button>
        <span style={{ fontSize: '13px', fontWeight: '700', color: 'rgba(255,255,255,0.7)' }}>Now Playing</span>
        <button onClick={toggleLanguage}
          style={{ fontSize: '12px', background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', color: 'white', border: 'none' }}>
          {lang === 'en' ? '🇬🇧 EN' : '🇮🇩 ID'}
        </button>
      </div>

      {/* Album art */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 40px' }}>
        <div style={{ position: 'relative' }}>
          <img src={dest.image} alt={dest.name}
            style={{ width: '200px', height: '200px', borderRadius: '24px', objectFit: 'cover', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '3px solid rgba(255,255,255,0.1)', animation: isPlaying ? 'floatArt 3s ease-in-out infinite' : 'none' }} />
          <style>{`@keyframes floatArt { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }`}</style>
          {isPlaying && <div style={{ position: 'absolute', inset: '-8px', borderRadius: '30px', border: '2px solid rgba(47,128,237,0.3)', animation: 'pulse 2s infinite' }} />}
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: '800', marginTop: '28px', textAlign: 'center', letterSpacing: '-0.3px' }}>{dest.name}</h2>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>{dest.location}</p>
        {currentChapter && (
          <p style={{ fontSize: '12px', color: 'var(--primary)', marginTop: '8px', fontWeight: '600', background: 'rgba(47,128,237,0.15)', padding: '4px 12px', borderRadius: '6px' }}>
            ♪ {currentChapter.title}
          </p>
        )}
      </div>

      {/* Controls area */}
      <div style={{ padding: '28px 24px 32px', background: 'linear-gradient(180deg, transparent 0%, rgba(22,33,62,0.95) 20%, #16213E 100%)', borderTopLeftRadius: '32px', borderTopRightRadius: '32px' }}>
        {/* Progress bar */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ width: '100%', position: 'relative', height: '20px', display: 'flex', alignItems: 'center' }}>
            <input type="range" min="0" max="100" step="0.1"
              value={progress} onChange={(e) => setProgress(parseFloat(e.target.value))}
              style={{ width: '100%', height: '100%', zIndex: 2, opacity: 0, position: 'absolute', cursor: 'pointer', left: 0, top: 0 }} />
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, var(--primary), #60a5fa)', borderRadius: '2px', transition: 'width 0.1s' }} />
              <div style={{ position: 'absolute', left: `${progress}%`, top: '-5px', width: '14px', height: '14px', borderRadius: '50%', background: 'white', transform: 'translateX(-50%)', boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginTop: '6px' }}>
            <span>{currentMinute}:{String(currentSecond).padStart(2, '0')}</span>
            <span>{totalMinutes}:00</span>
          </div>
        </div>

        {/* Playback controls */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '28px', marginBottom: '24px' }}>
          <SkipBack size={22} color="rgba(255,255,255,0.7)" style={{ cursor: 'pointer' }} onClick={() => setProgress(p => Math.max(0, p - 5))} />
          <div onClick={() => setIsPlaying(!isPlaying)}
            style={{ width: '68px', height: '68px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: '0 8px 24px rgba(47,128,237,0.45)', transition: 'transform 0.15s' }}>
            {isPlaying ? <Pause size={28} color="white" /> : <Play size={28} color="white" style={{ marginLeft: '3px' }} />}
          </div>
          <SkipForward size={22} color="rgba(255,255,255,0.7)" style={{ cursor: 'pointer' }} onClick={() => setProgress(p => Math.min(100, p + 5))} />
        </div>

        {/* Bottom controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'rgba(255,255,255,0.5)' }}>
          <button onClick={() => setShowVolume(!showVolume)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: 'inherit' }}>
            <Volume2 size={18} />
          </button>
          <button onClick={cyclePlaybackRate}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
            {playbackRate}x
          </button>
          <button onClick={() => setShowChapters(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: 'inherit' }}>
            <List size={18} />
          </button>
          <button onClick={() => setShowInfo(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: 'inherit' }}>
            <Info size={18} />
          </button>
        </div>

        {/* Volume slider inline */}
        {showVolume && (
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.3)', padding: '10px 16px', borderRadius: '12px' }}>
            <Volume2 size={16} color="rgba(255,255,255,0.5)" />
            <input type="range" min="0" max="100" value={volume} onChange={e => setVolume(parseInt(e.target.value))}
              style={{ flex: 1, accentColor: 'var(--primary)' }} />
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', minWidth: '30px', textAlign: 'right' }}>{volume}%</span>
          </div>
        )}
      </div>

      {/* Chapters Modal */}
      {showChapters && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'flex-end', zIndex: 100 }}>
          <div style={{ background: '#16213E', width: '100%', padding: '24px', borderTopLeftRadius: '28px', borderTopRightRadius: '28px', maxHeight: '65%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: '800', fontSize: '16px' }}>Chapters</h3>
              <button onClick={() => setShowChapters(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex', color: 'white' }}>
                <X size={16} />
              </button>
            </div>
            <div className="scrollable" style={{ maxHeight: '300px' }}>
              {chapters.map((ch, i) => (
                <div key={ch.title} onClick={() => { setProgress(ch.startPercent); setShowChapters(false); setIsPlaying(true); }}
                  style={{ padding: '14px 0', borderBottom: i < chapters.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: progress >= ch.startPercent ? 'var(--primary)' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: progress >= ch.startPercent ? '700' : '400', color: progress >= ch.startPercent ? 'white' : 'rgba(255,255,255,0.6)' }}>{ch.title}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>{Math.floor((ch.startPercent / 100) * totalMinutes)}:00</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Transcript Modal */}
      {showInfo && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'flex-end', zIndex: 100 }}>
          <div style={{ background: '#16213E', width: '100%', height: '60%', padding: '24px', borderTopLeftRadius: '28px', borderTopRightRadius: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: '800', fontSize: '16px' }}>Tour Transcript</h3>
              <button onClick={() => setShowInfo(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex', color: 'white' }}>
                <X size={16} />
              </button>
            </div>
            <div className="scrollable" style={{ height: 'calc(100% - 60px)', color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: '1.8' }}>
              <p>{dest.description}</p>
              <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
                [Audio transcript continues here as the tour progresses. This is simulated content for the {lang === 'en' ? 'English' : 'Bahasa Indonesia'} language.]
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
