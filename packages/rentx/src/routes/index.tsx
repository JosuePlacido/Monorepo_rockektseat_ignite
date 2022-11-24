import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Load from '../components/Load';
import { useAuth } from '../hooks/auth';
import Routes from './app.stack.routes';
import TabRoutes from './app.tab.routes';
import AuthRoutes from './auth.routes';

export default function routes() {
	const { user, loading } = useAuth();
	return loading ? (
		<Load />
	) : (
		<NavigationContainer>
			{user.id ? <TabRoutes /> : <AuthRoutes />}
		</NavigationContainer>
	);
}
