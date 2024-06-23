import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";

interface Props {
	border?: boolean;
}

export const Container = styled.View`
	width: 100%;
`;

export const InputElement = styled(TextInput) <Props>`
  min-height: 48px;
  vertical-align: top;
 ${({ theme, border = true }) => css`
    color: ${theme.COLORS.GRAY_7};
    background-color: ${theme.COLORS.GRAY_1};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
  	border: 1px solid ${border ? theme.COLORS.GRAY_7 : theme.COLORS.GRAY_4};
  `};

  border-radius: 6px;
  padding: 5px 16px;
`;

export const Label = styled.Text`
  ${({ theme }) => css`
	line-height: ${theme.FONT_SIZE.SM + (theme.FONT_SIZE.SM * 0.3)}px;
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.GRAY_7};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `};
`;
