import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { roadmap, roadmapDefinitions } from '../content.js';
import { clamp, navigate } from '../lib/utils.js';

export default function Roadmap() {
  const [hover, setHover] = useState(null), [pinned, setPinned] = useState(false);
  useEffect(() => { const key = event => { if (event.key === 'Escape') { setPinned(false); setHover(null); } }; window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key); }, []);
  const show = (event, name, pin = false) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (pin && pinned && hover?.name === name) { setPinned(false); setHover(null); return; }
    const [definition, example] = roadmapDefinitions[name] || [`${name} turns part of the design question into something the team can understand, discuss and test.`, `Use ${name.toLowerCase()} to check one concrete assumption in a working concept, then keep a record of what changes.`];
    setHover({ name, definition, example, x: clamp(rect.left + rect.width / 2 - 140, 12, innerWidth - 292), y: rect.bottom + 10 > innerHeight - 180 ? rect.top - 175 : rect.bottom + 10 });
    if (pin) setPinned(true);
  };
  const hide = () => { if (!pinned) setHover(null); };
  const node = (name, spine = false) => <button key={name} className={`roadmap-node ${spine ? 'roadmap-spine' : ''} ${hover?.name === name ? 'node-selected' : ''}`} onMouseEnter={event => show(event, name)} onMouseLeave={hide} onFocus={event => show(event, name)} onBlur={hide} onClick={event => show(event, name, true)} aria-describedby={hover?.name === name ? 'roadmap-explanation' : undefined}>{name}</button>;
  return <div className="roadmap-view"><button className="roadmap-back back-link" onClick={() => navigate('profile')}><ArrowLeft size={18} /> Back to profile</button><div className="roadmap-heading"><span className="eyebrow">The product design roadmap</span><h1>Everything a product designer does, in order.</h1><p>Hover or tap any node for a one-line definition and a practical example.</p></div>
    {roadmap.map(section => <section className="roadmap-phase" key={section.phase}><h2><i />{section.phase}<i /></h2>{section.rows.map(([spine, left, right]) => <div className="roadmap-row" key={spine}><div className="roadmap-branch left-branch">{left.map(name => <div key={name}>{node(name)}<i /></div>)}</div><div className="roadmap-spine-wrap">{node(spine, true)}</div><div className="roadmap-branch right-branch">{right.map(name => <div key={name}><i />{node(name)}</div>)}</div></div>)}</section>)}
    <div className="roadmap-signoff"><strong>MIRI</strong><p>Curiosity, then clarity.<br />The process is a guide, not a straight line.</p></div>
    <AnimatePresence>{hover && <motion.div id="roadmap-explanation" className="roadmap-tooltip" role="tooltip" style={{ left: hover.x, top: hover.y }} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><h3>{hover.name}</h3><p>{hover.definition}</p><small>Practical example — {hover.example}</small>{pinned && <span>Tap the same node again or press Escape to close.</span>}</motion.div>}</AnimatePresence>
  </div>;
}
