/**
 * Build-time route that emits one OG card PNG per writing post at
 * `/og/{slug}.png`. Astro prerenders these as static files in `dist/og/`
 * so each post page can reference its own unfurl image via og:image meta.
 *
 * The Article header in `Article.astro` is responsible for picking up
 * the slug and passing the image URL to `<BaseLayout image={...}>`,
 * which BaseHead.astro then writes into the og:image / twitter:image
 * meta tags.
 */

import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOG } from '../../lib/og';

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await getCollection('writing', ({ data }) =>
		import.meta.env.PROD ? !data.draft : true,
	);
	return posts.map((post) => ({ params: { slug: post.id } }));
};

const dateFormatter = new Intl.DateTimeFormat('en', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
});

export const GET: APIRoute = async ({ params }) => {
	const posts = await getCollection('writing');
	const post = posts.find((p) => p.id === params.slug);
	if (!post) {
		return new Response('Not found', { status: 404 });
	}

	const m = post.data.headlineMetric;
	const metric = m
		? {
				value: m.unit ? `${m.value}${m.unit}` : String(m.value),
				label: m.label,
			}
		: undefined;

	const png = await renderOG({
		title: post.data.title,
		description: post.data.description,
		date: dateFormatter.format(post.data.publishedAt),
		metric,
	});

	// Wrap as Buffer so the Response BodyInit type accepts it cleanly. The
	// raw Uint8Array from resvg carries a generic `ArrayBufferLike` param
	// that newer TS narrows away from BodyInit's union.
	return new Response(Buffer.from(png), {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	});
};
