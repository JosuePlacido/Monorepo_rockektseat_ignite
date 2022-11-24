import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { Container, IconContainer, InputText } from './styles';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

interface InputProps extends TextInputProps {
	iconName: React.ComponentProps<typeof Feather>['name'];
	value?: string;
}

export default function PasswordInput({
	iconName,
	value,
	...rest
}: InputProps) {
	const theme = useTheme();
	const [isVisible, setIsVisible] = useState(false);
	const [isFocus, setIsFocus] = useState(false);
	const [isFilled, setIsFilled] = useState(false);

	function hqandleVisible() {
		setIsVisible(!isVisible);
	}

	function handleInputFocus() {
		setIsFocus(true);
	}
	function handleInputBlur() {
		setIsFocus(false);
		setIsFilled(!!value);
	}

	return (
		<Container>
			<IconContainer isFocus={isFocus}>
				<Feather
					name={iconName}
					size={24}
					color={
						isFocus || isFilled
							? theme.colors.main
							: theme.colors.text_detail
					}
				/>
			</IconContainer>
			<InputText
				secureTextEntry={isVisible}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				isFocus={isFocus}
				autoCorrect={false}
				{...rest}
			/>
			<BorderlessButton onPress={hqandleVisible}>
				<IconContainer isFocus={isFocus}>
					<Feather
						name={isVisible ? 'eye' : 'eye-off'}
						size={24}
						color={theme.colors.text_detail}
					/>
				</IconContainer>
			</BorderlessButton>
		</Container>
	);
}
