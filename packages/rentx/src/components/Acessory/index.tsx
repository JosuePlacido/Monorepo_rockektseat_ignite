import React from 'react';
import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components';
import { Container, Title } from './styles';

interface Props {
	name: string;
	icon: React.FC<SvgProps>;
}
export default function Acessory({ name, icon: Icon }: Props) {
	const theme = useTheme();
	return (
		<Container>
			<Icon width={32} height={32} fill={theme.colors.header} />
			<Title>{name}</Title>
		</Container>
	);
}
