import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;

	background-color: #00000080;
	padding: 24px;
`;

export const ModalView = styled.View`
	border-radius: 8px;
	padding: 32px 16px;
	margin: auto;
	background-color: ${({ theme }) => theme.COLORS.WHITE};
	gap: 20px;
    elevation: 5;
`;

export const HorizontalView = styled.View`
	flex-direction: row;
	gap: 10px;
`;

export const WrapperButton = styled.View`
	flex: 1;
`;
export const Title = styled.Text`
	text-align: center;
	color: ${({ theme }) => theme.COLORS.GRAY_6};
	font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
	font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
`;
