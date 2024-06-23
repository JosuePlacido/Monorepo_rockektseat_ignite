import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons'

export type HeaderTypeStyleProps = 'GOOD' | 'BAD';

type Props = {
	type?: HeaderTypeStyleProps;
}

export const Container = styled.View<Props>`
	flex-direction: row;
	height: 60px;

	background-color: ${({ theme, type }) => type === undefined ? theme.COLORS.GRAY_3 : type === 'GOOD' ? theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT};

	justify-content: center;
	align-items: center;
`;

export const Title = styled.Text`
	margin-right: 50px;
	flex: 1;
	text-align: center;
  ${({ theme }) => css`
	line-height: ${theme.FONT_SIZE.SM + (theme.FONT_SIZE.SM * 0.3)}px;
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.GRAY_7};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `};
`;
