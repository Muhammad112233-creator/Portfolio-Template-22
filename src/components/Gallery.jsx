import { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Maximize2, Pause, Play, RotateCcw } from 'lucide-react';
import { experimentCategories, experiments } from '../content.js';
import { Card, Modal } from './Shared.jsx';
import MotionScene from './MotionScene.jsx';

function ExperimentPlayer({ experiment }) {
  const [paused, setPaused] = useState(false), [color, setColor] = useState(experiment.color), [speed, setSpeed] = useState(1);
  return <div className="experiment-player"><div className="experiment-title"><h2>{experiment.title}</h2><span>{experiment.category} / Original motion study</span></div><MotionScene experiment={experiment} paused={paused} color={color} speed={speed} /><div className="lab-controls"><button onClick={() => setPaused(!paused)}>{paused ? <Play size={16} /> : <Pause size={16} />}{paused ? 'Play' : 'Pause'}</button><label>Colour <input aria-label="Experiment accent colour" type="color" value={color} onChange={e => setColor(e.target.value)} /></label><label>Tempo <input aria-label="Animation speed" type="range" min="0.4" max="2" step="0.1" value={speed} onChange={e => setSpeed(Number(e.target.value))} /><span>{speed.toFixed(1)}×</span></label><button onClick={() => { setPaused(false); setColor(experiment.color); setSpeed(1); }}><RotateCcw size={16} /> Reset</button></div><p>{experiment.description}</p></div>;
}
export default function Gallery() {
  const [filter, setFilter] = useState('All'), [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);
  const items = experiments.filter(item => filter === 'All' || item.category === filter);
  return <div className="gallery-view"><div className="view-heading gallery-heading"><h1>Ideas in motion + AI tools</h1><div className="filter-pills" role="group" aria-label="Filter experiments">{experimentCategories.map(category => <button key={category} aria-pressed={filter === category} className={filter === category ? 'active' : ''} onClick={() => setFilter(category)}>{category}</button>)}</div></div>
    <div className="gallery-grid">{items.map(experiment => <Card key={experiment.id} light className="gallery-card"><button className="gallery-visual" onClick={() => setSelected(experiment)} aria-label={`Open experiment: ${experiment.title}`}><div aria-hidden="true"><MotionScene experiment={experiment} /></div><span className="gallery-open"><Maximize2 size={20} /></span></button><button className="gallery-text" onClick={() => setSelected(experiment)}><h2>{experiment.title}</h2><p>{experiment.description}</p></button></Card>)}</div>
    <AnimatePresence>{selected && <Modal dark title={selected.title} onClose={close} className="experiment-modal"><ExperimentPlayer experiment={selected} /></Modal>}</AnimatePresence>
  </div>;
}
