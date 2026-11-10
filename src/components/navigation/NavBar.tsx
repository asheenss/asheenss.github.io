import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navItems } from '../../data/site';
import { scrollToSection } from '../../lib/scroll';
import HeartShape from '../common/HeartShape';

/** Subtle floating navigation: a pill on desktop, a small menu button on phones. */
export default function NavBar({ active }: { active: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <motion.nav
      aria-label="Sections"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="fixed inset-x-0 top-3 z-50 flex justify-end px-3 md:justify-center"
    >
      {/* Desktop pill */}
      <ul className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/70 px-2 py-1.5 shadow-lg shadow-rose/20 backdrop-blur-md md:flex">
        {navItems.map((item) => {
          const current = active === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => go(item.id)}
                aria-current={current ? 'true' : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  current ? 'bg-gradient-to-r from-rose to-rose-deep text-white shadow' : 'text-burgundy hover:bg-blush'
                }`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Mobile menu */}
      <div className="relative md:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/80 text-burgundy shadow-lg shadow-rose/25 backdrop-blur-md"
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              id="mobile-nav"
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-14 w-52 origin-top-right overflow-hidden rounded-3xl border border-white/80 bg-white/95 p-2 shadow-2xl shadow-rose/30"
            >
              {navItems.map((item) => {
                const current = active === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => go(item.id)}
                      aria-current={current ? 'true' : undefined}
                      className={`flex min-h-[48px] w-full items-center gap-3 rounded-2xl px-4 text-left font-display text-base ${
                        current ? 'bg-blush text-rose-deep' : 'text-burgundy'
                      }`}
                    >
                      <HeartShape size={12} className={current ? 'text-rose' : 'text-rose-soft'} />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
