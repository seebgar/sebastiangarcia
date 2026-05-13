# CLAUDE.md

Guidance for AI assistants working in this repository.

## Project overview

Personal resume / portfolio site for Sebastian Garcia at
[sebastiangarcia.net](https://sebastiangarcia.net). Single static site built
with **Astro `^6.3.1`** in **TypeScript strict mode**, deployed on **Vercel**.
Three localized routes (`/`, `/es/`, `/fr/`) plus a `/404` page; everything
is statically pre-rendered at build time. **Zero client-side JavaScript** is
shipped to the browser — language switching, navigation, etc. are all plain
HTML.

## Commands

Run from the repo root after `npm install`. Requires Node 20+.

| Command                 | What it does                                                      |
| ----------------------- | ----------------------------------------------------------------- |
| `npm run dev`           | Astro dev server with HMR (no sitemap; build for that)            |
| `npm run build`         | Production build into `dist/` (emits `/`, `/es/`, `/fr/`, `/404`) |
| `npm run preview`       | Serve the built `dist/` locally                                   |
| `npm run test`          | Run the Vitest suite once                                         |
| `npm run test:watch`    | Vitest in watch mode                                              |
| `npm run test:coverage` | Run tests with v8 coverage (configured to gate at **100%**)       |
| `npm run lint`          | ESLint (flat config) on TS / Astro / JS                           |
| `npm run lint:fix`      | ESLint with `--fix`                                               |
| `npm run format`        | Prettier write across the repo                                    |
| `npm run format:check`  | Prettier check (no writes; CI-friendly)                           |
| `npm run build:fonts`   | Re-subset TTF → WOFF2 via `scripts/subset-fonts.mjs` (one-off)    |

Type errors surface via the Astro/TS toolchain during `astro build` or
`tsc --noEmit`. There is no separate `typecheck` script.

## Repository layout

```
.
├── astro.config.mjs          # site URL, i18n config, @astrojs/sitemap, inlineStylesheets:'always'
├── tsconfig.json             # extends "astro/tsconfigs/strict"
├── eslint.config.mjs         # flat config: @eslint/js + typescript-eslint + eslint-plugin-astro
├── .prettierrc.json          # 4-space, double quotes, semis, trailing commas, 80 col
├── .prettierignore
├── package.json              # private:true, "license":"UNLICENSED"
├── vercel.json               # CSP + security headers + immutable cache for /fonts/ and /_astro/
├── public/                   # served as-is: favicons, site.webmanifest, fonts (WOFF2), robots.txt
├── scripts/
│   └── subset-fonts.mjs      # TTF → subsetted WOFF2 (Latin Basic + Extended + General Punctuation)
├── src/
│   ├── pages/
│   │   ├── index.astro       # default locale (en) at /
│   │   ├── [lang]/index.astro # dynamic route — getStaticPaths returns es and fr
│   │   └── 404.astro
│   ├── layouts/
│   │   └── Layout.astro      # <html>/<head> shell: meta, OG/Twitter, canonical, hreflang, skip-link
│   ├── components/
│   │   ├── Page.astro        # shared composition (Layout + Header + main + Footer)
│   │   ├── Header.astro      # nav (#about / #resume / #contact)
│   │   ├── About.astro       # hero — has Schema.org Person microdata
│   │   ├── Resume.astro      # education + skills + experience
│   │   ├── Contact.astro     # mail + LinkedIn + GitHub
│   │   ├── Footer.astro      # role, location, language selector
│   │   └── LanguageSelector.astro  # EN · ES · FR language-code links
│   ├── i18n/
│   │   ├── types.ts          # Dict / Locale / EducationEntry / ExperienceEntry shapes
│   │   ├── en.ts, es.ts, fr.ts  # one Dict per locale
│   │   └── index.ts          # locales, defaultLocale, getDict, localeHref, isLocale, getLocalePaths, localeLabels, siteUrl
│   ├── layouts/
│   ├── styles/
│   │   └── global.css        # design tokens, reset, components, prefers-reduced-motion gate
│   └── assets/photos/        # PNG/JPG imported by components, optimized by Astro Image
├── tests/                    # Vitest specs (Container API based) — 100% coverage gate
└── vitest.config.ts          # extends getViteConfig from astro/config
```

`dist/`, `.astro/`, `coverage/`, `node_modules/`, `package-lock.json`,
`.env*`, `.vscode/`, `.idea/`, `.DS_Store` are gitignored. `.astro/types.d.ts`
is generated — do not edit by hand.

## How a page is composed

Each route renders the shared `Page.astro` component with a `locale` prop:

```
src/pages/index.astro            →  <Page locale="en" />
src/pages/[lang]/index.astro     →  <Page locale={Astro.params.lang as Locale} />
```

`Page.astro` is the single composition root:

```
<Layout locale={locale}>
  <Header locale={locale} />
  <main id="main">
    <About locale={locale} />
    <Resume locale={locale} />
    <Contact locale={locale} />
  </main>
  <Footer locale={locale} />
</Layout>
```

Every section component receives a `locale` prop and pulls its strings from
`getDict(locale)` (defined in `src/i18n/index.ts`). To add a new section:
create `src/components/NewSection.astro` (taking `locale`), import it in
`Page.astro`, and place it inside `<main>`. Add a corresponding `nav` key in
each locale dict plus an `id` on the section's root element so the header nav
can link to it.

## i18n conventions

- All visible strings live in `src/i18n/{en,es,fr}.ts`. The shape is enforced
  by `Dict` in `src/i18n/types.ts`. Adding a key requires touching the type +
  all three dictionaries — the test suite enforces shape parity across
  locales (`tests/i18n.test.ts`).
- Routing uses Astro's built-in `i18n` config with
  `prefixDefaultLocale: false` — English stays at `/`.
- Use `getDict(locale)` to read strings, `localeHref(locale)` to build URLs,
  `getLocalePaths()` to produce `getStaticPaths` entries, `isLocale(value)` as
  a type guard.
- Proper nouns (company names, "Sebastian Garcia", tech names like Java/AWS)
  stay verbatim across locales. Period strings (`"Jan 2022 – Present"`) are
  localized per dictionary, not formatted via `Intl.DateTimeFormat`.
- The language selector renders the two-letter code (`EN` / `ES` / `FR`) as
  the visible link text; each link's accessible name is the language's full
  native name via `aria-label`.

## Component conventions

- **Frontmatter**: the `---` fence at the top holds TS/JS (imports, props, dict
  reads); the template markup follows. See `src/components/Resume.astro` for
  the canonical shape.
- **Locale prop is required** on every section component. Type as
  `Locale` from `src/i18n/types.ts`.
- **Static content** — when a component renders a list, the list comes from
  the locale dictionary (e.g. `dict.resume.experience`), not a literal array
  in the component frontmatter.
- **Images**: import from `src/assets/photos/` and render with `<Image />`
  from `astro:assets`. Always pass `alt` (from the dict), explicit
  `width`/`height`, and `decoding="async"`. Use `loading="lazy"` for
  below-the-fold images. The hero image in `About.astro` is the LCP element
  and uses `loading="eager" fetchpriority="high"` instead.
- **Anchor targets**: section IDs (`#about`, `#resume`, `#contact`) live on
  elements inside the section components. `<main>` itself has `id="main"`
  to serve as the skip-link target.
- **No `<style>` blocks** in components. Add rules to `src/styles/global.css`.

## Styling

One stylesheet: `src/styles/global.css`, imported once by
`src/components/Page.astro`. With `build.inlineStylesheets: 'always'` in
`astro.config.mjs`, Astro inlines this CSS into every emitted HTML page (no
external stylesheet request).

- **Design tokens** at `:root`: spacing scale (`--space-3xs` …
  `--space-3xl`, fluid via `clamp()`), type scale (`--text-xs` …
  `--text-title`), leading scale, semantic colors, `--header-height`,
  `--gutter`, `--container-max`, `--prose-max`.
- **Logical properties** (`margin-inline`, `padding-block`, `inset-inline`)
  preferred over physical.
- **Breakpoints**: 768px (tablet) and 1280px (large desktop).
- **Class names** follow a `block__element__modifier` underscore-pair
  convention (e.g. `resume__txt__subtitle`, `header__nav__list`).
- **Motion**: `scroll-behavior: smooth` is set on `html` site-wide. The
  Contact section's `animation-timeline: view()` parallax runs at every
  breakpoint via three keyframe variants (`parallax-sm` / `-md` / `-lg`)
  with monotonically increasing range, swapped via `animation-name`
  overrides at `@media (min-width: 768px)` and `@media (min-width: 1280px)`.
  `prefers-reduced-motion: reduce` disables the animation entirely.
  See `docs/adr/0001-contact-section-geometry-stable-layout.md` for the
  reasoning behind the Contact section's aspect-ratio image + grid-cell
  layering (which intentionally diverges from the `100svh` pattern used by
  other full-height sections).
- **Skip-link**: `.skip-link` is visually hidden until focused, then slides
  into view at the top-left.

## TypeScript

Strict mode via `astro/tsconfigs/strict`. `tsconfig.json` includes
`.astro/types.d.ts` (generated) and excludes `dist`. Prefer letting types be
inferred from dictionary data over declaring one-off interfaces. The shared
shapes live in `src/i18n/types.ts`.

## Testing

`tests/` contains Vitest specs that render Astro components via Astro's
**experimental Container API** (`experimental_AstroContainer`) and assert on
the rendered HTML via `linkedom`'s `parseHTML`. The pattern is locale-aware:

```ts
import { getDict, locales } from '../src/i18n';

for (const locale of locales) {
  describe(`Component [${locale}]`, () => {
    const dict = getDict(locale);
    it('renders ...', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(Component, {
        props: { locale },
      });
      // assertions...
    });
  });
}
```

`vitest.config.ts` enforces **100% coverage** (statements, branches,
functions, lines). New code must be exercised — either via behavioral tests
or, for `.astro` page files where Container can't drive `getStaticPaths`, by
extracting logic to a plain TS helper that is tested directly (see
`getLocalePaths` in `src/i18n/index.ts`).

Pure CSS facts (e.g. that the reduced-motion gate exists) are locked in by
`tests/css.test.ts` via textual assertions on the source file — the Container
API does not apply CSS.

## Security & headers

CSP and other security headers are delivered as **HTTP headers via
`vercel.json`**, not via `<meta>`. The policy is `default-src 'self'` with
specific allowances for `style-src 'unsafe-inline'` (inlined CSS) and
`img-src 'self' data:`. `frame-ancestors 'none'`, HSTS,
`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and a tight
`Permissions-Policy` are all set. **Adding inline `<script>` will break CSP**
— prefer external assets under `/_astro/` (covered by `script-src 'self'`).

## Performance

- Fonts: Inter (regular + italic) + Noto Sans JP shipped as **Latin-subsetted
  WOFF2** (~300 KB total from ~10 MB of TTF). Built via `npm run build:fonts`
  using `subset-font`. Both primary fonts are preloaded in
  `Layout.astro`. Source TTFs are removed; only WOFF2 is tracked.
- CSS is **inlined** into every HTML page (`build.inlineStylesheets: 'always'`).
- The About hero image uses `loading="eager"` + `fetchpriority="high"` (it's
  the LCP element).
- Vercel cache: `/fonts/` and `/_astro/` get `Cache-Control: max-age=31536000,
immutable`; raster images get `stale-while-revalidate`.

## SEO

- `<title>` and `<meta name="description">` per locale (from `dict.meta`).
- `<link rel="canonical">` and `<link rel="alternate" hreflang>` (including
  `x-default`) on every page; all use **absolute URLs** built from
  `siteUrl` (`src/i18n/index.ts`).
- Open Graph and Twitter Card tags emitted by `Layout.astro` with absolute
  URLs; `og:image` is generated at build time via `astro:assets`'
  `getImage()` (1200×1200 JPG).
- `@astrojs/sitemap` emits `dist/sitemap-index.xml` + `dist/sitemap-0.xml`
  with `xhtml:link` hreflang alternates per URL.
- `public/robots.txt` allows everything and points to the sitemap index.
- Each page has **exactly one `<h1>`** — locked in by
  `tests/index.test.ts`. Resume and Contact use `<h2>`.
- Schema.org Person microdata lives on the About section (`itemscope
itemtype="https://schema.org/Person"`) with `name`, `jobTitle`, `email`,
  flat-text `address`, `url`, and `sameAs` for LinkedIn + GitHub.

## Accessibility

- Skip-to-content link inside `<body>` targeting `#main` (visible on focus).
- All interactive elements have visible `:focus-visible` outlines (set on `a`
  globally in `global.css`).
- The language selector's link text is the two-letter code (`EN` / `ES` /
  `FR`); each link's accessible name is the language's full native name
  (`English`, `Español`, `Français`) via `aria-label`.
