import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  count?: number;
  /** 'soft' for light backgrounds, 'glow' for dark/burgundy ones */
  tone?: 'soft' | 'glow';
  className?: string;
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export default function FloatingHearts({ count = 14, tone = 'soft', className = '' }: Props) {
  const reduce = useReducedMotion();
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: rand(2, 96),
        size: rand(12, 30),
        duration: rand(12, 24),
        delay: rand(0, 14),
        drift: rand(-30, 30),
        opacity: rand(0.18, 0.45),
        top: rand(5, 90),
      })),
    [count],
  );
  const color = tone === 'soft' ? '#e08299' : '#f4b6c2';

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {items.map((h) =>
        reduce ? (
          <svg
            key={h.id}
            viewBox="0 0 24 24"
            width={h.size}
            height={h.size}
            fill={color}
            style={{ position: 'absolute', left: `${h.left}%`, top: `${h.top}%`, opacity: h.opacity * 0.6 }}
          >
            <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.5 6.4 4.5c2 0 3.6 1.1 4.6 2.7h2c1-1.6 2.6-2.7 4.6-2.7 3.7 0 5.5 3.9 4 7.3C19.5 16.4 12 21 12 21z" />
          </svg>
        ) : (
          <motion.svg
            key={h.id}
            viewBox="0 0 24 24"
            width={h.size}
            height={h.size}
            fill={color}
            style={{ position: 'absolute', left: `${h.left}%`, bottom: -40, opacity: 0 }}
            animate={{ y: [0, -900], x: [0, h.drift, -h.drift, 0], opacity: [0, h.opacity, h.opacity, 0] }}
            transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' }}
          >
            <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.5 6.4 4.5c2 0 3.6 1.1 4.6 2.7h2c1-1.6 2.6-2.7 4.6-2.7 3.7 0 5.5 3.9 4 7.3C19.5 16.4 12 21 12 21z" />
          </motion.svg>
        ),
      )}
    </div>
  );
}
