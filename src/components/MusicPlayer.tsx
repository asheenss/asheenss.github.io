import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import type { AudioControls } from '../hooks/useAudio';
import { sfx, useSfxEnabled } from '../lib/sfx';

/** Floating music button that expands into play/pause, status, volume and sound-effect controls. */
export default function MusicPlayer({ audio }: { audio: AudioControls }) {
  const [open, setOpen] = useState(false);
  const sfxOn = useSfxEnabled();
  const { playing, available, volume } = audio;
  const status = !available ? 'No song added yet' : playing ? 'Now playing our song' : 'Music paused';

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            id="music-panel"
            role="group"
            aria-label="Music and sound"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="w-64 origin-bottom-right rounded-3xl border border-white/80 bg-white/95 p-4 text-burgundy shadow-2xl shadow-rose/30"
          >
            <p aria-live="polite" className="font-display text-base">
              {status}
            </p>
            {!available && (
              <p className="mt-1 text-xs leading-relaxed text-burgundy/70">
                Place a song at public/music/our-song.mp3 and rebuild to enable music.
              </p>
            )}

            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={audio.toggle}
                disabled={!available}
                aria-label={playing ? 'Pause music' : 'Play music'}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose to-rose-deep text-white shadow disabled:opacity-40"
              >
                {playing ? <Pause size={18} aria-hidden /> : <Play size={18} aria-hidden />}
              </button>
              <label className="flex flex-1 flex-col gap-1 text-xs font-medium">
                Volume
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  disabled={!available}
                  onChange={(e) => audio.setVolume(Number(e.target.value))}
                  className="h-6 w-full accent-rose-deep disabled:opacity-40"
                />
              </label>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={sfxOn}
              onClick={() => {
                sfx.setEnabled(!sfxOn);
                if (!sfxOn) sfx.pop();
              }}
              className="mt-3 flex min-h-[44px] w-full items-center justify-between rounded-2xl bg-blush px-4 text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                {sfxOn ? <Volume2 size={16} aria-hidden /> : <VolumeX size={16} aria-hidden />}
                Sound effects
              </span>
              <span className={sfxOn ? 'text-rose-deep' : 'text-burgundy/50'}>{sfxOn ? 'On' : 'Off'}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="music-panel"
        aria-label="Music and sound controls"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-white/85 text-burgundy shadow-lg shadow-rose/30 backdrop-blur-md"
      >
        <Music size={18} aria-hidden className={playing ? 'animate-pulse text-rose-deep' : ''} />
      </button>
    </div>
  );
}
