
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { Container, IconContainer, InputText } from './styles';
import { TextInputProps } from 'react-native';


interface InputProps extends TextInputProps {
	iconName: React.ComponentProps<typeof Feather>['name'];
	value?: string;
}

export default function Input({
	iconName,
	value,
	...rest
}: InputProps) {
	const [isFocus, setIsFocus] = useState(false);
	const [isFilled, setIsFilled] = useState(false);

	function handleInputFocus() {
		setIsFocus(true);
	}
	function handleInputBlur() {
		setIsFocus(false);
		setIsFilled(!!value);
	}


	const theme = useTheme();
	return (
		<Container>
			<IconContainer isFocus={isFocus}>
				<Feather name={iconName} size={24} color={isFocus || isFilled ? theme.colors.main : theme.colors.text_detail} />
			</IconContainer>
			<InputText
				isFocus={isFocus}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				{...rest} />
		</Container>
	);
}
