import styled from 'styled-components';

export const Container = styled.article`
	background-color: ${props => props.theme.COLORS.post};
	border: 1px solid transparent;
	border-radius: 10px;
	display: grid;
	grid-template-areas: 'header time' 'body body';
	grid-template-columns: 1fr auto;
	grid-row-gap: 1.25rem;
	grid-column-gap: 1rem;
	padding: 2rem;
	max-height: 260px;
	overflow: hidden;
	cursor: pointer;
	header {
		grid-area: header;
		color: ${props => props.theme.COLORS.title};
		font-size: ${props => props.theme.FONT_SIZE.TITLE.M};
		font-weight: bold;
	}
	time {
		grid-area: time;
		color: ${props => props.theme.COLORS.span};
		font-size: ${props => props.theme.FONT_SIZE.TEXT.S};
	}
	main {
		background-color: transparent;
		grid-area: body;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	&:hover {
		border-color: ${props => props.theme.COLORS.label};
	}
`;
