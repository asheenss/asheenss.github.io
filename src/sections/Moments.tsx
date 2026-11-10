import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCelebrate } from '../components/animations/Celebration';
import HeartShape from '../components/common/HeartShape';
import Modal from '../components/common/Modal';
import SectionHeading from '../components/common/SectionHeading';
import ReasonEnvelopes from '../components/ReasonEnvelopes';
import RomanticButton from '../components/RomanticButton';
import { heartbeatMessage, loveMeter, reasons, surprise } from '../data/messages';
import { useReveal } from '../hooks/useReveal';
import { sfx } from '../lib/sfx';

/** "How much do I love you?" A new answer on every tap. */
function LoveButton() {
  const reduce = useReducedMotion();
  const r = useReveal(0, 30);
  const [taps, setTaps] = useState(0);
  const message = taps === 0 ? null : loveMeter[(taps - 1) % loveMeter.length];

  return (
    <motion.div {...r} className="card-soft flex flex-col items-center rounded-3xl px-6 py-9 text-center">
      <h3 className="font-display text-2xl text-burgundy">How much do I love you?</h3>
      <div className="flex min-h-[5.5rem] items-center justify-center" aria-live="polite">
        <AnimatePresence mode="wait">
          {message ? (
            <motion.p
              key={taps}
              initial={reduce ? false : { opacity: 0, y: 14, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="font-script text-4xl leading-tight text-rose-deep"
            >
              {message}
            </motion.p>
          ) : (
            <HeartShape size={30} className="animate-float text-rose-soft" />
          )}
        </AnimatePresence>
      </div>
      <RomanticButton
        onClick={() => {
          setTaps((t) => t + 1);
          sfx.pop();
        }}
      >
        {taps === 0 ? 'Tap to find out ❤️' : 'Tap again ❤️'}
      </RomanticButton>
    </motion.div>
  );
}

/** A big beating heart that reveals a message when touched. */
function Heartbeat() {
  const r = useReveal(0.1, 30);
  const [revealed, setRevealed] = useState(false);
  return (
    <motion.div {...r} className="card-soft flex flex-col items-center rounded-3xl px-6 py-9 text-center">
      <h3 className="font-display text-2xl text-burgundy">Listen to my heart</h3>
      <button
        type="button"
        onClick={() => {
          setRevealed(true);
          sfx.soft();
        }}
        aria-label="Touch my heart"
        aria-expanded={revealed}
        className="relative my-4 flex h-32 w-32 items-center justify-center rounded-full"
      >
        <span aria-hidden className="animate-glow absolute inset-0 rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(255,105,180,.4), rgba(255,105,180,0))' }} />
        <HeartShape size={104} className="animate-heartbeat relative text-rose" style={{ filter: 'drop-shadow(0 8px 14px rgba(231,84,128,.45))' }} />
      </button>
      <p aria-live="polite" className="min-h-[3.5rem] font-display text-lg italic leading-relaxed text-burgundy">
        {revealed ? heartbeatMessage : 'Touch it gently.'}
      </p>
    </motion.div>
  );
}

/** The mysterious button, its surprise, and a virtual hug. */
function Surprise() {
  const r = useReveal(0, 30);
  const celebrate = useCelebrate();
  const [open, setOpen] = useState(false);
  const [hugged, setHugged] = useState(false);

  return (
    <motion.div {...r} className="mx-auto mt-16 max-w-xl text-center">
      <p className="mb-5 font-script text-3xl text-rose-deep">One more thing...</p>
      <RomanticButton
        onClick={() => {
          setHugged(false);
          setOpen(true);
          celebrate('rain');
          sfx.chime();
        }}
      >
        {surprise.button}
      </RomanticButton>

      <Modal open={open} onClose={() => setOpen(false)} label="A surprise for you">
        <div aria-hidden className="text-5xl">
          {hugged ? '🤗' : '🎁'}
        </div>
        <p className="mt-2 font-script text-5xl text-rose-deep">{hugged ? 'A hug for you' : surprise.title}</p>
        <p aria-live="polite" className="mt-4 font-display text-xl leading-relaxed text-burgundy">
          {hugged ? surprise.hugMessage : surprise.message}
        </p>
        {!hugged && (
          <div className="mt-7">
            <RomanticButton
              onClick={() => {
                setHugged(true);
                celebrate('burst');
                sfx.chime();
              }}
            >
              {surprise.hugCta}
            </RomanticButton>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}

export default function Moments() {
  return (
    <section id="moments" className="bg-veil relative px-4 py-24 sm:py-32">
      <SectionHeading eyebrow="Little Moments" title="A Few Things My Heart Wants to Tell You." />
      <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
        <LoveButton />
        <Heartbeat />
      </div>

      <div className="mt-20">
        <SectionHeading eyebrow="Open Them All" title="Reasons I Love You." />
        <ReasonEnvelopes reasons={reasons} />
      </div>

      <Surprise />
    </section>
  );
}
