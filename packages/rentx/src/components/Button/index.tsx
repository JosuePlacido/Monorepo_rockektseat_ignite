import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import theme from '../../styles/theme';
import { Container, Title } from './styles';

interface Props extends RectButtonProps {
	title: string;
	color?: string;
	load?: boolean;
	light?: boolean;
}
export default function Button({
	title,
	color,
	enabled = true,
	load = false,
	light = false,
	...rest
}: Props) {
	const theme = useTheme();
	return (
		<Container load={load} enabled={enabled} {...rest} color={color}>
			{load ? (
				<ActivityIndicator color={theme.colors.shape} />
			) : (
				<Title light={light}>{title}</Title>
			)}
		</Container>
	);
}
