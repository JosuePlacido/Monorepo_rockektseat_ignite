import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons'

export type ButtonTypeStyleProps = 'YES' | 'NO';

type Props = {
	type: ButtonTypeStyleProps;
	checked: boolean;
}

export const Container = styled(TouchableOpacity) <Props>`
  flex: 1;
  flex-direction: row;

  min-height: 56px;
  max-height: 56px;
  border: 1px solid ${({ theme, type, checked }) => checked ? type === 'YES' ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK : theme.COLORS.GRAY_2};

  background-color: ${({ theme, type, checked }) => checked ? type === 'YES' ? theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT : theme.COLORS.GRAY_2};

  border-radius: 6px;

  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
	margin-left: 8px;
  ${({ theme }) => css`
	line-height: ${theme.FONT_SIZE.SM + (theme.FONT_SIZE.SM * 0.3)}px;
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.GRAY_7};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `};
`;
