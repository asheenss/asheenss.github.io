import fs from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Detect a locally supplied song at build time so a missing file never causes
// a 404 at runtime. Prefers our-song.mp3, otherwise the first audio file found.
function findMusic(): string | null {
  const dir = 'public/music';
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir).filter((f) => /\.(mp3|m4a|ogg|wav)$/i.test(f));
  return files.find((f) => f === 'our-song.mp3') ?? files[0] ?? null;
}

// A relative base means the build works under any path:
// https://USER.github.io/REPO/, a sub-folder of a user site, or a custom domain.
// The deploy workflow may still override it with VITE_BASE.
export default defineConfig({
  base: process.env.VITE_BASE ?? './',
  plugins: [react()],
  define: { __MUSIC_FILE__: JSON.stringify(findMusic()) },
});
