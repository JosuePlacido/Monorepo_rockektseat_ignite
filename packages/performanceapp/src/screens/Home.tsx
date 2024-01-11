import React, { useCallback, useState } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	ScrollView
} from "react-native";
import { ListResult } from "../components/listResult";

export function Home() {
	const [name, setName] = useState("");
	const [data, setData] = useState([]);
	async function handleSearch() {
		const response = await fetch(
			`http://192.168.0.5:3333/clients?q=${name}`
		);
		const data = await response.json();
		setData(data);
	}

	const handleFollow = useCallback(() => {
		console.log("follow/unfollow");
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Clientes</Text>
			<TextInput
				style={styles.input}
				placeholder="Nome do cliente"
				value={name}
				onChangeText={setName}
			/>
			<Button title="buscar" onPress={handleSearch} />
			<ListResult data={data} follow={handleFollow} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 100,
		padding: 20
	},
	title: {
		fontSize: 18,
		fontWeight: "bold"
	},
	input: {
		borderWidth: 1,
		padding: 7,
		marginVertical: 10
	}
});
