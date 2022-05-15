import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';

interface AmountProps {
	type: 'positive' | 'negative';
}
const colors = {
	negative: theme.COLORS.attention,
	positive: theme.COLORS.success
}

export const Container = styled.View`
	background-color: ${({ theme }) => theme.COLORS.shape};
	border-radius: 5px;

	padding: 17px 24px;
	margin-bottom: 16px;
`;
export const Title = styled.Text`
	font-family: ${({ theme }) => theme.FONTS.regular};
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.COLORS.text_dark};
`;
export const Amount = styled.Text<AmountProps>`
	font-family: ${({ theme }) => theme.FONTS.regular};
	font-size: ${RFValue(20)}px;
	color: ${({ theme, type }) => colors[type]};
	margin-top: 2px;
`;
export const Footer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-top: 19px;
`;

export const Category = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
export const Icon = styled(Feather)`
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.COLORS.text};
`;
export const CategoryName = styled.Text`
	font-family: ${({ theme }) => theme.FONTS.regular};
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.COLORS.text};

	margin-left: 17px;
`;
export const Date = styled.Text`
	font-family: ${({ theme }) => theme.FONTS.regular};
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.COLORS.text};
`;
