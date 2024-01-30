import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface Task {
	id: number;
	title: string;
	done: boolean;
}

interface TasksCellProps {
	items: Task[];
}

export function Info({ items }: TasksCellProps) {
	return (
		<View style={styles.view}>
			<View style={styles.textWrapper}>
				<Text style={styles.textBlue}>Criadas</Text>
				<Text style={styles.textInfo}>{items.length}</Text>
			</View>
			<View style={styles.textWrapper}>
				<Text style={styles.textPurple}>Concluídas</Text>
				<Text style={styles.textInfo}>
					{items.filter(i => i.done).length}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	view: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	textWrapper: {
		flexDirection: "row"
	},
	textBlue: {
		fontWeight: "bold",
		color: "#1E6F9F"
	},
	textPurple: {
		fontWeight: "bold",
		color: "#5E60CE"
	},
	textInfo: {
		borderRadius: 50,
		paddingHorizontal: 8,
		paddingVertical: 2,
		backgroundColor: "#333333",
		fontWeight: "bold",
		marginLeft: 8,
		color: "#5E60CE"
	}
});
