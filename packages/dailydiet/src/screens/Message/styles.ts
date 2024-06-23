import styled, { css } from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { SectionList, TouchableOpacity } from 'react-native';

export const Container = styled(SafeAreaView)`
	flex: 1;
	background-color: ${({ theme }) => theme.COLORS.GRAY_1};
	justify-content: center;
	align-items: center;
	padding: 32px;
`;

export const Image = styled.Image`
	border: solid 2px ${({ theme }) => theme.COLORS.GRAY_7};
	margin: 24px 0;
`;

interface Props {
	success: boolean;
}

export const Title = styled.Text<Props>`
	margin-bottom: 10px;
	text-align: center;
  ${({ theme, success }) => css`
	line-height: ${theme.FONT_SIZE.XXL + (theme.FONT_SIZE.XXL * 0.3)}px;
    font-size: ${theme.FONT_SIZE.XXL}px;
    color: ${success ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `};
`;

export const Description = styled.Text`
	text-align: center;
  ${({ theme }) => css`
	line-height: ${theme.FONT_SIZE.SM + (theme.FONT_SIZE.SM * 0.3)}px;
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.GRAY_6};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `};
`;

export const Text = styled.Text`
  ${({ theme }) => css`
	line-height: ${theme.FONT_SIZE.MD + (theme.FONT_SIZE.MD * 0.3)}px;
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.GRAY_7};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `};
	margin-bottom: 8px;
`;
