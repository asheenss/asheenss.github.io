/** Delicate line-art flowers used as quiet decoration. */
export function Flower({ className = '', size = 90 }: { className?: string; size?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1">
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse key={i} cx="50" cy="28" rx="10" ry="22" transform={`rotate(${i * 60} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="5" />
    </svg>
  );
}

export function Sprig({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 40" width="120" height="40" className={className} fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
      <path d="M4 20 C30 6, 60 34, 116 20" />
      <path d="M30 14 q-4 -9 -12 -8 q1 8 12 8z M56 24 q-2 9 -11 10 q-1 -8 11 -10z M84 20 q4 -9 12 -8 q-1 8 -12 8z" />
    </svg>
  );
}
