import styled, { css } from 'styled-components';

export const Container = styled.form`
	padding: 4rem 10rem;
	flex: 1;
	overflow-y: auto;
	display: grid;
	grid-template-columns: 3fr 2fr;
	grid-gap: 1rem;
	& > span {
		display: flex;
		flex-direction: column;
		gap: 12px;
		section {
			display: flex;
			flex-direction: column;
			border-radius: 6px;
			padding: 2.5rem;
			background-color: ${props => props.theme['gray-200']};
			gap: 2rem;
			header {
				display: flex;
				align-items: flex-start;
				gap: 8px;
			}
		}
	}
`;

export const CartPanel = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.75rem;
	flex: 1;
	overflow-y: auto;
	background-color: ${props => props.theme['gray-200']};
	padding: 40px;
	border-radius: 6px 44px 6px 44px;
	hr {
		background-color: ${props => props.theme['gray-400']};
		height: 1px;
		border: 0;
	}
	ul {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		align-items: stretch;
		li {
			list-style: none;
			display: flex;
			justify-content: space-between;
			align-items: center;
			span:first-of-type {
				font-size: 0.875rem;
			}
			&:last-of-type {
				color: ${props => props.theme['gray-800']};
				font-weight: bold;
				font-size: 1.25rem;
				span:first-of-type {
					font-size: 1.25rem;
				}
			}
		}
	}
`;

export const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 6px;
	padding: 12px 8px;
	border: none;
	background-color: ${({ theme }) => theme['yellow']};
	color: ${({ theme }) => theme['white']};
	font-weight: bold;
	font-size: 0.875rem;
	cursor: pointer;
	transition: background-color 0.1s;
	&:disabled {
		cursor: no-drop;
		opacity: 0.5;
	}
	&:hover:not(:disabled) {
		background-color: ${({ theme }) => theme['yellow-dark']};
	}
`;

export const WrapperFieldHorizontal = styled.span`
	display: flex;
	gap: 12px;
`;

interface ISelectProps {
	active: 'true' | 'false';
}
export const Select = styled.button<ISelectProps>`
	border: none;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	font-size: 0.75rem;
	gap: 12px;
	padding: 1rem;
	border: solid 1px ${props => props.theme['gray-400']};
	flex: 1;
	background-color: ${props => props.theme['gray-400']};
	color: ${props => props.theme['gray-700']};
	border-radius: 6px;
	transition: background-color 0.1s;
	cursor: pointer;
	svg {
		color: ${props => props.theme['purple']};
	}
	&:hover {
		background-color: ${props => props.theme['gray-500']};
		color: ${props => props.theme['gray-800']};
	}
	${({ active, theme }) =>
		active === 'true' &&
		css`
			border-color: ${theme['purple']};
			background-color: ${theme['purple-light']};
		`}
`;

export const ErrorMessage = styled.em`
	grid-area: error;
	font-size: 0.675rem;
	font-weight: 400;
	color: red;
`;
