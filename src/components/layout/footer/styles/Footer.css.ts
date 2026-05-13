import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

// Border-top + muted text colour. Padding / margin / flex behaviour are
// owned by Cluster + sprinkles in Footer.astro.
export const footer = style({
	borderTop: `1px solid ${vars.color.border}`,
	color: vars.color.textMuted,
	fontSize: vars.fontSize.sm,
});

export const copy = style({
	margin: 0,
});

export const socials = style({
	listStyle: 'none',
	margin: 0,
	padding: 0,
});

// Sprinkles owns layout/colour/padding/radius. This file only owns the hover
// transition + colour swap on the icon links.
export const socialLink = style({
	transition: `color ${vars.duration.fast} ${vars.easing.standard}, background-color ${vars.duration.fast} ${vars.easing.standard}`,
	selectors: {
		'&:hover': {
			color: vars.color.text,
			backgroundColor: vars.color.bgSubtle,
			textDecoration: 'none',
		},
	},
});
