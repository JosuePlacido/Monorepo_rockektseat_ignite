import React, {
	createContext,
	useState,
	useContext,
	ReactNode,
	useEffect
} from 'react';
import api from '../services/api';
import { database } from '../databases';
import { User as ModelUser } from '../databases/model/User';
import { Alert } from 'react-native';

interface User {
	id: string;
	user_id: string;
	email: string;
	name: string;
	driver_license: string;
	avatar: string;
	token: string;
}

interface SignInCredentials {
	email: string;
	password: string;
}

interface AuthContextData {
	user: User;
	loading: boolean;
	signIn: (credentials: SignInCredentials) => Promise<void>;
	signOut: () => Promise<void>;
	updateUser: (user: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
	children: ReactNode;
}
function AuthProvider({ children }: AuthProviderProps) {
	const [data, setData] = useState({} as User);
	const [loading, setloading] = useState(true);

	async function signIn({ email, password }: SignInCredentials) {
		try {
			const response = await api.post('/sessions', {
				email,
				password
			});

			const { user, token } = response.data;

			api.defaults.headers.common = {
				Authorization: `bearer ${token}`
			};

			const userCollection = database.get<ModelUser>('users');

			await database.write(async () => {
				await userCollection.create(newUser => {
					newUser.user_id = user.id;
					newUser.name = user.name;
					newUser.email = user.email;
					newUser.driver_license = user.driver_license;
					newUser.avatar = user.avatar;
					newUser.token = token;
				});
			});
			setData(user);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async function signOut() {
		try {
			const userCollection = database.get<ModelUser>('users');
			await database.write(async () => {
				const userSelected = await userCollection.find(data.id);
				await userSelected.destroyPermanently();
			});
			setData({} as User);
		} catch (error) {
			throw error;
		}
	}

	async function updateUser(user: User) {
		try {
			const userCollection = database.get<ModelUser>('users');
			await database.write(async () => {
				const userSelected = await userCollection.find(data.id);
				await userSelected.update(userData => {
					userData.name = user.name;
					userData.driver_license = user.driver_license;
					userData.avatar = user.avatar;
				});
			});

			setData(user);
		} catch (error) {
			throw error;
		}
	}
	useEffect(() => {
		async function loadUserData() {
			const userCollection = database.get<ModelUser>('users');
			const response = await userCollection.query().fetch();
			if (response.length > 0) {
				const userData = response[0]._raw as unknown as User;
				api.defaults.headers.common = {
					Authorization: `bearer ${userData.token}`
				};
				setData(userData);
				setloading(false);
			}
		}

		loadUserData();
	});

	return (
		<AuthContext.Provider
			value={{ user: data, loading, signIn, signOut, updateUser }}
		>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth(): AuthContextData {
	const context = useContext(AuthContext);
	return context;
}

export { AuthProvider, useAuth };
