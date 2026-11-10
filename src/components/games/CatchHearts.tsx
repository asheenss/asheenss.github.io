import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { catchGame } from '../../data/games';
import { useCanvasLoop } from '../../hooks/useCanvasLoop';
import { clamp, fillHeart, rand, spawnBurst, stepParticles, type Particle } from '../../lib/canvas';
import { sfx } from '../../lib/sfx';
import { useCelebrate } from '../animations/Celebration';
import { GameOverlay, Hud, type GameProps } from './GameUi';

type Phase = 'ready' | 'playing' | 'won' | 'timeup';

interface Falling {
  x: number;
  y: number;
  speed: number;
  size: number;
  value: number;
  phase: number;
}
interface FloatText {
  x: number;
  y: number;
  text: string;
  life: number;
}
interface State {
  basketX: number;
  pointerX: number | null;
  left: boolean;
  right: boolean;
  hearts: Falling[];
  particles: Particle[];
  texts: FloatText[];
  spawnIn: number;
  elapsed: number;
  score: number;
  caught: number;
  done: boolean;
}

const KINDS = [
  { value: 1, size: 30, color: '#FF69B4', weight: 0.62 },
  { value: 2, size: 36, color: '#E75480', weight: 0.28 },
  { value: 5, size: 42, color: '#F2B33D', weight: 0.1 },
] as const;
const colorOf = (value: number) => KINDS.find((k) => k.value === value)?.color ?? KINDS[0].color;

const fresh = (): State => ({
  basketX: -1,
  pointerX: null,
  left: false,
  right: false,
  hearts: [],
  particles: [],
  texts: [],
  spawnIn: 0.4,
  elapsed: 0,
  score: 0,
  caught: 0,
  done: false,
});

function drawBasket(ctx: CanvasRenderingContext2D, x: number, top: number, bw: number, bh: number) {
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#8B1E50';
  ctx.beginPath();
  ctx.arc(x, top + 2, bw * 0.4, Math.PI, 0);
  ctx.stroke();

  const grad = ctx.createLinearGradient(0, top, 0, top + bh);
  grad.addColorStop(0, '#FF69B4');
  grad.addColorStop(1, '#8B1E50');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(x - bw / 2, top);
  ctx.lineTo(x + bw / 2, top);
  ctx.lineTo(x + bw * 0.36, top + bh);
  ctx.lineTo(x - bw * 0.36, top + bh);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#FFE4EC';
  ctx.fillRect(x - bw / 2 - 4, top - 5, bw + 8, 9);
  fillHeart(ctx, x, top + bh * 0.55, bh * 0.5, '#FFE4EC');
}

