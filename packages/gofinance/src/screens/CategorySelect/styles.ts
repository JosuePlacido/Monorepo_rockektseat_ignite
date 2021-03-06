import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface CategoryProps {
	isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
	flex: 1;
	background-color: ${({ theme }) => theme.COLORS.background};

`;
export const Header = styled.View`
	width: 100%;
	height: ${RFValue(113)}px;
	background-color: ${({ theme }) => theme.COLORS.primary};

	justify-content: flex-end;
	align-items: center;
	padding-bottom: 19px;
`;
export const Title = styled.Text`
	font-family: ${({ theme }) => theme.FONTS.regular};
	font-size: ${RFValue(18)}px;

	color: ${({ theme }) => theme.COLORS.shape};
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
	width: 100%;
	padding: ${RFValue(15)}px;

	flex-direction: row;
	align-items: center;

	background-color: ${({ theme, isActive }) => isActive ? theme.COLORS.secondary_light : theme.COLORS.background};
`;
export const Icon = styled(Feather)`
	font-size: ${RFValue(20)}px;
	margin-right: 16px;
	color: ${({ theme }) => theme.COLORS.text_dark};
`;

export const Name = styled.Text`
	font-family: ${({ theme }) => theme.FONTS.regular};
	font-size: ${RFValue(14)}px;

	color: ${({ theme }) => theme.COLORS.text_dark};
`;

export const Separator = styled.View`
	width: 100%;
	height: 1px;
	color: ${({ theme }) => theme.COLORS.text};
`;

export const Footer = styled.View`
	width: 100%;
	padding: 24px;
`;
