import { Suspense, lazy, useCallback, useState, type ComponentType } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import { GameShell, type GameProps } from '../components/games/GameUi';
import { games, type GameId, type GameMeta } from '../data/games';
import { useReveal } from '../hooks/useReveal';

// Each game is its own chunk, loaded only when she opens it.
const components: Record<GameId, ComponentType<GameProps>> = {
  catch: lazy(() => import('../components/games/CatchHearts')),
  match: lazy(() => import('../components/games/MemoryMatch')),
  unlock: lazy(() => import('../components/games/UnlockLetter')),
  pop: lazy(() => import('../components/games/PopHearts')),
  garden: lazy(() => import('../components/games/LoveGarden')),
};

function GameCard({ game, index, played, onPlay }: { game: GameMeta; index: number; played: boolean; onPlay: () => void }) {
  const r = useReveal((index % 3) * 0.08, 30);
  return (
    <motion.li {...r} className="flex">
      <button
        type="button"
        onClick={onPlay}
        className="card-soft group relative flex w-full flex-col items-center rounded-3xl px-6 py-8 text-center transition-transform duration-300 hover:-translate-y-1.5 active:scale-[.98]"
      >
        {played && (
          <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-blush px-2.5 py-1 text-xs font-medium text-rose-deep">
            <Check size={12} aria-hidden /> Played
          </span>
        )}
        <span aria-hidden className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blush to-lavender text-4xl shadow-inner transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
          {game.emoji}
        </span>
        <span className="mt-4 font-display text-xl text-burgundy">{game.title}</span>
        <span className="mt-2 text-sm leading-relaxed text-plum/80">{game.tagline}</span>
        <span className="mt-5 rounded-full bg-gradient-to-r from-rose-deep to-burgundy px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-rose/30">
          Play
        </span>
      </button>
    </motion.li>
  );
}

export default function Games() {
  const [active, setActive] = useState<GameId | null>(null);
  const [played, setPlayed] = useState<ReadonlySet<GameId>>(new Set());
  const close = useCallback(() => setActive(null), []);
  const complete = useCallback(() => {
    setPlayed((p) => (active && !p.has(active) ? new Set(p).add(active) : p));
  }, [active]);

  const meta = games.find((g) => g.id === active);
  const Active = active ? components[active] : null;

  return (
    <section id="games" className="relative px-4 py-24 sm:py-32">
      <SectionHeading eyebrow="Love Games" title="Come Play With My Heart for a While." />
      <ul className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((g, i) => (
          <GameCard key={g.id} game={g} index={i} played={played.has(g.id)} onPlay={() => setActive(g.id)} />
        ))}
      </ul>
      <p aria-live="polite" className="mt-8 text-center font-script text-3xl text-rose-deep">
        {played.size === 0
          ? 'Pick any one. They are all for you.'
          : played.size === games.length
            ? 'You played them all. My heart is still yours.'
            : `${played.size} of ${games.length} played with love`}
      </p>

      {createPortal(
      <AnimatePresence>
        {meta && Active && (
          <GameShell key={meta.id} title={meta.title} onClose={close}>
            <Suspense fallback={<p className="m-auto font-script text-3xl text-rose-deep">Just a moment, my love...</p>}>
              <Active onComplete={complete} />
            </Suspense>
          </GameShell>
        )}
      </AnimatePresence>,
      document.body,
      )}
    </section>
  );
}
