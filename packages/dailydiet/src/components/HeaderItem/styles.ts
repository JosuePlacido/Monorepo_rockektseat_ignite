import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
	padding: 8px;
	margin-top: 8px;
`;

export const Title = styled.Text`
	color: ${({ theme }) => theme.COLORS.GRAY_7};
	font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
	font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
`;
