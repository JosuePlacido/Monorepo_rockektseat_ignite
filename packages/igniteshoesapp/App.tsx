import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
	useFonts,
	Roboto_400Regular,
	Roboto_700Bold
} from "@expo-google-fonts/roboto";

import { Routes } from "./src/routes";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";

import { CartContextProvider } from "./src/contexts/CartContext";
import { NotificationClickEvent, OneSignal } from "react-native-onesignal";
import { tagUserInfo } from "./src/notifications/notificationsTags";
import { useEffect } from "react";

OneSignal.initialize("ab131678-b04a-4991-9490-b690edbeb8e0");
OneSignal.Notifications.requestPermission(true);

export default function App() {
	const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
	tagUserInfo();

	useEffect(() => {
		const handleNotificationClkick = (
			event: NotificationClickEvent
		): void => {
			console.log(event);
			const { actionId } = event.result;
			switch (actionId) {
				case "1":
					console.log("ver todos");
					break;
				case "2":
					console.log("ver pedido");
					break;
				default:
					console.log("nenhum botao apertado");
			}
		};

		OneSignal.Notifications.addEventListener(
			"click",
			handleNotificationClkick
		);
		return () =>
			OneSignal.Notifications.removeEventListener(
				"click",
				handleNotificationClkick
			);
	}, []);
	return (
		<NativeBaseProvider theme={THEME}>
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
			<CartContextProvider>
				{fontsLoaded ? <Routes /> : <Loading />}
			</CartContextProvider>
		</NativeBaseProvider>
	);
}
