import styled, { css } from 'styled-components/native';

export const Container = styled.TouchableOpacity`
	flex-direction: row;

	border-radius: 6px;
	border: 1px solid ${({ theme }) => theme.COLORS.GRAY_4};
	padding: 8px;
	margin-bottom: 8px;

	align-items: center;
	gap: 10px;

	background-color: 'red';
`;

export const Hour = styled.Text`
	color: ${({ theme }) => theme.COLORS.GRAY_7};
	font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
	font-size: ${({ theme }) => theme.FONT_SIZE.xs}px;
`;
export const Separator = styled.Text`
	color: ${({ theme }) => theme.COLORS.GRAY_4};
	font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
	font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
`;

export const Title = styled.Text`
	flex: 1;
	color: ${({ theme }) => theme.COLORS.GRAY_7};
	font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
	font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
	text-overflow: ellipsis;
	text-wrap: wrap;
`;
