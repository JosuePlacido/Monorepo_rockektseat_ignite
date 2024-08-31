import styled from 'styled-components';

export const Container = styled.section`
	display: flex;
	flex: 1;
	background-color: ${props => props.theme['gray-400']};
	justify-content: space-between;
	align-items: stretch;
	padding: 8px;
	gap: 4px;
	border-radius: 6px;
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		background-color: transparent;
		color: ${props => props.theme['purple']};
		transition: color 0.1s;
		cursor: pointer;
		&:hover {
			color: ${props => props.theme['purple-dark']};
		}
	}
`;
