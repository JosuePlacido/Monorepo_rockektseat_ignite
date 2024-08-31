import styled from 'styled-components';

export const Container = styled.div`
	padding: 4rem 10rem;
	flex: 1;
	overflow-y: auto;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-areas: 'title title' 'subtitle subtitle' 'info img';
	grid-column-gap: 2rem;
	h1 {
		grid-area: title;
		color: ${props => props.theme['yellow-dark']};
	}
	p {
		grid-area: subtitle;
		font-size: 1.25rem;
		color: ${props => props.theme['gray-700']};
		margin-bottom: 2rem;
	}
	div {
		border: 1px solid transparent;
		background-origin: border-box;
		grid-area: info;
		align-self: center;
		border-radius: 6px 44px 6px 44px;
		background-image: ${({ theme }) =>
			`linear-gradient(to bottom right, ${theme['yellow']}, ${theme['purple']})`};
		ul {
			display: flex;
			flex: 1;
			background-color: ${({ theme }) => theme['white']};
			flex-direction: column;
			border-radius: 6px 44px 6px 44px;
			gap: 32px;
			padding: 40px;
			li {
				list-style: none;
				display: flex;
				gap: 12px;
			}
		}
	}
	img {
		margin-left: auto;
		grid-area: img;
	}
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
