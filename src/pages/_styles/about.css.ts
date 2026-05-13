import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

// The "Elsewhere" socials cluster. The prose body above it is styled by
// `src/styles/prose.css.ts`; this file only owns the socials-section bits
// that aren't MDX.
export const elsewhereList = style({
	listStyle: 'none',
	margin: 0,
	padding: 0,
});

export const socialLink = style({
	display: 'inline-flex',
	alignItems: 'center',
	gap: vars.space.xs,
	color: vars.color.textMuted,
	fontWeight: vars.fontWeight.medium,
	transition: `color ${vars.duration.fast} ${vars.easing.standard}`,
	selectors: {
		'&:hover': {
			color: vars.color.text,
			textDecoration: 'none',
		},
	},
});
