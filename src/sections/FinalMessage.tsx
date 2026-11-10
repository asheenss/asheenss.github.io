import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useCelebrate } from '../components/animations/Celebration';
import HeartField from '../components/animations/HeartField';
import Rose from '../components/animations/Rose';
import HeartShape from '../components/common/HeartShape';
import Modal from '../components/common/Modal';
import FloatingHearts from '../components/FloatingHearts';
import RomanticButton from '../components/RomanticButton';
import Sparkles from '../components/Sparkles';
import { finalClosing, finalLines, finalSupport, hugCta, hugMessage } from '../data/messages';
import { useReveal } from '../hooks/useReveal';
import { sfx } from '../lib/sfx';

// Typography for each line of the finale, building from a whisper to the big moment.
const LINE_STYLES = [
  'font-script text-5xl sm:text-7xl text-rose-soft',
  'font-script text-7xl sm:text-9xl text-white',
  'font-script text-7xl sm:text-9xl text-white',
  'font-script text-[2.6rem] sm:text-7xl text-rose-soft',
  'font-display italic text-xl sm:text-3xl text-blush max-w-xl',
];

function Line({ text, i }: { text: string; i: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.p
      initial={reduce ? false : { opacity: 0, y: 36, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-18% 0px' }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className={`text-glow text-balance leading-tight ${LINE_STYLES[i] ?? LINE_STYLES[LINE_STYLES.length - 1]}`}
    >
      {text}
    </motion.p>
  );
}

export default function FinalMessage() {
  const reduce = useReducedMotion();
  const celebrate = useCelebrate();
  const [hug, setHug] = useState(false);
  const closing = useReveal(0.1, 30);
  const support = useReveal(0.2);

  return (
    <section id="forever" className="bg-romance-deep relative overflow-hidden px-5 pb-40 pt-28 text-center sm:pt-36">
      <div aria-hidden className="animate-glow absolute left-1/2 top-[18%] h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(255,105,180,.45), rgba(255,105,180,0))' }} />
      {reduce ? <FloatingHearts count={18} tone="glow" /> : <HeartField />}
      <Sparkles count={26} />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-14 sm:gap-20">
        {finalLines.map((l, i) => (
          <Line key={l} text={l} i={i} />
        ))}

        <HeartShape size={84} className="animate-heartbeat text-rose-soft" style={{ filter: 'drop-shadow(0 0 22px rgba(255,192,203,.75))' }} />

        <motion.p {...closing} className="text-glow font-script text-6xl leading-tight text-white sm:text-8xl">
          {finalClosing}
        </motion.p>

        <motion.div {...support} className="max-w-xl space-y-4 font-display text-lg leading-relaxed text-blush sm:text-xl">
          {finalSupport.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </motion.div>

        <RomanticButton
          variant="light"
          onClick={() => {
            setHug(true);
            celebrate('rain');
            celebrate('burst');
            sfx.chime();
          }}
        >
          {hugCta} 🤗
        </RomanticButton>
      </div>

      {/* Roses along the bottom edge */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-2 sm:px-10">
        <div className="flex items-end gap-1 sm:gap-4">
          <Rose size={150} delay={0} />
          <Rose size={110} delay={-1.6} />
          <Rose size={130} delay={-3} className="hidden sm:block" />
        </div>
        <div className="flex items-end gap-1 sm:gap-4">
          <Rose size={130} delay={-2.2} className="hidden sm:block" />
          <Rose size={110} delay={-0.8} />
          <Rose size={150} delay={-3.6} />
        </div>
      </div>

      <Modal open={hug} onClose={() => setHug(false)} label="A virtual hug">
        <div aria-hidden className="animate-heartbeat text-6xl">
          🤗
        </div>
        <p className="mt-3 font-script text-5xl text-rose-deep">Hug sent, with all my love</p>
        <p className="mt-4 font-display text-xl leading-relaxed text-burgundy">{hugMessage}</p>
      </Modal>
    </section>
  );
}
