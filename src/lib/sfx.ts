/**
 * Tiny synthesised sound effects (Web Audio). No audio files are needed, and
 * nothing plays until the first user interaction. Fails silently if the
 * browser has no Web Audio support.
 */
import { useSyncExternalStore } from 'react';

const KEY = 'love-world-sfx';
let ctx: AudioContext | null = null;
let enabled = true;
try {
  enabled = localStorage.getItem(KEY) !== 'off';
} catch {
  /* storage unavailable: keep default */
}
const listeners = new Set<() => void>();

function audio(): AudioContext | null {
  if (!enabled) return null;
  try {
    if (!ctx) {
      const Ctor =
        window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, endFreq: number, start: number, dur: number, gain = 0.07, type: OscillatorType = 'sine') {
  const ac = audio();
  if (!ac) return;
  const t = ac.currentTime + start;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  osc.frequency.exponentialRampToValueAtTime(endFreq, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(ac.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

export const sfx = {
  /** Soft bubble pop. */
  pop() {
    tone(420, 900, 0, 0.11, 0.08);
  },
  /** Gentle single note for small interactions. */
  soft() {
    tone(660, 660, 0, 0.25, 0.05);
  },
  /** Rising chime for celebrations. */
  chime() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, f, i * 0.11, 0.5, 0.06, 'triangle'));
  },
  setEnabled(on: boolean) {
    enabled = on;
    try {
      localStorage.setItem(KEY, on ? 'on' : 'off');
    } catch {
      /* ignore */
    }
    listeners.forEach((l) => l());
  },
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

export function useSfxEnabled(): boolean {
  return useSyncExternalStore(subscribe, () => enabled);
}
