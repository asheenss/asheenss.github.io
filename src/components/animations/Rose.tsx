import type { CSSProperties } from 'react';

interface Props {
  className?: string;
  size?: number;
  /** Seconds; offsets the sway so neighbouring roses do not move in unison. */
  delay?: number;
}

/** A stylised long-stemmed rose that sways gently from its base. */
export default function Rose({ className = '', size = 120, delay = 0 }: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 80 160"
      width={size * 0.5}
      height={size}
      className={`animate-sway overflow-visible ${className}`}
      style={{ '--delay': `${delay}s` } as CSSProperties}
    >
      <path d="M40 160 C36 120 46 92 40 52" stroke="#5E8F6A" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M40 118 C24 116 14 102 14 92 C28 92 39 104 40 118Z" fill="#7FB58A" />
      <path d="M41 96 C56 94 66 82 66 72 C53 73 42 83 41 96Z" fill="#6FA87B" />
      <g transform="translate(40 34)">
        <path d="M-24 2 C-26 -18 -8 -30 0 -14 C8 -30 26 -18 24 2 C22 20 10 28 0 28 C-10 28 -22 20 -24 2Z" fill="#E75480" />
        <path d="M-17 0 C-17 -14 -5 -20 0 -9 C5 -20 17 -14 17 0 C17 13 8 20 0 20 C-8 20 -17 13 -17 0Z" fill="#FF69B4" />
        <path d="M-10 1 C-10 -8 -3 -11 0 -5 C3 -11 10 -8 10 1 C10 9 5 13 0 13 C-5 13 -10 9 -10 1Z" fill="#FF9CC9" />
        <path d="M-4 0 C-4 -6 5 -6 5 0 C5 5 -2 6 -2 1" stroke="#8B1E50" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".6" />
      </g>
    </svg>
  );
}
