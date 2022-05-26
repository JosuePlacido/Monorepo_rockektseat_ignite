import React, { useContext, useState } from 'react';
import { ActivityIndicator, Alert, Platform, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';
import Apple from '../../assets/apple.svg';
import Google from '../../assets/google.svg';
import Logo from '../../assets/logo.svg';
import SignInSocialButton from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/Auth';
import { Container, Footer, FooterWrapper, Header, SignInTitle, Title, TitleWrapper } from './styles';

export default function SignIn() {
	const [isLoading, setIsLoading] = useState(false);
	const { signInWithGoogle, signInWithApple } = useAuth();
	const theme = useTheme();

	async function handleSignInWithGoogle() {
		try {
			setIsLoading(true);
			return await signInWithGoogle();
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível conectar com a conta Google');
			setIsLoading(false);
		}
	}

	async function handleSignInWithApple() {
		try {
			setIsLoading(true);
			return await signInWithApple();
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível conectar com a conta Apple');
			setIsLoading(false);
		}
	}
	return (<Container>
		<Header>
			<TitleWrapper>
				<Logo
					width={RFValue(120)}
					height={RFValue(68)}
				/>
				<Title>
					Controle suas {'\n'}
					finanças de forma {'\n'}
					muito simples
				</Title>
			</TitleWrapper>
			<SignInTitle>
				Faça seu login com {'\n'}
				uma das contas abaixo
			</SignInTitle>
		</Header>
		<Footer>
			<FooterWrapper>
				<SignInSocialButton title="Entrar com Google" svg={Google} onPress={handleSignInWithGoogle} />
				{Platform.OS === 'ios' && <SignInSocialButton title="Entrar com Apple" svg={Apple} onPress={handleSignInWithApple} />}
			</FooterWrapper>
			{isLoading && <ActivityIndicator color={theme.COLORS.shape} size="large" />}
		</Footer>
	</Container>);
}

