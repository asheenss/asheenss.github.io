import { motion, useReducedMotion } from 'framer-motion';
import HeartShape from '../components/common/HeartShape';
import SectionHeading from '../components/common/SectionHeading';
import { promiseClosing, promises, signature } from '../data/messages';
import { useReveal } from '../hooks/useReveal';

/** One promise, revealed word by word as it scrolls into view. */
function PromiseLine({ text, index }: { text: string; index: number }) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  return (
    <motion.li
      initial={reduce ? false : 'hidden'}
      whileInView="shown"
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ staggerChildren: 0.09 }}
      className="flex items-center gap-4 border-b border-rose-soft/60 py-5 last:border-0 sm:gap-6"
    >
      <motion.span
        variants={{ hidden: { scale: 0, opacity: 0 }, shown: { scale: 1, opacity: 1 } }}
        className="relative flex h-12 w-12 shrink-0 items-center justify-center text-rose"
      >
        <HeartShape size={48} />
        <span className="absolute font-display text-sm font-semibold text-white">{index + 1}</span>
      </motion.span>
      <p className="text-left font-display text-xl text-burgundy sm:text-3xl">
        {words.map((w, i) => (
          <motion.span
            key={i}
            variants={{ hidden: { opacity: 0, y: 14 }, shown: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block whitespace-pre"
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </p>
    </motion.li>
  );
}

export default function PromiseSection() {
  const closing = useReveal(0, 24);
  const sign = useReveal(0.3);
  return (
    <section id="promise" className="bg-veil relative px-4 py-24 sm:py-32">
      <SectionHeading eyebrow="From My Heart" title="My Promises to You." />
      <div className="card-soft mx-auto max-w-2xl rounded-[2rem] px-5 py-4 sm:px-10 sm:py-6">
        <ol>
          {promises.map((t, i) => (
            <PromiseLine key={t} text={t} index={i} />
          ))}
        </ol>
      </div>
      <motion.p {...closing} className="mx-auto mt-12 max-w-2xl text-balance text-center font-display text-xl italic leading-relaxed text-burgundy sm:text-2xl">
        {promiseClosing}
      </motion.p>
      <motion.p {...sign} className="text-gold-grad mt-8 pb-2 text-center font-script text-6xl sm:text-7xl">
        {signature}
      </motion.p>
    </section>
  );
}
