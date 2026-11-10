import { useMemo, type CSSProperties } from 'react';
import { rand } from '../../lib/canvas';

type Vars = CSSProperties & Record<`--${string}`, string>;

const CLOUDS: { style: Vars }[] = [
  { style: { left: '-18%', top: '-8%', width: '70vmax', height: '46vmax', background: 'radial-gradient(closest-side, rgba(255,255,255,.9), rgba(255,255,255,0))', '--d': '34s' } },
  { style: { right: '-22%', top: '22%', width: '64vmax', height: '44vmax', background: 'radial-gradient(closest-side, rgba(255,192,203,.75), rgba(255,192,203,0))', '--d': '42s' } },
  { style: { left: '-12%', bottom: '-14%', width: '66vmax', height: '48vmax', background: 'radial-gradient(closest-side, rgba(230,214,255,.8), rgba(230,214,255,0))', '--d': '38s' } },
  { style: { right: '-10%', bottom: '4%', width: '46vmax', height: '32vmax', background: 'radial-gradient(closest-side, rgba(255,241,214,.85), rgba(255,241,214,0))', '--d': '30s' } },
];

/**
 * Fixed, non-interactive background for the whole site: a soft gradient,
 * drifting pink clouds, twinkling glitter and falling petals.
 * Everything animates with transform/opacity only, so it stays cheap on phones.
 */
export default function Backdrop() {
  const { petals, glitter } = useMemo(() => {
    const small = window.innerWidth < 640;
    return {
      petals: Array.from({ length: small ? 9 : 14 }, (_, i) => {
        const d = rand(13, 24);
        return {
          id: i,
          style: {
            left: `${rand(0, 98)}%`,
            '--s': `${rand(11, 20)}px`,
            '--d': `${d}s`,
            '--delay': `${-rand(0, d)}s`,
            '--drift': `${rand(-90, 90)}px`,
          } as Vars,
        };
      }),
      glitter: Array.from({ length: small ? 14 : 24 }, (_, i) => {
        const size = rand(2, 4.5);
        return {
          id: i,
          style: {
            left: `${rand(2, 98)}%`,
            top: `${rand(2, 98)}%`,
            width: size,
            height: size,
            '--d': `${rand(3, 7)}s`,
            '--delay': `${-rand(0, 7)}s`,
          } as Vars,
        };
      }),
    };
  }, []);

  return (
    <div aria-hidden className="backdrop pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {CLOUDS.map((c, i) => (
        <span key={i} className="cloud" style={c.style} />
      ))}
      {glitter.map((g) => (
        <span key={g.id} className="glitter" style={g.style} />
      ))}
      {petals.map((p) => (
        <span key={p.id} className="petal" style={p.style} />
      ))}
    </div>
  );
}
