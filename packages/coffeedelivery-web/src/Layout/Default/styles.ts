import styled from 'styled-components';

export const LayoutContainer = styled.div`
	max-width: 1440px;
	background-color: ${props => props.theme['gray-100']};
	display: flex;
	flex-direction: column;
	margin: auto;
`;
