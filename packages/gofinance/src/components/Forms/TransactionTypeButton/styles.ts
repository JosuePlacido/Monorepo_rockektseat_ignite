import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { css } from 'styled-components';
import { RectButton } from 'react-native-gesture-handler';


interface TransactionProps {
	isActive: boolean;
	type: 'up' | 'down';
}
export const Container = styled.View<TransactionProps>`
	width: 48%;
	${({ isActive, type }) => isActive && type === 'up' && css`
		background-color: ${({ theme }) => theme.COLORS.success_light};
	`}

	${({ isActive, type }) => isActive && type === 'down' && css`
		background-color: ${({ theme }) => theme.COLORS.attention_light};
	`}
	border: ${({ isActive }) => isActive ? 0 : 1.5}px solid ${({ theme }) => theme.COLORS.text};
`;

export const ButtonBody = styled(RectButton)`
	flex-direction: row;
	align-items: center;
	justify-content: center;

	padding: 16px;
`;
export const Title = styled.Text`
	font-family: ${({ theme }) => theme.FONTS.regular};
	font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather) <TransactionProps>`
	font-size: ${RFValue(24)}px;
	font-family: ${({ theme }) => theme.FONTS.regular};
	margin-right: 12px;

	color: ${({ theme, type }) => type === 'up' ? theme.COLORS.success : theme.COLORS.attention};
`;
