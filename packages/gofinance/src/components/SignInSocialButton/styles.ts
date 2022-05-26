import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Button = styled(RectButton)`
	height: ${RFValue(56)}px;
	background-color: ${({ theme }) => theme.COLORS.shape};
	border-radius: 5px;

	align-items: center;
	flex-direction: row;

	margin-bottom: 16px;
`;
export const ImageContainer = styled.View`
	height: 100%;
	border-color: ${({ theme }) => theme.COLORS.background};
	border-right-width: 1px;
	justify-content: center;
	align-items: center;
	padding: ${RFValue(16)}px;
`;
export const Text = styled.Text`
	flex: 1;
	text-align: center;
	font-family: ${({ theme }) => theme.FONTS.medium};
	font-size: ${RFValue(14)}px;
`;
