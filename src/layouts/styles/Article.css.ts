import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

// Prose styles live in `src/styles/prose.css.ts` and are imported by the
// Article layout directly. This file only owns the article header bits.

export const meta = style({
	fontSize: vars.fontSize.sm,
	color: vars.color.textSubtle,
});

export const tagList = style({
	listStyle: 'none',
	margin: 0,
	padding: 0,
});

// Chip-style tags so they read as metadata, not prose.
export const tag = style({
	display: 'inline-block',
	fontSize: vars.fontSize.sm,
	color: vars.color.textMuted,
	padding: `0 ${vars.space.xs}`,
	borderRadius: vars.radius.sm,
	backgroundColor: vars.color.bgSubtle,
	border: `1px solid ${vars.color.border}`,
});
