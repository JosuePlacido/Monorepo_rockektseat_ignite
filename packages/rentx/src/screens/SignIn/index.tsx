import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
	StatusBar,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Alert
} from 'react-native';
import { useTheme } from 'styled-components/native';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';
import { Container, Footer, Form, Header, SubTitle, Title } from './styles';

import { database } from '../../databases';

export default function SignIn() {
	const theme = useTheme();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigation = useNavigation();
	const { signIn } = useAuth();

	async function handleSignIn() {
		try {
			const schema = Yup.object().shape({
				email: Yup.string()
					.required('E-mail obrigatório')
					.email('Digite um e-mail válido'),
				password: Yup.string().required('A senha é obrigatória')
			});

			await schema.validate({ email, password });

			await signIn({ email, password });
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				return Alert.alert('Opa', error.message);
			} else {
				Alert.alert(
					'Erro na autenticação',
					'Ocorreu um erro ao fazer login, verifique as credencias'
				);
			}
		}
	}

	function handleSignUp() {
		navigation.navigate('SignUpFirst');
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
						<Title>Estamos {'\n'}quase lá.</Title>
						<SubTitle>
							Faça seu login para começar {'\n'}uma experiência
							incrível.
						</SubTitle>
					</Header>
					<Form>
						<Input
							iconName="mail"
							placeholder="E-mail"
							keyboardType="email-address"
							autoCorrect={false}
							autoCapitalize="none"
							value={email}
							onChangeText={setEmail}
						/>
						<PasswordInput
							iconName="lock"
							placeholder="Senha"
							value={password}
							onChangeText={setPassword}
						/>
					</Form>
					<Footer>
						<Button
							title="Login"
							onPress={handleSignIn}
							load={false}
						/>
						<Button
							title="Criar conta gratuita"
							onPress={handleSignUp}
							load={false}
							color={theme.colors.background_secondary}
							light
						/>
					</Footer>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
