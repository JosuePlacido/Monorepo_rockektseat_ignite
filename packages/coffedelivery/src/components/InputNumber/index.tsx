import { Text, View } from "react-native";
import { styles } from "./styles";
import { useState } from "react";
import { ButtonIcon } from "../ButtonIcon";

type Props = {
	value: number;
	updateValue: (value: number) => void;
};
export function InputNumber({ value, updateValue }: Props) {
	const [count, setCount] = useState(value);

	function handleChange(value: number) {
		if (value < 1) return;
		setCount(value);
		updateValue(value);
	}

	return (
		<View style={styles.container}>
			<ButtonIcon
				variant="MINUS"
				onPress={() => handleChange(count - 1)}
			/>
			<Text style={styles.title}>{count}</Text>
			<ButtonIcon
				variant="PLUS"
				onPress={() => handleChange(count + 1)}
			/>
		</View>
	);
}
