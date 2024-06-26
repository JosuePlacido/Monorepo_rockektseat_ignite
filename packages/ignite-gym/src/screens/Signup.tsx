import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	VStack,
	Image,
	Text,
	Center,
	Heading,
	ScrollView,
	useToast
} from "native-base";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Controller, useForm } from "react-hook-form";
import { api } from "@services/api";
import axios from "axios";
import { Alert } from "react-native";
import AppError from "api/src/utils/AppError";
import { useAuth } from "@hooks/useAuth";

type FormDataProps = {
	name: string;
	email: string;
	password: string;
	password_confirm: string;
};

const signUpSchema = yup.object({
	name: yup.string().required("Informe o nome"),
	email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
	password: yup
		.string()
		.required("Informe a senha")
		.min(6, "A senha deve ter pelo menos 6 dígitos."),
	password_confirm: yup
		.string()
		.required("Confirme a senha.")
		.oneOf([yup.ref("password")], "A confirmação da senha não confere")
});

export function SignUp() {
	const [isLoading, setIsLoading] = useState(false);
	const { singIn } = useAuth();
	const toast = useToast();
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<FormDataProps>({
		resolver: yupResolver(signUpSchema)
	});

	const navigation = useNavigation();

	function handleGoBack() {
		navigation.goBack();
	}

	async function handleSignUp({ name, email, password }: FormDataProps) {
		try {
			setIsLoading(true);
			const response = await api.post("/users", {
				name,
				email,
				password
			});
			singIn(email, password);
		} catch (error) {
			const isAppError = error instanceof AppError;

			const title = isAppError
				? error.message
				: "Não foi possível criar a conta. Tente novamente mais tarde";

			toast.show({
				title,
				placement: "top",
				bgColor: "red.500"
			});
		}
	}

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}
			showsVerticalScrollIndicator={false}
		>
			<Image
				source={BackgroundImg}
				defaultSource={BackgroundImg}
				alt="Pessoas treinando"
				resizeMode="cover"
				position="absolute"
			/>
			<VStack flex={1} px={10} pb={16}>
				<Center my={24}>
					<LogoSvg />

					<Text color="gray.100" fontSize="sm">
						Treine sua mente e o seu corpo.
					</Text>
				</Center>

				<Center>
					<Heading
						color="gray.100"
						fontSize="xl"
						mb={6}
						fontFamily="heading"
					>
						Crie sua conta
					</Heading>
					<Controller
						control={control}
						name="name"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Nome"
								onChangeText={onChange}
								errorMessage={errors.name?.message}
								value={value}
							/>
						)}
					/>
					<Controller
						control={control}
						name="email"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="E-mail"
								keyboardType="email-address"
								autoCapitalize="none"
								onChangeText={onChange}
								errorMessage={errors.email?.message}
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
								secureTextEntry
								onChangeText={onChange}
								errorMessage={errors.password_confirm?.message}
								value={value}
								onSubmitEditing={handleSubmit(handleSignUp)}
								returnKeyType="send"
							/>
						)}
					/>
					<Button
						title="Criar e acessar"
						onPress={handleSubmit(handleSignUp)}
						isLoading={isLoading}
					/>
				</Center>

				<Button
					title="Voltar para o login"
					variant="outline"
					mt={12}
					onPress={handleGoBack}
				/>
			</VStack>
		</ScrollView>
	);
}
