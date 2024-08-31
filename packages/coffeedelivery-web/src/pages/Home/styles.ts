import styled from 'styled-components';

export const Container = styled.section`
	flex: 1;
	overflow-y: auto;
`;
export const Banner = styled.header`
	padding: 4rem 10rem;
	display: grid;
	background-image: url('/Background.png');
	grid-template-areas: 'titile img' 'description img';
	grid-template-columns: 1fr auto;
	grid-gap: 3rem;
	align-items: center;
	& > span {
		grid-area: titile;
		justify-self: flex-start;
		font-size: 1.25rem;
		color: ${props => props.theme['gray-800']};
		h1 {
			font-size: 3rem;
			color: ${props => props.theme['gray-900']};
			margin-bottom: 1rem;
			line-height: 4rem;
		}
	}
	img {
		grid-area: img;
		justify-self: flex-end;
	}
	ul {
		grid-area: description;
		justify-self: flex-start;
		display: grid;
		grid-gap: 1.25rem;
		grid-template-columns: auto auto;
		li {
			gap: 12px;
			list-style: none;
			display: flex;
			align-items: center;
		}
	}
`;

export const Title = styled.h1`
	color: ${props => props.theme['gray-700']};
	margin: 4rem 10rem;
`;

export const Content = styled.main`
	padding: 4rem 10rem;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
`;
