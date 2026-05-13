import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

// Padding & flex behaviour live on Cluster + sprinkles in Header.astro; this
// file only owns the bottom border.
export const header = style({
	borderBottom: `1px solid ${vars.color.border}`,
});
