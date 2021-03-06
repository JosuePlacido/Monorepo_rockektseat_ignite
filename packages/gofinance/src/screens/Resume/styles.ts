import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';


export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.COLORS.background}
`;

export const Header = styled.View`
	background-color: ${({ theme }) => theme.COLORS.primary};
	width: 100%;
	height: ${RFValue(113)}px;

	align-items:center;
	justify-content: flex-end;
	padding-bottom: 19px;

`;
export const Title = styled.Text`
	font-family: ${({ theme }) => theme.FONTS.regular};
	color: ${({ theme }) => theme.COLORS.shape};
	font-size: ${RFValue(18)}px;
`;
export const Content = styled.ScrollView.attrs({
	contentContainerStyle: { paddingHorizontal: 24 }
})`
flex: 1;
`;

export const ChartContainer = styled.View`
	width: 100%;
	align-items: center;
`;
export const MonthSelect = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0 24px;
	margin-top: 24px;
`;
export const MonthSelectButton = styled(BorderlessButton)`

`;
export const MonthSelectIcon = styled(Feather)`
	font-family: ${({ theme }) => theme.FONTS.regular};
	font-size: ${RFValue(24)}px;`;
export const Month = styled.Text`
	font-family: ${({ theme }) => theme.FONTS.regular};
	font-size: ${RFValue(20)}px;
`;

export const LoadContainer = styled.View`
	flex:1;
	background-color: ${({ theme }) => theme.COLORS.background};
	justify-content: center;
	align-items: center;
`;
