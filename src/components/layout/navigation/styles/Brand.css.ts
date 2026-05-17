import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const brand = style({
	fontFamily: vars.font.display,
	fontWeight: 800,
	fontSize: vars.fontSize.xl,
	color: vars.color.text,
	letterSpacing: vars.letterSpacing.tight,
	fontVariationSettings: '"opsz" 36',
	selectors: {
		'&:hover': {
			textDecoration: 'none',
			color: vars.color.accent,
		},
	},
});
