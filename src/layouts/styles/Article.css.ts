import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const meta = style({
	fontSize: vars.fontSize.sm,
	color: vars.color.textSubtle,
});

export const tagList = style({
	listStyle: 'none',
	margin: 0,
	padding: 0,
});

export const tag = style({
	display: 'inline-block',
	fontSize: vars.fontSize.sm,
	color: vars.color.textMuted,
	padding: `0 ${vars.space.xs}`,
	borderRadius: vars.radius.sm,
	backgroundColor: vars.color.accentSoft,
	border: `1px solid ${vars.color.borderStrong}`,
});
