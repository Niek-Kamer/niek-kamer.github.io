import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

// A single numeric achievement to surface on a project card or detail page.
// e.g. { label: 'Verify time', value: 1, unit: 's', note: 'on RP2350' }
const metric = z.object({
	label: z.string(),
	value: z.union([z.string(), z.number()]),
	unit: z.string().optional(),
	note: z.string().optional(),
});

const projectLinks = z.object({
	repo: z.url().optional(),
	demo: z.url().optional(),
	post: z.url().optional(),
	paper: z.url().optional(),
	package: z.url().optional(),
});

// Period strings are loose on purpose: 'YYYY', 'YYYY-MM', or 'YYYY-MM-DD' all valid.
// `end` accepts the same OR the literal 'ongoing' for current work.
const period = z.object({
	start: z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/, 'expected YYYY, YYYY-MM, or YYYY-MM-DD'),
	end: z.union([z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/), z.literal('ongoing')]).optional(),
});

const projects = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		description: z.string().max(200),
		role: z.string().optional(),
		period: period,
		stack: z.array(z.string()).default([]),
		metrics: z.array(metric).default([]),
		links: projectLinks.default({}),
		featured: z.boolean().default(false),
		draft: z.boolean().default(false),
		order: z.number().default(0),
	}),
});

const writing = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
	schema: z.object({
		title: z.string(),
		description: z.string().max(200),
		publishedAt: z.coerce.date(),
		updatedAt: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		// Set to true on posts that use $...$ / $$...$$ — gates KaTeX CSS injection so non-math
		// posts don't ship the stylesheet.
		math: z.boolean().default(false),
		canonical: z.url().optional(),
		toc: z.boolean().default(true),
	}),
});

// Static one-of-one page content. Lives in a collection so the prose can be
// edited as plain MDX without touching JSX. Schema is intentionally small —
// title + description for SEO, the body is the content.
const about = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/about' }),
	schema: z.object({
		title: z.string(),
		description: z.string().max(200),
	}),
});

export const collections = { projects, writing, about };
