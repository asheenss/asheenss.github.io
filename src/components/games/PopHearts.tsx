import { useRef, useState, type PointerEvent } from 'react';
import { popGame } from '../../data/games';
import { useCanvasLoop } from '../../hooks/useCanvasLoop';
import { PINKS, fillHeart, pick, rand, spawnBurst, stepParticles, type Particle } from '../../lib/canvas';
import { sfx } from '../../lib/sfx';
import { useCelebrate } from '../animations/Celebration';
import { GameOverlay, Hud, type GameProps } from './GameUi';

type Phase = 'ready' | 'playing' | 'done';

interface Target {
  x: number;
  y: number;
  r: number;
  age: number;
  life: number;
  color: string;
}
interface State {
  targets: Target[];
  particles: Particle[];
  spawnIn: number;
  elapsed: number;
  score: number;
  done: boolean;
}

const COLORS = ['#FF69B4', '#E75480', '#FF8FC7', '#C9A7FF'];
const MAX_ON_SCREEN = 7;
const fresh = (): State => ({ targets: [], particles: [], spawnIn: 0.2, elapsed: 0, score: 0, done: false });

export default function PopHearts({ onComplete }: GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const game = useRef<State>(fresh());
  const [phase, setPhase] = useState<Phase>('ready');
  const [hud, setHud] = useState({ score: 0, time: popGame.duration });
  const celebrate = useCelebrate();

  const start = () => {
    game.current = fresh();
    setHud({ score: 0, time: popGame.duration });
    setPhase('playing');
  };

  const onPointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    if (phase !== 'playing') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const s = game.current;
    // Topmost (newest) heart first; generous hit area for fingers.
    for (let i = s.targets.length - 1; i >= 0; i--) {
      const t = s.targets[i];
      if (Math.hypot(px - t.x, py - t.y) <= t.r + 12) {
        s.targets.splice(i, 1);
        s.score += 1;
        spawnBurst(s.particles, t.x, t.y, 14, 200, [t.color, ...PINKS]);
        sfx.pop();
        setHud((h) => ({ ...h, score: s.score }));
        return;
      }
    }
  };

  useCanvasLoop(
    canvasRef,
    (ctx, dt, { w, h }) => {
      const s = game.current;

      if (phase === 'playing' && !s.done && dt > 0) {
        s.elapsed += dt;
        const difficulty = Math.min(1, s.elapsed / popGame.duration);

        s.spawnIn -= dt;
        if (s.spawnIn <= 0 && s.targets.length < MAX_ON_SCREEN) {
          s.spawnIn = 0.72 - 0.4 * difficulty;
          const r = rand(26, 38) - 5 * difficulty;
          s.targets.push({
            x: rand(r + 10, w - r - 10),
            y: rand(r + 10, h - r - 10),
            r,
            age: 0,
            life: 2.3 - 1.1 * difficulty,
            color: pick(COLORS),
          });
        }
        for (let i = s.targets.length - 1; i >= 0; i--) {
          const t = s.targets[i];
          t.age += dt;
          t.y -= 14 * dt;
          if (t.age >= t.life) s.targets.splice(i, 1);
        }

        const time = Math.max(0, Math.ceil(popGame.duration - s.elapsed));
        setHud((prev) => (prev.time === time ? prev : { ...prev, time }));

        if (s.elapsed >= popGame.duration) {
          s.done = true;
          s.targets.length = 0;
          setPhase('done');
          celebrate('rain');
          sfx.chime();
          onComplete();
        }
      }

      ctx.clearRect(0, 0, w, h);
      for (const t of s.targets) {
        const appear = Math.min(1, t.age / 0.18);
        const fade = Math.min(1, (t.life - t.age) / 0.35);
        const pulse = 1 + Math.sin(t.age * 7) * 0.05;
        const size = t.r * 2 * appear * pulse;
        ctx.globalAlpha = Math.max(0, fade);
        fillHeart(ctx, t.x, t.y, size, t.color);
        ctx.globalAlpha = Math.max(0, fade) * 0.5;
        fillHeart(ctx, t.x - size * 0.2, t.y - size * 0.16, size * 0.24, '#FFFFFF');
        ctx.globalAlpha = 1;
      }
      stepParticles(ctx, s.particles, dt);
    },
    phase === 'playing',
  );

  return (
    <>
      <Hud
        items={[
          { label: 'Popped', value: hud.score },
          { label: 'Time', value: `${hud.time}s` },
        ]}
      />
      <div className="relative mx-auto mb-3 min-h-0 w-[calc(100%-1.5rem)] max-w-4xl flex-1 overflow-hidden rounded-3xl border border-white/80 bg-white/35 shadow-inner">
        <canvas
          ref={canvasRef}
          aria-label="Tap the hearts to pop them"
          onPointerDown={onPointerDown}
          className="absolute inset-0 h-full w-full cursor-pointer touch-none select-none"
        />
        {phase === 'ready' && (
          <GameOverlay
            emoji="🎈"
            title="Pop the Hearts"
            message={`You have ${popGame.duration} seconds. Pop every heart you can!`}
            detail={popGame.how}
            actionLabel="Start ❤️"
            onAction={start}
          />
        )}
        {phase === 'done' && (
          <GameOverlay
            emoji="💖"
            title={`${hud.score} hearts popped`}
            message={popGame.winMessage}
            actionLabel="Play Again"
            onAction={start}
          />
        )}
      </div>
    </>
  );
}
