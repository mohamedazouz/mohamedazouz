---
name: update-profile
description: Update Mohamed's bio, headline, About page, career timeline or SEO copy on mohamedazouz.com in the agreed voice, keeping site, meta and JSON-LD consistent. Use when the user changes role, employer, focus areas, toolbox, or wants to reword the About/Home copy.
---

# Update profile

1. Read `.claude/rules/content.md` and `.claude/rules/seo.md` first.
2. Make factual changes in `src/consts.ts` first (headline, jobTitle, employer, CAREER,
   knowsAbout, PAGES titles/descriptions). Pages and JSON-LD read from it.
3. Prose lives in `src/pages/index.astro` (Home intro) and `src/pages/about.astro`
   (About body + "What I focus on"). Keep each focus item to one sentence.
4. Keep the voice: first person, British English, senior-leadership, people and culture
   first, AI/agentic AI woven in naturally. No job-seeking wording. No confidential detail.
5. If wording changes meaningfully, also suggest matching changes to:
   - `README.md` (GitHub profile) and the LinkedIn headline/About — consistency across
     profiles strengthens search signals.
   - `scripts/generate-images.ts` if the headline on the OG card should change, then run
     `bun run images`.
6. Run the `seo-audit` skill. Show the user the change in `bun run preview`.
7. Do not commit — follow `.claude/rules/versioning.md`.
