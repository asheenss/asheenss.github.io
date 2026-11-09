import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Envelope from '../components/Envelope';
import FloatingHearts from '../components/FloatingHearts';
import Sparkles from '../components/Sparkles';
import RomanticButton from '../components/RomanticButton';

interface Props {
  /** Called synchronously from the click so audio can start under a user gesture. */
  onOpenClick: () => void;
  /** Called once the envelope animation has finished. */
  onOpened: () => void;
}

export default function Opening({ onOpenClick, onOpened }: Props) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  const handle = () => {
    if (open) return;
    setOpen(true);
    onOpenClick();
    window.setTimeout(onOpened, reduce ? 300 : 2400);
  };

  return (
    <section className="bg-romance relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-12 text-center">
      <FloatingHearts count={16} />
      <Sparkles />
      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="font-script text-5xl text-rose-deep sm:text-7xl"
        >
          Hey, My Love ❤️
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-3 font-display text-lg italic text-burgundy/80 sm:text-xl"
        >
          I made something special for you...
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.6 }}
          className="my-12 pt-24"
        >
          <Envelope open={open} />
        </motion.div>
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: open ? 0 : 1 }}
          transition={{ duration: 0.8, delay: open ? 0 : 2.2 }}
          style={{ pointerEvents: open ? 'none' : 'auto' }}
        >
          <RomanticButton onClick={handle} disabled={open}>
            Open My Letter 💌
          </RomanticButton>
        </motion.div>
      </div>
    </section>
  );
}
