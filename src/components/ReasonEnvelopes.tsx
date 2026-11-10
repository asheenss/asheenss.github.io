import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { sfx } from '../lib/sfx';
import HeartShape from './common/HeartShape';
import Modal from './common/Modal';

function MiniEnvelope({ number, opened, onOpen }: { number: number; opened: boolean; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${opened ? 'Read again' : 'Open'} love note ${number}`}
      className="group relative block aspect-[4/3] w-full transition-transform duration-300 hover:-translate-y-1 active:scale-95"
      style={{ perspective: 600 }}
    >
      <span className="absolute inset-0 rounded-xl bg-gradient-to-b from-rose-soft to-rose shadow-lg shadow-rose/30" />
      {/* Note peeking out once opened */}
      <span
        className={`paper absolute inset-x-[10%] top-[10%] flex h-[70%] items-start justify-center rounded-md border border-rose-soft pt-1.5 font-script text-lg text-rose-deep transition-transform duration-700 ${
          opened ? '-translate-y-[22%]' : ''
        }`}
      >
        {opened && `No. ${number}`}
      </span>
      <svg aria-hidden viewBox="0 0 120 90" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M0 90 V8 L60 56 L120 8 V90Z" fill="#FFA9C6" />
        <path d="M0 90 L60 42 L120 90Z" fill="#FF8FB8" />
      </svg>
      <span
        className="absolute inset-x-0 top-0 h-[62%] origin-top transition-transform duration-700"
        style={{ transform: opened ? 'rotateX(180deg)' : 'rotateX(0deg)', zIndex: opened ? 0 : 2 }}
      >
        <svg aria-hidden viewBox="0 0 120 56" preserveAspectRatio="none" className="h-full w-full drop-shadow">
          <path d="M0 0 H120 L60 56Z" fill="#FFC0CB" />
        </svg>
      </span>
      <span
        className={`absolute left-1/2 top-[52%] z-[3] flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-burgundy text-blush shadow transition-all duration-500 ${
          opened ? 'scale-0 opacity-0' : 'group-hover:scale-110'
        }`}
      >
        <HeartShape size={14} />
      </span>
    </button>
  );
}

/** A wall of sealed envelopes; each opens to reveal one reason. */
export default function ReasonEnvelopes({ reasons }: { reasons: string[] }) {
  const reduce = useReducedMotion();
  const [opened, setOpened] = useState<ReadonlySet<number>>(new Set());
  const [reading, setReading] = useState<number | null>(null);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const open = (i: number) => {
    const first = !opened.has(i);
    setOpened((s) => new Set(s).add(i));
    sfx.soft();
    window.clearTimeout(timer.current);
    // Let the flap finish opening before the note appears.
    timer.current = window.setTimeout(() => setReading(i), first && !reduce ? 550 : 0);
  };

  return (
    <>
      <ul className="mx-auto grid max-w-3xl grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-4 sm:gap-x-5 sm:gap-y-8">
        {reasons.map((_, i) => (
          <motion.li
            key={i}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.07 }}
          >
            <MiniEnvelope number={i + 1} opened={opened.has(i)} onOpen={() => open(i)} />
          </motion.li>
        ))}
      </ul>
      <p aria-live="polite" className="mt-6 text-center text-sm text-burgundy/75">
        {opened.size} of {reasons.length} notes opened
      </p>

      <Modal open={reading !== null} onClose={() => setReading(null)} label="A reason I love you">
        {reading !== null && (
          <>
            <p className="font-script text-3xl text-rose-deep">Reason No. {reading + 1}</p>
            <HeartShape size={22} className="mx-auto my-4 text-rose" />
            <p className="font-display text-2xl leading-snug text-burgundy">{reasons[reading]}</p>
          </>
        )}
      </Modal>
    </>
  );
}
