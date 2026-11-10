import { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { matchGame } from '../../data/games';
import { shuffle } from '../../lib/canvas';
import { sfx } from '../../lib/sfx';
import { useCelebrate } from '../animations/Celebration';
import HeartShape from '../common/HeartShape';
import { GameOverlay, Hud, type GameProps } from './GameUi';

const deal = () => shuffle([...matchGame.symbols, ...matchGame.symbols]);
const hidden = { backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' } as const;

export default function MemoryMatch({ onComplete }: GameProps) {
  const [cards, setCards] = useState<string[]>(deal);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<ReadonlySet<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const timer = useRef(0);
  const celebrate = useCelebrate();
  const won = matched.size === matchGame.symbols.length;

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    if (!won) return;
    celebrate('burst');
    sfx.chime();
    onComplete();
  }, [won, celebrate, onComplete]);

  const restart = () => {
    window.clearTimeout(timer.current);
    setCards(deal());
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
  };

  const flip = (i: number) => {
    if (flipped.length === 2 || flipped.includes(i) || matched.has(cards[i])) return;
    sfx.soft();
    const next = [...flipped, i];
    setFlipped(next);
    if (next.length < 2) return;
    setMoves((m) => m + 1);
    const isPair = cards[next[0]] === cards[next[1]];
    timer.current = window.setTimeout(
      () => {
        if (isPair) {
          setMatched((m) => new Set(m).add(cards[i]));
          sfx.pop();
        }
        setFlipped([]);
      },
      isPair ? 450 : 900,
    );
  };

  return (
    <>
      <Hud
        items={[
          { label: 'Moves', value: moves },
          { label: 'Pairs', value: `${matched.size} / ${matchGame.symbols.length}` },
        ]}
      />
      <div className="relative min-h-0 flex-1 overflow-y-auto px-3 pb-4">
        <p className="mx-auto mb-3 max-w-sm text-center text-sm text-burgundy/80">{matchGame.how}</p>
        <ul className="mx-auto grid max-w-[26rem] grid-cols-4 gap-2 sm:gap-3">
          {cards.map((symbol, i) => {
            const isMatched = matched.has(symbol);
            const up = isMatched || flipped.includes(i);
            return (
              <li key={i} style={{ perspective: 700 }}>
                <button
                  type="button"
                  onClick={() => flip(i)}
                  aria-label={up ? `Card ${i + 1}: ${symbol}` : `Card ${i + 1}, face down`}
                  aria-pressed={up}
                  className="relative block aspect-[3/4] w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d]"
                  style={{ transform: up ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                  <span
                    style={hidden}
                    className="absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-white/80 bg-gradient-to-br from-rose to-rose-deep shadow-lg shadow-rose/30"
                  >
                    <HeartShape size={26} className="text-white/85" />
                  </span>
                  <span
                    style={{ ...hidden, transform: 'rotateY(180deg)' }}
                    className={`absolute inset-0 flex items-center justify-center rounded-2xl border-2 bg-white text-3xl shadow-lg sm:text-4xl ${
                      isMatched ? 'border-rose shadow-rose/50' : 'border-rose-soft shadow-rose/20'
                    }`}
                  >
                    <span aria-hidden>{symbol}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={restart}
            className="flex min-h-[44px] items-center gap-2 rounded-full border border-white/80 bg-white/75 px-5 text-sm font-medium text-burgundy shadow-sm"
          >
            <RotateCcw size={15} aria-hidden /> Restart
          </button>
        </div>
        {won && (
          <GameOverlay
            emoji="💞"
            title="All pairs found!"
            message={matchGame.winMessage}
            detail={`Finished in ${moves} moves`}
            actionLabel="Play Again"
            onAction={restart}
          />
        )}
      </div>
    </>
  );
}
