import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, CalendarDays, Globe2, Mail } from 'lucide-react';
import { articles, books, profile, studioNotes } from '../content.js';
import { asset, navigate } from '../lib/utils.js';
import { Modal } from './Shared.jsx';
const icons = { mail: Mail, book: BookOpen, globe: Globe2, calendar: CalendarDays };
function WhoHeading({ mobile = false }) {
  return <h1 className={`who-heading ${mobile ? 'who-mobile' : ''}`}><span>Who’s</span><span>that</span><em>Miri?</em></h1>;
}
export default function Profile() {
  const [note, setNote] = useState(0), [article, setArticle] = useState(null);
  const close = useCallback(() => setArticle(null), []);
  useEffect(() => { const timer = setInterval(() => setNote(index => (index + 1) % studioNotes.length), 6000); return () => clearInterval(timer); }, []);
  return <div className="profile-view"><div className="profile-layout">
    <div className="profile-mobile-title"><WhoHeading mobile /></div>
    <div className="profile-figure"><img src={asset(profile.profilePortrait)} alt="Original editorial illustration of Mira, seated with her notebook" /></div>
    <div className="profile-bio"><WhoHeading /><div className="profile-copy"><p><span className="drop-cap">M</span>{profile.bio[0].slice(1)}</p><p>{profile.bio[1]}</p><p>{profile.bio[2]} <button className="inline-link" onClick={() => setArticle(articles[0])}>Read the notes.</button> <button className="inline-link" onClick={() => navigate('case-studies')}>View the work.</button></p></div><div className="profile-actions"><a className="solid-button" href={`mailto:${profile.email}?subject=Let%E2%80%99s%20make%20something%20thoughtful`}>Hire me</a><button className="outline-button" onClick={() => navigate('roadmap')}>Design roadmap</button></div></div>
    <aside className="profile-side"><div className="profile-contact"><a className="profile-email" href={`mailto:${profile.email}`}><Mail size={18} strokeWidth={2.5} /> {profile.email}</a><a className="profile-cv" href={asset(profile.cv)} download>Download CV</a><div className="social-links">{profile.socialLinks.map(link => { const Icon = icons[link.icon]; return link.href ? <a key={link.label} title={link.label} aria-label={link.label} href={link.href}><Icon size={22} /></a> : <button key={link.label} title={link.label} aria-label={link.label} onClick={() => link.action === 'notes' ? setArticle(articles[0]) : navigate(link.action)}><Icon size={22} /></button>; })}</div></div>
      <div className="studio-quote"><AnimatePresence mode="wait"><motion.blockquote key={note} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.3 }}><p>{studioNotes[note].quote}</p><cite>— {studioNotes[note].name}</cite></motion.blockquote></AnimatePresence><div className="quote-dots">{studioNotes.map((item, index) => <button key={item.name} aria-label={`View studio note ${index + 1}`} aria-pressed={note === index} onClick={() => setNote(index)} className={note === index ? 'active' : ''} />)}</div></div>
      <div className="book-marquee" aria-label="Original fictional studio book covers"><div className="book-track">{[...books, ...books].map((book, index) => <img key={index} src={asset(`images/book-${index % books.length}.svg`)} alt={index < books.length ? `${book.title} — ${book.subtitle}. Original demo cover.` : ''} loading="lazy" />)}</div></div>
    </aside>
  </div><div className="article-marquee"><div className="article-track">{[...articles, ...articles, ...articles, ...articles].map((item, index) => <button key={index} onClick={() => setArticle(item)} tabIndex={index < articles.length ? 0 : -1} aria-hidden={index >= articles.length ? true : undefined}><img src={asset(item.image)} alt="" loading="lazy" /><h2>{item.title}</h2></button>)}</div></div>
    <AnimatePresence>{article && <Modal title={article.title} onClose={close} className="article-modal"><span className="eyebrow">From the studio / Original writing</span><h1>{article.title}</h1>{article.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<button className="outline-button" onClick={close}>Back to the studio</button></Modal>}</AnimatePresence>
  </div>;
}
