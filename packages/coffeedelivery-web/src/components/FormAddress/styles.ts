import styled from 'styled-components';

export const Container = styled.fieldset`
	border: none;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	& > span {
		display: flex;
		gap: 12px;
	}
`;
