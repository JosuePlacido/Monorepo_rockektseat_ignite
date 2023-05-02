import React, { useEffect, useState } from "react";
import {
	Platform,
	TextInput,
	SafeAreaView,
	StyleSheet,
	Text,
	FlatList
} from "react-native";
import { Button } from "../components/button";
import { SkillCard } from "../components/skillCard";

interface SkillData {
	id: string;
	name: string;
}
export function Home() {
	const [newSkill, setNewSkill] = useState("");
	const [mySkills, setMySkills] = useState<SkillData[]>([]);
	const [greetings, setGreetings] = useState("");

	function handleAddNewSkill() {
		const data = {
			id: String(new Date().getTime()),
			name: newSkill
		};
		setMySkills(old => [...old, data]);
	}

	function handleRemoveSkill(id: string) {
		setMySkills(old => old.filter(item => item.id !== id));
	}
	useEffect(() => {
		const currentHours = new Date().getHours();
		if (currentHours < 12) {
			setGreetings("bom dia");
		} else if (currentHours < 18) {
			setGreetings("boa tarde");
		} else {
			setGreetings("boa noite");
		}
	}, [mySkills]);

	return (
		<SafeAreaView style={styles.container}>
			<Text testID="wellcome" style={styles.title}>
				Hello Ignite
			</Text>
			<Text style={styles.greetings}>{greetings}</Text>
			<TextInput
				testID="input-new"
				style={styles.input}
				placeholder="new skill"
				placeholderTextColor="#555"
				onChangeText={setNewSkill}
			/>
			<Button
				testID="button-add"
				onPress={handleAddNewSkill}
				title="Add"
			/>
			<Text style={[styles.title, { marginVertical: 50 }]}>
				My skills
			</Text>
			{mySkills.length > 0 && (
				<FlatList
					testID="flatlist-skills"
					data={mySkills}
					keyboardShouldPersistTaps="never"
					keyExtractor={({ id }) => id}
					renderItem={({ item }) => (
						<SkillCard
							onPress={() => handleRemoveSkill(item.id)}
							skill={item.name}
						/>
					)}
				/>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 70,
		paddingHorizontal: 30,
		backgroundColor: "#121015"
	},
	title: {
		color: "#fff",
		fontSize: 24,
		fontWeight: "bold"
	},
	greetings: {
		color: "#fff"
	},
	input: {
		fontSize: 18,
		padding: Platform.OS == "ios" ? 15 : 10,
		color: "#fff",
		backgroundColor: "#1f1e25",
		marginTop: 25,
		borderRadius: 8
	}
});
