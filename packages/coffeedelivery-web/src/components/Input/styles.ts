import styled, { css } from 'styled-components';

interface IInputProps {
	border: 'gray-400' | 'yellow-dark';
	grow?: 'auto' | 'fill';
}
export const Container = styled.span<IInputProps>`
	${({ grow }) =>
		grow === 'auto' &&
		css`
			max-width: 60px;
		`}
	${({ grow }) =>
		grow === 'fill' &&
		css`
			flex: 1%;
		`}
	span {
		display: flex;
		padding: 12px;
		border-radius: 4px;
		border: solid 1px ${props => props.theme[props.border]};
		background-color: ${props => props.theme['gray-300']};
		&:focus-within {
			border-color: ${props => props.theme['yellow-dark']};
		}
		input {
			grid-area: input;
			font-size: 0.875rem;
			background-color: transparent;
			width: 100%;
			border: none;
			&:focus-visible {
				outline: none;
			}
		}
		em {
			grid-area: message;
			font-size: 0.75rem;
		}
	}
`;

export const ErrorMessage = styled.em`
	grid-area: error;
	font-size: 0.675rem;
	font-weight: 400;
	color: red;
`;
