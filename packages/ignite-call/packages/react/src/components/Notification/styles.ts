import * as Toast from '@radix-ui/react-toast';

import { keyframes, styled } from '../../styles';

const slideIn = keyframes({
	from: {
		transform: 'translateY(-50%)',
		opacity: 0
	},
	to: {
		transform: 'translateY(0)',
		opacity: 1
	}
});
const slideOut = keyframes({
	from: {
		transform: 'translateY(0)',
		opacity: 1
	},
	to: {
		transform: 'translateY(-50%)',
		opacity: 0
	}
});
export const NotificationContainer = styled(Toast.Root, {
	width: '360px',
	padding: '$3 $5',
	backgroundColor: '$gray800',
	borderRadius: '$sm',
	overflow: 'hidden',
	boxSizing: 'border-box',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'stretch',
	border: '1px solid $gray600',
	position: 'absolute',
	gap: '$1',
	'&[data-state="open"]': {
		animation: `${slideIn} 200ms ease-out`
	},
	'&[data-state="closed"]': {
		animation: `${slideOut} 200ms ease-out`
	}
});
export const NotificationTitle = styled('h4', {
	color: '$white',
	fontSize: '$lg',
	lineHeight: '$base',
	fontWeight: '$bold',
	fontFamily: '$default',
	margin: 0
});
export const NotificationDescription = styled('p', {
	color: '$gray200',
	fontSize: '$sm',
	lineHeight: '$base',
	fontWeight: '$regular',
	fontFamily: '$default',
	margin: 0
});
export const Close = styled(Toast.Close, {
	position: 'absolute',
	top: 14,
	right: 14,
	width: 20,
	height: 20,
	backgroundColor: 'transparent',
	color: '$gray200',
	border: 'none'
});
export const Viewport = styled(Toast.Viewport, {
	position: 'fixed',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-end',
	gap: '$2',
	bottom: 0,
	top: 0,
	right: 0,
	width: 360,
	padding: '$8'
});
