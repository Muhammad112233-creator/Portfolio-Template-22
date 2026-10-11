import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { projects } from '../content.js';
import { asset, navigate } from '../lib/utils.js';

/** A deliberately playful native version of the reference's draggable work wall. */
export default function Community() {
  const bounds = useRef(null), [active, setActive] = useState(null), [reset, setReset] = useState(0);
  const [top, setTop] = useState(20), [order, setOrder] = useState({});
  return <div className="work-wall"><div className="wall-toolbar"><button className="back-link" onClick={() => navigate('profile')}><ArrowLeft size={18} /> Back to profile</button><button className="back-link" onClick={() => { setReset(reset + 1); setOrder({}); }}><RotateCcw size={16} /> Restack</button></div><h1>WALL<br />OF<br />WORK</h1><div className="wall-bounds" ref={bounds} />{projects.slice(0, 10).map((project, n) => <motion.article key={`${reset}-${project.slug}`} className={`polaroid ${active === n ? 'polaroid-active' : ''}`} drag dragConstraints={bounds} dragElastic={0.1} whileDrag={{ scale: 1.05 }} whileHover={{ scale: 1.02 }} initial={{ rotate: n * 7 % 20 - 10, x: n * 31 % 100 - 50, y: n * 19 % 100 - 50 }} onDragStart={() => { setActive(n); setOrder({ ...order, [n]: top + 1 }); setTop(top + 1); }} onDragEnd={() => setActive(null)} style={{ background: ['#ffdfba', '#baffc9', '#bae1ff', '#ffffba'][n % 4], zIndex: order[n] || n + 1 }}><img src={asset(project.images[0])} alt={`${project.title} design snapshot`} draggable={false} /><button onPointerDown={e => e.stopPropagation()} onClick={() => navigate('case-studies', project.slug)}>{project.title}</button><small>DRAG ME / OPEN THE STORY</small></motion.article>)}<p className="wall-hint">Drag a little. Find something interesting.</p></div>;
}
