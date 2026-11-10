import { useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { gardenGame } from '../../data/games';
import { clamp, rand } from '../../lib/canvas';
import { sfx } from '../../lib/sfx';
import { useCelebrate } from '../animations/Celebration';
import HeartShape from '../common/HeartShape';
import type { GameProps } from './GameUi';

type Tool = 'flower' | 'heart' | 'butterfly';

interface Item {
  id: number;
  kind: Tool;
  /** Position in percent of the garden. */
  x: number;
  y: number;
  color: string;
  delay: number;
}

const TOOLS: { id: Tool; label: string; emoji: string }[] = [
  { id: 'flower', label: 'Flower', emoji: '🌸' },
  { id: 'heart', label: 'Heart', emoji: '💗' },
  { id: 'butterfly', label: 'Butterfly', emoji: '🦋' },
];

/** Flowers only grow on the ground (lower part of the scene). */
const GROUND_TOP = 52;

function Flower({ color }: { color: string }) {
  return (
    <svg aria-hidden viewBox="0 0 60 110" width="60" height="110" className="overflow-visible">
      <g className="grow-stem">
        <path d="M30 110 C28 86 33 70 30 46" stroke="#5E9C6B" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M30 88 C18 86 12 76 12 69 C22 70 29 78 30 88Z" fill="#86C290" />
        <path d="M30 76 C42 74 47 65 47 58 C38 60 31 66 30 76Z" fill="#79B884" />
      </g>
      <g className="bloom">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse key={a} cx="30" cy="17" rx="9" ry="15" fill={color} stroke="rgba(139,30,80,.18)" strokeWidth=".8" transform={`rotate(${a} 30 32)`} />
        ))}
        <circle cx="30" cy="32" r="7" fill="#FFD98A" stroke="rgba(139,30,80,.15)" strokeWidth=".8" />
      </g>
    </svg>
  );
}

function Butterfly({ color }: { color: string }) {
  return (
    <svg aria-hidden viewBox="0 0 48 36" width="44" height="33" className="overflow-visible">
      <g className="wing wing-l">
        <ellipse cx="13" cy="12" rx="11" ry="10" fill={color} stroke="rgba(139,30,80,.25)" />
        <ellipse cx="15" cy="26" rx="8" ry="7" fill={color} opacity=".8" stroke="rgba(139,30,80,.25)" />
      </g>
      <g className="wing wing-r">
        <ellipse cx="35" cy="12" rx="11" ry="10" fill={color} stroke="rgba(139,30,80,.25)" />
        <ellipse cx="33" cy="26" rx="8" ry="7" fill={color} opacity=".8" stroke="rgba(139,30,80,.25)" />
      </g>
      <rect x="22.5" y="6" width="3" height="24" rx="1.5" fill="#51213A" />
    </svg>
  );
}

