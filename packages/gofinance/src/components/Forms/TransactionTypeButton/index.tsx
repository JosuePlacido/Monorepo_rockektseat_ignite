import React from 'react';
import { TouchableOpacityProps, View } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Icon, Title, ButtonBody } from './styles';

interface Props extends RectButtonProps {
	title: string;
	type: 'up' | 'down';
	isActive: boolean;
}

const icons = {
	up: 'arrow-up-circle',
	down: 'arrow-down-circle',
	total: 'dollar-sign'
}

export default function Button({ title, type, isActive, ...rest }: Props) {
	return <Container type={type} isActive={isActive}>
		<ButtonBody {...rest}>
			<Icon name={icons[type]} type={type} />
			<Title>{title}</Title>
		</ButtonBody>
	</Container>;
}
