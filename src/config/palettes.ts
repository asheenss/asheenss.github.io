export type Palette = { name: string; hero: string; hero2: string; hero3: string }

/** Accent palettes. One is picked at random on every page load (same idea as the reference site). */
export const palettes: Palette[] = [
  { name: 'Vermilion', hero: '#ff5a36', hero2: '#ff8a5b', hero3: '#ffc1a8' },
  { name: 'Emerald', hero: '#0f9d6e', hero2: '#34d399', hero3: '#a7f3d0' },
  { name: 'Indigo', hero: '#6366f1', hero2: '#818cf8', hero3: '#c7d2fe' },
  { name: 'Amber', hero: '#e8900c', hero2: '#fbbf24', hero3: '#fde68a' },
  { name: 'Magenta', hero: '#d6249f', hero2: '#e879f9', hero3: '#f5d0fe' },
  { name: 'Sky', hero: '#0ea5e9', hero2: '#38bdf8', hero3: '#bae6fd' },
]

export function applyPalette(p: Palette): void {
  const s = document.documentElement.style
  s.setProperty('--hero', p.hero)
  s.setProperty('--hero-2', p.hero2)
  s.setProperty('--hero-3', p.hero3)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', p.hero)
  document.documentElement.dataset.palette = p.name
}

export function applyRandomPalette(): void {
  applyPalette(palettes[Math.floor(Math.random() * palettes.length)])
}

/** Switch to a random palette different from the current one (fired on every click). */
export function shufflePalette(): void {
  const current = document.documentElement.dataset.palette
  const options = palettes.filter((p) => p.name !== current)
  applyPalette(options[Math.floor(Math.random() * options.length)])
}
