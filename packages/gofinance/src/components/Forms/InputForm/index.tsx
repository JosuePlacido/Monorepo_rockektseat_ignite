import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import Input from '../Input';
import { Container, Error } from './styles';

interface InputProps extends TextInputProps {
	control: Control;
	name: string;
	erro?: string;
}

export default function InputForm({
	control,
	name,
	erro,
	...rest
}: InputProps) {
	return (
		<Container>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<Input onChangeText={onChange} value={value} {...rest} />
				)}
				name={name}
			/>
			{erro && <Error>{erro}</Error>}
		</Container>
	);
}
