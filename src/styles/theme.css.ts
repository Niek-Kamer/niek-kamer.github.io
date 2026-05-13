import { assignVars, createThemeContract, globalStyle } from '@vanilla-extract/css';
import {
	columns,
	duration,
	easing,
	fluid,
	fontSize,
	fontWeight,
	letterSpacing,
	lineHeight,
	measure,
	radius,
	shadow,
	space,
	zIndex,
} from '../generated/tokens';

// Shape of every token the design system exposes. Color tokens are the only
// values that vary between light/dark; everything else (space, type, motion)
// comes from the Rust-generated scale and is shared across themes.
export const vars = createThemeContract({
	color: {
		bg: null,
		bgSubtle: null,
		bgElevated: null,
		text: null,
		textMuted: null,
		textSubtle: null,
		// Three accent slots. `accent` is the workhorse — links, focus rings,
		// brand hover, primary buttons. `accentWarm` adds visual heat for
		// "featured", success-y badges, or anywhere the cool cyan would feel
		// flat. `accentSoft` is the decorative one — section eyebrows,
		// tag chips, gentle emphasis. Use sparingly to avoid rainbow soup.
		accent: null,
		accentText: null,
		accentWarm: null,
		accentSoft: null,
		border: null,
		borderStrong: null,
		codeBg: null,
		codeText: null,
		selection: null,
	},
	font: {
		display: null,
		sans: null,
		mono: null,
	},
	fontSize: {
		xs: null,
		sm: null,
		base: null,
		lg: null,
		xl: null,
		'2xl': null,
		'3xl': null,
		'4xl': null,
		'5xl': null,
		'6xl': null,
	},
	fluid: {
		xs: null,
		sm: null,
		body: null,
		lg: null,
		xl: null,
		h4: null,
		h3: null,
		h2: null,
		h1: null,
		display: null,
	},
	fontWeight: {
		regular: null,
		medium: null,
		semibold: null,
		bold: null,
	},
	lineHeight: {
		tight: null,
		snug: null,
		normal: null,
		relaxed: null,
	},
	letterSpacing: {
		tight: null,
		normal: null,
		wide: null,
	},
	space: {
		'3xs': null,
		'2xs': null,
		xs: null,
		sm: null,
		md: null,
		lg: null,
		xl: null,
		'2xl': null,
		'3xl': null,
		'4xl': null,
		'5xl': null,
	},
	radius: {
		sm: null,
		md: null,
		lg: null,
		xl: null,
		full: null,
	},
	shadow: {
		sm: null,
		md: null,
		lg: null,
	},
	measure: {
		narrow: null,
		prose: null,
		wide: null,
		container: null,
		full: null,
	},
	duration: {
		fast: null,
		normal: null,
		slow: null,
	},
	easing: {
		standard: null,
		emphasized: null,
	},
	columns: {
		1: null,
		2: null,
		3: null,
		4: null,
		6: null,
		12: null,
	},
	zIndex: {
		base: null,
		raised: null,
		sticky: null,
		overlay: null,
		modal: null,
		toast: null,
		skipLink: null,
	},
});

// All non-color tokens are shared across themes — they come directly from the
// generated scale (single source of truth in `tokens-gen/`).
const sharedTokens = {
	font: {
		// Fraunces variable handles both display and body via the `opsz` optical-size
		// axis (set globally with `font-optical-sizing: auto`). Using one family for
		// the whole site keeps the editorial feel tight; weight is the differentiator.
		display: '"Fraunces Variable", Fraunces, Georgia, "Times New Roman", Times, serif',
		sans: '"Fraunces Variable", Fraunces, Georgia, "Times New Roman", Times, serif',
		mono: '"JetBrains Mono Variable", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
	},
	fontSize,
	fluid,
	fontWeight,
	lineHeight,
	letterSpacing,
	space,
	radius,
	shadow,
	measure,
	duration,
	easing,
	columns,
	zIndex,
};

// zkmcu palette — warm umber dark, cream paper light. One accent hue (peach
// on dark, umber on light) drives the whole site so the whole thing reads
// as a single hue family rather than fighting cool/warm complements.
// Mirrors `project-zkmcu/zkmcu-web/src/styles/custom.css`.

const lightTokens = {
	...sharedTokens,
	color: {
		bg: '#faf7f0',
		bgSubtle: '#ede6d3',
		bgElevated: '#ffffff',
		text: '#1c2524',
		textMuted: '#3f4540',
		textSubtle: '#6a6a5a',
		// Warm umber accent. Earthy peach hue shifted darker so it hits WCAG
		// AA on the cream background.
		accent: '#b07348',
		accentText: '#faf7f0',
		accentWarm: '#7a4820',
		accentSoft: '#f4e2d2',
		border: '#e8e0cc',
		borderStrong: '#d3c9b0',
		codeBg: '#ede6d3',
		codeText: '#1c2524',
		selection: '#e0d3bc',
	},
};

const darkTokens = {
	...sharedTokens,
	color: {
		bg: '#16130f',
		bgSubtle: '#1c1813',
		bgElevated: '#2a2520',
		text: '#d8d1c5',
		textMuted: '#c2bbac',
		textSubtle: '#958e82',
		// Pale peach accent (#dfaf8f) for body affordances; lighter peach
		// (#f2ceae) for high-contrast headings/strong. Dark wash (#3a281f)
		// is the subtle accent-tinted background (sidebar active etc).
		accent: '#dfaf8f',
		accentText: '#16130f',
		accentWarm: '#f2ceae',
		accentSoft: '#3a281f',
		border: '#2a2520',
		borderStrong: '#3a332c',
		codeBg: '#1f1b16',
		codeText: '#d8d1c5',
		selection: '#3a281f',
	},
};

// Apply tokens via the `data-theme` attribute on <html>. An inline script in
// BaseLayout sets this before paint so there's no light/dark flash.
globalStyle(':root', {
	vars: assignVars(vars, lightTokens),
});

globalStyle('[data-theme="dark"]', {
	vars: assignVars(vars, darkTokens),
});
