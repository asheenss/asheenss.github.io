const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Scrolls to a section by id and reflects it in the URL hash (GitHub Pages safe: no path routing). */
export function scrollToSection(id: string, instant = false) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: instant || prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
}
