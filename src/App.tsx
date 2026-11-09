import { useState } from 'react';
import Opening from './sections/Opening';
import Apology from './sections/Apology';
import Special from './sections/Special';
import Reminder from './sections/Reminder';
import Memories from './sections/Memories';
import PromiseSection from './sections/Promise';
import FinalMessage from './sections/FinalMessage';
import MusicPlayer from './components/MusicPlayer';
import { useAudio } from './hooks/useAudio';

export default function App() {
  const [opened, setOpened] = useState(false);
  const audio = useAudio();

  const onOpened = () => {
    setOpened(true);
    // wait a frame so the next section is mounted before scrolling to it
    requestAnimationFrame(() =>
      document.getElementById('apology')?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      }),
    );
  };

  return (
    <main>
      <Opening onOpenClick={() => void audio.play()} onOpened={onOpened} />
      {opened && (
        <>
          <Apology />
          <Special />
          <Reminder />
          <Memories />
          <PromiseSection />
          <FinalMessage />
          <MusicPlayer playing={audio.playing} available={audio.available} onToggle={audio.toggle} />
        </>
      )}
    </main>
  );
}
