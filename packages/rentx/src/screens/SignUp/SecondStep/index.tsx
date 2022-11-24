import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	StatusBar,
	TouchableWithoutFeedback
} from 'react-native';
import BackButton from '../../../components/BackButton';
import Bullet from '../../../components/Bullet';
import Button from '../../../components/Button';
import {
	Container,
	Header,
	Steps,
	Title,
	SubTitle,
	Form,
	FormTitle
} from './styles';
import PasswordInput from '../../../components/PasswordInput';
import { useTheme } from 'styled-components/native';
import api from '../../../services/api';

interface Params {
	user: {
		name: string;
		email: string;
		driveLicense: string;
	};
}

export default function SecondStep() {
	const navigation = useNavigation();
	const route = useRoute();
	const theme = useTheme();

	const { user } = route.params as Params;

	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	function handleBack() {
		navigation.goBack();
	}

	async function handleRegister() {
		if (!password || !passwordConfirm) {
			return Alert.alert('Informe a senha e a confirmação.');
		}

		if (password != passwordConfirm) {
			return Alert.alert('As senhas estão divergentes');
		}

		await api
			.post('/users', {
				name: user.name,
				email: user.email,
				driver_license: user.driveLicense,
				password
			})
			.then(() => {
				navigation.navigate('Confirmation', {
					title: 'Conta criada!',
					message: `Agora é só fazer o login\ne aproveitar`,
					nextScreenRoute: 'SignIn'
				});
			})
			.catch(error => {
				console.log(error);
				Alert.alert('Opa', 'Não foi possível cadastrar');
			});
	}

	return (
		<KeyboardAvoidingView behavior="position" enabled>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<StatusBar
						barStyle="dark-content"
						backgroundColor="transparent"
						translucent
					/>
					<Header>
						<BackButton onPress={handleBack} />
						<Steps>
							<Bullet />
							<Bullet active />
						</Steps>
					</Header>
					<Title>Crie {'\n'}sua conta</Title>
					<SubTitle>
						Faça seu cadastro de {'\n'} forma rápida e fcil
					</SubTitle>
					<Form>
						<FormTitle>2. Senha</FormTitle>
						<PasswordInput
							iconName="lock"
							placeholder="Senha"
							value={password}
							onChangeText={setPassword}
						/>
						<PasswordInput
							iconName="lock"
							placeholder="Repetir senha"
							value={passwordConfirm}
							onChangeText={setPasswordConfirm}
						/>
					</Form>
					<Button
						title="Cadastrar"
						color={theme.colors.success}
						onPress={handleRegister}
					/>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
