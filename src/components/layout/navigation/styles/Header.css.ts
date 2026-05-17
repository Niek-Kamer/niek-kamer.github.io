import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme.css';

export const header = style({
	borderBottom: `1px solid ${vars.color.border}`,
});
