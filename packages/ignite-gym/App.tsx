import { LogBox, StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
	useFonts,
	Roboto_400Regular,
	Roboto_700Bold
} from "@expo-google-fonts/roboto";
import { Loading } from "@components/Loading";
import { THEME } from "./src/theme";
import { Routes } from "@routes/index";
import { AuthContextProvider } from "@contexts/AuthContext";
import { OneSignal } from "react-native-onesignal";

OneSignal.initialize(process.env.EXPO_PUBLIC_ONE_SIGNAL_ID);
OneSignal.Notifications.requestPermission(true);

LogBox.ignoreLogs([
	"In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app."
]);

export default function App() {
	const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

	return (
		<NativeBaseProvider theme={THEME}>
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
			<AuthContextProvider>
				{fontsLoaded ? <Routes /> : <Loading />}
			</AuthContextProvider>
		</NativeBaseProvider>
	);
}
