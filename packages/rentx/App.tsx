import React from 'react';
import {
	useFonts,
	Archivo_400Regular,
	Archivo_500Medium,
	Archivo_600SemiBold
} from '@expo-google-fonts/archivo';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';

import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import theme from './src/styles/theme';
import Routes from './src/routes';
import { AppProvider } from './src/hooks';

export default function App() {
	const [fontsloaded] = useFonts({
		Archivo_400Regular,
		Archivo_500Medium,
		Archivo_600SemiBold,
		Inter_400Regular,
		Inter_500Medium
	});
	if (!fontsloaded) return <AppLoading />;
	return (
		<ThemeProvider theme={theme}>
			<AppProvider>
				<Routes />
			</AppProvider>
		</ThemeProvider>
	);
}
