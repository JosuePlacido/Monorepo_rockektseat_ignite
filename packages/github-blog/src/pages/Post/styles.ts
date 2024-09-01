import styled from 'styled-components';

export const Container = styled.section`
	margin-top: -90px;
	margin-bottom: 100px;
	flex: 1;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
`;
export const Header = styled.header`
	background-color: ${({ theme }) => theme.COLORS.profile};
	border-radius: 10px;
	padding: 2.5rem;
	display: flex;
	flex-direction: column;
	background-image: url('/Background.png');
	gap: 1rem;
	align-items: stretch;
	span {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	h1 {
		color: ${props => props.theme.COLORS.title};
		font-size: ${props => props.theme.FONT_SIZE.TITLE.L}rem;
	}
	ul {
		display: flex;
		gap: 2rem;

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

export const Content = styled.body`
	background-color: transparent;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	padding: 2.5rem 2rem;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
	img {
		max-width: 100%;
	}
`;
