import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ButtonProps {
	color: string;
	enabled: boolean;
	load: boolean;
}
interface TitleProps {
	light: boolean;
}
export const Container = styled(RectButton) <ButtonProps>`
	width: 100%;

	justify-content: center;
	align-items: center;
	background-color: ${({ theme, color }) => color ? color : theme.colors.main};
	opacity: ${({ enabled, load }) => !enabled || load ? 0.5 : 1};
	padding: 19px;
	margin-bottom: 8px;
`;

export const Title = styled.Text <TitleProps>`
	font-family: ${({ theme }) => theme.fonts.primary_500};
	color: ${({ theme, light }) => light ? theme.colors.header : theme.colors.shape};
	font-size: ${RFValue(15)}px;
`;
