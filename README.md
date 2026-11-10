# A Little Apology, My Love ❤️

A romantic, interactive, single-page experience: a welcome screen, the apology letter, our story,
five mini-games, love notes, a photo gallery, promises and a cinematic finale.

React + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide.
Fully static: no backend, no database, no paid services.

## Run locally

```bash
npm install
npm run dev          # http://localhost:5173
npm run typecheck    # strict TypeScript check
npm run build        # type-check + production build into dist/
npm run preview      # serve dist/ locally
```

## Make it yours

Everything she reads lives in `src/data/`. No component needs to be touched.

| What | Where |
| --- | --- |
| Welcome text, apology letter, love notes (12 envelopes), "how much I love you" lines, surprise, promises, finale | `src/data/messages.ts` |
| **Our Story timeline** (date, title, description, optional photo + caption) | `src/data/story.ts` |
| Game text, the three "Unlock My Love Letter" questions and replies, garden messages, timers and targets | `src/data/games.ts` |
| Gallery photos and captions | `src/data/memories.ts` |
| Navigation labels | `src/data/site.ts` |

**Before you share it:** the Our Story timeline ships with placeholder text
("This page is waiting for…"). Replace it with your real dates and memories in `src/data/story.ts`.

- **Photos**: put files in `public/images/` and list them in `src/data/memories.ts`
  (and optionally reference one from a story entry). A missing photo becomes an elegant placeholder.
- **Music**: put a song you have the right to use at `public/music/our-song.mp3`, then rebuild.
  The file is detected at build time; it starts only after she taps "Enter My Love World",
  and the music button (bottom right) offers play/pause, status and volume.
  With no file, the player says so and nothing breaks.
- **Sound effects** (heart pops, completion chimes) are synthesised in the browser, need no files,
  and can be switched off from the music button.

## Deploy to GitHub Pages

The build uses a **relative base path**, so the same files work at
`https://USERNAME.github.io/REPOSITORY/`, inside a sub-folder of a user site, or on a custom domain.
Navigation uses in-page `#section` links only, so refreshing or sharing a link such as
`…/a-little-apology/#games` never returns a 404.

### Option A: the committed build folder (how this branch is served)

```bash
npm run build:pages   # type-check, then build into a-little-apology/
git add -A && git commit -m "Update site" && git push
```

GitHub Pages serves the committed `a-little-apology/` folder. The root `.nojekyll` file must stay.

### Option B: GitHub Actions

`.github/workflows/deploy.yml` (manual trigger: **Actions → Deploy to GitHub Pages → Run workflow**)
builds with `npm run build` and deploys `dist/`. It needs
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

### Check a Pages-style build locally

```bash
npm run build:pages
npx serve .            # then open http://localhost:3000/a-little-apology/
```

## Project structure

```
src/
  data/         all words and settings (typed)
  sections/     Landing, Opening (envelope), Apology, Special, Reminder, Story, Games,
                Moments, Memories, Promise, FinalMessage
  components/
    animations/ Backdrop (clouds, petals, glitter), Celebration (shared particle canvas),
                HeartField, Rose
    games/      CatchHearts, MemoryMatch, UnlockLetter, PopHearts, LoveGarden, GameUi
    navigation/ NavBar
    common/     Modal, SectionHeading, HeartShape
  hooks/        useAudio, useCanvasLoop (game loop), useOverlay, useActiveSection, useReveal
  lib/          canvas helpers + particles, sound effects, scrolling
```

Each game is a separate lazy-loaded chunk, so the first page load stays light.

## Accessibility and performance

- Respects `prefers-reduced-motion` (petals, particles and long transitions are switched off).
- Everything works by touch; nothing depends on hover. Touch targets are 44px or larger.
- Dialogs close with Escape; the gallery lightbox supports arrow keys.
- Particle-heavy effects are drawn on canvas, pause when off-screen and clean up on unmount.
