# Asheen Shams — Portfolio

A premium, dark-themed portfolio for a Senior Full Stack Developer, built with React, TypeScript, Vite, Tailwind CSS and Framer Motion.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build
npm run preview   # preview the production build
npm run lint      # oxlint
```

## Before deploying

1. **Contact details** — `src/config/site.ts` → `siteContact`. Fill in the real `email`, `linkedinUrl` and `githubUrl` (currently empty/null placeholders; the UI hides any field left unset).
2. **Résumé** — replace `public/resume.pdf` with the real CV (same filename, or update `siteContact.resumeUrl`).
3. **Domain** — replace the placeholder `https://www.asheenshams.com/` in `index.html` (canonical, Open Graph, Twitter, JSON-LD) and `public/{robots.txt,sitemap.xml}` with the live domain.
4. **OG image** — `public/og-image.svg` is a placeholder; swap in a real 1200×630 PNG/JPG, since some platforms (LinkedIn, Facebook) don't reliably render SVG `og:image`.
5. Run a Lighthouse audit before launch (`npm run build && npm run preview`, then audit `localhost:4173`).

## Editing content

All copy and structured content lives under `src/data/` and `src/config/` — no component code needs to change to update journey stages, projects, expertise areas, technologies, or AI capabilities.

| File | Controls |
|---|---|
| `src/config/site.ts` | Name, role, hero copy, contact details, hero stats |
| `src/config/navigation.ts` | Nav bar items |
| `src/data/journey.ts` | Career timeline |
| `src/data/expertise.ts` | Service/expertise cards |
| `src/data/projects.ts` | Selected projects |
| `src/data/ai.ts` | AI capabilities + technologies |
| `src/data/exploring.ts` | "Currently exploring" chips |
| `src/data/technologies.ts` | Tech stack ticker |

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion · lucide-react
