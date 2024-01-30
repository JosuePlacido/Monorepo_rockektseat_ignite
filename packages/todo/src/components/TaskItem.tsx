import React, { useState } from "react";
import {
	Image,
	TouchableOpacity,
	View,
	Text,
	StyleSheet,
	TextInput
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";

export interface Task {
	id: number;
	title: string;
	done: boolean;
}

interface TasksCellProps {
	index: Number;
	item: Task;
	toggleTaskDone: (id: number) => void;
	removeTask: (id: number) => void;
	editTask: (id: number, title: string) => void;
}

export function TaskItem({
	item,
	index,
	toggleTaskDone,
	removeTask,
	editTask
}: TasksCellProps) {
	const [isEdit, setIsEdit] = useState(false);
	const [value, setValue] = useState("");

	return (
		<View style={styles.view}>
			<TouchableOpacity
				testID={`button-${index}`}
				activeOpacity={0.7}
				style={styles.taskButton}
				onPress={() => toggleTaskDone(item.id)}
			>
				<View
					testID={`marker-${index}`}
					style={
						item.done ? styles.taskMarkerDone : styles.taskMarker
					}
				>
					{item.done && <Icon name="check" size={12} color="#FFF" />}
				</View>
				{!isEdit ? (
					<Text
						style={
							item.done ? styles.taskTextDone : styles.taskText
						}
					>
						{item.title}
					</Text>
				) : (
					<TextInput
						style={styles.inputEdit}
						value={value}
						onChangeText={setValue}
						onSubmitEditing={() => {
							editTask(item.id, value), setIsEdit(false);
						}}
					/>
				)}
			</TouchableOpacity>
			<TouchableOpacity
				testID={`edit-${index}`}
				style={{ paddingHorizontal: 8 }}
				onPress={() => {
					if (isEdit) {
						setValue(item.title);
					}
					setIsEdit(!isEdit);
				}}
			>
				{isEdit ? (
					<Icon name="x" size={18} color="#aaa" />
				) : (
					<Icon name="edit-3" size={18} color="#aaa" />
				)}
			</TouchableOpacity>
			{!isEdit && (
				<TouchableOpacity
					testID={`trash-${index}`}
					style={{ paddingHorizontal: 8 }}
					onPress={() => removeTask(item.id)}
				>
					<Image source={trashIcon} />
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	view: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#333333",
		borderColor: "#808080",
		borderRadius: 8,
		borderWidth: 1,
		marginBottom: 8
	},
	taskButton: {
		flex: 1,
		paddingHorizontal: 24,
		paddingVertical: 15,
		marginBottom: 4,
		borderRadius: 4,
		flexDirection: "row",
		alignItems: "center"
	},
	taskMarker: {
		height: 16,
		width: 16,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#1E6F9F",
		marginRight: 15,
		alignItems: "center",
		justifyContent: "center"
	},
	taskText: {
		color: "#f2f2f2",
		fontFamily: "Inter-Medium",
		flex: 1
	},
	inputEdit: {
		flex: 1,
		height: 24,
		padding: 0,
		color: "#fff",
		backgroundColor: "#0d0d0d"
	},
	taskMarkerDone: {
		height: 16,
		width: 16,
		borderRadius: 8,
		backgroundColor: "#5E60CE",
		marginRight: 15,
		alignItems: "center",
		justifyContent: "center"
	},
	taskTextDone: {
		color: "#808080",
		textDecorationLine: "line-through",
		fontFamily: "Inter-Medium",
		flex: 1
	}
});
