import styled from 'styled-components';

export const Container = styled.article`
	display: flex;
	align-items: flex-start;
	background-color: ${({ theme }) => theme['gray-300']};
	padding: 8px 12px;
	gap: 1.25rem;
	& > div {
		display: flex;
		flex-direction: column;
		gap: 8px;
		span {
			display: flex;
			gap: 8px;
		}
	}
	img {
		height: 64px;
		width: 64px;
		border-radius: 64px;
	}
`;

export const PriceDisplay = styled.span`
	font-weight: bold;
	margin-left: auto;
`;
export const CartButton = styled.button`
	background-color: ${props => props.theme['gray-400']};
	border: none;
	padding: 8px;
	border-radius: 6px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	color: ${props => props.theme['gray-800']};
	svg {
		color: ${({ theme }) => theme['purple']};
		margin-right: 4px;
	}

	transition: background-color 0.1s;
	&:hover {
		background-color: ${props => props.theme['gray-500']};
	}
`;
