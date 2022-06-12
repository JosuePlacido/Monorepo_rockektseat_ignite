import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import theme from '../../styles/theme';
import { Container, Title } from './styles';

interface Props {
	title: string;
	color?: string;
	onPress: () => void;
	enable?: boolean;
	load?: boolean;
}
export default function Button({
	title,
	color,
	enable = true,
	load = false,
	...rest
}: Props) {
	const theme = useTheme();
	return (
		<Container load={load} enabled={enable} {...rest} color={color}>
			{load ? (
				<ActivityIndicator color={theme.colors.shape} />
			) : (
				<Title>{title}</Title>
			)}
		</Container>
	);
}
