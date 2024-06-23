import SuccessImg from "@assets/success.png";
import WarningImg from "@assets/warn.png";
import { Button } from "@components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { Container, Description, Image, Title } from "./styles";

type RouteParams = {
	success: boolean;
};
export function Message() {
	const navigation = useNavigation();

	const route = useRoute();
	const { success } = route.params as RouteParams;

	function handleGoHome() {
		navigation.navigate("home");
	}

	return (
		<Container>
			<Title success={success}>
				{success ? "Continue assim!" : "Que pena!"}
			</Title>
			<Description>
				{success
					? "Você continua dentro da dieta. Muito bem!"
					: "Você saiu da dieta desta vez, mas continue se esforçando e não desista!"}
			</Description>
			<Image source={success ? SuccessImg : WarningImg} />
			<Button
				title="Ir para página inicial"
				type="DARK"
				onPress={handleGoHome}
			/>
		</Container>
	);
}
