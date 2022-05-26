import React, { useCallback, useEffect } from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from 'styled-components';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import 'react-native-gesture-handler';
import theme from './src/global/styles/theme';
import AppLoading from 'expo-app-loading';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { AuthProvider, useAuth } from './src/hooks/Auth';
import Routes from './src/routes';
//import { StatusBar } from 'react-native';

export default function App() {
	const [fontsloaded] = useFonts({
		Poppins_400Regular, Poppins_500Medium, Poppins_700Bold
	});
	const { isLoggin } = useAuth();


	/*
		useEffect(() => {
			async function prepare() {
				try {
					// Keep the splash screen visible while we fetch resources
					await SplashScreen.preventAutoHideAsync();
				} catch (e) {
					console.warn(e);
				}
			}

			prepare();
		}, []);

		const onLayoutRootView = useCallback(async () => {
			if (fontsloaded) {
				// This tells the splash screen to hide immediately! If we call this after
				// `setAppIsReady`, then we may see a blank screen while the app is
				// loading its initial state and rendering its first pixels. So instead,
				// we hide the splash screen once we know the root view has already
				// performed layout.
				await SplashScreen.hideAsync();
			}
		}, [fontsloaded]);*/

	if (!fontsloaded && isLoggin) {
		return <AppLoading />
	}
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ThemeProvider theme={theme}>
				<StatusBar barStyle="light-content" />
				<AuthProvider>
					<Routes />
				</AuthProvider>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
}
