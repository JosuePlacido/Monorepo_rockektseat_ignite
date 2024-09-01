import styled from 'styled-components';

export const Container = styled.section`
	margin-top: -90px;
	margin-bottom: 100px;
	flex: 1;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

export const Content = styled.main`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
`;
