import styled, { css } from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { SectionList, TouchableOpacity } from 'react-native';

interface Props {
	isBad?: boolean;
}

export const Container = styled(SafeAreaView) <Props>`
	flex: 1;
	background-color: ${({ theme, isBad = false }) => isBad ? theme.COLORS.RED_LIGHT : theme.COLORS.GREEN_LIGHT};
`;

export const UserImage = styled.Image`
	border-radius: 50px;
	width: 40px;
	height: 40px;
	border: solid 2px ${({ theme }) => theme.COLORS.GRAY_7};
`;


export const Header = styled.View<Props>`
	background-color: ${({ theme, isBad = false }) => isBad ? theme.COLORS.RED_LIGHT : theme.COLORS.GREEN_LIGHT};
	padding: 12px;
	padding-bottom: 34px;
`;

export const HighlightHeader = styled.View`
	align-items: flex-start;
`;

export const HeaderButtton = styled(TouchableOpacity)`
	justify-content: center;
	align-items: center;
`;


export const Content = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.COLORS.GRAY_1};
	border-radius: 20px;
	padding: 16px 24px;
`;

export const TitleHeader = styled.Text`
	text-align: center;
  ${({ theme }) => css`
	line-height: ${theme.FONT_SIZE.XXL + (theme.FONT_SIZE.XXL * 0.3)}px;
    font-size: ${theme.FONT_SIZE.XXL}px;
    color: ${theme.COLORS.GRAY_7};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `};
`;

export const SubtitleHeader = styled.Text`
	text-align: center;
  ${({ theme }) => css`
	line-height: ${theme.FONT_SIZE.SM + (theme.FONT_SIZE.SM * 0.3)}px;
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.GRAY_6};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `};
`;
type PropsHighlight = {
	variant?: 'DEFAULT' | 'GOOD' | 'BAD';
}

export const HighlightDefault = styled.View`
	border-radius: 8px;
	background-color: ${({ theme }) => theme.COLORS.GRAY_3};
	padding: 12px;
	padding-bottom: 24px;
	margin-bottom: 16px;
`;
export const Highlight = styled.View<PropsHighlight>`
	border-radius: 8px;
	width: 48%;
	background-color: ${({ theme, variant = 'GOOD' }) => variant === 'GOOD' ? theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT};
	padding: 12px;
	padding-bottom: 24px;
	margin-bottom: 16px;
`;

export const TitleHighlight = styled.Text`
	text-align: center;
  ${({ theme }) => css`
	line-height: ${theme.FONT_SIZE.XXL + (theme.FONT_SIZE.XXL * 0.3)}px;
    font-size: ${theme.FONT_SIZE.XXL}px;
    color: ${theme.COLORS.GRAY_7};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `};
`;

export const SubtitleHighlight = styled.Text`
	text-align: center;
  ${({ theme }) => css`
	line-height: ${theme.FONT_SIZE.SM + (theme.FONT_SIZE.SM * 0.3)}px;
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.GRAY_6};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `};
`;

export const Text = styled.Text`
	width: 100%;
	text-align: center;
  ${({ theme }) => css`
	line-height: ${theme.FONT_SIZE.MD + (theme.FONT_SIZE.MD * 0.3)}px;
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.GRAY_7};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `};
	margin: 16px 0;
`;

export const HorizontalView = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;
