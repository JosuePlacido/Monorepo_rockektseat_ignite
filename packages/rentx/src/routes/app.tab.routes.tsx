import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import ProfileSvg from '../assets/people.svg';

import MyCars from '../screens/MyCars';
import Profile from '../screens/Profile';
import StackRoutes from './app.stack.routes';
import { useTheme } from 'styled-components';
import { Platform } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

export default function TabRoutes() {
	const theme = useTheme();

	return (
		<Navigator
			tabBarOptions={{
				activeTintColor: theme.colors.main,
				inactiveTintColor: theme.colors.text_detail,
				showLabel: false,
				style: {
					paddingVertical: Platform.OS === 'ios' ? 20 : 0,
					height: 78,
					backgroundColor: theme.colors.background_primary
				}
			}}
		>
			<Screen
				name="Home"
				component={StackRoutes}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<HomeSvg width={24} height={24} fill={color} />
					)
				}}
			/>
			<Screen
				name="MyCars"
				component={MyCars}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<CarSvg width={24} height={24} fill={color} />
					)
				}}
			/>
			<Screen
				name="Profile"
				component={Profile}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<ProfileSvg width={24} height={24} fill={color} />
					)
				}}
			/>
		</Navigator>
	);
}
