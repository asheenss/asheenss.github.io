import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useOverlay } from '../../hooks/useOverlay';

interface Props {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label: string;
  children: ReactNode;
}

/** Centered romantic dialog. Closes on Escape, backdrop tap, or the close button. */
export default function Modal({ open, onClose, label, children }: Props) {
  const reduce = useReducedMotion();
  useOverlay(open, onClose);
  // Portaled to <body> so it always sits above the page, whatever its ancestors do.
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-plum/75 p-5 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={reduce ? false : { scale: 0.85, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={reduce ? undefined : { scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="paper relative max-h-[85svh] w-full max-w-md overflow-y-auto rounded-3xl border border-rose-soft px-6 pb-8 pt-12 text-center shadow-2xl shadow-plum/40 sm:px-10"
          >
            <button
              type="button"
              autoFocus
              aria-label="Close"
              onClick={onClose}
              className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-burgundy/70 transition-colors hover:bg-blush"
            >
              <X size={20} aria-hidden />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
