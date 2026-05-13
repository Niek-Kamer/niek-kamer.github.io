import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const meta = style({
	fontSize: vars.fontSize.sm,
	color: vars.color.textSubtle,
	fontVariantNumeric: 'tabular-nums',
});

// Reset list semantics for the stack & link clusters.
export const list = style({
	listStyle: 'none',
	margin: 0,
	padding: 0,
});

export const stackChip = style({
	padding: `0 ${vars.space.xs}`,
	borderRadius: vars.radius.sm,
	backgroundColor: vars.color.bgSubtle,
	border: `1px solid ${vars.color.border}`,
	fontSize: vars.fontSize.sm,
	color: vars.color.textMuted,
});

// Project external links: text + arrow, accent-coloured.
export const projectLink = style({
	color: vars.color.accent,
	fontWeight: vars.fontWeight.medium,
	fontSize: vars.fontSize.base,
	transition: `color ${vars.duration.fast} ${vars.easing.standard}`,
	selectors: {
		'&:hover': {
			color: vars.color.text,
			textDecoration: 'none',
		},
	},
});

// Metrics grid cell.
export const metric = style({
	padding: vars.space.md,
	borderRadius: vars.radius.md,
	border: `1px solid ${vars.color.border}`,
	backgroundColor: vars.color.bgSubtle,
});

export const metricLabel = style({
	fontSize: vars.fontSize.xs,
	fontWeight: vars.fontWeight.semibold,
	textTransform: 'uppercase',
	letterSpacing: vars.letterSpacing.wide,
	color: vars.color.textSubtle,
	margin: 0,
});

export const metricValue = style({
	fontSize: vars.fluid.h3,
	fontWeight: vars.fontWeight.semibold,
	color: vars.color.text,
	fontVariantNumeric: 'tabular-nums',
	margin: 0,
});

export const metricNote = style({
	fontSize: vars.fontSize.sm,
	color: vars.color.textMuted,
	margin: 0,
});
