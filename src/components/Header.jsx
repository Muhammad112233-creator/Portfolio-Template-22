import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Volume2, VolumeX, X } from 'lucide-react';
import { profile } from '../content.js';
import { asset, navigate } from '../lib/utils.js';

function PointerSpeed() {
  const label = useRef(null);
  useEffect(() => {
    let x = 0, y = 0, last = performance.now(), speed = 0, frame, displayTime = 0;
    const move = event => {
      const now = performance.now(), dt = now - last;
      if (dt > 0) speed = Math.round(Math.hypot(event.clientX - x, event.clientY - y) / dt * 1000);
      x = event.clientX; y = event.clientY; last = now;
    };
    const tick = time => { speed = Math.floor(speed * 0.95); if (speed < 10) speed = 0; if (time - displayTime > 80 && label.current) { label.current.textContent = `${speed} px/s`; displayTime = time; } frame = requestAnimationFrame(tick); };
    window.addEventListener('mousemove', move); frame = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(frame); };
  }, []);
  return <div className="speed-pill" title="Your pointer speed"><span ref={label}>0 px/s</span></div>;
}

// A quiet original flute-like phrase, made locally with Web Audio.
// It starts only after an explicit click. There is no third-party music embed.
function useStudioAudio() {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState('');
  const context = useRef(null), interval = useRef(null);
  const stop = useCallback(() => { clearInterval(interval.current); interval.current = null; context.current?.suspend(); setPlaying(false); }, []);
  useEffect(() => () => { clearInterval(interval.current); context.current?.close(); }, []);
  const toggle = async () => {
    if (playing) { stop(); return; }
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) throw new Error('Audio is not supported by this browser.');
      if (!context.current) context.current = new Audio();
      await context.current.resume();
      const ac = context.current;
      const schedule = () => {
        const notes = [72, 76, 74, 72, 67, 69, 72, 0, 74, 76, 79, 76, 74, 72, 69, 0];
        notes.forEach((note, index) => {
          if (!note) return;
          const t = ac.currentTime + index * 0.62;
          const osc = ac.createOscillator(), gain = ac.createGain();
          osc.type = 'sine'; osc.frequency.value = 440 * 2 ** ((note - 69) / 12);
          gain.gain.setValueAtTime(0, t); gain.gain.linearRampToValueAtTime(0.055, t + 0.11); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
          osc.connect(gain); gain.connect(ac.destination); osc.start(t); osc.stop(t + 0.65);
        });
      };
      schedule(); interval.current = setInterval(schedule, 9920); setPlaying(true); setError('');
    } catch (e) { setError(e.message || 'Audio could not start.'); }
  };
  return { playing, toggle, error };
}

export default function Header({ view, mode, setMode }) {
  const [menu, setMenu] = useState(false), [scrolled, setScrolled] = useState(false);
  const { playing, toggle, error } = useStudioAudio();
  useEffect(() => { const scroll = () => setScrolled(scrollY > 10); scroll(); window.addEventListener('scroll', scroll, { passive: true }); return () => window.removeEventListener('scroll', scroll); }, []);
  useEffect(() => { setMenu(false); }, [view]);
  useEffect(() => {
    if (!menu) return;
    const key = e => { if (e.key === 'Escape') setMenu(false); };
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key);
  }, [menu]);
  const views = [['dashboard', 'Dashboard'], ['case-studies', 'Case Studies'], ['ai', 'AI']];
  const changeMode = next => { setMode(next); setMenu(false); };
  return <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
    <div className="header-left">
      <button className="wordmark" onClick={() => navigate('dashboard')} aria-label={`${profile.brand} — go to dashboard`}>{profile.brand}</button>
      <nav className="pill-nav mode-nav" aria-label="Viewing mode">{['2D', '3D', 'VR', 'AR'].map(item => <button key={item} aria-pressed={mode === item} className={mode === item ? 'active' : ''} onClick={() => changeMode(item)} title={item === 'VR' ? 'Immersive visual view (not a headset session)' : item === 'AR' ? 'Show portfolio over your camera' : `${item} view`}>{item}</button>)}</nav>
    </div>
    <nav className="pill-nav desktop-nav" aria-label="Main navigation">{views.map(([id, label]) => <button key={id} className={view === id ? 'active' : ''} aria-current={view === id ? 'page' : undefined} onClick={() => navigate(id)}>{label}</button>)}</nav>
    <div className="header-right">
      <PointerSpeed />
      <button className="circle-button audio-button" title={playing ? 'Mute music' : 'Play music'} aria-label={playing ? 'Mute music' : 'Play music'} aria-pressed={playing} onClick={toggle}>{playing ? <Volume2 size={18} /> : <VolumeX size={18} />}</button>
      <button className={`profile-button ${view === 'profile' ? 'selected' : ''}`} title="My profile" aria-label="My profile" onClick={() => navigate('profile')}><img src={asset('images/avatar.webp')} alt="Mira’s portrait" /></button>
      <button className="circle-button menu-button" aria-label={menu ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menu} aria-controls="mobile-navigation" onClick={() => setMenu(!menu)}>{menu ? <X size={20} /> : <Menu size={20} />}</button>
    </div>
    <AnimatePresence>{menu && <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
      {[...views, ['profile', 'My Profile']].map(([id, label]) => <button key={id} className={view === id ? 'active' : ''} onClick={() => { navigate(id); setMenu(false); }}>{label}</button>)}
      <div className="mobile-mode-row">{['2D', '3D', 'VR', 'AR'].map(item => <button key={item} aria-pressed={mode === item} className={mode === item ? 'active' : ''} onClick={() => changeMode(item)}>{item}</button>)}</div>
      <button onClick={toggle} className="mobile-audio">{playing ? <Volume2 size={16} /> : <VolumeX size={16} />} {playing ? 'Mute studio music' : 'Play studio music'}</button>
    </motion.nav>}</AnimatePresence>
    {error && <p className="audio-error" role="status">{error}</p>}
  </header>;
}
