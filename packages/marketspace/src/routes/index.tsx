import { Loading } from "@components/Loading";
import { useAuth } from "@hooks/useAuth";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
import { AppRoutes } from "./app.routes";

import { AuthRoutes } from "./auth.routes";

export function Routes() {
	const { colors } = useTheme();
	const { user, isLoadingUserStorageData } = useAuth();

	const theme = DefaultTheme;
	theme.colors.background = colors.gray[600];

	if (isLoadingUserStorageData) {
		return <Loading />;
	}

	return (
		<Box flex={1} bg="gray.700">
			<NavigationContainer theme={theme}>
				{user.id ? <AppRoutes /> : <AuthRoutes />}
			</NavigationContainer>
		</Box>
	);
}
