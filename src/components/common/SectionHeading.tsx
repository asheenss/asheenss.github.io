import { motion } from 'framer-motion';
import { useReveal } from '../../hooks/useReveal';
import HeartShape from './HeartShape';

interface Props {
  /** Small handwritten line above the title. */
  eyebrow?: string;
  title: string;
  /** Use on dark backgrounds. */
  light?: boolean;
}

export default function SectionHeading({ eyebrow, title, light }: Props) {
  const r = useReveal();
  return (
    <motion.header {...r} className="relative mx-auto mb-12 max-w-3xl text-center">
      {eyebrow && (
        <p className={`font-script text-3xl sm:text-4xl ${light ? 'text-rose-soft' : 'text-rose-deep'}`}>{eyebrow}</p>
      )}
      <h2
        className={`mt-1 text-balance font-display text-3xl leading-tight sm:text-5xl ${light ? 'text-white' : 'text-burgundy'}`}
      >
        {title}
      </h2>
      <div className={`mt-5 flex items-center justify-center gap-3 ${light ? 'text-rose-soft' : 'text-rose'}`}>
        <span className="h-px w-12 bg-current opacity-50" />
        <HeartShape size={14} />
        <span className="h-px w-12 bg-current opacity-50" />
      </div>
    </motion.header>
  );
}
