import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CarDetails from '../screens/CarDetails';
import Home from '../screens/Home';
import Scheduling from '../screens/Scheduling';
import Confirmation from '../screens/Confirmation';
import SchedulingDetails from '../screens/SchedulingDetails';
import MyCars from '../screens/MyCars';
import Splash from '../screens/Splash';
import SignIn from '../screens/SignIn';
import FirstStep from '../screens/SignUp/FirstStep';
import SecondStep from '../screens/SignUp/SecondStep';

const { Navigator, Screen } = createStackNavigator();

export default function StackRoutes() {
	return (
		<Navigator
			screenOptions={{
				headerMode: 'false'
			}}
			initialRouteName="Home"
		>
			<Screen
				name="Home"
				component={Home}
				options={{
					gestureEnabled: false
				}}
			/>
			<Screen name="CarDetails" component={CarDetails} />
			<Screen name="Scheduling" component={Scheduling} />
			<Screen name="SchedulingDetails" component={SchedulingDetails} />
			<Screen name="Confirmation" component={Confirmation} />
		</Navigator>
	);
}
