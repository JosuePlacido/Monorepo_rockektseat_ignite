import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import BackButton from '../../components/BackButton';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';
import {
	Container,
	Header,
	HeaderTop,
	HeaderTitle,
	LogoutButton,
	PhotoContainer,
	Photo,
	PhotoButton,
	Content,
	Options,
	Option,
	OptionTitle,
	Section
} from './styles';
import { Feather } from '@expo/vector-icons';
import Input from '../../components/Input';
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import PasswordInput from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';
import Button from '../../components/Button';
import { useNetInfo } from '@react-native-community/netinfo';

export default function Profile() {
	const netInfo = useNetInfo();
	const { user, signOut, updateUser } = useAuth();
	const theme = useTheme();
	const navigation = useNavigation();

	const [avatar, setAvatar] = useState(user.avatar);
	const [name, setName] = useState(user.name);
	const [driverLicense, setDriverLicense] = useState(user.driver_license);
	const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>(
		'dataEdit'
	);

	function handlaBack() {
		navigation.canGoBack();
	}

	async function handlePhoto() {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1
		});

		if (result.cancelled) {
			return;
		}

		if (result.uri) {
			setAvatar(result.uri);
		}
	}

	function handleChangeOption(option: 'dataEdit' | 'passwordEdit') {
		if (netInfo.isConnected === false && option === 'passwordEdit') {
			Alert.alert(
				'Você está offline',
				'Para mudar a senha, conecte-se a internet'
			);
		} else setOption(option);
	}

	async function handleProfileUpdate() {
		try {
			const schema = Yup.object().shape({
				driverLicense: Yup.string().required('CNH é obrigatória'),
				name: Yup.string().required('Nome é obrigatório')
			});

			const data = { name, driverLicense };
			await schema.validate(data);

			await updateUser({
				id: user.id,
				user_id: user.user_id,
				email: user.email,
				name,
				driver_license: driverLicense,
				avatar,
				token: user.token
			});

			Alert.alert('Perfil atualizado!');
		} catch (error) {
			console.log(error);
			if (error instanceof Yup.ValidationError) {
				Alert.alert('Opa', error.message);
			} else {
				Alert.alert('Não foi possívela tualizar o perfil');
			}
		}
	}
	function handleSignOut() {
		Alert.alert(
			'Tem certeza?',
			'Se você sair, irá precisar de internet para conectar-se novamente.',
			[
				{
					text: 'Cancelar',
					onPress: () => {}
				},
				{
					text: 'Sair',
					onPress: () => signOut()
				}
			]
		);
	}
	return (
		<KeyboardAvoidingView behavior="position" enabled>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<Header>
						<HeaderTop>
							<BackButton
								color={theme.colors.shape}
								onPress={handlaBack}
							/>
							<HeaderTitle>Editar Perfil</HeaderTitle>
							<LogoutButton onPress={handleSignOut}>
								<Feather
									name="power"
									size={24}
									color={theme.colors.shape}
								/>
							</LogoutButton>
						</HeaderTop>
						<PhotoContainer>
							{!!avatar && (
								<Photo
									source={{
										uri: avatar
									}}
								/>
							)}
							<PhotoButton onPress={handlePhoto}>
								<Feather
									name="camera"
									size={24}
									color={theme.colors.shape}
								/>
							</PhotoButton>
						</PhotoContainer>
					</Header>

					<Content
						style={{
							marginBottom: useBottomTabBarHeight()
						}}
					>
						<Options>
							<Option
								active={option === 'dataEdit'}
								onPress={() => handleChangeOption('dataEdit')}
							>
								<OptionTitle active={option === 'dataEdit'}>
									Dados
								</OptionTitle>
							</Option>
							<Option
								active={option === 'passwordEdit'}
								onPress={() =>
									handleChangeOption('passwordEdit')
								}
							>
								<OptionTitle active={option === 'passwordEdit'}>
									Senha
								</OptionTitle>
							</Option>
						</Options>

						{option === 'dataEdit' ? (
							<Section>
								<Input
									iconName="user"
									placeholder="Nome"
									autoCorrect={false}
									defaultValue={user.name}
									value={name}
									onChangeText={setName}
								/>
								<Input
									iconName="mail"
									editable={false}
									defaultValue={user.email}
								/>
								<Input
									iconName="credit-card"
									placeholder="CNH"
									keyboardType="numeric"
									defaultValue={user.driver_license}
									value={driverLicense}
									onChangeText={setDriverLicense}
								/>
							</Section>
						) : (
							<Section>
								<PasswordInput
									iconName="lock"
									placeholder="Senha atual"
								/>
								<PasswordInput
									iconName="lock"
									placeholder="Nova senha"
								/>
								<PasswordInput
									iconName="lock"
									placeholder="Confirmar senha"
								/>
							</Section>
						)}
						<Button
							title="Salvar alterações"
							onPress={handleProfileUpdate}
						/>
					</Content>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
