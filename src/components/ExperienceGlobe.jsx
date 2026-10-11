import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Globe from 'react-globe.gl';
import { locations } from '../content.js';
import { asset, clamp } from '../lib/utils.js';

export default function ExperienceGlobe() {
  const container = useRef(null), globe = useRef(null);
  const [size, setSize] = useState({ width: 400, height: 380 });
  const [hovered, setHovered] = useState(null), [ready, setReady] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setSize({ width: Math.round(entry.contentRect.width), height: Math.round(entry.contentRect.height) }));
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!ready || !globe.current) return;
    const controls = globe.current.controls(); controls.autoRotate = !reduced; controls.autoRotateSpeed = 1.2; controls.enableZoom = true;
    controls.minDistance = 125; controls.maxDistance = 420;
    globe.current.pointOfView({ lat: 48, lng: 5, altitude: 1.8 }, 0);
    const visibility = () => { controls.autoRotate = !document.hidden && !reduced; };
    document.addEventListener('visibilitychange', visibility);
    return () => { document.removeEventListener('visibilitychange', visibility); globe.current?.pauseAnimation(); };
  }, [ready, reduced]);
  const keyboard = event => {
    if (!globe.current) return;
    const position = globe.current.pointOfView();
    const patch = event.key === 'ArrowLeft' ? { lng: position.lng - 12 } : event.key === 'ArrowRight' ? { lng: position.lng + 12 } : event.key === 'ArrowUp' ? { lat: clamp(position.lat + 10, -80, 80) } : event.key === 'ArrowDown' ? { lat: clamp(position.lat - 10, -80, 80) } : event.key === '+' || event.key === '=' ? { altitude: clamp(position.altitude - 0.2, 0.5, 3.2) } : event.key === '-' ? { altitude: clamp(position.altitude + 0.2, 0.5, 3.2) } : null;
    if (patch) { event.preventDefault(); globe.current.pointOfView({ ...position, ...patch }, 250); }
  };
  return <div ref={container} className="experience-globe" tabIndex={0} role="group" aria-label="Interactive experience globe. Drag to rotate, scroll to zoom, or use arrow keys and plus or minus. Hover a city to see demo roles." onKeyDown={keyboard}>
    <Globe ref={globe} width={size.width} height={size.height} onGlobeReady={() => setReady(true)}
      backgroundColor="rgba(0,0,0,0)" globeImageUrl={asset('images/earth-dark.jpg')}
      atmosphereColor="#d4d4d4" atmosphereAltitude={0.15}
      pointsData={ready ? locations : []} pointColor="color" pointAltitude={0.01} pointRadius={0.4}
      ringsData={ready && !reduced ? locations : []} ringColor="color" ringMaxRadius={3} ringPropagationSpeed={2} ringRepeatPeriod={1000}
      labelsData={ready ? locations : []} labelText="city" labelSize={1.5} labelDotRadius={0.5} labelColor={() => '#ffffff'} labelResolution={2}
      onLabelHover={setHovered} onPointHover={setHovered} onLabelClick={setHovered}
      rendererConfig={{ antialias: true, alpha: true }} animateIn={!reduced} />
    <AnimatePresence>{hovered && <motion.div className="globe-tooltip" initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}>
      <h4><MapPin size={16} color={hovered.color} />{hovered.city}</h4>{hovered.roles.map(role => <p key={role}>{role}</p>)}
    </motion.div>}</AnimatePresence>
  </div>;
}
