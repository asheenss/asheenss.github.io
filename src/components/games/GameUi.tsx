import { motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useOverlay } from '../../hooks/useOverlay';
import RomanticButton from '../RomanticButton';

/** Props every game receives. */
export interface GameProps {
  /** Called once each time the game is completed. */
  onComplete: () => void;
}

interface ShellProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

/** Full-screen stage that hosts one game. Unmounting it tears the game down completely. */
export function GameShell({ title, onClose, children }: ShellProps) {
  const reduce = useReducedMotion();
  useOverlay(true, onClose);
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="bg-game fixed inset-0 z-[60] flex flex-col"
      style={{ height: '100dvh' }}
      initial={reduce ? false : { opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <header className="flex shrink-0 items-center justify-between gap-3 px-4 pb-2 pt-3">
        <h3 className="font-script text-3xl leading-none text-rose-deep sm:text-4xl">{title}</h3>
        <button
          type="button"
          autoFocus
          onClick={onClose}
          aria-label="Close game"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/80 text-burgundy shadow"
        >
          <X size={20} aria-hidden />
        </button>
      </header>
      <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
    </motion.div>
  );
}

/** Row of small score pills. */
export function Hud({ items }: { items: { label: string; value: string | number }[] }) {
  return (
    <dl className="flex shrink-0 flex-wrap items-center justify-center gap-2 px-3 pb-2">
      {items.map((it) => (
        <div
          key={it.label}
          className="flex items-baseline gap-1.5 rounded-full border border-white/80 bg-white/75 px-3.5 py-1.5 text-burgundy shadow-sm"
        >
          <dt className="text-[11px] font-medium uppercase tracking-wider text-burgundy/70">{it.label}</dt>
          <dd className="font-display text-lg leading-none tabular-nums">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}

interface OverlayProps {
  emoji?: string;
  title: string;
  message: string;
  detail?: string;
  actionLabel: string;
  onAction: () => void;
}

/** Start / result card laid over the play area. */
export function GameOverlay({ emoji, title, message, detail, actionLabel, onAction }: OverlayProps) {
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/45 p-5 backdrop-blur-[3px]">
      <motion.div
        initial={reduce ? false : { scale: 0.85, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="card-soft w-full max-w-sm rounded-3xl px-6 py-8 text-center"
      >
        {emoji && (
          <div aria-hidden className="mb-2 text-5xl">
            {emoji}
          </div>
        )}
        <h4 className="font-script text-4xl text-rose-deep">{title}</h4>
        <p aria-live="polite" className="mt-3 font-display text-lg leading-relaxed text-burgundy">
          {message}
        </p>
        {detail && <p className="mt-2 text-sm text-burgundy/70">{detail}</p>}
        <div className="mt-6">
          <RomanticButton onClick={onAction}>{actionLabel}</RomanticButton>
        </div>
      </motion.div>
    </div>
  );
}
