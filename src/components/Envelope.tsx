import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  open: boolean;
}

/** CSS/Framer envelope: the flap rotates open and the letter slides out. */
export default function Envelope({ open }: Props) {
  const reduce = useReducedMotion();
  const dur = reduce ? 0 : 1.1;
  return (
    <div
      className="relative mx-auto h-[190px] w-[280px] sm:h-[230px] sm:w-[340px]"
      style={{ perspective: 900 }}
      aria-hidden
    >
      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-rose-soft to-rose shadow-2xl shadow-burgundy/30" />
      <motion.div
        className="paper absolute left-[7%] right-[7%] top-[8%] h-[85%] rounded-md border border-gold-light px-4 pt-5 text-center shadow"
        animate={{ y: open ? (reduce ? -60 : -95) : 0 }}
        transition={{ duration: dur, delay: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-script text-2xl text-burgundy/80 sm:text-3xl">For you, my love</p>
        <div className="mx-auto mt-3 h-px w-16 bg-gold-light" />
      </motion.div>
      <svg viewBox="0 0 340 230" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <path d="M0 230 L0 18 L170 140 L340 18 L340 230 Z" fill="#eca0b0" />
        <path d="M0 230 L170 110 L340 230 Z" fill="#e48fa3" />
      </svg>
      <motion.div
        className="absolute left-0 right-0 top-0 h-[62%] origin-top"
        style={{ transformStyle: 'preserve-3d', zIndex: open ? 0 : 5 }}
        animate={{ rotateX: open ? 180 : 0 }}
        transition={{ duration: dur, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 340 140" className="h-full w-full drop-shadow" preserveAspectRatio="none">
          <path d="M0 0 H340 L170 140 Z" fill="#f4b6c2" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-[48%] z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-burgundy shadow-lg"
        animate={{ opacity: open ? 0 : 1, scale: open ? 0.6 : 1 }}
        transition={{ duration: reduce ? 0 : 0.4 }}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="#e6d2a8">
          <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.5 6.4 4.5c2 0 3.6 1.1 4.6 2.7h2c1-1.6 2.6-2.7 4.6-2.7 3.7 0 5.5 3.9 4 7.3C19.5 16.4 12 21 12 21z" />
        </svg>
      </motion.div>
    </div>
  );
}
