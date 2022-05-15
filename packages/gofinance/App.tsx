import React, { useCallback, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from 'styled-components';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import 'react-native-gesture-handler';
import theme from './src/global/styles/theme';
import AppRoutes from './src/routes/app.routes';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
	const [fontsloaded] = useFonts({
		Poppins_400Regular, Poppins_500Medium, Poppins_700Bold
	});


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

	if (!fontsloaded) {
		return <AppLoading />
	}
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ThemeProvider theme={theme}>

				<NavigationContainer>
					<AppRoutes />
				</NavigationContainer>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
}
