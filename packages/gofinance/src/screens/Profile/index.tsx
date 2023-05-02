import React from 'react';
import { TextInput, View, Text, Button } from 'react-native';

export function Profile() {
	return (
		<View>
			<Text testID="text-title">Perfil</Text>
			<TextInput
				testID="input-name"
				placeholder="Nome"
				autoCorrect={false}
				value="Josue"
			/>
			<TextInput
				testID="input-surname"
				placeholder="Sobrenome"
				value="Placido"
			/>

			<Button title="salvar" onPress={() => {}} />
		</View>
	);
}
