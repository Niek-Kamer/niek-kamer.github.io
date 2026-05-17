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

	return new Response(Buffer.from(png), {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	});
};
