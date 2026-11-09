import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// On GitHub Pages a project site lives at /REPOSITORY-NAME/.
// The deploy workflow sets VITE_BASE automatically; locally we use '/'.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
});
