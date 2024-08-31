import styled from 'styled-components';

export const Container = styled.article`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.75rem;
	background-color: ${({ theme }) => theme['gray-200']};
	border-radius: 6px;
	border-bottom-left-radius: 32px;
	border-top-right-radius: 32px;
	padding: 1.25rem;
	max-width: 256px;
	margin: 1.5rem;
	& > span {
		background-color: ${({ theme }) => theme['yellow-light']};
		color: ${({ theme }) => theme['yellow-dark']};
		padding: 0 4px;
		border-radius: 100px;
		text-transform: uppercase;
		font-weight: bold;
		font-size: 0.625rem;
	}
	p {
		font-size: 0.875rem;
		text-align: center;
		color: ${({ theme }) => theme['gray-600']};
	}
	img {
		height: 96px;
		width: 96px;
		border-radius: 64px;
		margin: auto;
		margin-top: -40px;
	}
`;

export const PriceDisplay = styled.footer`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
	font-weight: bold;
	font-size: 0.875rem;
	& > h1 {
		margin-left: 4px;
		font-size: 1.5rem;
		font-weight: regular;
	}
`;
export const CartButton = styled.button`
	border: none;
	padding: 8px;
	border-radius: 6px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	background-color: ${props => props.theme['purple']};
	color: ${props => props.theme['white']};

	transition: background-color 0.1s;
	&:hover {
		background-color: ${props => props.theme['purple-dark']};
	}
`;
