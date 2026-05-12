# CLAUDE.md

Guidance for AI assistants working in this repository.

## Project overview

Personal resume / portfolio site for Sebastian Garcia. Single-page static site
built with **Astro `^6.3.1`** in **TypeScript strict mode**. Astro is the only
runtime dependency — no UI framework, no CMS, no backend.

## Commands

Run from the repo root after `npm install`:

| Command           | What it does                       |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Astro dev server with HMR          |
| `npm run build`   | Production build into `dist/`      |
| `npm run preview` | Serve the built `dist/` locally    |
| `npm run astro`   | Astro CLI passthrough              |

There are **no** `test`, `lint`, `format`, or `typecheck` scripts configured.
Type errors surface during `astro build` via the Astro/TS toolchain.

## Repository layout

```
.
├── astro.config.mjs          # empty defineConfig({}) — intentionally minimal
├── tsconfig.json             # extends "astro/tsconfigs/strict"
├── package.json              # scripts + single dep (astro)
├── public/                   # served as-is: favicons, site.webmanifest, fonts
└── src/
    ├── pages/
    │   └── index.astro       # the only route — composition root
    ├── layouts/
    │   └── Layout.astro      # <html>/<head> shell with a <slot />
    ├── components/
    │   ├── Header.astro      # nav (anchor links to #about / #resume / #contact)
    │   ├── About.astro
    │   ├── Resume.astro      # education + skills + experience
    │   ├── Contact.astro
    │   └── Footer.astro
    ├── styles/
    │   └── global.css        # single global stylesheet
    └── assets/photos/        # images imported by components (optimized by Astro)
```

`dist/`, `.astro/`, `node_modules/`, `.env*`, `.vscode/`, `.idea/` are
gitignored. `.astro/types.d.ts` is generated — do not edit by hand.

## How a page is composed

`src/pages/index.astro` is the **only route**. It imports
`src/styles/global.css`, the `Layout`, and each section component, then renders:

```
<Layout>
  <Header />
  <main>
    <About /> <Resume /> <Contact />
  </main>
  <Footer />
</Layout>
```

To add a new section: create `src/components/NewSection.astro`, import it in
`index.astro`, and place it inside `<main>`. If it should be reachable from the
nav, add an entry to the `links` array in `Header.astro` and set the matching
`id` on the section's root element.

## Component conventions

- **Frontmatter**: the `---` fence at the top holds TS/JS (imports, data); the
  template markup follows. See `src/components/Resume.astro` for the canonical
  shape.
- **Static content as in-frontmatter arrays**: education, experience, and nav
  links are plain JS arrays declared at the top of the component and rendered
  with `.map(...)`. Keep this pattern — do not introduce JSON files, MDX, or a
  CMS to hold what is already a few dozen lines of data.
- **Images**: import from `src/assets/photos/` and render with `<Image />` from
  `astro:assets`. Always pass `alt`, explicit `width`/`height`, `loading="lazy"`,
  and `decoding="async"` (matches `Resume.astro`).
- **Anchor targets**: section IDs (`#about`, `#resume`, `#contact`) live on
  elements inside the section components, not on `<main>`.

## Styling

One stylesheet: `src/styles/global.css`, imported once by `index.astro`.
Components themselves do not use scoped `<style>` blocks — add new rules to
`global.css`. Class names follow a `block__element__modifier` underscore-pair
convention (e.g. `resume__txt__subtitle`, `header__nav__list`,
`resume__skills__1`). Stay consistent with this when adding markup.

## TypeScript

Strict mode via `astro/tsconfigs/strict`. `tsconfig.json` includes
`.astro/types.d.ts` (generated) and excludes `dist`. Prefer letting types be
inferred from the in-frontmatter data arrays rather than declaring interfaces
for one-off content shapes.

## Things that do not exist here — do not invent them

- No test runner, no test files. Don't add Vitest/Jest scaffolding unless asked.
- No ESLint, Prettier, or Stylelint config.
- No CI workflows (`.github/workflows/` is absent).
- No environment variables; `.env*` is gitignored but unused.
- No server endpoints, no `src/pages/api/`, no SSR adapter.
- No Tailwind, no UI component library.

If a task seems to require any of the above, surface that and ask before
adding it.

## Git workflow

Active development branch (per session instructions):
`claude/add-claude-documentation-cYdVt`. Commit and push there:

```
git push -u origin claude/add-claude-documentation-cYdVt
```

Do not push to `main` or open a PR unless explicitly asked.
