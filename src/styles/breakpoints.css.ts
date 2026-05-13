import { type BreakpointsKey, breakpoints } from '../generated/tokens';

/// Pre-built media query strings for VE `@media` blocks.
///
/// Usage:
/// ```ts
/// style({
///   fontSize: vars.fontSize.base,
///   '@media': {
///     [media.md]: { fontSize: vars.fontSize.lg },
///     [media.xl]: { fontSize: vars.fontSize.xl },
///   },
/// });
/// ```
export const media = {
	xs: `screen and (min-width: ${breakpoints.xs})`,
	sm: `screen and (min-width: ${breakpoints.sm})`,
	md: `screen and (min-width: ${breakpoints.md})`,
	lg: `screen and (min-width: ${breakpoints.lg})`,
	xl: `screen and (min-width: ${breakpoints.xl})`,
	'2xl': `screen and (min-width: ${breakpoints['2xl']})`,
	'3xl': `screen and (min-width: ${breakpoints['3xl']})`,
	'4xl': `screen and (min-width: ${breakpoints['4xl']})`,
} as const satisfies Record<BreakpointsKey, string>;

export type Media = typeof media;
