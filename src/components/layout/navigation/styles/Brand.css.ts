import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const brand = style({
	fontFamily: vars.font.display,
	// Fraunces variable runs to 900 — push past the `bold` (700) token for a
	// proper editorial wordmark weight.
	fontWeight: 800,
	fontSize: vars.fontSize.xl,
	color: vars.color.text,
	letterSpacing: vars.letterSpacing.tight,
	// Pin the optical-size master to ~36 so the wordmark uses display-cut
	// proportions even though the rendered size sits in body-text territory.
	fontVariationSettings: '"opsz" 36',
	selectors: {
		'&:hover': {
			textDecoration: 'none',
			color: vars.color.accent,
		},
	},
});
