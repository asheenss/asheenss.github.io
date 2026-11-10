import { motion } from 'framer-motion';
import PhotoGallery from '../components/PhotoGallery';
import { memories } from '../data/memories';
import { useReveal } from '../hooks/useReveal';

export default function Memories() {
  const head = useReveal();
  return (
    <section id="memories" className="bg-romance px-4 py-24 sm:py-32">
      <motion.h2 {...head} className="mx-auto mb-12 max-w-2xl text-center font-display text-3xl text-burgundy sm:text-5xl">
        Every Memory With You Is Special.
      </motion.h2>
      <PhotoGallery memories={memories} />
    </section>
  );
}
