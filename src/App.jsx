import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import Header from './components/Header.jsx';
import Dashboard from './components/Dashboard.jsx';
import { BackToTop, CursorTrail, Preloader } from './components/Shared.jsx';
import { readRoute } from './lib/utils.js';
const CaseStudies = lazy(() => import('./components/CaseStudies.jsx'));
const Gallery = lazy(() => import('./components/Gallery.jsx'));
const Profile = lazy(() => import('./components/Profile.jsx'));
const Roadmap = lazy(() => import('./components/Roadmap.jsx'));
const Community = lazy(() => import('./components/Community.jsx'));

export default function App() {
  const [route, setRoute] = useState(readRoute), [mode, setMode] = useState('2D');
  const [cameraError, setCameraError] = useState(''), [cameraStream, setCameraStream] = useState(null);
  const video = useRef(null), reduced = useReducedMotion();
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 40, damping: 25, mass: 0.5 }), sy = useSpring(y, { stiffness: 40, damping: 25, mass: 0.5 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [15, -15]), rotateY = useTransform(sx, [-0.5, 0.5], [-15, 15]);
  const translateX = useTransform(sx, [-0.5, 0.5], [-40, 40]), translateY = useTransform(sy, [-0.5, 0.5], [-40, 40]);
  const spatial = mode === '3D' && !reduced;
  useEffect(() => {
    const change = () => { setRoute(readRoute()); window.scrollTo({ top: 0, behavior: 'instant' }); };
    window.addEventListener('hashchange', change); return () => window.removeEventListener('hashchange', change);
  }, []);
  useEffect(() => {
    let cancelled = false, stream;
    setCameraError('');
    if (mode !== 'AR') { setCameraStream(null); return; }
    const enable = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) throw new Error('Camera access needs a supported browser and HTTPS.');
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        if (cancelled) stream.getTracks().forEach(track => track.stop()); else setCameraStream(stream);
      } catch (error) {
        if (!cancelled) setCameraError(error.name === 'NotAllowedError' ? 'Camera access was declined or blocked. Open the preview in a new tab to use AR. Your portfolio still works in 2D.' : 'No camera is available here. Open this site on a camera-equipped device over HTTPS.');
      }
    };
    enable();
    return () => { cancelled = true; stream?.getTracks().forEach(track => track.stop()); setCameraStream(null); };
  }, [mode]);
  useEffect(() => { if (video.current) { video.current.srcObject = cameraStream; video.current.play().catch(() => {}); } }, [cameraStream]);
  useEffect(() => { if (!spatial) { x.set(0); y.set(0); } }, [spatial, x, y]);
  const pointer = event => { if (spatial) { x.set(event.clientX / innerWidth - 0.5); y.set(event.clientY / innerHeight - 0.5); } };
  return <MotionConfig reducedMotion="user">
    <a href="#main-content" className="skip-link" onClick={e => { e.preventDefault(); document.getElementById('main-content')?.focus(); }}>Skip to content</a>
    <Preloader /><CursorTrail />
    <div className={`site mode-${mode.toLowerCase()} ${cameraStream ? 'camera-active' : ''}`} onPointerMove={pointer} style={{ perspective: spatial ? '1200px' : 'none' }}>
      {mode === 'AR' && <video className="camera-background" ref={video} autoPlay muted playsInline aria-label="Camera background" />}
      {spatial && <motion.div className="spatial-grid" aria-hidden="true" style={{ rotateX, rotateY }} />}
      {mode === 'VR' && <div className="vr-vignette" aria-hidden="true" />}
      <motion.div className={`app-frame ${spatial ? 'is-3d' : ''}`} style={{ rotateX: spatial ? rotateX : 0, rotateY: spatial ? rotateY : 0, x: spatial ? translateX : 0, y: spatial ? translateY : 0, transformStyle: spatial ? 'preserve-3d' : 'flat' }}>
        <Header view={route.view === 'roadmap' || route.view === 'community' ? 'profile' : route.view} mode={mode} setMode={setMode} />
        <AnimatePresence mode="wait">
          <motion.main id="main-content" tabIndex={-1} className={`main-content view-${route.view}`} key={route.view} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
            <Suspense fallback={<div className="view-loading" role="status">A little moment…</div>}>
              {route.view === 'dashboard' && <Dashboard />}
              {route.view === 'case-studies' && <CaseStudies slug={route.project} />}
              {route.view === 'ai' && <Gallery />}
              {route.view === 'profile' && <Profile />}
              {route.view === 'roadmap' && <Roadmap />}
              {route.view === 'community' && <Community />}
            </Suspense>
          </motion.main>
        </AnimatePresence>
      </motion.div>
      {cameraError && <div className="camera-notice" role="status"><p>{cameraError}</p><button onClick={() => setMode('2D')}>Return to 2D</button></div>}
      <BackToTop />
    </div>
  </MotionConfig>;
}
