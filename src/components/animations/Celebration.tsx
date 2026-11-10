import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react';
import { PINKS, pick, rand, stepParticles, type Particle } from '../../lib/canvas';

export type CelebrationKind = 'burst' | 'rain';

const CelebrationContext = createContext<(kind?: CelebrationKind) => void>(() => {});

/** Returns a function that plays a full-screen heart celebration. */
export const useCelebrate = () => useContext(CelebrationContext);

/**
 * One shared full-screen canvas for every celebration on the site.
 * The animation loop only runs while particles are alive, then stops itself.
 */
export function CelebrationProvider({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const raf = useRef(0);

  useEffect(
    () => () => {
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    },
    [],
  );

  const celebrate = useCallback((kind: CelebrationKind = 'burst') => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const list = particles.current;
    const small = w < 640;
    if (kind === 'burst') {
      const n = small ? 60 : 110;
      for (let i = 0; i < n; i++) {
        const fromLeft = i % 2 === 0;
        const life = rand(1.6, 2.6);
        list.push({
          x: fromLeft ? -10 : w + 10,
          y: h * rand(0.55, 0.95),
          vx: (fromLeft ? 1 : -1) * rand(w * 0.25, w * 0.75),
          vy: -rand(h * 0.55, h * 1.15),
          size: rand(10, 26),
          rot: rand(-0.5, 0.5),
          vr: rand(-2.5, 2.5),
          life,
          max: life,
          color: pick(PINKS),
          gravity: h * 0.95,
          delay: rand(0, 0.35),
        });
      }
    } else {
      const n = small ? 55 : 100;
      for (let i = 0; i < n; i++) {
        const life = rand(2.6, 4.2);
        list.push({
          x: rand(0, w),
          y: h + rand(20, 80),
          vx: rand(-30, 30),
          vy: -rand(h * 0.32, h * 0.6),
          size: rand(12, 34),
          rot: rand(-0.4, 0.4),
          vr: rand(-1, 1),
          life,
          max: life,
          color: pick(PINKS),
          gravity: -12,
          delay: rand(0, 1.3),
        });
      }
    }

    if (raf.current) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      stepParticles(ctx, list, dt);
      raf.current = list.length ? requestAnimationFrame(tick) : 0;
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  return (
    <CelebrationContext.Provider value={celebrate}>
      {children}
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[90] h-full w-full" />
    </CelebrationContext.Provider>
  );
}
