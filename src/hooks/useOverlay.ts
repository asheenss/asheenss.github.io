import { useEffect } from 'react';

let locks = 0;

/** While `open`: locks page scrolling and closes on Escape. Safe to nest. */
export function useOverlay(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    locks += 1;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      locks -= 1;
      if (locks === 0) document.body.style.overflow = '';
    };
  }, [open, onClose]);
}
