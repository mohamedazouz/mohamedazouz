// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

const SITE_URL = 'https://mohamedazouz.com';

// The Articles index stays out of the sitemap (and is noindex) until at least
// one published (non-draft) article exists. Publishing the first post flips
// this automatically — no config change needed.
const articlesDir = new URL('./src/content/articles/', import.meta.url);
const hasPublishedArticles = readdirSync(articlesDir)
  .filter((f) => /\.mdx?$/.test(f))
  .some((f) => !/^draft:\s*true\s*$/m.test(readFileSync(new URL(f, articlesDir), 'utf8')));

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => hasPublishedArticles || !page.startsWith(`${SITE_URL}/articles/`),
    }),
  ],
});
