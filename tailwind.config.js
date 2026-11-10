/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Pink Romantic Wonderland palette. The original token names are kept so
        // every existing component picks up the new theme automatically.
        blush: '#FFE4EC',
        rose: { soft: '#FFC0CB', DEFAULT: '#FF69B4', deep: '#E75480' },
        ivory: '#FFFAFC',
        burgundy: { DEFAULT: '#8B1E50', dark: '#51213A' },
        plum: '#51213A',
        lavender: '#E6D6FF',
        champagne: '#FFF1D6',
        gold: { DEFAULT: '#D9A066', light: '#FFE3B8' },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
