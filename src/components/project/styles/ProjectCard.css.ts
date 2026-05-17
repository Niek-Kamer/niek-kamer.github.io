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

export const period = style({
	fontSize: vars.fontSize.sm,
	color: vars.color.textSubtle,
	fontVariantNumeric: 'tabular-nums',
});

export const featuredBadge = style({
	fontSize: vars.fontSize.xs,
	fontWeight: vars.fontWeight.semibold,
	textTransform: 'uppercase',
	letterSpacing: vars.letterSpacing.wide,
	color: vars.color.accentWarm,
	borderRadius: vars.radius.sm,
	border: `1px solid ${vars.color.accentWarm}`,
	padding: `0 ${vars.space['2xs']}`,
});

export const stackList = style({
	listStyle: 'none',
	margin: 0,
	padding: 0,
	fontSize: vars.fontSize.sm,
	color: vars.color.textSubtle,
});

export const stackChip = style({
	padding: `0 ${vars.space.xs}`,
	borderRadius: vars.radius.sm,
	backgroundColor: vars.color.bgSubtle,
	border: `1px solid ${vars.color.border}`,
});
