---
name: new-article
description: Scaffold a new article for mohamedazouz.com with SEO-complete frontmatter, in the site's voice, then build and audit. Use when the user wants to write, draft or add a blog post/article.
---

# New article

1. Ask the user (if not already given): topic, the key point they want readers to take away,
   and whether it should publish now or stay a draft.
2. Pick a short, lowercase, hyphenated slug (3–6 words, keyword-led), e.g.
   `agentic-ai-for-engineering-teams`. File: `src/content/articles/<slug>.md`.
3. Write frontmatter that satisfies `src/content.config.ts`:

   ```md
   ---
   title: "≤ 60 chars, keyword-led, no site name"
   description: "120–160 chars, natural sentence with 1–2 keywords from .claude/rules/seo.md"
   date: YYYY-MM-DD
   tags: ["engineering-leadership", "agentic-ai"]
   draft: true
   ---
   ```

4. Body: follow `.claude/rules/content.md` (British English, first person, people-first,
   no confidential employer detail, no job-seeking wording). Use `##` for sections — the
   page already has the `<h1>`. Aim for one clear idea; 600–1200 words.
5. Keep `draft: true` unless the user explicitly says to publish. Publishing the first
   non-draft post automatically removes `noindex` from `/articles/` and adds it to the sitemap.
6. Run `bun run build && bun run audit` and fix every error.
7. Show the user the rendered page with `bun run preview` (http://localhost:4321/articles/<slug>/).
8. Do not commit — follow `.claude/rules/versioning.md`.
