import { useEffect, useRef, type RefObject } from 'react';

export interface CanvasSize {
  w: number;
  h: number;
}

export type FrameFn = (ctx: CanvasRenderingContext2D, dt: number, size: CanvasSize) => void;

/**
 * Drives a canvas with requestAnimationFrame.
 * - Keeps the backing store crisp on high-DPI screens (capped at 2x for mobile performance).
 * - `frame` always receives CSS-pixel coordinates and a clamped delta time in seconds.
 * - While `running` is false a single frame is drawn (and redrawn on resize) so the scene stays visible.
 * - Everything is cleaned up on unmount.
 */
export function useCanvasLoop(ref: RefObject<HTMLCanvasElement | null>, frame: FrameFn, running: boolean) {
  const frameRef = useRef(frame);
  useEffect(() => {
    frameRef.current = frame;
  });

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const size: CanvasSize = { w: 0, h: 0 };
    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size.w = canvas.clientWidth;
      size.h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(size.w * dpr));
      canvas.height = Math.max(1, Math.round(size.h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    const ro = new ResizeObserver(() => {
      fit();
      if (!running) frameRef.current(ctx, 0, size);
    });
    ro.observe(canvas);

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      frameRef.current(ctx, running ? dt : 0, size);
      if (running) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [ref, running]);
}
