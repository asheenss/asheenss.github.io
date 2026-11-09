import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import FloatingHearts from '../components/FloatingHearts';
import Sparkles from '../components/Sparkles';
import RomanticButton from '../components/RomanticButton';
import { finalLines, finalSupport, hugMessage } from '../data/messages';
import { useReveal } from '../hooks/useReveal';

function Line({ text, i }: { text: string; i: number }) {
  const r = useReveal(i * 0.15, 30);
  return (
    <motion.p {...r} className="font-script text-5xl leading-tight text-ivory sm:text-8xl">
      {text}
    </motion.p>
  );
}

export default function FinalMessage() {
  const reduce = useReducedMotion();
  const [hug, setHug] = useState(false);
  const support = useReveal(0.2);

  return (
    <section className="bg-romance-deep relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
      <FloatingHearts count={18} tone="glow" />
      <Sparkles count={24} />
      <div className="relative z-10 flex flex-col items-center">
        {finalLines.map((l, i) => (
          <Line key={l} text={l} i={i} />
        ))}

        <motion.div
          aria-hidden
          className="my-8"
          animate={reduce ? undefined : { scale: [1, 1.18, 1, 1.12, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 24 24" width="72" height="72" fill="#f4b6c2" style={{ filter: 'drop-shadow(0 0 16px rgba(244,182,194,.6))' }}>
            <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.5 6.4 4.5c2 0 3.6 1.1 4.6 2.7h2c1-1.6 2.6-2.7 4.6-2.7 3.7 0 5.5 3.9 4 7.3C19.5 16.4 12 21 12 21z" />
          </svg>
        </motion.div>

        <motion.div {...support} className="max-w-xl space-y-4 font-display text-lg leading-relaxed text-blush sm:text-xl">
          {finalSupport.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </motion.div>

        <div className="mt-10">
          <RomanticButton variant="light" onClick={() => setHug(true)}>
            Send You a Million Hugs ❤️
          </RomanticButton>
        </div>
      </div>

      <AnimatePresence>
        {hug && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="A million hugs"
            className="fixed inset-0 z-[70] flex items-center justify-center bg-burgundy-dark/90 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setHug(false)}
          >
            <FloatingHearts count={40} tone="glow" />
            <motion.div
              initial={reduce ? false : { scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative max-w-md text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-script text-4xl leading-snug text-ivory sm:text-5xl">{hugMessage}</p>
              <button
                autoFocus
                onClick={() => setHug(false)}
                className="mt-8 min-h-[48px] rounded-full border border-gold-light px-6 text-gold-light"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
