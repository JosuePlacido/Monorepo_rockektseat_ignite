import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ButtonProps extends RectButtonProps {
	color: string;
}
export const Container = styled(RectButton) <ButtonProps>`
	width: 100%;

	justify-content: center;
	align-items: center;
	background-color: ${({ theme, color }) => color ? color : theme.colors.main};

	padding: 19px;
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_500};
	color: ${({ theme }) => theme.colors.shape};
	font-size: ${RFValue(15)}px;
`;
