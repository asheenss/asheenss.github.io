import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Backdrop from './components/animations/Backdrop';
import { useCelebrate } from './components/animations/Celebration';
import HeartShape from './components/common/HeartShape';
import MusicPlayer from './components/MusicPlayer';
import NavBar from './components/navigation/NavBar';
import { navItems } from './data/site';
import { useActiveSection } from './hooks/useActiveSection';
import { useAudio } from './hooks/useAudio';
import { scrollToSection } from './lib/scroll';
import { sfx } from './lib/sfx';
import Apology from './sections/Apology';
import FinalMessage from './sections/FinalMessage';
import Games from './sections/Games';
import Landing from './sections/Landing';
import Memories from './sections/Memories';
import Moments from './sections/Moments';
import Opening from './sections/Opening';
import PromiseSection from './sections/Promise';
import Reminder from './sections/Reminder';
import Special from './sections/Special';
import Story from './sections/Story';

const NAV_IDS = navItems.map((n) => n.id);

/** A link such as …/#games skips the welcome screen and goes straight to that section. */
const deepLink = () => {
  const id = window.location.hash.slice(1);
  return id && id !== 'home' ? id : null;
};

export default function App() {
  const reduce = useReducedMotion();
  const audio = useAudio();
  const celebrate = useCelebrate();
  const [entered, setEntered] = useState(() => deepLink() !== null);
  const [veil, setVeil] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const active = useActiveSection(NAV_IDS, entered);
  const timers = useRef<number[]>([]);

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  // Direct link / refresh on a section: scroll there once everything is mounted.
  useEffect(() => {
    const id = deepLink();
    if (id) requestAnimationFrame(() => scrollToSection(id, true));
  }, []);

  const enter = () => {
    if (entered) {
      scrollToSection('letter');
      return;
    }
    void audio.play(); // inside the click: satisfies browser autoplay rules
    sfx.chime();
    celebrate('rain');
    if (reduce) {
      setEntered(true);
      later(() => scrollToSection('letter', true), 50);
      return;
    }
    setVeil(true);
    later(() => {
      setEntered(true);
      later(() => {
        scrollToSection('letter', true);
        setVeil(false);
      }, 500);
    }, 900);
  };

  const onLetterOpened = () => {
    setLetterOpen(true);
    // wait a frame so the letter is mounted before scrolling to it
    requestAnimationFrame(() => scrollToSection('apology'));
  };

  return (
    <>
      <Backdrop />
      {entered && <NavBar active={active} />}

      <main className="relative z-10">
        <Landing entered={entered} onEnter={enter} />
        {entered && (
          <>
            <Opening onOpenClick={() => sfx.soft()} onOpened={onLetterOpened} />
            {letterOpen && <Apology />}
            <Special />
            <Reminder />
            <Story />
            <Games />
            <Moments />
            <Memories />
            <PromiseSection />
            <FinalMessage />
          </>
        )}
      </main>

      {entered && <MusicPlayer audio={audio} />}

      {/* Entrance transition: a soft pink veil that lifts to reveal the world */}
      <AnimatePresence>
        {veil && (
          <motion.div
            aria-hidden
            className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-4"
            style={{ background: 'radial-gradient(circle at 50% 45%, #FFE4EC 0%, #FFC0CB 45%, #FF69B4 100%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <HeartShape size={96} className="animate-heartbeat text-white" style={{ filter: 'drop-shadow(0 0 24px rgba(255,255,255,.9))' }} />
            <p className="font-script text-4xl text-white">Just for you...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
