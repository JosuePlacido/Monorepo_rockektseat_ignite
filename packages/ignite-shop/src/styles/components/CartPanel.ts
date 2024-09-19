import { styled } from '@stitches/react';

export const CartPanelStyled = styled('aside', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'stretch',
	justifyContent: 'center',
	padding: '3rem',
	backgroundColor: '$gray800',
	position: 'fixed',
	right: -480,
	height: '100%',
	width: 480,
	transition: 'right .5s',
	gap: '2rem',
	zIndex: 2,
	h2: {
		textAlign: 'center',
		fontSize: '$lg'
	},
	'&.active': {
		right: 0
	},
	ul: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: '1.5rem',
		alignItems: 'stretch'
	},
	dl: {
		display: 'grid',
		gridTemplateColumns: 'auto 1fr',
		gap: '0.5rem',
		dt: {
			alignSelf: 'baseline',
			'&:last-of-type': {
				fontWeight: 'bold',
				fontSize: '$md'
			}
		},
		dd: {
			justifySelf: 'flex-end',
			alignSelf: 'baseline',
			'&:last-of-type': {
				fontWeight: 'bold',
				fontSize: '$xl'
			}
		}
	}
});
export const ProductItem = styled('li', {
	display: 'flex',
	alignItems: 'stretch',
	justifyContent: 'flex-start',
	gap: '1.25rem',
	zIndex: 2,
	div: {
		background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
		borderRadius: 8,
		padding: '0.25rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		img: {
			objectFit: 'cover'
		}
	},
	span: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'flex-start',
		gap: '.5rem',
		p: {
			fontSize: '$.md'
		},
		h3: {
			fontSize: '$.md',
			fontWeight: 'bold'
		},
		button: {
			border: 'none',
			backgroundColor: 'transparent',
			color: '$green500',
			fontWeight: 'bold',
			'&:hover': {
				color: '$green300'
			}
		}
	}
});
