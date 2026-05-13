import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

// Sprinkles owns colour, padding, radius, layout. This file only owns the
// hover/transition states + the icon-swap selectors driven off `data-theme`.
export const button = style({
	cursor: 'pointer',
	borderStyle: 'solid',
	borderWidth: '1px',
	transition: `color ${vars.duration.fast} ${vars.easing.standard}, border-color ${vars.duration.fast} ${vars.easing.standard}, background-color ${vars.duration.fast} ${vars.easing.standard}`,
	selectors: {
		'&:hover': {
			color: vars.color.text,
			borderColor: vars.color.borderStrong,
		},
	},
});

export const icon = style({
	display: 'block',
});

// Show the sun in dark mode (click to go back to light), moon in light mode.
// Both icons live in the DOM so the swap is pure CSS — no layout shift, no JS
// re-render flicker.
export const sun = style({
	selectors: {
		'[data-theme="light"] &': { display: 'none' },
	},
});

export const moon = style({
	selectors: {
		'[data-theme="dark"] &': { display: 'none' },
	},
});
