import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { reminders } from '../data/messages';
import { useReveal } from '../hooks/useReveal';

function Card({ text, i }: { text: string; i: number }) {
  const r = useReveal(0.05, 30);
  return (
    <motion.li
      {...r}
      className={`relative rounded-2xl card-soft px-7 py-8 text-center shadow-lg shadow-rose/20 ${
        i === reminders.length - 1 ? 'sm:col-span-2' : ''
      }`}
    >
      <Heart aria-hidden size={18} className="mx-auto mb-3 text-rose" fill="currentColor" />
      <p className="font-display text-xl italic leading-relaxed text-burgundy sm:text-2xl">{text}</p>
    </motion.li>
  );
}

export default function Reminder() {
  const head = useReveal();
  return (
    <section className="px-4 py-24 sm:py-32">
      <motion.h2 {...head} className="mx-auto mb-12 max-w-2xl text-center font-display text-3xl text-burgundy sm:text-5xl">
        Some Things I Never Want You to Forget.
      </motion.h2>
      <ul className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
        {reminders.map((t, i) => (
          <Card key={t} text={t} i={i} />
        ))}
      </ul>
    </section>
  );
}
