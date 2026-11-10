import { motion, useReducedMotion } from 'framer-motion';
import { useReveal } from '../hooks/useReveal';

/** Elegant letter; each paragraph fades in with a soft handwriting-style wipe. */
export default function LoveLetter({ paragraphs }: { paragraphs: string[] }) {
  const reduce = useReducedMotion();
  const card = useReveal(0, 40);
  return (
    <motion.article
      {...card}
      className="paper relative mx-auto w-full max-w-2xl rounded-xl border border-rose-soft px-6 py-10 shadow-2xl shadow-rose/30 sm:px-12 sm:py-14"
    >
      <div aria-hidden className="absolute inset-2 rounded-lg border border-rose-soft/60" />
      <div className="relative space-y-5 text-center">
        {paragraphs.map((p, i) => (
          <motion.p
            key={i}
            initial={reduce ? false : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            whileInView={reduce ? undefined : { opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 1.6, delay: 0.1, ease: 'easeOut' }}
            className={
              i === 0 || i === paragraphs.length - 1
                ? 'font-script text-4xl leading-snug text-rose-deep sm:text-5xl'
                : 'font-display text-lg leading-relaxed text-burgundy sm:text-xl'
            }
          >
            {p}
          </motion.p>
        ))}
      </div>
    </motion.article>
  );
}
