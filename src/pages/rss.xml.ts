import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { PAGES, SITE } from '../consts';

export async function GET(context: APIContext) {
  const posts = (await getCollection('articles', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  return rss({
    title: `${SITE.name} — Articles`,
    description: PAGES.articles.description,
    site: context.site ?? SITE.url,
    trailingSlash: true,
    customData: `<language>${SITE.lang}</language>`,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/articles/${p.id}/`,
      categories: p.data.tags,
    })),
  });
}