export default function CatchHearts({ onComplete }: GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const game = useRef<State>(fresh());
  const [phase, setPhase] = useState<Phase>('ready');
  const [hud, setHud] = useState({ score: 0, caught: 0, time: catchGame.duration });
  const celebrate = useCelebrate();

  const start = () => {
    game.current = fresh();
    setHud({ score: 0, caught: 0, time: catchGame.duration });
    setPhase('playing');
  };

  // Keyboard controls (desktop)
  useEffect(() => {
    if (phase !== 'playing') return;
    const set = (e: KeyboardEvent, down: boolean) => {
      const s = game.current;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') s.left = down;
      else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') s.right = down;
      else return;
      if (down) s.pointerX = null;
      e.preventDefault();
    };
    const onDown = (e: KeyboardEvent) => set(e, true);
    const onUp = (e: KeyboardEvent) => set(e, false);
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, [phase]);

  // Touch / mouse controls
  const onPointer = (e: PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    game.current.pointerX = e.clientX - rect.left;
  };

  useCanvasLoop(
    canvasRef,
    (ctx, dt, { w, h }) => {
      const s = game.current;
      const bw = clamp(w * 0.24, 76, 128);
      const bh = bw * 0.5;
      const top = h - bh - 18;
      if (s.basketX < 0) s.basketX = w / 2;

      if (phase === 'playing' && !s.done && dt > 0) {
        s.elapsed += dt;
        const difficulty = Math.min(1, s.elapsed / catchGame.duration);

        // Basket
        if (s.pointerX !== null) s.basketX += (s.pointerX - s.basketX) * Math.min(1, dt * 14);
        const dir = (s.right ? 1 : 0) - (s.left ? 1 : 0);
        s.basketX = clamp(s.basketX + dir * w * 1.15 * dt, bw / 2, w - bw / 2);

        // Spawn: faster and more often as time passes
        s.spawnIn -= dt;
        if (s.spawnIn <= 0) {
          s.spawnIn = rand(0.5, 0.75) - 0.28 * difficulty;
          let roll = Math.random();
          const kind = KINDS.find((k) => (roll -= k.weight) < 0) ?? KINDS[0];
          s.hearts.push({
            x: rand(kind.size, w - kind.size),
            y: -kind.size,
            speed: h * (rand(0.3, 0.4) + 0.3 * difficulty),
            size: kind.size,
            value: kind.value,
            phase: rand(0, Math.PI * 2),
          });
        }

        // Move + catch
        for (let i = s.hearts.length - 1; i >= 0; i--) {
          const f = s.hearts[i];
          f.y += f.speed * dt;
          f.phase += dt * 2;
          const fx = f.x + Math.sin(f.phase) * 10;
          const inBasket = f.y + f.size * 0.3 >= top && f.y <= top + bh * 0.7 && Math.abs(fx - s.basketX) <= bw / 2 + 8;
          if (inBasket) {
            s.hearts.splice(i, 1);
            s.caught += 1;
            s.score += f.value;
            spawnBurst(s.particles, fx, top, 10, 170);
            s.texts.push({ x: fx, y: top - 12, text: `+${f.value}`, life: 0.8 });
            sfx.pop();
          } else if (f.y > h + f.size) {
            s.hearts.splice(i, 1);
          }
        }

        const time = Math.max(0, Math.ceil(catchGame.duration - s.elapsed));
        setHud((prev) =>
          prev.score === s.score && prev.caught === s.caught && prev.time === time
            ? prev
            : { score: s.score, caught: s.caught, time },
        );

        if (s.caught >= catchGame.target) {
          s.done = true;
          setPhase('won');
          celebrate('burst');
          sfx.chime();
          onComplete();
        } else if (s.elapsed >= catchGame.duration) {
          s.done = true;
          setPhase('timeup');
          sfx.soft();
          onComplete();
        }
      }

      // Draw
      ctx.clearRect(0, 0, w, h);
      for (const f of s.hearts) {
        const fx = f.x + Math.sin(f.phase) * 10;
        fillHeart(ctx, fx, f.y, f.size, colorOf(f.value));
        ctx.globalAlpha = 0.45;
        fillHeart(ctx, fx - f.size * 0.2, f.y - f.size * 0.16, f.size * 0.26, '#FFFFFF');
        ctx.globalAlpha = 1;
      }
      drawBasket(ctx, s.basketX, top, bw, bh);
      stepParticles(ctx, s.particles, dt);
      ctx.font = '600 18px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      for (let i = s.texts.length - 1; i >= 0; i--) {
        const t = s.texts[i];
        t.life -= dt;
        t.y -= 46 * dt;
        if (t.life <= 0) {
          s.texts.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = Math.min(1, t.life * 2);
        ctx.fillStyle = '#8B1E50';
        ctx.fillText(t.text, t.x, t.y);
        ctx.globalAlpha = 1;
      }
    },
    phase === 'playing',
  );

  return (
    <>
      <Hud
        items={[
          { label: 'Hearts', value: `${hud.caught} / ${catchGame.target}` },
          { label: 'Score', value: hud.score },
          { label: 'Time', value: `${hud.time}s` },
        ]}
      />
      <div className="relative mx-auto mb-3 min-h-0 w-[calc(100%-1.5rem)] max-w-2xl flex-1 overflow-hidden rounded-3xl border border-white/80 bg-white/35 shadow-inner">
        <canvas
          ref={canvasRef}
          aria-label="Catch the falling hearts with the basket"
          onPointerDown={onPointer}
          onPointerMove={onPointer}
          className="absolute inset-0 h-full w-full cursor-grab touch-none select-none"
        />
        {phase === 'ready' && (
          <GameOverlay
            emoji="🧺"
            title="Catch My Love"
            message={`Catch ${catchGame.target} hearts before the time runs out.`}
            detail={catchGame.how}
            actionLabel="Start ❤️"
            onAction={start}
          />
        )}
        {phase === 'won' && (
          <GameOverlay
            emoji="💖"
            title="You did it!"
            message={catchGame.winMessage}
            detail={`Score: ${hud.score}`}
            actionLabel="Play Again"
            onAction={start}
          />
        )}
        {phase === 'timeup' && (
          <GameOverlay
            emoji="💗"
            title={`${hud.caught} hearts caught`}
            message={catchGame.timeUpMessage}
            detail={`Score: ${hud.score}`}
            actionLabel="Play Again"
            onAction={start}
          />
        )}
      </div>
    </>
  );
}
