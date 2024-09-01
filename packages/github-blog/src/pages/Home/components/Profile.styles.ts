import styled from 'styled-components';

export const Container = styled.header`
	background-color: ${({ theme }) => theme.COLORS.profile};
	border-radius: 10px;
	padding: 2.5rem;
	display: grid;
	grid-template-columns: auto 1fr;
	grid-template-areas: 'img title' 'img desc' 'img footer';
	background-image: url('/Background.png');
	grid-gap: 1rem;
	align-items: center;
	img {
		grid-area: img;
		border-radius: 8px;
		width: 148px;
		height: 148px;
	}
	span {
		grid-area: title;
		display: flex;
		justify-content: space-between;
		align-items: center;
		h1 {
			color: ${props => props.theme.COLORS.title};
			font-size: ${props => props.theme.FONT_SIZE.TITLE.L}rem;
		}
	}
	p {
		grid-area: desc;
	}
	footer {
	}
	ul {
		grid-area: footer;
		display: flex;
		gap: 1.5rem;

		li {
			gap: 8px;
			list-style: none;
			display: flex;
			align-items: center;
			color: ${props => props.theme.COLORS.subtitle};

			svg {
				color: ${props => props.theme.COLORS.label};
			}
		}
	}
`;
