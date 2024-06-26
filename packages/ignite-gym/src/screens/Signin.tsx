import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from "react-hook-form";

type FormDataProps = {
	email: string;
	password: string;
};

const signIpSchema = yup.object({
	email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
	password: yup.string().required("Informe a senha")
});

export function SignIn() {
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<FormDataProps>({
		resolver: yupResolver(signIpSchema)
	});
	const navigation = useNavigation<AuthNavigatorRoutesProps>();

	function handleNewAccount() {
		navigation.navigate("signUp");
	}

	function handleSignIn({ email, password }: FormDataProps) {
		console.log({ email, password });
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
				position="absolute"
				resizeMode="stretch"
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
						Acesse a conta
					</Heading>
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
					<Button
						title="Acessar"
						onPress={handleSubmit(handleSignIn)}
					/>
				</Center>

				<Center mt={24}>
					<Text
						color="gray.100"
						fontSize="sm"
						mb={3}
						fontFamily="body"
					>
						Ainda não tem acesso?
					</Text>
				</Center>

				<Button
					title="Criar Conta"
					variant="outline"
					onPress={handleNewAccount}
				/>
			</VStack>
		</ScrollView>
	);
}
