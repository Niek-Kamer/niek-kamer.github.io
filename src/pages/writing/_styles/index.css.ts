import { style } from '@vanilla-extract/css';

// The writing list wraps `<PostCard>`s in `<li>` elements. We only own the
// list-reset here — per-card hover/colour lives in `PostCard.css.ts`.
export const list = style({
	listStyle: 'none',
	margin: 0,
	padding: 0,
});
