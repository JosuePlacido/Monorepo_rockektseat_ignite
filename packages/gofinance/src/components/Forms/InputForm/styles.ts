import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
	width: 100%;
`;
export const Error = styled.Text`
	color: ${({ theme }) => theme.COLORS.attention};
	font-family: ${({ theme }) => theme.FONTS.regular};
	font-size: ${RFValue(14)}px;

	margin-bottom: 7px;
`;
