import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
	id: string;
	name: string;
	email: string;
	photo?: string;
}
interface IAuthContextData {
	user: User | undefined;
	signInWithGoogle(): Promise<void>;
	signInWithApple(): Promise<void>;
	signOut(): Promise<void>;
	isLoggin: Boolean;
}

interface AuthProviderProps {
	children: ReactNode;
}
interface AuthorizationResponse {
	params: {
		access_token: string;
	},
	type: string;
}


const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

const AuthContext = createContext({} as IAuthContextData);

const storageKey = '@gofinances:user';



function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User>();
	const [isLoggin, setIsLoggin] = useState(true);

	async function signInWithGoogle() {
		try {
			const RESPONSE_TYPE = 'token';
			const SCOPE = encodeURI('profile email');

			const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

			const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

			if (type === 'success') {
				const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
				const userInfo = await response.json();

				const userLogged = {
					id: userInfo.id,
					email: userInfo.email,
					name: userInfo.given_name,
					photo: userInfo.picture
				};
				setUser(userLogged);
				AsyncStorage.setItem(storageKey, JSON.stringify(userLogged));
			}
		} catch (e) {
			throw new Error(e);
		}
	}

	async function signInWithApple() {
		try {
			const credential = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME
				]
			});

			if (credential) {
				const userLogged = {
					id: String(credential.user),
					email: credential.email!,
					name: credential.fullName!.givenName!,
					photo: `https://ui-avatars.com/api/name=${credential.fullName!.givenName}$length=1`
				};
				setUser(userLogged);
				AsyncStorage.setItem(storageKey, JSON.stringify(userLogged));
			}
		} catch (e) {
			throw new Error(e);
		}
	}

	async function signOut() {
		setUser({} as User);
		await AsyncStorage.removeItem(storageKey);
	}

	useEffect(() => {
		async function loadStorage() {
			const register = await AsyncStorage.getItem(storageKey);
			if (register) {
				setUser(JSON.parse(register));
			}
			setIsLoggin(false);
		}
		loadStorage();
	}, []);

	return (
		<AuthContext.Provider value={{
			user, signInWithGoogle, signInWithApple, signOut, isLoggin
		}}>
			{ children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);
	return context;
}
export { AuthProvider, useAuth, };
