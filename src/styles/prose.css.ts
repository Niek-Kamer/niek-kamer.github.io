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
// equations don't overflow the prose column. Same right-edge fade as the
// table wrapper so the scroll affordance is visible on mobile.
globalStyle(`${prose} .katex-display`, {
	overflowX: 'auto',
	overflowY: 'hidden',
	paddingBlock: vars.space.xs,
	maskImage: 'linear-gradient(to right, black calc(100% - 1.5rem), transparent)',
	WebkitMaskImage: 'linear-gradient(to right, black calc(100% - 1.5rem), transparent)',
});

// Code blocks: pre has overflow-x: auto already (set in global.css.ts), but
// the scroll affordance is invisible on mobile until the user happens to
// swipe. Same right-edge mask gradient teaches that horizontal scroll
// exists. Scoped to .prose so non-prose pre blocks (none currently, but
// future-proof) aren't affected.
globalStyle(`${prose} pre`, {
	maskImage: 'linear-gradient(to right, black calc(100% - 1.5rem), transparent)',
	WebkitMaskImage: 'linear-gradient(to right, black calc(100% - 1.5rem), transparent)',
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
// Tables are wrapped in `<div class="table-wrap">` by the rehype plugin
// `src/lib/rehype-wrap-tables.ts`. The wrapper owns the visual box (border,
// rounded corners, overflow scroll, right-edge mask) so the table itself
// can extend horizontally past the column on narrow viewports. The right-
// edge fade is a soft scroll affordance — the rightmost ~1.5rem of the
// wrapper is masked into transparency so it's visually obvious that more
// content lives off-screen, without needing JS to detect overflow.
globalStyle(`${prose} .table-wrap`, {
	overflowX: 'auto',
	border: `1px solid ${vars.color.borderStrong}`,
	borderRadius: vars.radius.md,
	maskImage: 'linear-gradient(to right, black calc(100% - 1.5rem), transparent)',
	WebkitMaskImage: 'linear-gradient(to right, black calc(100% - 1.5rem), transparent)',
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
	// First row connects to the header without doubling the hairline.
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

// Disclosure widgets (<details> / <summary>).
//
// Browser default renders a small black triangle that looks generic and
// gives no hover affordance — readers have to guess that the rows are
// clickable. Replace it with a brand-coloured chevron drawn as a CSS-only
// rotated border square (no SVG, no JS), tinted to the accent palette so
// it visually echoes the heading-bar treatment elsewhere on the site.
// The chevron rotates 90° when expanded; the summary text shifts to the
// accent colour on hover. Both transitions match the 150ms duration used
// by other interactive elements.
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
	// Bumped from `2xs` to `xs` so the clickable strip clears 40px tall on
	// touch devices (well within Apple/Google's tap-target heuristics with
	// the line-height-based content).
	paddingBlock: vars.space.xs,
	color: vars.color.text,
	fontWeight: vars.fontWeight.semibold,
	transition: 'color 150ms ease',
});

// Hide native disclosure marker across engines.
globalStyle(`${prose} details > summary::-webkit-details-marker`, {
	display: 'none',
});

// CSS-only chevron: a 0.55em square with right + bottom borders, rotated
// to point right when collapsed. Anchored to the start of the summary,
// vertically centred against the cap-height.
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

// Small left padding inside the open content so the disclosure body
// visually aligns with the chevron, not the summary text.
globalStyle(`${prose} details[open] > *:not(summary)`, {
	marginInlineStart: '1.5em',
});
