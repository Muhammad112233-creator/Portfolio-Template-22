import { lazy, Suspense, useEffect, useRef } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useSpring, useTransform } from 'framer-motion';
import { BarChart3, Clock3, ExternalLink, Folder as FolderIcon, Globe2, Tv } from 'lucide-react';
import { profile, projects, skills, tools } from '../content.js';
import { asset, clamp, navigate } from '../lib/utils.js';
import { Card, Folder, Label, VisualBoundary } from './Shared.jsx';
const ExperienceGlobe = lazy(() => import('./ExperienceGlobe.jsx'));

function AnimatedNumber({ value, className = '' }) {
  const target = useMotionValue(0), spring = useSpring(target, { stiffness: 100, damping: 20 });
  const ref = useRef(null);
  useEffect(() => { target.set(value); }, [value, target]);
  useMotionValueEvent(spring, 'change', number => { if (ref.current) ref.current.textContent = Math.round(number).toLocaleString('en-US'); });
  return <span ref={ref} className={className}>0</span>;
}

function HoursCard() {
  const target = useMotionValue(0), number = useSpring(target, { stiffness: 100, damping: 20 }), ref = useRef(null);
  const progress = useTransform(number, n => n / profile.hours);
  useEffect(() => { target.set(profile.hours); }, [target]);
  useMotionValueEvent(number, 'change', n => { if (ref.current) ref.current.textContent = Math.round(n).toLocaleString('en-US'); });
  const update = event => { if (event.pointerType === 'touch') return; const bounds = event.currentTarget.getBoundingClientRect(); target.set(clamp((event.clientX - bounds.left) / bounds.width, 0, 1) * profile.hours); };
  return <Card className="hours-card" onPointerMove={update} onPointerLeave={() => target.set(profile.hours)}>
    <Label icon={Clock3}>Design time spent</Label>
    <div className="hours-number card-pop"><h2 ref={ref}>0</h2><p>Total design hours</p></div>
    <svg className="hours-gauge card-bg" viewBox="0 0 200 100" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <defs><linearGradient id="gauge-gradient">{['#ff595e', '#ff924c', '#ffec55', '#45ff88', '#65efff', '#655bff', '#dd38ff'].map((color, index) => <stop key={color} offset={`${index / 6 * 100}%`} stopColor={color} />)}</linearGradient></defs>
      <path d="M10 100a90 90 0 0 1 180 0" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="1" />
      <path d="M20 100a80 80 0 0 1 160 0" fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth="1" />
      <motion.path d="M30 100a70 70 0 0 1 140 0" fill="none" stroke="url(#gauge-gradient)" strokeWidth="12" strokeLinecap="round" style={{ pathLength: progress }} />
      <circle cx="30" cy="100" r="3" /><circle cx="100" cy="30" r="4" /><circle cx="170" cy="100" r="3" />
    </svg>
    <div className="hours-years card-content"><div><strong>{profile.startYear}</strong><span>{profile.startCity}</span></div><div><span>{profile.city}</span><strong>{profile.endYear}</strong></div></div>
  </Card>;
}

