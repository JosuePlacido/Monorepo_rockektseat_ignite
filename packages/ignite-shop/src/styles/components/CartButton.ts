import { styled } from '@stitches/react';

export const Container = styled('button', {
	border: 'none',
	borderRadius: 6,
	padding: '0.75rem',
	position: 'relative',
	backgroundColor: '$gray800',
	display: 'flex',
	color: '$gray300',
	transition: 'all 0.2s',
	cursor: 'pointer',
	'&:hover': {
		backgroundColor: '$gray800',
		color: '$white'
	}
});
export const Badge = styled('span', {
	borderRadius: '50%',
	padding: '4px 8px',
	position: 'absolute',
	border: '2px solid $gray800',
	right: -10,
	top: -10,
	backgroundColor: '$green300',
	display: 'flex',
	color: '$white',
	transition: 'all 0.2s'
});
