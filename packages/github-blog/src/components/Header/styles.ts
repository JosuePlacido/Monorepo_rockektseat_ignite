import styled from 'styled-components';

export const HeaderContainer = styled.header`
	background: ${props => props.theme.COLORS.profile};
	background-image: url('/Cover.svg');
	background-size: cover;
	padding: 1.5rem 0;
`;

export const HeaderContent = styled.div`
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
