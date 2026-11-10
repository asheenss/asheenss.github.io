import { useCallback, useEffect, useRef, useState } from 'react';

/** Resolved against the Vite base so it works under any GitHub Pages path. Null when no song is supplied. */
export const MUSIC_SRC = __MUSIC_FILE__
  ? `${import.meta.env.BASE_URL}music/${encodeURIComponent(__MUSIC_FILE__)}`
  : null;

export interface AudioControls {
  playing: boolean;
  /** False when no song was supplied or it failed to load. */
  available: boolean;
  volume: number;
  /** Must be called from a user gesture the first time. */
  play: () => Promise<void>;
  toggle: () => void;
  setVolume: (v: number) => void;
}

export function useAudio(): AudioControls {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(MUSIC_SRC !== null);
  const [volume, setVolumeState] = useState(0.5);

  useEffect(() => {
    if (!MUSIC_SRC) return;
    const a = new Audio();
    a.loop = true;
    a.volume = 0.5;
    a.preload = 'none';
    a.src = MUSIC_SRC;
    const onError = () => {
      setAvailable(false);
      setPlaying(false);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    a.addEventListener('error', onError);
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    ref.current = a;
    return () => {
      a.removeEventListener('error', onError);
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
      a.pause();
      a.removeAttribute('src');
      ref.current = null;
    };
  }, []);

  const play = useCallback(async () => {
    const a = ref.current;
    if (!a) return;
    try {
      await a.play();
    } catch (err) {
      // Autoplay refusals are recoverable (she can press play); anything else means the file is unusable.
      if (!(err instanceof DOMException && err.name === 'NotAllowedError')) setAvailable(false);
    }
  }, []);

  const toggle = useCallback(() => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) void play();
    else a.pause();
  }, [play]);

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    if (ref.current) ref.current.volume = clamped;
  }, []);

  return { playing, available, volume, play, toggle, setVolume };
}
