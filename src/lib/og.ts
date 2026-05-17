import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';

const FONT_DIR = join(process.cwd(), 'node_modules/@fontsource/inter/files');
const interRegular = readFileSync(join(FONT_DIR, 'inter-latin-400-normal.woff'));
const interBold = readFileSync(join(FONT_DIR, 'inter-latin-700-normal.woff'));

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
				{
					type: 'div',
					props: {
						style: { display: 'flex', flexGrow: 1 },
					},
				},
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
