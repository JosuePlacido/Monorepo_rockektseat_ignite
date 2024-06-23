import { TouchableOpacityProps } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ButtonTypeStyleProps, Container, Title } from "./styles";
import { useTheme } from "styled-components/native";

type Props = TouchableOpacityProps & {
	type?: ButtonTypeStyleProps;
	checked?: boolean;
};

export function ToggleButton({
	checked = false,
	type = "YES",
	...rest
}: Props) {
	const { COLORS } = useTheme();
	return (
		<Container checked={checked} type={type} {...rest}>
			<FontAwesome
				name="circle"
				size={8}
				color={type === "YES" ? COLORS.GREEN_DARK : COLORS.RED_DARK}
			/>
			<Title>{type === "YES" ? "Sim" : "Não"}</Title>
		</Container>
	);
}
