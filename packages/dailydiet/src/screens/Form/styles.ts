import styled, { css } from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { SectionList, TouchableOpacity } from 'react-native';

export const Container = styled(SafeAreaView)`
	flex: 1;
	background-color: ${({ theme }) => theme.COLORS.GRAY_3};
`;

export const Content = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.COLORS.GRAY_1};
	border-radius: 20px;
	padding: 16px 24px;
	gap: 10px;
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
`;

export const HorizontalView = styled.View`
	flex-direction: row;
	justify-content: stretch;
	gap: 10px;
`;
export const ViewAux = styled.View`
	flex-direction: row;
	flex: 1;
`;

export const Footer = styled.View`
	margin-top: auto;
	bottom: 0;
`;
