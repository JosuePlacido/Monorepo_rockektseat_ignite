import React from "react";
import { styles } from "./styles";
import { ActivityIndicator, View } from "react-native";
import { THEME } from "../../styles/theme";

export default function Loading() {
	return (
		<View style={styles.container}>
			<ActivityIndicator color={THEME.COLORS.PURPLE_DARK} />
		</View>
	);
}
