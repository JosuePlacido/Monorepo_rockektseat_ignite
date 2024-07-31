import { PressableProps, Pressable } from "react-native";
import { styles } from "./styles";
import { THEME } from "../../styles/theme";
import { useState } from "react";
import { ArrowLeft, Minus, Plus, Trash } from "phosphor-react-native";

type Props = PressableProps & {
	variant?: "MINUS" | "DARK_BACK" | "BACK" | "PLUS" | "TRASH";
};
export function ButtonIcon({ variant = "PLUS", ...rest }: Props) {
	const [pressed, setPressed] = useState(false);
	const ICONS: { [id: string]: React.JSX.Element } = {
		MINUS: (
			<Minus
				size={24}
				color={pressed ? THEME.COLORS.PURPLE_DARK : THEME.COLORS.PURPLE}
			/>
		),
		DARK_BACK: <ArrowLeft size={24} color={THEME.COLORS.WHITE} />,
		BACK: <ArrowLeft size={24} color={THEME.COLORS.GREY_100} />,
		PLUS: (
			<Plus
				size={24}
				color={pressed ? THEME.COLORS.PURPLE_DARK : THEME.COLORS.PURPLE}
			/>
		),
		TRASH: (
			<Trash
				size={24}
				color={pressed ? THEME.COLORS.PURPLE : THEME.COLORS.PURPLE_DARK}
			/>
		)
	};

	return (
		<Pressable
			style={[
				styles.container,
				{
					backgroundColor:
						pressed && variant !== "DARK_BACK"
							? THEME.COLORS.GREY_700
							: pressed
							? THEME.COLORS.GREY_200
							: variant === "TRASH"
							? THEME.COLORS.GREY_600
							: "transparent"
				}
			]}
			onPressIn={() => setPressed(true)}
			onPressOut={() => setPressed(false)}
			{...rest}
		>
			{ICONS[variant]}
		</Pressable>
	);
}
