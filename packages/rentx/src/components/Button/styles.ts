import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ButtonProps extends RectButtonProps {
	color: string;
	enabled: boolean;
	load: boolean;
}
export const Container = styled(RectButton) <ButtonProps>`
	width: 100%;

	justify-content: center;
	align-items: center;
	background-color: ${({ theme, color }) => color ? color : theme.colors.main};
	opacity: ${({ enabled, load }) => !enabled || load ? 0.5 : 1};
	padding: 19px;
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_500};
	color: ${({ theme }) => theme.colors.shape};
	font-size: ${RFValue(15)}px;
`;
