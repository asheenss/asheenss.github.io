import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'rose' | 'light';
  disabled?: boolean;
}

export default function RomanticButton({ children, onClick, variant = 'rose', disabled }: Props) {
  const reduce = useReducedMotion();
  const styles =
    variant === 'rose'
      ? 'bg-gradient-to-r from-rose-deep to-burgundy text-ivory shadow-lg shadow-rose/40'
      : 'bg-ivory text-burgundy shadow-lg shadow-black/20';
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={reduce ? undefined : { scale: 1.04 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      className={`min-h-[52px] rounded-full px-8 py-3 font-display text-base tracking-wide sm:text-lg ${styles} disabled:opacity-60`}
    >
      {children}
    </motion.button>
  );
}
