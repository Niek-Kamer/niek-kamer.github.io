import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

// CTA link below the bio. Sprinkles already styles `<a>` accents globally;
// this file adds the inline-flex alignment + colour-swap on hover that the
// global rule doesn't cover.
export const cta = style({
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

// Small uppercase eyebrow above sidebar sections + featured-card titles.
export const sideLabel = style({
	fontSize: vars.fontSize.xs,
	fontWeight: vars.fontWeight.semibold,
	textTransform: 'uppercase',
	letterSpacing: vars.letterSpacing.wide,
	color: vars.color.textSubtle,
	margin: 0,
});

// Clickable card: border, hover tint, no underline. Sprinkles handles
// padding + radius via the component call site.
export const featuredCard = style({
	display: 'block',
	border: `1px solid ${vars.color.border}`,
	color: vars.color.text,
	transition: `border-color ${vars.duration.fast} ${vars.easing.standard}, background-color ${vars.duration.fast} ${vars.easing.standard}`,
	selectors: {
		'&:hover': {
			borderColor: vars.color.borderStrong,
			backgroundColor: vars.color.bgSubtle,
			textDecoration: 'none',
		},
	},
});
