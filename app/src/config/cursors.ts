export type SwarmCursor = {
  label: string
  /** Pointer + label colour. `ink` uses the theme text colour (white on dark, near-black on light). */
  color: string
  /** Offset from the real pointer, in px. */
  dx: number
  dy: number
  /** 0–1, higher = tighter follow. */
  ease: number
}

// First entry is the "lead" cursor and sits closest to the real pointer.
export const swarmCursors: SwarmCursor[] = [
  { label: 'Asheen', color: 'ink', dx: 6, dy: 4, ease: 0.34 },
  { label: '.NET', color: '#5b8f3a', dx: -96, dy: -74, ease: 0.16 },
  { label: 'React', color: '#4f5fd6', dx: 118, dy: 52, ease: 0.12 },
  { label: 'Python', color: '#5b9bd5', dx: 86, dy: -88, ease: 0.09 },
  { label: 'Azure', color: '#d4572a', dx: -120, dy: 70, ease: 0.07 },
]
