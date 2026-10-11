export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
export const clamp = (number, min, max) => Math.min(max, Math.max(min, number));
export function readRoute() {
  const hash = decodeURIComponent(window.location.hash.slice(1));
  if (hash.startsWith('work/')) return { view: 'case-studies', project: hash.slice(5) };
  return { view: ['case-studies', 'ai', 'profile', 'roadmap', 'community'].includes(hash) ? hash : 'dashboard', project: null };
}
export function navigate(view, project = null) {
  const hash = project ? `work/${project}` : view === 'dashboard' ? '' : view;
  if (window.location.hash.slice(1) === hash) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else { window.location.hash = hash; }
}
