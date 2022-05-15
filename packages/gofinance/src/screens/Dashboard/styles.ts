import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

import { TransactionProps } from '.';
import { BorderlessButton } from 'react-native-gesture-handler';


export const Container = styled.View`
	flex:1;
	background-color: ${({ theme }) => theme.COLORS.background};
`;

export const Header = styled.View`
	background-color: ${({ theme }) => theme.COLORS.primary};
	width: 100%;
	height: ${RFPercentage(42)}px;
	flex-direction: row;
	justify-content: center;
	align-items: flex-start;
`;

export const UserWrapper = styled.View`
	margin-top: ${getStatusBarHeight() + RFValue(28)}px;
	width: 100%;
	padding: 0 24px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
export const UserInfo = styled.View`
	flex-direction: row;
	align-items: center;

`;
export const Photo = styled.Image`
	width: ${RFValue(48)}px;
	height: ${RFValue(48)}px;
	border-radius: ${RFValue(8)}px;
`;
export const User = styled.View`
	margin-left: 17px;
`;
export const UserGreeting = styled.Text`
	color: ${({ theme }) => theme.COLORS.shape};
	font-size: ${RFValue(18)}px;
	font-family: ${({ theme }) => theme.FONTS.regular};

`;
export const UserName = styled.Text`
	color: ${({ theme }) => theme.COLORS.shape};
	font-size: ${RFValue(18)}px;
	font-family: ${({ theme }) => theme.FONTS.bold};
`;

export const LogoutButton = styled(BorderlessButton)`
`;
export const PowerIcon = styled(Feather)`
	font-size: ${RFValue(24)}px;
	color: ${({ theme }) => theme.COLORS.secondary};
`;

export const HighlightCards = styled.ScrollView.attrs({
	horizontal: true,
	showsHorizontalScrollIndicator: false,
	contentContainerStyle: { paddingHorizontal: 24 }
})`

	width: 100%;
	position: absolute;
	margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
	flex: 1;
	padding: 0 24px;
	margin-top: ${RFPercentage(12)}px;
`;

export const TransactionList = styled(
	FlatList as new (props: FlatListProps<TransactionProps>) => FlatList<TransactionProps>
).attrs({
	showsVerticalScrollIndicator: false,
	contentContainerStyle: {
		paddingBottom: getBottomSpace()
	}
})`
`;
export const Title = styled.Text`
	font-size: ${RFValue(18)}px;
	font-family: ${({ theme }) => theme.FONTS.regular};
	margin-bottom: 16px;
`;
