import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const prose = style({
	fontSize: vars.fluid.body,
	lineHeight: vars.lineHeight.relaxed,
	color: vars.color.text,
});

globalStyle(`${prose} > *`, {
	minWidth: 0,
});
globalStyle(`${prose} > * + *`, { marginBlockStart: '1.25em' });
globalStyle(`${prose} > * + h2`, { marginBlockStart: '2.25em' });
globalStyle(`${prose} > * + h3`, { marginBlockStart: '1.75em' });
globalStyle(`${prose} > * + h4`, { marginBlockStart: '1.5em' });

globalStyle(`${prose} > h2 + *, ${prose} > h3 + *, ${prose} > h4 + *`, {
	marginBlockStart: '0.5em',
});

// Same inter-element spacing inside <details> blocks (collapsible sections).
globalStyle(`${prose} details > * + *`, { marginBlockStart: '1.25em' });

// Paragraph-to-paragraph spacing is bumped above the line-height gap so the
// break is visually distinct from inter-line spacing within a paragraph.
globalStyle(`${prose} p + p`, { marginBlockStart: '1.5em' });

globalStyle(`${prose} h2`, {
	fontSize: vars.fluid.h2,
	fontWeight: vars.fontWeight.semibold,
	lineHeight: vars.lineHeight.tight,
	letterSpacing: vars.letterSpacing.tight,
});
globalStyle(`${prose} h3`, {
	fontSize: vars.fluid.h3,
	fontWeight: vars.fontWeight.semibold,
	lineHeight: vars.lineHeight.snug,
});
globalStyle(`${prose} h4`, {
	fontSize: vars.fluid.h4,
	fontWeight: vars.fontWeight.semibold,
});

globalStyle(`${prose} ul, ${prose} ol`, { paddingInlineStart: '1.5em' });
globalStyle(`${prose} li + li`, { marginBlockStart: '0.4em' });

globalStyle(`${prose} blockquote`, {
	borderInlineStart: `3px solid ${vars.color.borderStrong}`,
	paddingInlineStart: vars.space.md,
	color: vars.color.textMuted,
	fontStyle: 'italic',
});

globalStyle(`${prose} .katex-display`, {
	overflowX: 'auto',
	overflowY: 'hidden',
	paddingBlock: vars.space.xs,
	maskImage: 'linear-gradient(to right, black calc(100% - 1.5rem), transparent)',
	WebkitMaskImage: 'linear-gradient(to right, black calc(100% - 1.5rem), transparent)',
});

globalStyle(`${prose} pre`, {
	maskImage: 'linear-gradient(to right, black calc(100% - 1.5rem), transparent)',
	WebkitMaskImage: 'linear-gradient(to right, black calc(100% - 1.5rem), transparent)',
});

globalStyle(`${prose} .table-wrap`, {
	overflowX: 'auto',
	border: `1px solid ${vars.color.borderStrong}`,
	borderRadius: vars.radius.md,
});

globalStyle(`${prose} table`, {
	width: '100%',
	borderCollapse: 'collapse',
	fontSize: '0.95em',
	fontVariantNumeric: 'tabular-nums',
});
globalStyle(`${prose} th, ${prose} td`, {
	paddingInline: '1rem',
	textAlign: 'left',
	color: vars.color.text,
});
globalStyle(`${prose} th`, {
	paddingBlock: '0.7rem',
	fontSize: '0.82em',
	fontWeight: vars.fontWeight.semibold,
	textTransform: 'uppercase',
	letterSpacing: '0.06em',
	color: vars.color.textMuted,
	backgroundColor: vars.color.accentSoft,
	borderBottom: `1px solid ${vars.color.borderStrong}`,
});
globalStyle(`${prose} td`, {
	paddingBlock: '0.65rem',
	verticalAlign: 'middle',
	borderTop: `1px solid ${vars.color.border}`,
});
globalStyle(`${prose} tbody tr:first-child td`, {
	borderTop: 'none',
});
globalStyle(`${prose} tbody tr`, {
	transition: 'background-color 120ms ease',
});
globalStyle(`${prose} tbody tr:hover`, {
	backgroundColor: `color-mix(in srgb, ${vars.color.accent} 7%, transparent)`,
});
globalStyle(`[data-theme="dark"] ${prose} table strong, [data-theme="dark"] ${prose} table b`, {
	color: vars.color.accentWarm,
});
globalStyle(`[data-theme="light"] ${prose} table strong, [data-theme="light"] ${prose} table b`, {
	color: vars.color.accent,
});

globalStyle(`${prose} details`, {
	borderTop: `1px solid ${vars.color.border}`,
	paddingBlock: vars.space.sm,
});
globalStyle(`${prose} details:last-of-type`, {
	borderBottom: `1px solid ${vars.color.border}`,
});

globalStyle(`${prose} details > summary`, {
	cursor: 'pointer',
	listStyle: 'none',
	position: 'relative',
	paddingInlineStart: '1.5em',
	paddingBlock: vars.space.xs,
	color: vars.color.text,
	fontWeight: vars.fontWeight.semibold,
	transition: 'color 150ms ease',
});

globalStyle(`${prose} details > summary::-webkit-details-marker`, {
	display: 'none',
});

globalStyle(`${prose} details > summary::before`, {
	content: '""',
	position: 'absolute',
	left: 0,
	top: '0.55em',
	width: '0.55em',
	height: '0.55em',
	borderRight: `2px solid ${vars.color.accent}`,
	borderBottom: `2px solid ${vars.color.accent}`,
	transform: 'rotate(-45deg)',
	transformOrigin: 'center',
	transition: 'transform 200ms ease',
});

globalStyle(`${prose} details[open] > summary::before`, {
	transform: 'rotate(45deg)',
});

globalStyle(`${prose} details > summary:hover`, {
	color: vars.color.accent,
});

globalStyle(`${prose} details[open] > *:not(summary)`, {
	marginInlineStart: '1.5em',
});
