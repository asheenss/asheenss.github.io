import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useCanvasLoop } from '../../hooks/useCanvasLoop';
import { fillHeart, pick, rand } from '../../lib/canvas';

interface Drifter {
  x: number;
  y: number;
  size: number;
  speed: number;
  sway: number;
  phase: number;
  alpha: number;
  color: string;
}

const COLORS = ['#FFC0CB', '#FF8FC7', '#FF69B4', '#FFE4EC', '#E6D6FF'];

/**
 * A sky full of softly rising hearts, drawn on one canvas.
 * Particle count scales with the area (capped) and the loop pauses while off-screen.
 */
export default function HeartField({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hearts = useRef<Drifter[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useCanvasLoop(
    canvasRef,
    (ctx, dt, { w, h }) => {
      const target = Math.round(Math.min(170, Math.max(50, (w * h) / 7000)));
      const list = hearts.current;
      while (list.length < target) {
        list.push({
          x: rand(0, w),
          y: rand(0, h),
          size: rand(5, 22),
          speed: rand(10, 42),
          sway: rand(6, 26),
          phase: rand(0, Math.PI * 2),
          alpha: rand(0.12, 0.6),
          color: pick(COLORS),
        });
      }
      list.length = target;

      ctx.clearRect(0, 0, w, h);
      for (const p of list) {
        p.y -= p.speed * dt;
        p.phase += dt * 0.8;
        if (p.y < -30) {
          p.y = h + 30;
          p.x = rand(0, w);
        }
        ctx.globalAlpha = p.alpha;
        fillHeart(ctx, p.x + Math.sin(p.phase) * p.sway, p.y, p.size, p.color);
      }
      ctx.globalAlpha = 1;
    },
    visible && !reduce,
  );

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
