import styled, { css } from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { SectionList, TouchableOpacity } from 'react-native';
import { ISnack } from '@models/snacks';
import { IDataSnack } from '@storage/snacks/getAll';

export const Container = styled(SafeAreaView)`
	flex: 1;
	background-color: ${({ theme }) => theme.COLORS.GRAY_1};

	padding: 32px;
`;

export const Header = styled.View`
	flex-direction: row;

	justify-content: space-between;
	align-items: center;
	margin-bottom: 24px;
`;

export const UserImage = styled.Image`
	border-radius: 50px;
	width: 40px;
	height: 40px;
	border: solid 2px ${({ theme }) => theme.COLORS.GRAY_7};
`;

interface Props {
	isBad?: boolean;
}

export const Highlight = styled.View<Props>`
	border-radius: 8px;
	background-color: ${({ theme, isBad }) => isBad ? theme.COLORS.RED_LIGHT : theme.COLORS.GREEN_LIGHT};
	padding: 12px;
	padding-bottom: 24px;
	margin-bottom: 16px;
`;

export const HighlightHeader = styled.View`
	align-items: flex-end;
`;

export const HighlightHeaderButtton = styled(TouchableOpacity)`
	justify-content: center;
	align-items: center;
`;

export const TitleHighlight = styled.Text`
	margin-top: -10px;
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
  ${({ theme }) => css`
	line-height: ${theme.FONT_SIZE.MD + (theme.FONT_SIZE.MD * 0.3)}px;
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.GRAY_7};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `};
	margin-bottom: 8px;
`;
export const ListView = styled(SectionList<ISnack, IDataSnack>)`
	margin-top: 8px;
`;
