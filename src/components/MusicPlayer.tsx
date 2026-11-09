import { Music, Pause, Play } from 'lucide-react';

interface Props {
  playing: boolean;
  available: boolean;
  onToggle: () => void;
}

export default function MusicPlayer({ playing, available, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={!available}
      aria-label={!available ? 'Music unavailable' : playing ? 'Pause music' : 'Play music'}
      title={!available ? 'Add public/music/our-song.mp3 to enable music' : undefined}
      className="fixed bottom-4 right-4 z-50 flex h-12 min-w-12 items-center justify-center gap-2 rounded-full border border-gold-light bg-ivory/90 px-4 text-burgundy shadow-lg backdrop-blur disabled:opacity-50"
    >
      {playing ? <Pause size={18} aria-hidden /> : <Play size={18} aria-hidden />}
      <Music size={16} aria-hidden className={playing ? 'animate-pulse' : ''} />
    </button>
  );
}
