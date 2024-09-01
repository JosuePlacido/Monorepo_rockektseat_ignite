import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const ContainerLink = styled(NavLink)`
	text-decoration: none;
	display: flex;
	align-items: center;
	gap: 12px;
	font-weight: bold;
	border: none;
	border-bottom: 1px solid transparent;
	font-size: ${props => props.theme.FONT_SIZE.LINK}rem;
	color: ${props => props.theme.COLORS.blue};
	margin-bottom: auto;
	transition: border 0.1s;
	&:link,
	&:visited,
	&:hover,
	&:active,
	&:-webkit-any-link {
		color: ${props => props.theme.COLORS.blue};
	}
	&:hover {
		border-color: ${props => props.theme.COLORS.blue};
	}
`;
