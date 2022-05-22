import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ContainerProps {
	color: string;
}
export const Container = styled.View<ContainerProps>`
	width: 100%;
	background-color: ${({ theme }) => theme.COLORS.shape};
	flex-direction: row;
	justify-content: space-between;
	border-left-width: 5px;
	border-left-color: ${({ color }) => color};
	align-items: center;
	border-radius: 5px;
	padding: 13px 24px;
	margin-bottom: 8px;
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.FONTS.regular};
	font-size: ${RFValue(15)}px;
	color: ${({ theme }) => theme.COLORS.text_dark};
`;
export const Amount = styled.Text`
	font-family: ${({ theme }) => theme.FONTS.bold};
	font-size: ${RFValue(15)}px;
	color: ${({ theme }) => theme.COLORS.text_dark};
`;
