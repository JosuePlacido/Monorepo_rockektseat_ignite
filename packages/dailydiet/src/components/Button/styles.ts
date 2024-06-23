import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons'

export type ButtonTypeStyleProps = 'DEFAULT' | 'DARK';

type Props = {
	type: ButtonTypeStyleProps;
}

export const Container = styled(TouchableOpacity) <Props>`
	flex-direction: row;

	min-height: 56px;
	max-height: 56px;
	border: 1px solid ${({ theme }) => theme.COLORS.GRAY_6};

	background-color: ${({ theme, type }) => type === 'DEFAULT' ? theme.COLORS.GRAY_1 : theme.COLORS.GRAY_6};

	border-radius: 6px;

	justify-content: center;
	align-items: center;
	padding: 16px;

	gap: 10px;
`;

export const Title = styled.Text<Props>`
	${({ theme, type }) => css`
		line-height: ${theme.FONT_SIZE.SM + (theme.FONT_SIZE.SM * 0.3)}px;
		font-size: ${theme.FONT_SIZE.SM}px;
		color: ${type === 'DEFAULT' ? theme.COLORS.GRAY_7 : theme.COLORS.WHITE};
		font-family: ${theme.FONT_FAMILY.BOLD};
  `};
`;

export const Icon = styled(MaterialIcons).attrs<Props>(({ theme, type }) => ({
	size: 14,
	color: type === 'DEFAULT' ? theme.COLORS.GRAY_7 : theme.COLORS.WHITE
}))`
`;
