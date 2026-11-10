/** Small canvas toolkit shared by the games and the particle effects. */

export const PINKS = ['#FF69B4', '#FFC0CB', '#E75480', '#FF8FC7', '#E6D6FF', '#FFFFFF'];

export const rand = (min: number, max: number) => min + Math.random() * (max - min);
export const pick = <T,>(items: readonly T[]): T => items[Math.floor(Math.random() * items.length)];
export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Traces a heart centred on (x, y) that is roughly `size` wide. */
export function heartPath(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const s = size / 2;
  ctx.beginPath();
  ctx.moveTo(x, y + s);
  ctx.bezierCurveTo(x - s * 1.85, y - s * 0.1, x - s * 0.95, y - s * 1.6, x, y - s * 0.5);
  ctx.bezierCurveTo(x + s * 0.95, y - s * 1.6, x + s * 1.85, y - s * 0.1, x, y + s);
  ctx.closePath();
}

export function fillHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) {
  heartPath(ctx, x, y, size);
  ctx.fillStyle = color;
  ctx.fill();
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  life: number;
  max: number;
  color: string;
  gravity: number;
  /** Seconds to wait before the particle appears. */
  delay: number;
}

/** Adds a radial burst of little hearts at (x, y). */
export function spawnBurst(list: Particle[], x: number, y: number, count: number, power = 220, colors = PINKS) {
  for (let i = 0; i < count; i++) {
    const angle = rand(0, Math.PI * 2);
    const speed = rand(power * 0.35, power);
    const life = rand(0.5, 0.95);
    list.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - power * 0.3,
      size: rand(6, 13),
      rot: rand(-0.6, 0.6),
      vr: rand(-3, 3),
      life,
      max: life,
      color: pick(colors),
      gravity: power * 2.2,
      delay: 0,
    });
  }
}

/** Advances and draws particles, removing the ones that have faded out. */
export function stepParticles(ctx: CanvasRenderingContext2D, list: Particle[], dt: number) {
  for (let i = list.length - 1; i >= 0; i--) {
    const p = list[i];
    if (p.delay > 0) {
      p.delay -= dt;
      continue;
    }
    p.life -= dt;
    if (p.life <= 0) {
      list.splice(i, 1);
      continue;
    }
    p.vy += p.gravity * dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.rot += p.vr * dt;
    ctx.save();
    ctx.globalAlpha = Math.min(1, p.life / (p.max * 0.4));
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    fillHeart(ctx, 0, 0, p.size, p.color);
    ctx.restore();
  }
}
