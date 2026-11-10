import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/** Softly glowing stars scattered across the parent (which must be positioned). */
export default function Sparkles({ count = 18 }: { count?: number }) {
  const reduce = useReducedMotion();
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 2 + Math.random() * 3.5,
        delay: Math.random() * 5,
        dur: 3 + Math.random() * 4,
      })),
    [count],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${d.top}%`,
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            opacity: reduce ? 0.5 : 0,
            boxShadow: '0 0 8px 2px rgba(255,241,214,.9), 0 0 16px 4px rgba(255,105,180,.35)',
          }}
          animate={reduce ? undefined : { opacity: [0, 0.95, 0], scale: [0.6, 1.25, 0.6] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
