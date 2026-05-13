/**
 * Shared prose container for MDX-rendered content (writing posts, project
 * detail pages, about page). Purely typography: spacing, headings, lists,
 * tables, code, math. `em`-based spacing scales with the local font size
 * so headings and paragraphs breathe correctly at any fluid type setting.
 *
 * No layout — column width is set by the parent `<WideBand>` (writing,
 * projects detail) or `<ProseBand>` (about) wrapper. Code blocks keep
 * `overflow-x: auto` so lines that exceed the column scroll horizontally
 * rather than break the layout — classic Medium-style.
 *
 * The descendant rules below have to use `globalStyle` because VE's `style()`
 * selectors can only target `&` — they're explicitly NOT allowed to leak onto
 * child elements.
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const prose = style({
	fontSize: vars.fluid.body,
	lineHeight: vars.lineHeight.relaxed,
	color: vars.color.text,
});

// `min-width: 0` so long URLs / code lines can't blow the column.
globalStyle(`${prose} > *`, {
	minWidth: 0,
});

// Baseline vertical rhythm between top-level blocks.
globalStyle(`${prose} > * + *`, { marginBlockStart: '1.25em' });

// More breathing room before a new section.
globalStyle(`${prose} > * + h2`, { marginBlockStart: '2.25em' });
globalStyle(`${prose} > * + h3`, { marginBlockStart: '1.75em' });
globalStyle(`${prose} > * + h4`, { marginBlockStart: '1.5em' });

// Tighter after a heading — heading + next block read as a unit.
globalStyle(`${prose} > h2 + *, ${prose} > h3 + *, ${prose} > h4 + *`, {
	marginBlockStart: '0.5em',
});

// Heading sizing (fluid so they scale with viewport).
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

// Lists.
globalStyle(`${prose} ul, ${prose} ol`, { paddingInlineStart: '1.5em' });
globalStyle(`${prose} li + li`, { marginBlockStart: '0.4em' });

// Blockquote: subtle left rail in border colour, muted italic text.
globalStyle(`${prose} blockquote`, {
	borderInlineStart: `3px solid ${vars.color.borderStrong}`,
	paddingInlineStart: vars.space.md,
	color: vars.color.textMuted,
	fontStyle: 'italic',
});

// KaTeX display math: allow horizontal scroll inside the block so long
// equations don't overflow the prose column.
globalStyle(`${prose} .katex-display`, {
	overflowX: 'auto',
	overflowY: 'hidden',
	paddingBlock: vars.space.xs,
});

// Tables: editorial-label header treatment over a warm accent wash, sitting
// inside a rounded `borderStrong` container.
//   - Outer border in `borderStrong` with radius + clip-path so corners clip
//     the cell backgrounds and hover state.
//   - Header bg uses `accentSoft` (warm umber wash in dark / peachy cream in
//     light). The previous neutral `bgElevated` read as a cool bluegrey
//     against the warm page bg in dark mode; `accentSoft` reads
//     unambiguously warm and ties the table into the accent palette.
//   - Header text is uppercase smallcap-style: smaller, letter-spaced,
//     `textMuted`. This signals "column metadata" rather than "heading" and
//     keeps visual weight off the tinted band.
//   - Row separators use the `border` token (1px) — visible enough to walk
//     the eye down rows without competing with the header band.
//   - `<strong>` uses accent-high in dark (lighter peach for visibility) and
//     the base accent in light.
globalStyle(`${prose} table`, {
	width: '100%',
	borderCollapse: 'collapse',
	fontSize: '0.95em',
	fontVariantNumeric: 'tabular-nums',
	border: `1px solid ${vars.color.borderStrong}`,
	borderRadius: vars.radius.md,
	// `clip-path` rounds corners properly with `border-collapse: collapse`
	// (where `overflow: hidden` on a table is unreliable across engines).
	clipPath: `inset(0 round ${vars.radius.md})`,
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
	// First row connects to the header without doubling the hairline.
	borderTop: 'none',
});
globalStyle(`${prose} tbody tr`, {
	transition: 'background-color 120ms ease',
});
globalStyle(`${prose} tbody tr:hover`, {
	backgroundColor: `color-mix(in srgb, ${vars.color.accent} 7%, transparent)`,
});
globalStyle(
	`[data-theme="dark"] ${prose} table strong, [data-theme="dark"] ${prose} table b`,
	{ color: vars.color.accentWarm },
);
globalStyle(
	`[data-theme="light"] ${prose} table strong, [data-theme="light"] ${prose} table b`,
	{ color: vars.color.accent },
);
