import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Lock, LockOpen } from 'lucide-react';
import { unlockGame } from '../../data/games';
import { sfx } from '../../lib/sfx';
import { useCelebrate } from '../animations/Celebration';
import HeartShape from '../common/HeartShape';
import RomanticButton from '../RomanticButton';
import type { GameProps } from './GameUi';

const total = unlockGame.questions.length;

/** A gentle three-question puzzle. Every answer is accepted; all roads lead to the same loving message. */
export default function UnlockLetter({ onComplete }: GameProps) {
  const reduce = useReducedMotion();
  const celebrate = useCelebrate();
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [typed, setTyped] = useState('');
  const unlocked = index >= total;
  const q = unlockGame.questions[Math.min(index, total - 1)];

  const choose = (value: string) => {
    const v = value.trim();
    if (!v) return;
    setAnswer(v);
    sfx.pop();
  };

  const next = () => {
    setAnswer(null);
    setTyped('');
    const n = index + 1;
    setIndex(n);
    if (n >= total) {
      celebrate('burst');
      sfx.chime();
      onComplete();
    }
  };

  const restart = () => {
    setIndex(0);
    setAnswer(null);
    setTyped('');
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    choose(typed);
  };

  const enter = reduce ? false : { opacity: 0, y: 18 };

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">
      <ol aria-label="Progress" className="mx-auto mb-5 flex max-w-xs items-center justify-center gap-3">
        {unlockGame.questions.map((_, i) => {
          const open = i < index;
          return (
            <li
              key={i}
              aria-label={`Lock ${i + 1}: ${open ? 'open' : 'closed'}`}
              className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-colors duration-500 ${
                open ? 'border-rose bg-rose text-white' : 'border-white bg-white/70 text-burgundy/50'
              }`}
            >
              {open ? <LockOpen size={18} aria-hidden /> : <Lock size={18} aria-hidden />}
            </li>
          );
        })}
      </ol>

      <AnimatePresence mode="wait">
        {unlocked ? (
          <motion.div
            key="final"
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="paper mx-auto max-w-md rounded-3xl border border-rose-soft px-6 py-10 text-center shadow-2xl shadow-rose/30"
          >
            <HeartShape size={56} className="animate-heartbeat mx-auto text-rose" />
            <p className="mt-4 font-script text-3xl text-rose-deep">The letter is open</p>
            <p aria-live="polite" className="mt-3 font-display text-2xl leading-snug text-burgundy">
              {unlockGame.finalMessage}
            </p>
            <div className="mt-7">
              <RomanticButton onClick={restart}>Play Again</RomanticButton>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={index}
            initial={enter}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -18 }}
            transition={{ duration: 0.35 }}
            className="card-soft mx-auto max-w-md rounded-3xl px-5 py-7 text-center sm:px-8"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-rose-deep">
              Question {index + 1} of {total}
            </p>
            <h4 className="mt-2 font-display text-2xl leading-snug text-burgundy">{q.prompt}</h4>

            {answer === null ? (
              <>
                <p className="mt-2 text-sm text-burgundy/70">{unlockGame.how}</p>
                <ul className="mt-5 grid gap-2.5">
                  {q.options.map((opt) => (
                    <li key={opt}>
                      <button
                        type="button"
                        onClick={() => choose(opt)}
                        className="min-h-[48px] w-full rounded-2xl border border-rose-soft bg-white px-4 py-2 font-display text-base text-burgundy transition-colors hover:bg-blush active:bg-rose-soft"
                      >
                        {opt}
                      </button>
                    </li>
                  ))}
                </ul>
                <form onSubmit={onSubmit} className="mt-4 flex gap-2">
                  <label className="sr-only" htmlFor="own-answer">
                    Write your own answer
                  </label>
                  <input
                    id="own-answer"
                    value={typed}
                    onChange={(e) => setTyped(e.target.value)}
                    maxLength={80}
                    placeholder="Or write your own..."
                    className="min-h-[48px] min-w-0 flex-1 rounded-2xl border border-rose-soft bg-white px-4 text-base text-burgundy placeholder:text-burgundy/40"
                  />
                  <button
                    type="submit"
                    disabled={!typed.trim()}
                    className="min-h-[48px] rounded-2xl bg-gradient-to-r from-rose-deep to-burgundy px-4 text-sm font-medium text-white disabled:opacity-40"
                  >
                    Send
                  </button>
                </form>
              </>
            ) : (
              <motion.div initial={enter} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-5">
                <p className="text-sm text-burgundy/70">You said</p>
                <p className="mt-1 break-words font-script text-3xl text-rose-deep">{answer}</p>
                <p aria-live="polite" className="mt-4 font-display text-lg italic leading-relaxed text-burgundy">
                  {q.reply}
                </p>
                <div className="mt-6">
                  <RomanticButton onClick={next}>{index + 1 === total ? 'Unlock the Letter 💌' : 'Next ❤️'}</RomanticButton>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