- External links carry `target="_blank" rel="noopener noreferrer"`.

## Things that do not exist here — do not invent them

- No SSR adapter — output is fully static.
- No CI workflows (`.github/workflows/` is absent). The `lint`, `format`,
  and `test` scripts are available for CI to be added later.
- No environment variables — `.env*` is gitignored but unused.
- No server endpoints, no `src/pages/api/`.
- No Tailwind, no UI component library, no CSS-in-JS.
- No client-side JavaScript framework. No React, no Vue, no Svelte.
- No analytics, no third-party scripts. The CSP is strict (`script-src
'self'`); adding inline scripts requires either a hash in `vercel.json` or
  loosening the policy.
- No JSON-LD `<script>` tags (the strict CSP would block them without a hash;
  microdata serves the same SEO purpose).

If a task seems to require any of the above, surface that and ask before
adding it.

## Git workflow

Default branch is `main`. The repository is hosted at
`https://github.com/seebgar/sebastiangarcia`. Commit only on explicit user
instruction. **Do not push to `main` or open a PR unless explicitly asked.**
When you commit, the author is the user — **do not** add a
`Co-Authored-By: Claude` trailer (this is in user memory; respect it).

## Agent skills

### Issue tracker

Issues live as GitHub issues at `seebgar/sebastiangarcia`; use the `gh` CLI.
See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical triage role names are used verbatim (`needs-triage`, `needs-info`,
`ready-for-agent`, `ready-for-human`, `wontfix`). See
`docs/agents/triage-labels.md`.

### Domain docs

Single-context layout — one `CONTEXT.md` and one `docs/adr/` at the repo
root. See `docs/agents/domain.md`.
