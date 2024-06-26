import { useState } from "react";
import { TouchableOpacity } from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as FileSystem from "expo-file-system";
import {
	Center,
	ScrollView,
	VStack,
	Skeleton,
	Text,
	Heading,
	useToast
} from "native-base";
import * as ImagePicker from "expo-image-picker";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Controller, useForm } from "react-hook-form";

type FormDataProps = {
	name: string;
	oldPassword?: string;
	password?: string;
	password_confirm?: string;
};

const PHOTO_SIZE = 33;

const profileSchema = yup.object({
	name: yup.string().required("Informe o nome"),
	oldPassword: yup.string().min(6, "A senha deve ter pelo menos 6 dígitos."),
	password: yup.string().min(6, "A senha deve ter pelo menos 6 dígitos."),
	password_confirm: yup
		.string()
		.oneOf([yup.ref("password")], "A confirmação da senha não confere")
});

export function Profile() {
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<FormDataProps>({
		resolver: yupResolver(profileSchema)
	});

	const [photoIsLoading, setPhotoIsLoading] = useState(false);
	const [userPhoto, setUserPhoto] = useState(
		"https://github.com/JosuePlacido.png"
	);

	const toast = useToast();

	async function handleUserPhotoSelected() {
		setPhotoIsLoading(true);

		try {
			const photoSelected = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 1,
				aspect: [4, 4],
				allowsEditing: true
			});

			if (photoSelected.assets) {
				const photoInfo = await FileSystem.getInfoAsync(
					photoSelected.assets[0].uri
				);
				if (photoInfo.exists) {
					if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
						return toast.show({
							title: "Essa imagem é muito grande. Escolha uma de até 5MB.",
							placement: "top",
							bgColor: "red.500"
						});
					}
				}
				setUserPhoto(photoSelected.assets[0].uri);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setPhotoIsLoading(false);
		}
	}

	function handleUpdateProfile({
		name,
		oldPassword,
		password,
		password_confirm
	}: FormDataProps) {
		console.log({ name, oldPassword, password, password_confirm });
	}

	return (
		<VStack flex={1}>
			<ScreenHeader title="Perfil" />

			<ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
				<Center mt={6} px={10}>
					{photoIsLoading ? (
						<Skeleton
							w={PHOTO_SIZE}
							h={PHOTO_SIZE}
							rounded="full"
							startColor="gray.500"
							endColor="gray.400"
						/>
					) : (
						<UserPhoto
							source={{
								uri: userPhoto
							}}
							alt="Foto do usuário"
							size={PHOTO_SIZE}
						/>
					)}

					<TouchableOpacity onPress={handleUserPhotoSelected}>
						<Text
							color="green.500"
							fontWeight="bold"
							fontSize="md"
							mt={2}
							mb={8}
						>
							Alterar Foto
						</Text>
					</TouchableOpacity>

					<Controller
						control={control}
						name="name"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Nome"
								bg="gray.600"
								onChangeText={onChange}
								errorMessage={errors.name?.message}
								value={value}
							/>
						)}
					/>

					<Input bg="gray.600" placeholder="E-mail" isDisabled />

					<Heading
						color="gray.200"
						fontSize="md"
						mb={2}
						alignSelf="flex-start"
						mt={12}
						fontFamily="heading"
					>
						Alterar senha
					</Heading>

					<Controller
						control={control}
						name="password"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Senha"
								bg="gray.600"
								secureTextEntry
								onChangeText={onChange}
								errorMessage={errors.password?.message}
								value={value}
							/>
						)}
					/>

					<Controller
						control={control}
						name="password"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Senha"
								bg="gray.600"
								secureTextEntry
								onChangeText={onChange}
								errorMessage={errors.password?.message}
								value={value}
							/>
						)}
					/>

					<Controller
						control={control}
						name="password_confirm"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Confirmar a Senha"
								bg="gray.600"
								secureTextEntry
								onChangeText={onChange}
								errorMessage={errors.password_confirm?.message}
								value={value}
							/>
						)}
					/>

					<Button
						title="Atualizar"
						mt={4}
						onPress={handleSubmit(handleUpdateProfile)}
					/>
				</Center>
			</ScrollView>
		</VStack>
	);
}
