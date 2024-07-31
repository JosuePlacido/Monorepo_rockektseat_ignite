import React, { useState } from "react";
import {
	useFonts,
	Roboto_400Regular,
	Roboto_700Bold
} from "@expo-google-fonts/roboto";
import { Baloo2_700Bold } from "@expo-google-fonts/baloo-2";
import Routes from "./src/routes";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { THEME } from "./src/styles/theme";
import Splash from "./src/screens/Splash";
import { CartContextProvider } from "./src/contexts/CartContext";

export default function App() {
	const [animationEnd, setAnimationEnd] = useState(false);
	const [fontsloaded] = useFonts({
		Roboto_400Regular,
		Roboto_700Bold,
		Baloo2_700Bold
	});

	if (!fontsloaded || !animationEnd) {
		return (
			<Splash
				handleEnd={() => {
					setAnimationEnd(true);
				}}
			/>
		);
	}
	return (
		<GestureHandlerRootView
			style={{ flex: 1, backgroundColor: THEME.COLORS.PURPLE_DARK }}
		>
			<CartContextProvider>
				<StatusBar
					barStyle="default"
					backgroundColor="transparent"
					translucent
				/>
				<Routes />
			</CartContextProvider>
		</GestureHandlerRootView>
	);
}
