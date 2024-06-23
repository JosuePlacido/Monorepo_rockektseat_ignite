import { useRef, useState } from "react";
import {
	NativeSyntheticEvent,
	TextInput,
	TextInputFocusEventData,
	TextInputProps,
	View
} from "react-native";
import { useTheme } from "styled-components/native";
import { Container, InputElement, Label } from "./styles";

type Props = TextInputProps & {
	label: string;
	inputRef?: React.RefObject<TextInput>;
};

export function Input({
	label,
	inputRef,
	onBlur,
	onFocus,
	onChangeText,
	...rest
}: Props) {
	const { COLORS } = useTheme();
	const refText = useRef<string>("");
	const [border, setBorder] = useState<boolean>(false);

	function handleOnBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
		setBorder(refText.current.length > 0);
		if (onBlur !== undefined) onBlur(e);
	}
	function handleOnFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
		setBorder(true);
		if (onFocus !== undefined) onFocus(e);
	}
	function handleChangeText(newText: string) {
		refText.current = newText;
		if (onChangeText !== undefined) {
			onChangeText(newText);
		}
	}

	return (
		<Container>
			<Label>{label}</Label>
			<InputElement
				ref={inputRef}
				border={border}
				onFocus={handleOnFocus}
				onBlur={handleOnBlur}
				cursorColor={COLORS.GRAY_7}
				placeholderTextColor={COLORS.GRAY_4}
				onChangeText={handleChangeText}
				{...rest}
			/>
		</Container>
	);
}
