import styled from 'styled-components';

export const Container = styled.form`
	margin: 1rem 0;
	fieldset {
		border: none;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 12px;
		label {
			color: ${({ theme }) => theme.COLORS.subtitle};
			font-size: ${({ theme }) => theme.FONT_SIZE.TITLE.S}rem;
			font-weight: bold;
			display: flex;
			justify-content: space-between;
			small {
				color: ${({ theme }) => theme.COLORS.span};
				font-size: ${({ theme }) => theme.FONT_SIZE.TEXT.S}rem;
				font-weight: normal;
			}
		}
		input {
			padding: 12px 16px;
			border-radius: 6px;
			background-color: ${({ theme }) => theme.COLORS.input};
			border: 1px solid ${({ theme }) => theme.COLORS.border};
			&:active,
			&:focus {
				box-shadow: none;
				border-color: ${({ theme }) => theme.COLORS.blue};
			}
		}
	}
`;

export const Input = styled.input`
	width: 100%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	img + img:not(:last-of-type) {
		margin-top: 2.5rem;
		margin-bottom: auto;
	}
`;
