import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';

export const Container = styled.View<TypeProps>`
	background-color: ${({ theme, type }) => type === 'total' ? theme.COLORS.secondary : theme.COLORS.shape};
	width: ${RFValue(300)}px;
	height: auto;
	border-radius: 5px;

	padding: 19px 23px;
	padding-bottom: ${RFValue(42)}px;
	margin-right: 16px;
`;
export const Header = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;
export const Title = styled.Text<TypeProps>`
	font-family: ${({ theme }) => theme.FONTS.regular};
	font-size: ${RFValue(14)}px;
	color: ${({ theme, type }) => type === 'total' ? theme.COLORS.shape : theme.COLORS.text_dark};
`;

interface TypeProps {
	type: 'up' | 'down' | 'total';
}
const colors = {
	up: theme.COLORS.success,
	down: theme.COLORS.attention,
	total: theme.COLORS.shape
}
export const Icon = styled(Feather) <TypeProps>`
	font-size: ${RFValue(40)}px;
	color: ${({ type }) => colors[type]};
`;
export const Footer = styled.View`

`;
export const Amount = styled.Text<TypeProps>`
	font-family: ${({ theme }) => theme.FONTS.medium};
	font-size: ${RFValue(32)}px;
	color: ${({ theme, type }) => type === 'total' ? theme.COLORS.shape : theme.COLORS.text_dark};
	margin-top: 38px;
`;
export const LastTransaction = styled.Text<TypeProps>`
	font-family: ${({ theme }) => theme.FONTS.regular};
	font-size: ${RFValue(12)}px;
	color: ${({ theme, type }) => type === 'total' ? theme.COLORS.shape : theme.COLORS.text};

`;

