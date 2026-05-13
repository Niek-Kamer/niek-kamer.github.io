import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalStyle('*, *::before, *::after', {
	boxSizing: 'border-box',
});

globalStyle('html', {
	fontFamily: vars.font.sans,
	fontSize: '16px',
	lineHeight: vars.lineHeight.normal,
	colorScheme: 'light dark',
	textRendering: 'optimizeLegibility',
	WebkitFontSmoothing: 'antialiased',
	MozOsxFontSmoothing: 'grayscale',
	scrollBehavior: 'smooth',
	// Fraunces variable: let the browser pick the right `opsz` master per font
	// size so small body text uses the text-cut and headings use the display-cut.
	fontOpticalSizing: 'auto',
	accentColor: vars.color.accent,
	caretColor: vars.color.accent,
});

globalStyle('body', {
	margin: 0,
	minHeight: '100dvh',
	background: vars.color.bg,
	color: vars.color.text,
	fontSize: vars.fontSize.base,
	transition: `background-color ${vars.duration.normal} ${vars.easing.standard}, color ${vars.duration.normal} ${vars.easing.standard}`,
});

globalStyle('::selection', {
	background: vars.color.selection,
	color: vars.color.text,
});

globalStyle(':focus-visible', {
	outline: `2px solid ${vars.color.accent}`,
	outlineOffset: '2px',
	borderRadius: vars.radius.sm,
});

globalStyle('h1, h2, h3, h4, h5, h6', {
	margin: 0,
	fontFamily: vars.font.display,
	fontWeight: vars.fontWeight.semibold,
	lineHeight: vars.lineHeight.tight,
	letterSpacing: vars.letterSpacing.tight,
	color: vars.color.text,
});

globalStyle('p', {
	margin: 0,
});

globalStyle('a', {
	color: vars.color.accent,
	textDecoration: 'none',
	textUnderlineOffset: '0.2em',
	transition: `color ${vars.duration.fast} ${vars.easing.standard}`,
});

// :visited has special browser handling — explicitly pin to accent so it
// doesn't fall through to Open Props' default `--link-visited` (purple).
globalStyle('a:visited', {
	color: vars.color.accent,
});

globalStyle('a:hover', {
	textDecoration: 'underline',
});

globalStyle('code', {
	fontFamily: vars.font.mono,
	fontSize: '0.92em',
	background: vars.color.codeBg,
	color: vars.color.codeText,
	padding: `0 ${vars.space['3xs']}`,
	borderRadius: vars.radius.sm,
});

// Code blocks: subtle background fill, no border (lighter visual chrome
// than a framed box). Horizontal padding is tight so the first character
// of each line aligns near the paragraph left edge — wider padding makes
// the code look indented vs. surrounding prose. Vertical padding still
// gives the block breathing room.
globalStyle('pre', {
	margin: 0,
	paddingBlock: vars.space.md,
	paddingInline: vars.space.sm,
	background: vars.color.codeBg,
	color: vars.color.codeText,
	borderRadius: vars.radius.md,
	overflowX: 'auto',
	fontFamily: vars.font.mono,
	fontSize: vars.fontSize.sm,
	lineHeight: vars.lineHeight.snug,
});

// Subtle inset highlight on dark mode to lift the code surface off the
// page bg without a hard border. Light mode skips this — the lighter
// codeBg already reads as elevated against the cream page.
globalStyle('[data-theme="dark"] pre', {
	boxShadow: `0 1px 0 ${vars.color.bgElevated} inset`,
});

globalStyle('pre code', {
	background: 'transparent',
	padding: 0,
	borderRadius: 0,
	fontSize: 'inherit',
});

// Shiki dual-theme switching. `defaultColor: false` in astro.config makes
// Shiki emit both palettes as CSS variables on every code token. Below we
// pick the active palette via the `[data-theme]` attribute on <html>:
// light is the default; dark overrides when `[data-theme="dark"]` is set.
globalStyle('.astro-code', {
	backgroundColor: 'var(--shiki-light-bg)',
	color: 'var(--shiki-light)',
});

globalStyle('.astro-code span', {
	color: 'var(--shiki-light)',
	fontStyle: 'var(--shiki-light-font-style)',
	fontWeight: 'var(--shiki-light-font-weight)',
	textDecoration: 'var(--shiki-light-text-decoration)',
});

globalStyle('[data-theme="dark"] .astro-code', {
	backgroundColor: 'var(--shiki-dark-bg)',
	color: 'var(--shiki-dark)',
});

globalStyle('[data-theme="dark"] .astro-code span', {
	color: 'var(--shiki-dark)',
	fontStyle: 'var(--shiki-dark-font-style)',
	fontWeight: 'var(--shiki-dark-font-weight)',
	textDecoration: 'var(--shiki-dark-text-decoration)',
});

globalStyle('hr', {
	border: 0,
	height: '1px',
	background: vars.color.border,
	margin: `${vars.space.xl} 0`,
});

globalStyle('img, svg, video, canvas', {
	display: 'block',
	maxWidth: '100%',
	height: 'auto',
});

// Off-screen skip link revealed on focus — wired up from BaseLayout.
globalStyle('.skip-link', {
	position: 'absolute',
	insetInlineStart: vars.space.sm,
	insetBlockStart: vars.space.sm,
	padding: `${vars.space['2xs']} ${vars.space.sm}`,
	background: vars.color.accent,
	color: vars.color.accentText,
	borderRadius: vars.radius.sm,
	fontWeight: vars.fontWeight.medium,
	transform: 'translateY(-200%)',
	transition: `transform ${vars.duration.fast} ${vars.easing.standard}`,
	zIndex: vars.zIndex.skipLink,
});

globalStyle('.skip-link:focus', {
	transform: 'translateY(0)',
});

globalStyle('*, *::before, *::after', {
	'@media': {
		'(prefers-reduced-motion: reduce)': {
			animationDuration: '0.01ms',
			animationIterationCount: 1,
			transitionDuration: '0.01ms',
		},
	},
});

globalStyle('html', {
	'@media': {
		'(prefers-reduced-motion: reduce)': {
			scrollBehavior: 'auto',
		},
	},
});
