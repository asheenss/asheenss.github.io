import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, X } from 'lucide-react';
import type { Memory } from '../data/memories';

const src = (f: string) => `${import.meta.env.BASE_URL}images/${f}`;

function Placeholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-blush to-rose-soft/50 px-3 text-center text-rose-deep/70">
      <Heart size={28} aria-hidden />
      <span className="font-script text-2xl">A memory waits here</span>
    </div>
  );
}

export default function PhotoGallery({ memories }: { memories: Memory[] }) {
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<number | null>(null);
  const markFailed = (f: string) => setFailed((s) => new Set(s).add(f));

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

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
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
      <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {memories.map((m, i) => {
          const missing = failed.has(m.file);
          return (
            <motion.li
              key={m.file}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.1 }}
            >
              <button
                type="button"
                disabled={missing}
                onClick={() => setActive(i)}
                aria-label={missing ? 'Empty memory slot' : `Open photo ${i + 1}`}
                className="group block w-full overflow-hidden rounded-2xl border-4 border-ivory bg-ivory text-left shadow-xl shadow-rose/30 disabled:cursor-default"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  {missing ? (
                    <Placeholder />
                  ) : (
                    <img
                      src={src(m.file)}
                      alt={m.alt}
                      loading="lazy"
                      onError={() => markFailed(m.file)}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                {m.caption && !missing && (
                  <p className="px-3 py-2 text-center font-script text-2xl text-rose-deep">{m.caption}</p>
                )}
              </button>
            </motion.li>
          );
        })}
      </ul>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-burgundy-dark/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <figure className="max-h-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
              <img src={src(current.file)} alt={current.alt} className="max-h-[80vh] rounded-xl object-contain" />
              {current.caption && (
                <figcaption className="mt-3 text-center font-script text-3xl text-gold-light">{current.caption}</figcaption>
              )}
            </figure>
            <button
              autoFocus
              aria-label="Close"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-ivory/15 text-ivory"
            >
              <X aria-hidden />
            </button>
            <button
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-2 flex h-12 w-12 items-center justify-center rounded-full bg-ivory/15 text-ivory"
            >
              <ChevronLeft aria-hidden />
            </button>
            <button
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-2 flex h-12 w-12 items-center justify-center rounded-full bg-ivory/15 text-ivory"
            >
              <ChevronRight aria-hidden />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
