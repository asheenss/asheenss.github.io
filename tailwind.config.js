/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#fde8ec',
        rose: { soft: '#f4b6c2', DEFAULT: '#e08299', deep: '#c45c78' },
        ivory: '#fffaf3',
        burgundy: { DEFAULT: '#6b1f35', dark: '#4a1224' },
        gold: { DEFAULT: '#c9a66b', light: '#e6d2a8' },
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
