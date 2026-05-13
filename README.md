# sebastiangarcia.net

Personal portfolio and resume site for Sebastian Garcia — software engineer based in Bogotá, Colombia.

**Live:** [sebastiangarcia.net](https://sebastiangarcia.net) · [/es/](https://sebastiangarcia.net/es/) · [/fr/](https://sebastiangarcia.net/fr/)

## Stack

- [Astro 6](https://astro.build) with TypeScript strict mode — single statically-prerendered page per locale, zero client-side JavaScript.
- [Vitest](https://vitest.dev) + Astro's experimental Container API for component-level tests with v8 coverage.
- Deployed on [Vercel](https://vercel.com) as static output. Cache and security headers in `vercel.json`.

## Commands

| Command                 | What it does                                                         |
| ----------------------- | -------------------------------------------------------------------- |
| `npm run dev`           | Astro dev server with HMR (no sitemap; build for that)               |
| `npm run build`         | Production build into `dist/` (emits `/`, `/es/`, `/fr/`, `/404`)    |
| `npm run preview`       | Serve the built `dist/` locally                                      |
| `npm run test`          | Run the Vitest suite once                                            |
| `npm run test:watch`    | Vitest in watch mode                                                 |
| `npm run test:coverage` | Run tests with v8 coverage (gates at 100%)                           |
| `npm run lint`          | ESLint on TS / Astro / JS                                            |
| `npm run lint:fix`      | ESLint with `--fix`                                                  |
| `npm run format`        | Prettier write across the repo                                       |
| `npm run format:check`  | Prettier check (CI-friendly, no writes)                              |
| `npm run build:fonts`   | Re-subset and convert TTF fonts to WOFF2 (one-off / on font updates) |

## Local development

Requires Node 20+.

```sh
npm install
npm run dev
```

The dev server runs at `http://localhost:4321`. To exercise the sitemap or the inlined production CSS, use `npm run build && npm run preview`.

## Deploy

Vercel auto-builds and deploys on push to `main`. The production output lives in `dist/`; security headers, immutable caching for `/fonts/` and `/_astro/`, and CSP are configured in `vercel.json`.

## Project structure

```
src/
├── components/   Astro section components (About, Resume, Contact, Footer, Header, Page, LanguageSelector)
├── i18n/         Locale dictionaries (en/es/fr) and helpers
├── layouts/      Layout.astro (HTML shell + meta + OG/Twitter)
├── pages/        index.astro (en), [lang]/index.astro (es, fr), 404.astro
└── styles/       global.css
public/
├── fonts/        Subsetted WOFF2 (built from TTF via scripts/subset-fonts.mjs)
├── favicons      ICO / PNG / apple-touch-icon
└── robots.txt
tests/            Vitest specs (Container API based)
```

See `CLAUDE.md` for AI-assistant conventions used in this repo.

---

© Sebastian Garcia. All rights reserved.
