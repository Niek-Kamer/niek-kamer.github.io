import { type BreakpointsKey, breakpoints } from '../generated/tokens';

``;
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
