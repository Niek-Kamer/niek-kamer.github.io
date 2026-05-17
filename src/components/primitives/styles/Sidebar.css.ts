import { style, styleVariants } from '@vanilla-extract/css';
import { media } from '../../../styles/breakpoints.css';

const widthVar = 'var(--sidebar-width)';

const orderings = {
	content: `1fr ${widthVar}`,
	side: `${widthVar} 1fr`,
};

export const layouts = styleVariants({
	sm_content: {
		'@media': {
			[media.sm]: { display: 'grid', gridTemplateColumns: orderings.content },
		},
	},
	sm_side: {
		'@media': {
			[media.sm]: { display: 'grid', gridTemplateColumns: orderings.side },
		},
	},
	md_content: {
		'@media': {
			[media.md]: { display: 'grid', gridTemplateColumns: orderings.content },
		},
	},
	md_side: {
		'@media': {
			[media.md]: { display: 'grid', gridTemplateColumns: orderings.side },
		},
	},
	lg_content: {
		'@media': {
			[media.lg]: { display: 'grid', gridTemplateColumns: orderings.content },
		},
	},
	lg_side: {
		'@media': {
			[media.lg]: { display: 'grid', gridTemplateColumns: orderings.side },
		},
	},
	xl_content: {
		'@media': {
			[media.xl]: { display: 'grid', gridTemplateColumns: orderings.content },
		},
	},
	xl_side: {
		'@media': {
			[media.xl]: { display: 'grid', gridTemplateColumns: orderings.side },
		},
	},
});

// Mobile baseline: flex column. The layout variant overrides at its breakpoint.
export const base = style({
	display: 'flex',
	flexDirection: 'column',
});
