import { FlatList, FlatListProps } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { CarDTO } from '../../DTOs/carDTO';
import theme from '../../styles/theme';

export const Container = styled.View`
   flex: 1;

   background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
	background-color: ${({ theme }) => theme.colors.header};
	height: 113px;
	width: 100%;
	justify-content: flex-end;
	padding: 32px 24px;
`;

export const HeaderContent = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const TotalCars = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_400};
	font-size: ${RFValue(15)}px;
	color: ${({ theme }) => theme.colors.text};
`;


export const CarList = styled(FlatList as new (props: FlatListProps<CarDTO>) => FlatList<CarDTO>).attrs({
	contentContainerStyle: {
		padding: 24
	},
	showsVerticalScrollIndicator: false
})`
`;

export const MyCarsButton = styled(RectButton)`
	position: absolute;
	bottom: 13px;
	right: 22px;
	width: 60px;
	height: 60px;

	justify-content: center;
	align-items: center;

	background-color: ${({ theme }) => theme.colors.main};
	border-radius: 30px;
`;
