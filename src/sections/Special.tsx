import { motion } from 'framer-motion';
import { specialMessages } from '../data/messages';
import { useReveal } from '../hooks/useReveal';
import { Sprig } from '../components/Florals';

function Line({ text, i }: { text: string; i: number }) {
  const r = useReveal(0.05, 30);
  return (
    <motion.li {...r} className="py-5 text-center sm:py-7">
      <span className={`font-script text-4xl sm:text-6xl ${i % 2 ? 'text-burgundy' : 'text-rose-deep'}`}>{text}</span>
    </motion.li>
  );
}

export default function Special() {
  const head = useReveal();
  return (
    <section className="relative overflow-hidden bg-ivory px-4 py-24 sm:py-32">
      <motion.h2 {...head} className="mx-auto mb-10 max-w-xl text-center font-display text-3xl text-burgundy sm:text-5xl">
        Do You Know How Special You Are?
      </motion.h2>
      <Sprig className="mx-auto mb-6 text-gold" />
      <ul className="mx-auto max-w-3xl">
        {specialMessages.map((m, i) => (
          <Line key={m} text={m} i={i} />
        ))}
      </ul>
    </section>
  );
}
