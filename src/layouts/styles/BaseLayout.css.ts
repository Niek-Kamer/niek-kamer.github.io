import { style } from '@vanilla-extract/css';

// Page shell: full-height column wrapper. Width/padding live on the
// <Container> primitive in BaseLayout.astro; this file only owns the
// vertical concerns that don't fit the sprinkles surface.
export const shell = style({
	display: 'flex',
	flexDirection: 'column',
	minHeight: '100dvh',
});

export const main = style({
	flex: 1,
});
