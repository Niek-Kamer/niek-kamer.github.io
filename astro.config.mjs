// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import zkmcuDarkRaw from './src/styles/themes/zkmcu-dark.json' with { type: 'json' };
// VS Code theme JSON files (with `tokenColors` instead of `settings`).
// Shiki accepts this format at runtime but its TS type insists on `settings`,
// so we cast each import — same JSON, just bypassing a type-narrowness bug.
import zkmcuLightRaw from './src/styles/themes/zkmcu-light.json' with { type: 'json' };

/** @type {import('shiki').ThemeRegistrationRaw} */
const zkmcuLight = /** @type {any} */ (zkmcuLightRaw);
/** @type {import('shiki').ThemeRegistrationRaw} */
const zkmcuDark = /** @type {any} */ (zkmcuDarkRaw);

// `site` is required for absolute URLs in the sitemap and RSS feed. Mirror
// the value in src/data/site.ts. Deployed as a GitHub *user* site at the
// apex `https://niek-kamer.github.io/`, so no `base` is needed.
// https://astro.build/config
export default defineConfig({
	site: 'https://niek-kamer.github.io',
	integrations: [
		mdx(),
		sitemap({
			// Exclude the auto-generated 404 from the sitemap.
			filter: (page) => !page.endsWith('/404'),
		}),
	],
	markdown: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex],
		// Dual-theme code highlighting. `defaultColor: false` makes Shiki emit
		// both palettes as CSS variables (`--shiki-light`/`--shiki-light-bg`
		// and `--shiki-dark`/`--shiki-dark-bg`) instead of inlining one as
		// the default. Then global.css picks the right variable based on
		// the page-level `[data-theme]` attribute — so the manual theme
		// toggle drives code colors, not `prefers-color-scheme`.
		shikiConfig: {
			themes: {
				light: zkmcuLight,
				dark: zkmcuDark,
			},
			defaultColor: false,
		},
	},
	vite: {
		plugins: [vanillaExtractPlugin()],
	},
});
