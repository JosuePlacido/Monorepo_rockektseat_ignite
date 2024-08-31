import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 2rem 10rem;
		flex: 1;
		display: flex;
		gap: 0.5rem;

		span {
			display: flex;
			align-items: stretch;
			gap: 12px;

			p {
				font-size: 0.875rem;
				padding: 8px;
				border-radius: 6px;
				display: flex;
				align-items: center;
				background-color: ${props => props.theme['purple-light']};
				color: ${props => props.theme['purple-dark']};
				vertical-align: middle;
				svg {
					margin-right: 4px;
				}
			}
		}
	}
`;

export const CartLink = styled(NavLink)`
	position: relative;
	padding: 8px;
	border-radius: 6px;
	display: flex;
	background-color: ${props => props.theme['yellow-light']};
	color: ${props => props.theme['yellow-dark']};
	span {
		font-size: 0.75rem;
		font-weight: bold;
		position: absolute;
		padding: 3px 7px;
		top: -10px;
		right: -10px;
		border-radius: 10px;
		background-color: ${props => props.theme['yellow-dark']};
		color: ${props => props.theme.white};
	}
`;
