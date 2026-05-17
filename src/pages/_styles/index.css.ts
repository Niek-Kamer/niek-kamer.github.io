import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

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

export const sideLabel = style({
	fontSize: vars.fontSize.xs,
	fontWeight: vars.fontWeight.semibold,
	textTransform: 'uppercase',
	letterSpacing: vars.letterSpacing.wide,
	color: vars.color.textSubtle,
	margin: 0,
});

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
