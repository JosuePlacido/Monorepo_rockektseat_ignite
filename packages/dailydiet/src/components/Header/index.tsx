import { TouchableOpacityProps } from "react-native";
import { Container, HeaderTypeStyleProps, Title } from "./styles";
import {
	Plus,
	ArrowLeft,
	ArrowUpRight,
	Trash,
	PencilSimpleLine
} from "phosphor-react-native";
import { useTheme } from "styled-components/native";
import { ButtonIcon } from "@components/ButtonIcon";
import { useNavigation } from "@react-navigation/native";

type Props = {
	title: string;
	type?: HeaderTypeStyleProps;
};

export function Header({ title, type }: Props) {
	const navigation = useNavigation();
	function handleBack() {
		navigation.goBack();
	}
	return (
		<Container type={type}>
			<ButtonIcon onPress={handleBack} />
			<Title>{title}</Title>
		</Container>
	);
}
