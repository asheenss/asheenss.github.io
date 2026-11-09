import { motion } from 'framer-motion';
import LoveLetter from '../components/LoveLetter';
import { Flower } from '../components/Florals';
import { apologyParagraphs } from '../data/messages';
import { useReveal } from '../hooks/useReveal';

export default function Apology() {
  const head = useReveal();
  return (
    <section id="apology" className="bg-romance relative overflow-hidden px-4 py-24 sm:py-32">
      <Flower className="absolute -left-8 top-10 text-rose/40" size={160} />
      <Flower className="absolute -right-10 bottom-10 text-gold/50" size={180} />
      <motion.h2 {...head} className="relative mb-12 text-center font-display text-4xl text-burgundy sm:text-5xl">
        I&apos;m Sorry, My Love.
      </motion.h2>
      <div className="relative">
        <LoveLetter paragraphs={apologyParagraphs} />
      </div>
    </section>
  );
}
