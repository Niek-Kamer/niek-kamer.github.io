import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../../data/site';

export async function GET(context: APIContext) {
	const posts = await getCollection('writing', ({ data }) => !data.draft);
	const sorted = posts.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

	return rss({
		title: `${site.name} — Writing`,
		description: 'Notes on zero-knowledge cryptography, embedded Rust, and the gap between them.',
		site: context.site ?? site.url,
		items: sorted.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishedAt,
			link: `/writing/${post.id}/`,
			categories: post.data.tags,
		})),
		customData: `<language>${site.locale}</language>`,
	});
}
