import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

export const link = style({
	display: 'block',
	color: vars.color.text,
	textDecoration: 'none',
	transition: `color ${vars.duration.fast} ${vars.easing.standard}`,
	selectors: {
		'&:hover': { textDecoration: 'none' },
	},
});

globalStyle(`${link}:hover h2`, { color: vars.color.accent });

export const date = style({
	fontSize: vars.fontSize.sm,
	color: vars.color.textSubtle,
});

export const tagList = style({
	listStyle: 'none',
	margin: 0,
	padding: 0,
	fontSize: vars.fontSize.sm,
	color: vars.color.textSubtle,
});

export const metaRow = style({
	flexWrap: 'wrap',
});

export const readTime = style({
	fontSize: vars.fontSize.sm,
	color: vars.color.textSubtle,
});

export const metricChip = style({
	display: 'inline-flex',
	alignItems: 'baseline',
	gap: vars.space['2xs'],
	fontSize: vars.fontSize.sm,
});

export const metricValue = style({
	color: vars.color.accent,
	fontWeight: vars.fontWeight.semibold,
});

export const metricLabel = style({
	color: vars.color.textSubtle,
});