function FlowerGarden() {
  const colors = ['#ff595e', '#ffca3a', '#ff924c', '#8ac926', '#1982c4', '#6a4c93', '#f15bb5', '#ff595e', '#ff924c', '#ffca3a', '#8ac926', '#1982c4', '#f15bb5'];
  const ac = useRef(null);
  useEffect(() => () => { ac.current?.close(); }, []);
  const chime = index => {
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return;
      if (!ac.current) ac.current = new Audio(); ac.current.resume();
      const now = ac.current.currentTime, oscillator = ac.current.createOscillator(), gain = ac.current.createGain();
      oscillator.frequency.value = 330 * 2 ** (index / 12); oscillator.type = 'sine';
      gain.gain.setValueAtTime(0.035, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      oscillator.connect(gain); gain.connect(ac.current.destination); oscillator.start(); oscillator.stop(now + 0.5);
    } catch { /* Visual interaction works even when the browser blocks sound. */ }
  };
  return <div className="flower-garden card-content"><svg viewBox="0 0 800 150" preserveAspectRatio="xMidYMax slice" role="group" aria-label="A small interactive flower garden. Hover to spin, click to chime.">
    {colors.map((color, index) => {
      const x = 40 + index * 60, y = [50, 80, 40, 70, 50, 80, 40, 60, 45, 75, 50, 70, 40][index], dir = index % 2 ? 1 : -1;
      return <g key={index}>
        <path d={`M${x + dir * 20} 200Q${x} ${y + 50} ${x} ${y}`} stroke="#193d33" strokeWidth="3" fill="none" />
        <path d={`M${x} 120Q${x + dir * 30} 105 ${x + dir * 40} 80Q${x + dir * 10} 95 ${x - dir * 5} 110Z`} fill={index % 3 === 2 ? '#b6cae0' : index % 3 === 1 ? '#2a6344' : '#1a4331'} />
        <g transform={`translate(${x} ${y})`}><g className="flower" tabIndex={0} role="button" aria-label={`Play flower chime ${index + 1}`} onClick={() => chime(index)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); chime(index); } }} style={{ '--flower-delay': `${index * 0.07 + 0.3}s` }}>
          {[0, 60, 120, 180, 240, 300].map(angle => <ellipse key={angle} cx="0" cy="-16" rx="16" ry="18" fill={color} transform={`rotate(${angle})`} />)}
          <circle r="8" fill="#e9c46a" /><circle cx="-2" cy="-2" r="4" fill="#e63946" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => <g key={angle} transform={`rotate(${angle})`}><path d="M0 2V-10" stroke="#1a1a1a" strokeWidth="1.5" /><circle cy="-10" r="1.5" fill="#1a1a1a" /></g>)}
        </g></g>
      </g>;
    })}
  </svg></div>;
}
function SkillsCard() {
  return <Card className="skills-card"><Label icon={BarChart3}>Design skill matrix</Label>
    <div className="skills-layout card-pop"><div className="skill-column"><h3>Skill</h3><div className="skills-list">{skills.map(([name, score]) => <div className="skill-row" key={name} tabIndex={0} title={`${name} — demo score ${score}`}><span>{name}</span><small><AnimatedNumber value={score} /></small></div>)}</div></div>
    <div className="tool-column"><h3>Tool</h3><div className="tool-list">{tools.map(name => <span key={name}>{name}</span>)}</div></div></div>
    <FlowerGarden />
  </Card>;
}
export function GlobeFallback() {
  return <div className="globe-fallback" role="img" aria-label="A dark globe. Interactive WebGL is unavailable on this device."><div className="fallback-earth" style={{ backgroundImage: `url(${asset('images/earth-dark.jpg')})` }} /><small>Drag the globe on a WebGL-capable device</small></div>;
}
export default function Dashboard() {
  return <div className="dashboard">
    <motion.div className="dashboard-cell identity-cell" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}><Card className="identity-card"><img className="identity-image" src={asset(profile.portrait)} alt="Original ink portrait of fictional designer Mira Sol" fetchPriority="high" /><div className="identity-shade" />
      <div className="identity-name"><h2>I am</h2><h1>{profile.displayName}</h1></div><p className="identity-bio">{profile.intro}</p>
    </Card></motion.div>
    <motion.div className="dashboard-cell hours-cell" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}><HoursCard /></motion.div>
    <motion.div className="dashboard-cell skills-cell" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}><SkillsCard /></motion.div>
    <motion.div className="dashboard-cell story-cell" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}><Card className="story-card" role="button" tabIndex={0} aria-label="Explore Mira’s case studies" onClick={() => navigate('case-studies')} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('case-studies'); } }}>
      <Label icon={Tv}>0 → 1</Label><div className="story-content card-content"><h2>Curiosity + craft =<br /> something useful.</h2><div className="story-sparkles" aria-hidden="true">{Array.from({ length: 40 }, (_, index) => <i key={index} style={{ left: `${(index * 37) % 100}%`, top: `${(index * 23) % 100}%`, animationDelay: `${index * 0.07}s`, animationDuration: `${1.5 + index % 3}s` }} />)}</div><button onClick={e => { e.stopPropagation(); navigate('case-studies'); }} className="story-link">A little meaning in the pixels</button></div>
      <img src={asset('images/skyline.webp')} className="skyline" alt="Original Scandinavian waterfront skyline artwork" loading="lazy" />
    </Card></motion.div>
    <motion.div className="dashboard-cell featured-cell" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}><Card className="featured-card"><Label icon={FolderIcon}>Most recent case study</Label><div className="featured-folder-wrap"><Folder project={projects[0]} featured onOpen={() => navigate('case-studies', projects[0].slug)} /></div></Card></motion.div>
    <motion.div className="dashboard-cell experience-cell" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}><Card className="experience-card"><div className="experience-heading"><Label icon={Globe2}>My experience</Label><a className="cv-pill" href={asset(profile.cv)} download>Download CV <ExternalLink size={12} /></a></div>
      <div className="globe-wrap card-pop"><VisualBoundary fallback={<GlobeFallback />}><Suspense fallback={<GlobeFallback />}><ExperienceGlobe /></Suspense></VisualBoundary></div>
    </Card></motion.div>
  </div>;
}
