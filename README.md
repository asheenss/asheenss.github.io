# A Little Apology, My Love ❤️

A romantic, static, single-page apology site. React + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide.
No backend, no database, no paid APIs.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview
```

## Personalise it

- **Words**: edit `src/data/messages.ts`.
- **Photos**: put files in `public/images/` (`memory-1.jpg` … `memory-4.jpg`) and list them, with optional captions, in `src/data/memories.ts`. Missing photos show an elegant placeholder.
- **Music**: put your own MP3 at `public/music/our-song.mp3` (use music you have the right to use). It starts only after she taps "Open My Letter", and a play/pause button appears. If the file is missing, the button is disabled and nothing breaks.

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project to the `main` branch.
2. In the repo go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`. `.github/workflows/deploy.yml` builds with `npm run build` and deploys `dist/`.
4. Your site will be at `https://USERNAME.github.io/REPOSITORY-NAME/`.

The workflow sets `VITE_BASE=/REPOSITORY-NAME/` automatically, which `vite.config.ts` uses as `base`.
For a user site (`USERNAME.github.io` repo) or custom domain, set `VITE_BASE` to `/`.
To test a Pages-style build locally: `VITE_BASE=/REPOSITORY-NAME/ npm run build` then `npm run preview`.

## Accessibility

Respects `prefers-reduced-motion`, keyboard-operable gallery lightbox (Esc, arrow keys), labelled controls, touch targets of 48px or more.
