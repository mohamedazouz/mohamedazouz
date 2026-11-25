// SEO audit for the built site. Run after `bun run build`:  bun run audit
// Fails (exit 1) on any error; prints warnings for softer issues.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const SITE = 'https://mohamedazouz.com';
let errors = 0;
const err = (f: string, m: string) => (errors++, console.log(`  ✗ ${f}: ${m}`));

const walk = (d: string): string[] =>
  readdirSync(d).flatMap((n) => {
    const p = join(d, n);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });

const attr = (html: string, re: RegExp) => html.match(re)?.[1]?.trim();
const decode = (s = '') =>
  s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

if (!existsSync(DIST)) {
  console.error('dist/ not found — run `bun run build` first.');
  process.exit(1);
}

const sitemap = existsSync(`${DIST}/sitemap-0.xml`) ? readFileSync(`${DIST}/sitemap-0.xml`, 'utf8') : '';
const pages = walk(DIST);
const seenTitles = new Map<string, string>();
const seenDescs = new Map<string, string>();
const internalLinks = new Set<string>();

for (const file of pages) {
  const rel = relative(DIST, file);
  const html = readFileSync(file, 'utf8');
  const urlPath = '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '');
  console.log(`• ${urlPath}`);

  const title = decode(attr(html, /<title>([^<]*)<\/title>/));
  const desc = decode(attr(html, /<meta name="description" content="([^"]*)"/));
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  const robots = attr(html, /<meta name="robots" content="([^"]*)"/) ?? '';
  const noindex = robots.includes('noindex');
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;

  if (!title) err(rel, 'missing <title>');
  else if (title.length > 60) err(rel, `title ${title.length} chars (>60): "${title}"`);
  if (!desc) err(rel, 'missing meta description');
  else if (desc.length < 120 || desc.length > 160) err(rel, `description ${desc.length} chars (want 120–160)`);
  if (!canonical?.startsWith(SITE)) err(rel, `bad canonical: ${canonical}`);
  if (h1s !== 1) err(rel, `${h1s} <h1> elements (want 1)`);
  for (const p of ['og:title', 'og:description', 'og:image', 'og:url']) {
    if (!html.includes(`property="${p}"`)) err(rel, `missing ${p}`);
  }
  if (!html.includes('name="twitter:card"')) err(rel, 'missing twitter:card');
  if (!/<html lang="en-GB"/.test(html)) err(rel, 'missing lang="en-GB"');

  // Near-zero-JS rule: only JSON-LD and the two tiny inline theme scripts are allowed.
  const scripts = html.match(/<script\b[^>]*>/g) ?? [];
  for (const s of scripts)
    if (!s.includes('application/ld+json') && !s.includes('data-theme-script')) err(rel, `unexpected script: ${s}`);
  if (/<script\b[^>]*\bsrc=/.test(html)) err(rel, 'external script found');

  // JSON-LD must parse and contain a Person.
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (ld.length === 0) err(rel, 'no JSON-LD');
  for (const [, json] of ld) {
    try {
      const data = JSON.parse(json);
      const types = (data['@graph'] ?? [data]).map((n: { '@type': string }) => n['@type']);
      if (!types.includes('Person')) err(rel, 'JSON-LD has no Person');
      if (urlPath === '/about/' && !types.includes('ProfilePage')) err(rel, 'About missing ProfilePage');
      if (urlPath.startsWith('/articles/') && urlPath !== '/articles/' && !types.includes('BlogPosting'))
        err(rel, 'article missing BlogPosting');
    } catch (e) {
      err(rel, `invalid JSON-LD: ${(e as Error).message}`);
    }
  }

  // Sitemap consistency.
  const inSitemap = canonical ? sitemap.includes(`<loc>${canonical}</loc>`) : false;
  if (rel !== '404.html') {
    if (noindex && inSitemap) err(rel, 'noindex page is in the sitemap');
    if (!noindex && !inSitemap) err(rel, 'indexable page missing from sitemap');
  }

  if (title && !noindex) {
    if (seenTitles.has(title)) err(rel, `duplicate title with ${seenTitles.get(title)}`);
    seenTitles.set(title, rel);
  }
  if (desc && !noindex) {
    if (seenDescs.has(desc)) err(rel, `duplicate description with ${seenDescs.get(desc)}`);
    seenDescs.set(desc, rel);
  }

  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)"/g)) internalLinks.add(href);
  for (const [, src] of html.matchAll(/<img\b[^>]*>/g)) if (!/alt="/.test(src)) err(rel, 'img without alt');
}

console.log('• internal links');
for (const href of internalLinks) {
  const target = href.endsWith('/') ? join(DIST, href, 'index.html') : join(DIST, href);
  if (!existsSync(target)) err(href, 'broken internal link');
}

console.log('• static files');
for (const f of ['robots.txt', 'sitemap-index.xml', 'rss.xml', 'og.png', 'favicon.svg', 'CNAME']) {
  if (!existsSync(join(DIST, f))) err(f, 'missing');
}
const robots = existsSync(`${DIST}/robots.txt`) ? readFileSync(`${DIST}/robots.txt`, 'utf8') : '';
if (!robots.includes(`Sitemap: ${SITE}/sitemap-index.xml`)) err('robots.txt', 'missing Sitemap line');
const cname = existsSync(`${DIST}/CNAME`) ? readFileSync(`${DIST}/CNAME`, 'utf8').trim() : '';
if (cname !== 'mohamedazouz.com') err('CNAME', `unexpected value "${cname}"`);

console.log(`\n${errors === 0 ? '✓ SEO audit passed' : `✗ SEO audit failed: ${errors} error(s)`}`);
process.exit(errors === 0 ? 0 : 1);
