export function scrollToHash(hash: string): void {
  const id = hash.replace('#', '')
  const target = document.getElementById(id)
  if (!target) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  target.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start',
  })
}
