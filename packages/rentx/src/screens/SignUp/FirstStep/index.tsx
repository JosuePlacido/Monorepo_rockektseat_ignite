import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import * as Yup from 'yup';
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
import Input from '../../../components/Input';
import {
	Container,
	Header,
	Steps,
	Title,
	SubTitle,
	Form,
	FormTitle
} from './styles';

export default function FirstStep() {
	const navigation = useNavigation();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [driveLicense, setDriveLicense] = useState('');

	function handleBack() {
		navigation.goBack();
	}

	async function handleNext() {
		try {
			const schema = Yup.object().shape({
				name: Yup.string().required('Nome é obrigatório'),
				email: Yup.string()
					.email('Insira um E-mail válido')
					.required('E-mail é obrigatório'),
				driveLicense: Yup.string().required('CNH é obrigatório')
			});

			const data = { name, email, driveLicense };
			await schema.validate(data);
			navigation.navigate('SignUpSecond', { user: data });
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				return Alert.alert('Opa', error.message);
			}
		}
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
							<Bullet active />
							<Bullet />
						</Steps>
					</Header>
					<Title>Crie {'\n'}sua conta</Title>
					<SubTitle>
						Faça seu cadastro de {'\n'} forma rápida e fcil
					</SubTitle>
					<Form>
						<FormTitle>1. Dados</FormTitle>
						<Input
							iconName="user"
							placeholder="Nome"
							value={name}
							onChangeText={setName}
						/>
						<Input
							iconName="mail"
							placeholder="E-mail"
							keyboardType="email-address"
							value={email}
							onChangeText={setEmail}
						/>
						<Input
							iconName="credit-card"
							placeholder="CNH"
							keyboardType="numeric"
							value={driveLicense}
							onChangeText={setDriveLicense}
						/>
					</Form>
					<Button title="Próximo" onPress={handleNext} />
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
