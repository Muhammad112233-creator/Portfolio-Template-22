import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BarChart3, Check, ChevronRight, ExternalLink, FlaskConical, Palette, Type, UserRound, ZoomIn } from 'lucide-react';
import { projects } from '../content.js';
import { asset, navigate } from '../lib/utils.js';
import { Card, Folder, Label, Modal } from './Shared.jsx';
import Prototype from './Prototype.jsx';

function DotMetric({ amount, accent }) {
  return <div className="dot-metric" aria-hidden="true">{Array.from({ length: 50 }, (_, index) => <i key={index} style={{ background: index < amount / 2 ? accent : '#d7d7d7' }} />)}</div>;
}
function DetailedPhones({ project, last }) {
  return <div className="detailed-phones" style={{ '--accent': project.accent }} aria-hidden="true">{[0, 1].map((n) => <div className="detailed-phone" key={n}>
    <div className="phone-status"><b>9:41</b><span>● ▰</span></div><div className="phone-browser">← &nbsp; {project.slug}.studio &nbsp; ◌</div>
    <div className="phone-ui"><strong>{project.title}</strong><span className="phone-action">Talk to a person</span>
      <h4>{last ? (n === 0 ? 'A decision you can feel good about.' : 'The detail, when you need it.') : (n === 0 ? 'What would make today a little easier?' : 'Good. Let’s make room for that.')}</h4>
      <div className="phone-message">{last ? project.outcome : project.goal}</div>
      {['A clear place to start', 'The useful things, explained', 'A little room for questions', 'Your next step, at your pace'].map((text, index) => <div className="phone-choice" key={text}><span>{text}</span>{index === n ? <Check size={14} /> : <ChevronRight size={14} />}</div>)}
      <small>You can always change your mind.</small><div className="phone-bottom-button">Continue →</div>
    </div><div className="phone-tabbar">◁ &nbsp;&nbsp; ☐ &nbsp;&nbsp; + &nbsp;&nbsp; ▤</div>
  </div>)}</div>;
}
function ProjectDetails({ project }) {
  const [snapshot, setSnapshot] = useState('Results'), [process, setProcess] = useState('App'), [modal, setModal] = useState(null);
  const close = useCallback(() => setModal(null), []);
  useEffect(() => { setSnapshot('Results'); setProcess('App'); setModal(null); }, [project.slug]);
  const index = projects.findIndex(item => item.slug === project.slug), prev = projects[(index - 1 + projects.length) % projects.length], next = projects[(index + 1) % projects.length];
  const reflection = [
    ['Validation', `This concept makes the central idea tangible: ${project.goal} The figures shown above are editable demonstration data, not measured client results.`],
    ['Reflection', `${project.challenge} The most useful design decisions came from making the trade-offs explicit and keeping the experience understandable.`],
    ['Next steps', 'Replace the demonstration research with real evidence, test the working flows with representative people, and refine the smallest details before extending the system.'],
  ];
  return <motion.div className="project-detail" style={{ '--accent': project.accent }} key={project.slug} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
    <div className="case-header"><button className="back-link" onClick={() => navigate('case-studies')}><ArrowLeft size={20} /><span>Back to case studies</span></button><h1>{project.title}</h1></div>
    <div className="case-overview-grid">
      <Card light className="case-overview"><Label icon={UserRound}>Overview</Label><p>{project.brief}</p><dl>{[['Type', project.type], ['Role', project.role], ['Tool', project.toolkit], ['Skill', 'Research, UX, interface & motion']].map(([term, description]) => <div key={term}><dt>{term}</dt><dd>{description}</dd></div>)}<div><dt>Prototype</dt><dd><button onClick={() => setModal({ type: 'prototype' })}>Try the concept <ExternalLink size={12} /></button></dd></div><div><dt>Research</dt><dd><button onClick={() => document.getElementById('research').scrollIntoView({ behavior: 'smooth' })}>See the design thinking <ArrowRight size={12} /></button></dd></div></dl></Card>
      <Card light className="case-snapshot"><Label icon={BarChart3}>Project snapshot</Label><div className="filter-pills snapshot-tabs" role="group" aria-label="Project snapshot">{['Results', 'Goal', 'Challenge', 'Outcome'].map(tab => <button key={tab} aria-pressed={snapshot === tab} className={tab === snapshot ? 'active' : ''} onClick={() => setSnapshot(tab)}>{tab}</button>)}</div>
        <AnimatePresence mode="wait"><motion.div key={snapshot} className="snapshot-body" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}><h2>{snapshot}</h2>{snapshot === 'Results' ? project.metrics.map(([amount, detail]) => <div className="result-line" key={amount}><strong>{amount}</strong><p>{detail}</p></div>) : <><p>{project[snapshot.toLowerCase()]}</p><span className="snapshot-note">Independent concept / Editable demonstration</span></>}</motion.div></AnimatePresence>
      </Card>
      <Card light className="project-brand"><svg viewBox="0 0 130 100" aria-hidden="true"><circle cx="48" cy="43" r="28" fill="none" stroke="#191919" strokeWidth="5" /><circle cx="82" cy="43" r="28" fill="none" stroke="#191919" strokeWidth="5" /><path d="m37 60 28 29 29-29" fill="none" stroke="#191919" strokeWidth="5" /><circle cx="65" cy="23" r="12" fill={project.accent} /></svg><strong>{project.title}</strong><span>{project.subtitle}</span></Card>
    </div>
    <div className="case-research-grid" id="research">
      <Card light className="research-card"><Label icon={FlaskConical}>UX research & discovery</Label><div className="research-split"><div className="research-counts">{[['24', 'Fictional interview profiles', 'An editable concept dataset'], ['4', 'Prototype comparisons', 'Testing the useful question'], ['5', 'Adjacent experiences reviewed', 'Patterns, not prescriptions'], ['3', 'Distinct design directions', 'Clarity, guidance, confidence']].map(([number, title, detail]) => <div key={title}><b>{number}</b><span><strong>{title}</strong><small>{detail}</small></span></div>)}</div><div className="research-goals"><span className="eyebrow">User goal</span><p>{project.goal}</p><span className="eyebrow">Design goal</span><p>{project.outcome}</p></div></div></Card>
      <Card light className="insights-card"><Label icon={UserRound}>User insights</Label><div className="insight-grid">{project.insights.map((insight, n) => <div key={insight}><DotMetric amount={[92, 76, 48, 88][n]} accent={project.accent} /><h3>{[92, 76, 48, 88][n]}%</h3><strong>{insight}</strong><p>An illustrative finding used to show how an insight can inform a concrete design decision. Replace with your own research.</p></div>)}</div></Card>
    </div>
    <div className="case-design-grid">
      <Card light className="typography-card"><Label icon={Type}>Typography</Label><div className="type-specimen"><span>Inter</span><b>Aa</b><div><p>AaBbCcDdEeFfGg<br />HhIiJjKkLlMmNnOo<br />PpQqRrSsTtUuVv<br />WwXxYyZz<br />0123456789</p><small>Light<br />Regular<br /><strong>Medium<br />Semibold<br />Bold</strong></small></div></div></Card>
      <Card light className="palette-card"><Label icon={Palette}>Colour palette</Label><div className="colour-specimen">{[project.accent, '#406e4e', '#1e293b', '#666666', '#ffffff'].map((color, n) => <div key={color}><i style={{ background: color, zIndex: 5 - n }} /><small>{color.replace('#', '')}</small></div>)}</div></Card>
      <button className="brand-preview" onClick={() => setModal({ type: 'image', src: project.images[0], title: `${project.title} — visual direction` })}><img src={asset(project.images[0])} alt={`${project.title} original web interface design`} loading="lazy" /><span><ZoomIn size={20} /> Explore the detail</span></button>
    </div>
    <div className="case-process-grid">
      <section className="case-gallery"><div className="process-heading"><h2>Iterative process</h2><div className="filter-pills" role="group" aria-label="Design process">{['Brainstorming', 'App', 'AI'].map(tab => <button key={tab} aria-pressed={process === tab} onClick={() => setProcess(tab)} className={process === tab ? 'active' : ''}>{tab}</button>)}</div></div>
        {process === 'App' ? project.iterations.map((title, n) => <Card light className={`iteration iteration-${n}`} key={title}><h3><i />{title}</h3><button className="iteration-image" onClick={() => setModal({ type: 'image', src: project.images[n === 0 || n === 3 ? 2 : n === 1 ? 1 : 0], title })} aria-label={`Enlarge ${title.toLowerCase()}`}>
          {n === 2 || n === 4 ? <DetailedPhones project={project} last={n === 4} /> : <img src={asset(project.images[n === 0 || n === 3 ? 2 : 1])} alt={`${project.title} — ${title.toLowerCase()}`} loading="lazy" />}
          <span className="enlarge-hint"><ZoomIn size={17} /> View full screen</span>
        </button></Card>) : process === 'Brainstorming' ? <Card light className="brainstorm-board"><span className="eyebrow">Start with the question</span><h3>{project.challenge}</h3><div>{project.insights.map((insight, n) => <motion.article key={insight} drag dragConstraints={{ top: -30, bottom: 30, left: -30, right: 30 }} style={{ background: ['#ffffba', '#ffdfba', '#baffc9', '#bae1ff'][n], rotate: n % 2 ? 3 : -3 }}><small>OBSERVATION 0{n + 1}</small><p>{insight}</p><span>Drag this note ↗</span></motion.article>)}</div><p className="board-summary">{project.notes[0]}</p></Card> : <Card light className="ai-process-card"><span className="eyebrow">Helpful, not prescriptive</span><h3>The person stays in control.</h3><p>{project.notes[3]}</p><Prototype project={project} /></Card>}
      </section>
      <aside className="process-notes">{['Brainstorming', 'Usability & decisions', 'UI', 'AI prototype'].map((title, n) => <section key={title}><h3>{title}</h3><ul><li>{project.notes[n]}</li><li>{project.insights[n]}</li></ul></section>)}</aside>
    </div>
    <div className="case-reflections">{reflection.map(([title, text]) => <Card light key={title}><h3>{title}</h3><p>{text}</p></Card>)}</div>
    <div className="project-pagination"><button onClick={() => navigate('case-studies', prev.slug)}><ArrowLeft size={18} /><span><small>Previous</small><strong>{prev.title}</strong></span></button><button onClick={() => navigate('case-studies', next.slug)}><span><small>Next</small><strong>{next.title}</strong></span><ArrowRight size={18} /></button></div>
    <AnimatePresence>{modal && <Modal title={modal.title || `${project.title} prototype`} onClose={close} dark={modal.type === 'image'} className={modal.type === 'image' ? 'image-modal' : 'prototype-modal'}>{modal.type === 'image' ? <><img src={asset(modal.src)} alt={modal.title} /><p>{modal.title}</p></> : <Prototype project={project} />}</Modal>}</AnimatePresence>
  </motion.div>;
}
export default function CaseStudies({ slug }) {
  const project = projects.find(item => item.slug === slug);
  if (project) return <ProjectDetails project={project} />;
  return <div className="case-studies"><div className="view-heading"><h1>Case studies</h1></div><div className="folder-grid">{projects.map(item => <Folder key={item.slug} project={item} onOpen={() => navigate('case-studies', item.slug)} />)}</div></div>;
}
