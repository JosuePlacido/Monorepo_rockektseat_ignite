import {
	NativeSyntheticEvent,
	Text,
	TextInput,
	TextInputChangeEventData,
	TextInputFocusEventData,
	TextInputProps,
	View
} from "react-native";
import { styles } from "./styles";
import { useRef, useState } from "react";
import { ButtonIcon } from "../ButtonIcon";
import { MagnifyingGlass } from "phosphor-react-native";
import { THEME } from "../../styles/theme";

export function Input({
	value,
	onBlur,
	onFocus,
	onChangeText,
	...rest
}: TextInputProps) {
	const refText = useRef(value);
	const [state, setState] = useState<"DEFAULT" | "FOCUSED" | "FILLED">(
		!!value ? "FILLED" : "DEFAULT"
	);

	function handleFocus(event: NativeSyntheticEvent<TextInputFocusEventData>) {
		setState("FOCUSED");
		onFocus && onFocus(event);
	}

	function handleChangeText(text: string) {
		refText.current = text;
		onChangeText && onChangeText(text);
	}
	function handleBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
		setState(!!refText.current ? "FILLED" : "DEFAULT");
		onBlur && onBlur(e);
	}

	return (
		<View style={styles.container}>
			<MagnifyingGlass
				weight="regular"
				color={
					state === "DEFAULT"
						? THEME.COLORS.GREY_400
						: state === "FILLED"
						? THEME.COLORS.YELLOW_DARK
						: THEME.COLORS.YELLOW
				}
			/>
			<TextInput
				style={styles.input}
				value={value}
				onBlur={handleBlur}
				onFocus={handleFocus}
				cursorColor={rest.cursorColor || THEME.COLORS.YELLOW}
				onChangeText={handleChangeText}
				placeholderTextColor={
					rest.placeholderTextColor || THEME.COLORS.GREY_400
				}
				{...rest}
			/>
		</View>
	);
}