export default function LoveGarden({ onComplete }: GameProps) {
  const celebrate = useCelebrate();
  const nextId = useRef(1);
  const [items, setItems] = useState<Item[]>([]);
  const [tool, setTool] = useState<Tool>('flower');
  const [color, setColor] = useState(gardenGame.colors[0]);
  const [message, setMessage] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const flowers = items.filter((i) => i.kind === 'flower').length;
  const full = items.length >= gardenGame.maxItems;

  const plant = (xPct: number, yPct: number) => {
    if (finished || full) return;
    const x = clamp(xPct, 5, 95);
    const y = tool === 'flower' ? clamp(yPct, GROUND_TOP, 97) : clamp(yPct, 8, 92);
    setItems((list) => [...list, { id: nextId.current++, kind: tool, x, y, color, delay: -rand(0, 4) }]);
    sfx.pop();
    if (tool === 'flower') setMessage(gardenGame.messages[flowers % gardenGame.messages.length]);
  };

  const onGardenClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    plant(((e.clientX - rect.left) / rect.width) * 100, ((e.clientY - rect.top) / rect.height) * 100);
  };

  const finish = () => {
    setFinished(true);
    setMessage(null);
    celebrate('rain');
    sfx.chime();
    onComplete();
  };

  const reset = () => {
    setItems([]);
    setMessage(null);
    setFinished(false);
  };

  const pill = 'min-h-[44px] rounded-full border border-white/80 bg-white/80 px-4 text-sm font-medium text-burgundy shadow-sm';

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col gap-2 px-3 pb-3">
      {/* Garden scene */}
      <div
        onClick={onGardenClick}
        className={`relative min-h-[240px] flex-1 overflow-hidden rounded-3xl border border-white/80 shadow-inner ${finished ? '' : 'cursor-crosshair'}`}
        style={{ background: 'linear-gradient(180deg, #E6D6FF 0%, #FFE4EC 34%, #FFF1D6 54%)' }}
      >
        <div aria-hidden className="animate-glow absolute left-1/2 top-[14%] h-40 w-40 -translate-x-1/2 rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,.95), rgba(255,241,214,0))' }} />
        <svg aria-hidden viewBox="0 0 400 200" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[56%] w-full">
          <path d="M0 60 C80 10 150 30 220 46 C290 62 340 26 400 40 V200 H0Z" fill="#CFEBD0" />
          <path d="M0 96 C90 58 170 92 250 78 C320 66 360 84 400 74 V200 H0Z" fill="#B5DDB8" />
          <path d="M0 140 C110 112 230 150 400 122 V200 H0Z" fill="#A2D3A8" />
        </svg>

        {items.length === 0 && !finished && (
          <p className="pointer-events-none absolute inset-x-6 top-[38%] text-center font-script text-3xl text-rose-deep/80">
            Tap anywhere to plant our first flower
          </p>
        )}

        {items.map((it) => {
          const depth = it.kind === 'flower' ? 0.6 + ((it.y - GROUND_TOP) / (100 - GROUND_TOP)) * 0.55 : 1;
          const anchor = it.kind === 'flower' ? 'translate(-50%, -100%)' : 'translate(-50%, -50%)';
          return (
            <div
              key={it.id}
              className="pointer-events-none absolute"
              style={{ left: `${it.x}%`, top: `${it.y}%`, zIndex: Math.round(it.y), transform: `${anchor} scale(${depth})`, transformOrigin: '50% 100%' }}
            >
              {it.kind === 'flower' && (
                <div className="animate-sway" style={{ '--delay': `${it.delay}s` } as CSSProperties}>
                  <Flower color={it.color} />
                </div>
              )}
              {it.kind === 'heart' && (
                <div className="pop-in">
                  <HeartShape size={30} fill={it.color} className="animate-float" style={{ animationDelay: `${it.delay}s`, filter: 'drop-shadow(0 2px 4px rgba(139,30,80,.3))' }} />
                </div>
              )}
              {it.kind === 'butterfly' && (
                <div className="pop-in">
                  <div className="flutter" style={{ '--delay': `${it.delay}s` } as CSSProperties}>
                    <Butterfly color={it.color} />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <AnimatePresence mode="wait">
          {(message || finished) && (
            <motion.p
              key={finished ? 'finale' : `${message}-${flowers}`}
              aria-live="polite"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="pointer-events-none absolute inset-x-3 top-3 z-[200] mx-auto max-w-md rounded-2xl border border-white/80 bg-white/85 px-4 py-2.5 text-center font-display text-base italic text-burgundy shadow-lg sm:text-lg"
            >
              {finished ? gardenGame.finaleMessage : message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      {finished ? (
        <div className="flex shrink-0 flex-wrap items-center justify-center gap-2 py-1">
          <button type="button" className={pill} onClick={() => setFinished(false)}>
            Keep Decorating
          </button>
          <button type="button" className={`${pill} flex items-center gap-2`} onClick={reset}>
            <RotateCcw size={15} aria-hidden /> Build Again
          </button>
        </div>
      ) : (
        <div className="shrink-0 space-y-2">
          <p className="text-center text-xs text-burgundy/80">
            {full ? 'Our garden is full and beautiful. Finish it to see it bloom.' : gardenGame.how}
          </p>
          <div role="radiogroup" aria-label="What to plant" className="flex justify-center gap-2">
            {TOOLS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={tool === t.id}
                onClick={() => setTool(t.id)}
                className={`min-h-[44px] rounded-full border px-3.5 text-sm font-medium shadow-sm transition-colors ${
                  tool === t.id ? 'border-rose-deep bg-rose-deep text-white' : 'border-white/80 bg-white/80 text-burgundy'
                }`}
              >
                <span aria-hidden>{t.emoji}</span> {t.label}
              </button>
            ))}
          </div>
          <div role="radiogroup" aria-label="Colour" className="flex justify-center gap-2">
            {gardenGame.colors.map((c) => (
              <button
                key={c}
                type="button"
                role="radio"
                aria-checked={color === c}
                aria-label={`Colour ${c}`}
                onClick={() => setColor(c)}
                className="flex h-11 w-11 items-center justify-center rounded-full"
              >
                <span
                  className={`block h-8 w-8 rounded-full border-2 shadow transition-transform ${color === c ? 'scale-125 border-burgundy' : 'border-white'}`}
                  style={{ background: c }}
                />
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              className={pill}
              disabled={full}
              onClick={() => plant(rand(8, 92), tool === 'flower' ? rand(GROUND_TOP + 4, 95) : rand(12, 60))}
            >
              Plant One for Me
            </button>
            <button
              type="button"
              disabled={items.length === 0}
              onClick={finish}
              className="min-h-[44px] rounded-full bg-gradient-to-r from-rose-deep to-burgundy px-5 text-sm font-medium text-white shadow disabled:opacity-40"
            >
              Finish Garden 🌷
            </button>
            <button type="button" aria-label="Reset garden" disabled={items.length === 0} onClick={reset} className={`${pill} flex items-center gap-2 disabled:opacity-40`}>
              <RotateCcw size={15} aria-hidden /> Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
