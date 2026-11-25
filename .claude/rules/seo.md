# SEO Rules

Every indexable page MUST have (all driven by `src/consts.ts` / frontmatter → `Seo.astro`):

- `<title>` ≤ 60 characters, unique, keyword-led.
- Meta description 150–160 characters, unique, natural language.
- Canonical URL on `https://mohamedazouz.com` with a trailing slash.
- Open Graph + Twitter card tags (image `/og.png`, 1200×630).
- Exactly one `<h1>`.
- Valid JSON-LD `@graph` containing `WebSite` + `Person` (`#person`). Add `ProfilePage`
  on About and `BlogPosting` on articles. Keep `@id` references consistent.

Indexing:

- Pages with no real content are `noindex` and excluded from the sitemap
  (`/articles/` until the first non-draft post; `404`). `astro.config.mjs` handles
  `/articles/` automatically.
- Keep `public/robots.txt` pointing at `/sitemap-index.xml`.

Performance (target Lighthouse 100):

- Near-zero client JavaScript. The only `<script>` tags allowed are `application/ld+json`
  and the two tiny inline theme scripts marked `data-theme-script` (dark default + toggle).
  No external scripts, ever.
- No web fonts, no CSS/JS frameworks, no UI libraries, no third-party embeds without
  asking the user first.
- Images: SVG where possible; raster images optimised and with `width`/`height` + `alt`.

Keyword set (use naturally): Engineering Leader, Senior Engineering Manager, Engineering
Manager, Head of Engineering, engineering leadership, AI-driven development, agentic AI,
AI agents, AI in engineering, streaming infrastructure, video streaming, CDN, platform
engineering, distributed systems, cloud, SRE, London, UK, Europe.

Run `/seo-audit` after any change to pages, layout, consts or articles.
