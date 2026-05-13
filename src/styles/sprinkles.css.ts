/**
 * Atomic, typesafe, responsive style props.
 *
 * Every value below is constrained to a token key from the Rust-generated
 * scale, so `<Stack gap="md" />` and `<Stack gap={{ base: 'sm', md: 'lg' }} />`
 * are both checked at compile time and impossible to call with a magic number.
 *
 * Two property sets:
 *   - `responsive`: applies across all 8 breakpoints (base + xs..4xl)
 *   - `static`:     single-condition only (colors, weight, etc.)
 *
 * The exported `sprinkles` function composes both — use it from any primitive
 * or styled component:
 *
 *   sprinkles({
 *     display: 'flex',
 *     gap: { base: 'sm', md: 'md', xl: 'lg' },
 *     color: 'textMuted',
 *   })
 */
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { media } from './breakpoints.css';
import { vars } from './theme.css';

// Combined type-scale for `fontSize`. Static keys (xs..6xl) and fluid heading
// roles (body, h1..h4, display) live in one flat namespace. Fluid xs/sm/lg/xl
// collide with the static scale at the same names and are intentionally not
// exposed here — reach for `vars.fluid.xs` etc. directly on the rare occasion
// you need a fluid version of those small sizes.
const typeScale = {
	xs: vars.fontSize.xs,
	sm: vars.fontSize.sm,
	base: vars.fontSize.base,
	lg: vars.fontSize.lg,
	xl: vars.fontSize.xl,
	'2xl': vars.fontSize['2xl'],
	'3xl': vars.fontSize['3xl'],
	'4xl': vars.fontSize['4xl'],
	'5xl': vars.fontSize['5xl'],
	'6xl': vars.fontSize['6xl'],
	body: vars.fluid.body,
	h4: vars.fluid.h4,
	h3: vars.fluid.h3,
	h2: vars.fluid.h2,
	h1: vars.fluid.h1,
	display: vars.fluid.display,
} as const satisfies Record<string, string>;

// `base` is the no-media-query default. Order matters: each later condition
// only applies when narrower ones haven't won — sprinkles emits them in
// declaration order, so largest-last is correct.
const conditions = {
	base: {},
	xs: { '@media': media.xs },
	sm: { '@media': media.sm },
	md: { '@media': media.md },
	lg: { '@media': media.lg },
	xl: { '@media': media.xl },
	'2xl': { '@media': media['2xl'] },
	'3xl': { '@media': media['3xl'] },
	'4xl': { '@media': media['4xl'] },
} as const;

const responsiveProperties = defineProperties({
	conditions,
	defaultCondition: 'base',
	properties: {
		display: ['none', 'block', 'flex', 'grid', 'inline', 'inline-flex', 'inline-grid', 'contents'],
		flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'],
		flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
		alignItems: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
		justifyContent: [
			'flex-start',
			'center',
			'flex-end',
			'space-between',
			'space-around',
			'space-evenly',
		],
		gridTemplateColumns: vars.columns,
		gap: vars.space,
		rowGap: vars.space,
		columnGap: vars.space,
		padding: vars.space,
		paddingInline: vars.space,
		paddingBlock: vars.space,
		paddingTop: vars.space,
		paddingBottom: vars.space,
		paddingLeft: vars.space,
		paddingRight: vars.space,
		margin: { ...vars.space, auto: 'auto' },
		marginInline: { ...vars.space, auto: 'auto' },
		marginBlock: { ...vars.space, auto: 'auto' },
		marginTop: { ...vars.space, auto: 'auto' },
		marginBottom: { ...vars.space, auto: 'auto' },
		marginLeft: { ...vars.space, auto: 'auto' },
		marginRight: { ...vars.space, auto: 'auto' },
		maxWidth: { ...vars.measure, none: 'none', full: '100%' },
		width: ['auto', '100%', 'fit-content', 'max-content', 'min-content'],
		textAlign: ['left', 'center', 'right'],
		fontSize: typeScale,
		// Useful for "stack on small, side-by-side on md+" idioms where
		// you want column-reverse semantics without recomputing flex order.
		order: ['0', '1', '2', '-1'],
	},
	shorthands: {
		// Tachyons/Tailwind-style aliases for the few props that earn one.
		px: ['paddingInline'],
		py: ['paddingBlock'],
		mx: ['marginInline'],
		my: ['marginBlock'],
		p: ['padding'],
		m: ['margin'],
		size: ['width', 'maxWidth'],
		// `placeItems` shorthand — applies to both axes for the common case.
		place: ['alignItems', 'justifyContent'],
	},
});

const staticProperties = defineProperties({
	properties: {
		color: vars.color,
		backgroundColor: vars.color,
		borderColor: vars.color,
		fontFamily: vars.font,
		fontWeight: vars.fontWeight,
		lineHeight: vars.lineHeight,
		letterSpacing: vars.letterSpacing,
		borderRadius: vars.radius,
		boxShadow: vars.shadow,
		zIndex: vars.zIndex,
	},
	shorthands: {
		bg: ['backgroundColor'],
	},
});

export const sprinkles = createSprinkles(responsiveProperties, staticProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
