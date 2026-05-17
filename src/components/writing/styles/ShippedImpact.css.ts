import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

export const card = style({
	border: `1px solid ${vars.color.border}`,
	borderLeft: `3px solid ${vars.color.accent}`,
	borderRadius: vars.radius.md,
	background: vars.color.bgSubtle,
	padding: vars.space.lg,
	margin: `${vars.space.xl} 0`,
});

export const detail = style({
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radius.md,
	background: vars.color.bgSubtle,
	padding: vars.space.xl,
	margin: `${vars.space.xl} 0`,
});

export const eyebrow = style({
	fontSize: vars.fontSize.xs,
	fontWeight: vars.fontWeight.semibold,
	letterSpacing: vars.letterSpacing.wide,
	textTransform: 'uppercase',
	color: vars.color.accentSoft,
});

export const headline = style({
	fontSize: vars.fontSize['2xl'],
	fontWeight: vars.fontWeight.semibold,
	color: vars.color.accent,
	lineHeight: vars.lineHeight.tight,
});

export const hardware = style({
	fontSize: vars.fontSize.sm,
	color: vars.color.textMuted,
});

export const sectionTitle = style({
	fontSize: vars.fontSize.sm,
	fontWeight: vars.fontWeight.semibold,
	color: vars.color.text,
	textTransform: 'uppercase',
	letterSpacing: vars.letterSpacing.wide,
	margin: 0,
});

export const appliesList = style({
	listStyle: 'none',
	margin: 0,
	padding: 0,
	fontSize: vars.fontSize.sm,
});

export const appliesItem = style({
	display: 'flex',
	gap: vars.space.sm,
	alignItems: 'flex-start',
	color: vars.color.text,
});

export const markerPositive = style({
	color: vars.color.accentWarm,
	fontWeight: vars.fontWeight.semibold,
	flexShrink: 0,
});

export const markerNegative = style({
	color: vars.color.textSubtle,
	fontWeight: vars.fontWeight.semibold,
	flexShrink: 0,
});

export const tableWrap = style({
	overflowX: 'auto',
});

export const table = style({
	width: '100%',
	borderCollapse: 'collapse',
	fontSize: vars.fontSize.sm,
});

export const th = style({
	textAlign: 'right',
	fontWeight: vars.fontWeight.semibold,
	color: vars.color.textMuted,
	padding: `${vars.space.xs} ${vars.space.sm}`,
	borderBottom: `1px solid ${vars.color.border}`,
	selectors: {
		'&:first-child': { textAlign: 'left' },
	},
});

export const td = style({
	textAlign: 'right',
	color: vars.color.text,
	padding: `${vars.space.xs} ${vars.space.sm}`,
	borderBottom: `1px solid ${vars.color.border}`,
	selectors: {
		'&:first-child': { textAlign: 'left', color: vars.color.textMuted },
	},
});

export const disclaimer = style({
	fontSize: vars.fontSize.xs,
	color: vars.color.textSubtle,
	fontStyle: 'italic',
});
