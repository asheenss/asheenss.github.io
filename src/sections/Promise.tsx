import { motion } from 'framer-motion';
import { promises } from '../data/messages';
import { useReveal } from '../hooks/useReveal';

function P({ text, strong }: { text: string; strong?: boolean }) {
  const r = useReveal(0, 20);
  return (
    <motion.p
      {...r}
      className={strong ? 'font-script text-4xl text-rose-deep sm:text-5xl' : 'font-display text-lg text-burgundy sm:text-2xl'}
    >
      {text}
    </motion.p>
  );
}

export default function PromiseSection() {
  const head = useReveal();
  const sign = useReveal(0.2);
  return (
    <section className="bg-ivory px-4 py-24 sm:py-32">
      <motion.h2 {...head} className="mb-12 text-center font-display text-4xl text-burgundy sm:text-5xl">
        My Promise to You.
      </motion.h2>
      <div className="mx-auto max-w-2xl space-y-7 text-center">
        {promises.map((t) => (
          <P key={t} text={t} />
        ))}
        <P text="And most importantly..." />
        <P text="I promise to never stop choosing you." strong />
        <motion.p {...sign} className="pt-8 font-script text-5xl text-gold-grad sm:text-6xl">
          Forever Yours ❤️
        </motion.p>
      </div>
    </section>
  );
}
