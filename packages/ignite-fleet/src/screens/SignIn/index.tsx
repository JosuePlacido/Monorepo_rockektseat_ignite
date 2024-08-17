import { Container, Title, Slogan } from "./styles";
import backgroundImg from "../../assets/background.png";
import { Alert } from "react-native";
import { useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from "@env";
import { Button } from "../../components/Button";
import { useApp } from "@realm/react";

GoogleSignin.configure({
	scopes: ["email", "profile"],
	webClientId: WEB_CLIENT_ID,
	iosClientId: IOS_CLIENT_ID
});

export function SignIn() {
	const [isAutenticating, setIsAuthenticanting] = useState(false);
	const app = useApp();

	async function handleGoogleSignIn() {
		try {
			setIsAuthenticanting(true);

			const response = await GoogleSignin.signIn();

			if (response.idToken) {
				const credentials = Realm.Credentials.jwt(response.idToken);
				await app.logIn(credentials);
			} else {
				Alert.alert(
					"Entrar",
					"Não foi possível conectar-se a sua conta google."
				);
				setIsAuthenticanting(false);
			}
		} catch (error) {
			console.log(error);
			Alert.alert(
				"Entrar",
				"Não foi possível conectar-se a sua conta google."
			);
			setIsAuthenticanting(false);
		}
	}

	return (
		<Container source={backgroundImg}>
			<Title>Ignite Fleet</Title>
			<Slogan>Gestão de uso de veículos</Slogan>
			<Button
				title="Entrar com Google"
				onPress={handleGoogleSignIn}
				isLoading={isAutenticating}
			/>
		</Container>
	);
}
