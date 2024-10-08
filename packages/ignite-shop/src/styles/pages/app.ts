import { styled } from '..';

export const Container = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	justifyContent: 'center',
	margin: 'auto',
	minHeight: '100vh',
	maxWidth: 1440
});

export const Header = styled('header', {
	padding: '2rem 0',
	width: '100%',
	maxWidth: 1180,
	margin: '0 auto',
	display: 'flex',
	justifyContent: 'space-between'
});
