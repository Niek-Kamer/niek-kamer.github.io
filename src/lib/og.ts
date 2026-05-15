/**
 * Build-time Open Graph card renderer. Returns a 1200x630 PNG for a
 * writing post, generated via Satori (JSX → SVG) and resvg (SVG → PNG).
 *
 * Dark variant only. Per-platform `prefers-color-scheme` handling on
 * og:image is poorly supported (most crawlers cache one image), so we
 * pick the variant that pops in feed instead of generating both.
 *
 * Visual contract:
 *  - 1200×630 (X/Twitter card size, the de-facto OG standard).
 *  - Warm umber dark bg with left accent rail (matches the rest of the
 *    site's heading + ShippedImpactCard treatment).
 *  - Brand line at top, large title centred, description below it,
 *    headline metric at bottom-left, date at bottom-right.
 *  - All measurements in absolute px so satori (which has limited CSS
 *    support) renders predictably.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';

// Inter regular + bold from the @fontsource/inter package. WOFF is the
// satori-supported format that ships in @fontsource. Resolved against
// `process.cwd()` (the project root) instead of `import.meta.url` because
// the latter rewrites to the build-time output directory once Astro
// bundles this module for prerendering — and the node_modules tree only
// exists at the project root.
const FONT_DIR = join(process.cwd(), 'node_modules/@fontsource/inter/files');
const interRegular = readFileSync(join(FONT_DIR, 'inter-latin-400-normal.woff'));
const interBold = readFileSync(join(FONT_DIR, 'inter-latin-700-normal.woff'));

// Palette mirrors `darkTokens` in src/styles/theme.css.ts so the OG card
// reads as the same brand as the site itself. Kept inline so the renderer
// has no runtime CSS dependency.
const palette = {
	bg: '#16130f',
	bgElevated: '#2a2520',
	text: '#d8d1c5',
	textMuted: '#958e82',
	accent: '#dfaf8f',
	accentSoft: '#3a281f',
};

export interface OGData {
	title: string;
	description: string;
	date: string;
	metric?: { value: string; label: string };
}

export async function renderOG(data: OGData): Promise<Uint8Array> {
	const svg = await satori(buildCard(data), {
		width: 1200,
		height: 630,
		fonts: [
			{ name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
			{ name: 'Inter', data: interBold, weight: 700, style: 'normal' },
		],
	});

	const resvg = new Resvg(svg, {
		fitTo: { mode: 'width', value: 1200 },
	});
	return resvg.render().asPng();
}

/**
 * Build the satori JSX tree as plain objects. Satori only supports a
 * narrow CSS subset (flex layout, basic typography, a few visual props),
 * so this hand-rolled tree is the safest authoring surface.
 */
function buildCard(data: OGData) {
	const titleSize = data.title.length > 70 ? 56 : 64;

	return {
		type: 'div',
		props: {
			style: {
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: palette.bg,
				padding: '60px 72px',
				fontFamily: 'Inter',
				color: palette.text,
				position: 'relative',
			},
			children: [
				// Left accent rail.
				{
					type: 'div',
					props: {
						style: {
							position: 'absolute',
							left: 0,
							top: 0,
							bottom: 0,
							width: '8px',
							backgroundColor: palette.accent,
						},
					},
				},
				// Top brand line.
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							fontSize: '22px',
							fontWeight: 600,
							letterSpacing: '4px',
							textTransform: 'uppercase',
							color: palette.accent,
						},
						children: 'Niek Kamer · Writing',
					},
				},
				// Title — sized fluidly by length.
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							marginTop: '40px',
							fontSize: `${titleSize}px`,
							fontWeight: 700,
							lineHeight: 1.1,
							letterSpacing: '-0.02em',
							color: '#f0eadf',
						},
						children: data.title,
					},
				},
				// Description.
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							marginTop: '32px',
							fontSize: '28px',
							lineHeight: 1.35,
							color: palette.textMuted,
						},
						children: truncate(data.description, 180),
					},
				},
				// Spacer pushes the footer row to the bottom of the card.
				{
					type: 'div',
					props: {
						style: { display: 'flex', flexGrow: 1 },
					},
				},
				// Footer row: metric on the left, date on the right.
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'flex-end',
						},
						children: [
							data.metric
								? {
										type: 'div',
										props: {
											style: {
												display: 'flex',
												alignItems: 'baseline',
												gap: '16px',
											},
											children: [
												{
													type: 'div',
													props: {
														style: {
															display: 'flex',
															fontSize: '64px',
															fontWeight: 700,
															color: palette.accent,
															letterSpacing: '-0.02em',
														},
														children: data.metric.value,
													},
												},
												{
													type: 'div',
													props: {
														style: {
															display: 'flex',
															fontSize: '22px',
															color: palette.textMuted,
														},
														children: data.metric.label,
													},
												},
											],
										},
									}
								: { type: 'div', props: { style: { display: 'flex' } } },
							{
								type: 'div',
								props: {
									style: {
										display: 'flex',
										fontSize: '22px',
										color: palette.textMuted,
									},
									children: data.date,
								},
							},
						],
					},
				},
			],
		},
	};
}

function truncate(text: string, max: number): string {
	if (text.length <= max) return text;
	return text.slice(0, max - 1).trimEnd() + '…';
}
