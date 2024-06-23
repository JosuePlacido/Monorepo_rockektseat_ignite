import styled, { css } from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { SectionList, TouchableOpacity } from 'react-native';

type Props = {
	success: boolean;
}
export const Container = styled(SafeAreaView) <Props>`
	flex: 1;
	background-color: ${({ theme, success }) => success ? theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT};
`;

export const Content = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.COLORS.GRAY_1};
	border-radius: 20px 20px 0 0;
	padding: 24px;
	gap: 10px;
`;
export const Title = styled.Text`
	margin-top: 10px;
  ${({ theme }) => css`
	line-height: ${theme.FONT_SIZE.LG + (theme.FONT_SIZE.LG * 0.3)}px;
    font-size: ${theme.FONT_SIZE.LG}px;
    color: ${theme.COLORS.GRAY_7};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `};
`;

export const Description = styled.Text`
  ${({ theme }) => css`
	line-height: ${theme.FONT_SIZE.MD + (theme.FONT_SIZE.MD * 0.3)}px;
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.GRAY_6};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `};
`;

export const Label = styled.Text`
  ${({ theme }) => css`
	line-height: ${theme.FONT_SIZE.xs + (theme.FONT_SIZE.xs * 0.3)}px;
    font-size: ${theme.FONT_SIZE.xs}px;
    color: ${theme.COLORS.GRAY_7};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `};
`;

export const Text = styled.Text`
  ${({ theme }) => css`
	line-height: ${theme.FONT_SIZE.MD + (theme.FONT_SIZE.MD * 0.3)}px;
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.GRAY_7};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `};
`;

export const TextTag = styled.Text`
  ${({ theme }) => css`
	line-height: ${theme.FONT_SIZE.SM + (theme.FONT_SIZE.SM * 0.3)}px;
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.GRAY_7};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `};
`;
export const HorizontalView = styled.View`
	flex-direction: row;
	margin-right: auto;
	background-color: ${({ theme }) => theme.COLORS.GRAY_2};
	align-items: center;
	gap: 15px;
	padding: 8px 16px;
	border-radius: 40px;
	margin-bottom: auto;
`;

export const Footer = styled.View`
	gap: 10px;
`;
