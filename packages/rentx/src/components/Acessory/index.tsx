import React from 'react';
import { SvgProps } from 'react-native-svg';
import { Container, Title } from './styles';

interface Props {
	name: string;
	icon: React.FC<SvgProps>;
}
export default function Acessory({ name, icon: Icon }: Props) {
	return (
		<Container>
			<Icon width={32} height={32} />
			<Title>{name}</Title>
		</Container>
	);
}
