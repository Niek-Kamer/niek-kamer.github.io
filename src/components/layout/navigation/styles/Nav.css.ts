import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const list = style({
	listStyle: 'none',
	margin: 0,
	padding: 0,
});

export const link = style({
	color: vars.color.textMuted,
	fontSize: vars.fontSize.sm,
	fontWeight: vars.fontWeight.medium,
	selectors: {
		'&:hover, &[aria-current="page"]': {
			color: vars.color.text,
			textDecoration: 'none',
		},
	},
});
