---
name: seo-audit
description: Build mohamedazouz.com and verify SEO on every page (titles, descriptions, canonicals, Open Graph, JSON-LD, sitemap/noindex consistency, zero-JS, internal links, robots, CNAME). Use after any change to pages, layout, consts, styles or articles, or when the user asks to check SEO.
---

# SEO audit

1. `bun run build` — must complete without errors.
2. `bun run check` — Astro/TypeScript checks must be clean.
3. `bun run audit` — runs `scripts/seo-audit.ts` against `dist/`. It fails on:
   - title missing or > 60 chars; description outside 120–160 chars; duplicates
   - canonical not on `https://mohamedazouz.com`; not exactly one `<h1>`
   - missing OG/Twitter tags or `lang="en-GB"`
   - any `<script>` that is not JSON-LD (zero-JS rule)
   - JSON-LD that does not parse or lacks `Person` (+ `ProfilePage` on About,
     `BlogPosting` on articles)
   - noindex pages in the sitemap, or indexable pages missing from it
   - broken internal links; missing robots.txt / sitemap / rss / og.png / favicon / CNAME
4. Fix every error at its source (usually `src/consts.ts` or article frontmatter), then re-run.
5. Optional deeper checks — run when the user asks or before launch:
   - `bun run preview`, then Lighthouse in the browser pane on `/` and `/about/`
     (mobile + desktop, light + dark). Target 100, minimum 95 per category.
   - Paste the JSON-LD from `dist/index.html` and `dist/about/index.html` into
     https://validator.schema.org and Google's Rich Results Test (live site only).
6. Report a short summary: pass/fail per check and anything you changed.
