import { TouchableOpacityProps } from "react-native";
import { Container } from "./styles";
import { useTheme } from "styled-components/native";
import { ArrowLeft, ArrowUpRight } from "phosphor-react-native";

type Props = TouchableOpacityProps & {
	icon?: "BACK" | "MAX";
};

export function ButtonIcon({ icon = "BACK", ...rest }: Props) {
	const { COLORS } = useTheme();
	const ICONS: { [id: string]: React.JSX.Element } = {
		BACK: <ArrowLeft size={24} color={COLORS.GRAY_7} />,
		MAX: <ArrowUpRight size={24} color={COLORS.GRAY_7} />
	};
	return <Container {...rest}>{ICONS[icon]}</Container>;
}
