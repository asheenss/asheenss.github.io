import { useReducedMotion } from 'framer-motion';

/** Returns motion props for a gentle scroll-triggered fade-up (static when reduced motion). */
export function useReveal(delay = 0, y = 24) {
  const reduce = useReducedMotion();
  if (reduce) return {};
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-10% 0px' },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}
