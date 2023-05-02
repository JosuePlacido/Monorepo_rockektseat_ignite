import React from 'react';
import { TextInputProps, View } from 'react-native';

import { Container } from './styles';

interface Props extends TextInputProps {
	active?: boolean;
}
export default function Input({ active = false, ...rest }: Props) {
	return <Container active={active} {...rest} />;
}
