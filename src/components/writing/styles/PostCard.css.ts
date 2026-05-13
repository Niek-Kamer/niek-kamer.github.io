import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

// The whole entry is a clickable region. Text decoration stays off so the
// card reads as a card, not a chain of links.
export const link = style({
	display: 'block',
	color: vars.color.text,
	textDecoration: 'none',
	transition: `color ${vars.duration.fast} ${vars.easing.standard}`,
	selectors: {
		'&:hover': { textDecoration: 'none' },
	},
});

// Hover lifts the title into accent colour. `globalStyle` because the
// selector targets a child element.
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
