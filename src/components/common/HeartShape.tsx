import type { CSSProperties } from 'react';

/** The single heart outline used across the site (24x24 viewBox). */
export const HEART_D =
  'M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.5 6.4 4.5c2 0 3.6 1.1 4.6 2.7h2c1-1.6 2.6-2.7 4.6-2.7 3.7 0 5.5 3.9 4 7.3C19.5 16.4 12 21 12 21z';

interface Props {
  size?: number;
  fill?: string;
  className?: string;
  style?: CSSProperties;
}

export default function HeartShape({ size = 24, fill = 'currentColor', className, style }: Props) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" width={size} height={size} fill={fill} className={className} style={style}>
      <path d={HEART_D} />
    </svg>
  );
}
