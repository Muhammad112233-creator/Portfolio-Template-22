import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUp, X } from 'lucide-react';
import { asset } from '../lib/utils.js';

export function Card({ children, className = '', light = false, ...props }) {
  return <div className={`card ${light ? 'card-light' : ''} ${className}`} {...props}>{children}</div>;
}
export function Label({ icon: Icon, children, className = '' }) {
  return <div className={`card-label ${className}`}>{Icon && <Icon size={16} aria-hidden="true" />}<span>{children}</span></div>;
}

export function Folder({ project, onOpen, featured = false }) {
  return <button className={`folder ${featured ? 'folder-featured' : ''}`} onClick={onOpen} aria-label={`Open case study: ${project.title}`}>
    <svg className="folder-back" viewBox="0 0 200 150" preserveAspectRatio="none" aria-hidden="true"><path d="M0 15C0 7 7 0 15 0H65C71 0 77 4 80 10L85 20H185C193 20 200 27 200 35V135C200 143 193 150 185 150H15C7 150 0 143 0 135Z" fill="#fff" stroke="#f3f4f6" strokeWidth="2" /></svg>
    <div className="folder-papers" aria-hidden="true">
      <div className="paper paper-left"><img src={asset(project.images[0])} alt="" loading="lazy" /></div>
      <div className="paper paper-right"><img src={asset(project.images[1])} alt="" loading="lazy" /></div>
      <div className="paper paper-centre"><img src={asset(project.images[2])} alt="" loading="lazy" /><i /><i /></div>
    </div>
    <div className="folder-front"><h3>{project.title}</h3><p>{project.category}</p></div>
  </button>;
}

export function Preloader() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(!new URLSearchParams(window.location.search).has('skip-intro'));
  useEffect(() => { const timer = setTimeout(() => setVisible(false), reduced ? 100 : 3100); return () => clearTimeout(timer); }, [reduced]);
  return <AnimatePresence>{visible && <motion.div className="preloader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} aria-hidden="true">
    <div className="preloader-type">{['UX', 'UI', 'Code', 'AI', 'Craft', 'Play'].map((word, index) => <span key={word} style={{ '--frame': index }}>{word}</span>)}</div>
    <p>Welcome to my portfolio</p>
  </motion.div>}</AnimatePresence>;
}

export function CursorTrail() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return;
    const canvas = ref.current, context = canvas.getContext('2d');
    const target = { x: -100, y: -100 }, follow = { x: -100, y: -100 };
    let points = [], frame, active = false;
    const resize = () => { const dpr = Math.min(devicePixelRatio, 2); canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr; canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`; context.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const move = event => { target.x = event.clientX; target.y = event.clientY; if (!active) { Object.assign(follow, target); active = true; } };
    const leave = () => { active = false; };
    const draw = () => {
      context.clearRect(0, 0, innerWidth, innerHeight);
      if (active) { follow.x += (target.x - follow.x) * 0.5; follow.y += (target.y - follow.y) * 0.5; points.push({ ...follow, age: 0 }); }
      points.forEach(point => point.age++); points = points.filter(point => point.age < 40);
      context.lineCap = 'round'; context.lineJoin = 'round'; context.lineWidth = 2.5;
      for (let index = 1; index < points.length - 1; index++) {
        const a = points[index - 1], b = points[index], c = points[index + 1];
        context.beginPath(); context.moveTo((a.x + b.x) / 2, (a.y + b.y) / 2);
        context.quadraticCurveTo(b.x, b.y, (b.x + c.x) / 2, (b.y + c.y) / 2);
        context.strokeStyle = `hsla(${(Date.now() / 3 + index * 3) % 360},100%,65%,${Math.max(0, 1 - b.age / 40)})`;
        context.stroke();
      }
      frame = requestAnimationFrame(draw);
    };
    resize(); draw(); window.addEventListener('resize', resize); window.addEventListener('mousemove', move); document.addEventListener('mouseleave', leave);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', move); document.removeEventListener('mouseleave', leave); };
  }, [reduced]);
  return <canvas className="cursor-trail" ref={ref} aria-hidden="true" />;
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => { const onScroll = () => setVisible(scrollY > 200); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);
  return <AnimatePresence>{visible && <motion.button className="back-to-top" aria-label="Scroll to top" title="Scroll to top" initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' })}><ArrowUp size={24} strokeWidth={2.5} /></motion.button>}</AnimatePresence>;
}

export function Modal({ title, children, onClose, dark = false, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.activeElement, overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.querySelector('button')?.focus();
    const key = event => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;
      const focusable = ref.current.querySelectorAll('button, a[href], input, select, textarea, [tabindex="0"]');
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', key);
    return () => { document.body.style.overflow = overflow; window.removeEventListener('keydown', key); previous?.focus(); };
  }, [onClose]);
  return createPortal(<motion.div className={`modal-overlay ${dark ? 'modal-dark' : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={event => event.target === event.currentTarget && onClose()}>
    <motion.div className={`modal-panel ${className}`} ref={ref} role="dialog" aria-modal="true" aria-label={title} initial={{ scale: 0.96, y: 18 }} animate={{ scale: 1, y: 0 }}>
      <button className="modal-close" aria-label={`Close ${title}`} onClick={onClose}><X size={22} /></button>
      {children}
    </motion.div>
  </motion.div>, document.body);
}

export class VisualBoundary extends React.Component {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() { return this.state.error ? this.props.fallback : this.props.children; }
}
