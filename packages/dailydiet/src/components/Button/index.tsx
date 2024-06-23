import { TouchableOpacityProps } from "react-native";
import { ButtonTypeStyleProps, Container, Icon, Title } from "./styles";
import {
	Plus,
	ArrowLeft,
	ArrowUpRight,
	Trash,
	PencilSimpleLine
} from "phosphor-react-native";
import { useTheme } from "styled-components/native";

type Props = TouchableOpacityProps & {
	title: string;
	icon?: "BACK" | "PLUS" | "EDIT" | "DEL" | "MAX";
	type?: ButtonTypeStyleProps;
};

export function Button({ title, icon, type = "DEFAULT", ...rest }: Props) {
	const { COLORS } = useTheme();
	const ICONS: { [id: string]: React.JSX.Element } = {
		BACK: (
			<ArrowLeft
				size={24}
				color={type === "DEFAULT" ? COLORS.GRAY_7 : COLORS.GRAY_1}
			/>
		),
		PLUS: (
			<Plus
				size={24}
				color={type === "DEFAULT" ? COLORS.GRAY_7 : COLORS.GRAY_1}
			/>
		),
		EDIT: (
			<PencilSimpleLine
				size={24}
				color={type === "DEFAULT" ? COLORS.GRAY_7 : COLORS.GRAY_1}
			/>
		),
		DEL: (
			<Trash
				size={24}
				color={type === "DEFAULT" ? COLORS.GRAY_7 : COLORS.GRAY_1}
			/>
		),
		MAX: (
			<ArrowUpRight
				size={24}
				color={type === "DEFAULT" ? COLORS.GRAY_7 : COLORS.GRAY_1}
			/>
		)
	};

	return (
		<Container type={type} {...rest}>
			{icon && ICONS[icon]}
			<Title type={type}>{title}</Title>
		</Container>
	);
}
