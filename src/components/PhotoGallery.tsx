import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, X } from 'lucide-react';
import type { Memory } from '../data/memories';
import { useOverlay } from '../hooks/useOverlay';

const src = (f: string) => `${import.meta.env.BASE_URL}images/${f}`;

function Placeholder() {
  return (
    <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-blush via-white to-lavender px-3 text-center text-rose-deep/70">
      <Heart size={28} aria-hidden />
      <span className="font-script text-2xl">A memory waits here</span>
    </div>
  );
}

/** Masonry gallery with a keyboard- and touch-friendly lightbox. Missing photos become placeholders. */
export default function PhotoGallery({ memories }: { memories: Memory[] }) {
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<number | null>(null);
  const markFailed = (f: string) => setFailed((s) => new Set(s).add(f));
  const close = useCallback(() => setActive(null), []);

  const allMissing = failed.size === memories.length;

  const step = useCallback(
    (d: number) => {
      setActive((a) => {
        if (a === null) return a;
        let n = a;
        for (let i = 0; i < memories.length; i++) {
          n = (n + d + memories.length) % memories.length;
          if (!failed.has(memories[n].file)) return n;
        }
        return a;
      });
    },
    [memories, failed],
  );

  useOverlay(active !== null, close);
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, step]);

  const current = active !== null ? memories[active] : null;

  return (
    <>
      {allMissing && (
        <p className="mx-auto mb-8 max-w-md text-center font-display italic text-burgundy/70">
          Our photos will live here. Add them to public/images/ and they will appear.
        </p>
      )}
      <ul className="mx-auto max-w-6xl columns-2 gap-3 sm:gap-5 md:columns-3 lg:columns-4">
        {memories.map((m, i) => {
          const missing = failed.has(m.file);
          return (
            <motion.li
              key={m.file}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.08 }}
              className="mb-3 break-inside-avoid sm:mb-5"
            >
              <button
                type="button"
                disabled={missing}
                onClick={() => setActive(i)}
                aria-label={missing ? 'Empty memory slot' : `Open photo ${i + 1}`}
                className="group relative block w-full overflow-hidden rounded-2xl border-4 border-white bg-white text-left shadow-xl shadow-rose/25 transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-rose/40 disabled:cursor-default"
              >
                {missing ? (
                  <Placeholder />
                ) : (
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={src(m.file)}
                      alt={m.alt}
                      loading="lazy"
                      onError={() => markFailed(m.file)}
                      className="block h-auto w-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-rose-deep/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </div>
                )}
                {m.caption && !missing && (
                  <p className="px-2 py-2 text-center font-script text-2xl text-rose-deep">{m.caption}</p>
                )}
              </button>
            </motion.li>
          );
        })}
      </ul>

      {createPortal(
      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            className="fixed inset-0 z-[70] flex items-center justify-center bg-plum/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <AnimatePresence mode="wait">
              <motion.figure
                key={current.file}
                initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className="max-h-full max-w-3xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={src(current.file)}
                  alt={current.alt}
                  className="max-h-[78svh] max-w-full rounded-2xl border-4 border-white object-contain shadow-2xl"
                />
                {current.caption && (
                  <figcaption className="mt-3 text-center font-script text-3xl text-rose-soft">{current.caption}</figcaption>
                )}
              </motion.figure>
            </AnimatePresence>
            <button
              autoFocus
              aria-label="Close"
              onClick={close}
              className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white"
            >
              <X aria-hidden />
            </button>
            <button
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white"
            >
              <ChevronLeft aria-hidden />
            </button>
            <button
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white"
            >
              <ChevronRight aria-hidden />
            </button>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
      )}
    </>
  );
}
