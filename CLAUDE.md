# mohamedazouz.com

Personal site of Mohamed Azouz — engineering leader in London. Static Astro site,
built with Bun, deployed to GitHub Pages (custom domain via Cloudflare DNS).

## Commands (Bun only — never npm, npx, yarn or pnpm)

- `bun install` — install deps (respects 30-day `minimumReleaseAge` in `bunfig.toml`)
- `bun run dev` — dev server at http://localhost:4321
- `bun run build` — production build to `dist/`
- `bun run preview` — serve `dist/` locally
- `bun run check` — Astro/TypeScript checks
- `bun run images` — regenerate `public/og.png` and `public/apple-touch-icon.png`

## Layout

- `src/consts.ts` — **single source of truth**: name, titles, meta descriptions, links,
  career, JSON-LD facts. Change copy here first.
- `src/components/Seo.astro` — all meta, Open Graph, canonical and JSON-LD (`@graph`).
- `src/pages/` — `index`, `about`, `articles/`, `404`, `rss.xml.ts`.
- `src/content/articles/` — Markdown posts (schema in `src/content.config.ts`).
- `src/styles/global.css` — the whole "Signal" theme. Dark by default; light via
  `[data-theme='light']`, switched by `src/components/ThemeToggle.astro` (saved in localStorage).
- `README.md` at the repo root is the **GitHub profile README**, not project docs.
- `.github/workflows/deploy.yml` — single-concurrency Pages deploy on push to `main`.

## Rules

Always follow the rules in `.claude/rules/`:

- `versioning.md` — signed commits, conventional commits, never commit/push without OK
- `content.md` — voice, confidentiality, no job-seeking wording
- `seo.md` — per-page SEO requirements and the zero-JS constraint

## Skills

- `/new-article` — scaffold a new article with SEO-complete frontmatter
- `/seo-audit` — build and verify every page's SEO
- `/update-profile` — edit bio/About/consts in the agreed voice

## Gotchas

- Astro compresses HTML: a line break directly before an opening inline tag
  (`<strong>`, `<em>`, `<a>`) or directly after a closing one is dropped, gluing words
  together ("atSkydance"). Keep the space and the tag on the same line.
- The `articles` collection is empty until the first post, so the build prints
  "collection does not exist or is empty" warnings. They are expected.
