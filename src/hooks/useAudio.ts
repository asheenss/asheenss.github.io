import { useCallback, useEffect, useRef, useState } from 'react';

export const MUSIC_SRC = `${import.meta.env.BASE_URL}music/our-song.mp3`;

export function useAudio() {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const a = new Audio();
    a.loop = true;
    a.volume = 0.5;
    a.preload = 'none';
    a.src = MUSIC_SRC;
    a.addEventListener('error', () => { setAvailable(false); setPlaying(false); });
    a.addEventListener('play', () => setPlaying(true));
    a.addEventListener('pause', () => setPlaying(false));
    ref.current = a;
    return () => { a.pause(); a.src = ''; };
  }, []);

  const play = useCallback(async () => {
    try { await ref.current?.play(); } catch { setAvailable(false); }
  }, []);
  const toggle = useCallback(() => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) void play(); else a.pause();
  }, [play]);

  return { playing, available, play, toggle };
}
