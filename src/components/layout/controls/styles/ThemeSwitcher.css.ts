import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

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
