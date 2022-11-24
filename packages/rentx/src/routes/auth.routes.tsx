import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Confirmation from '../screens/Confirmation';
import Splash from '../screens/Splash';
import SignIn from '../screens/SignIn';
import FirstStep from '../screens/SignUp/FirstStep';
import SecondStep from '../screens/SignUp/SecondStep';

const { Navigator, Screen } = createStackNavigator();

export default function AuthRoutes() {
	return (
		<Navigator
			screenOptions={{
				headerMode: 'false'
			}}
			initialRouteName="Splash"
		>
			<Screen name="Splash" component={Splash} />
			<Screen name="SignIn" component={SignIn} />
			<Screen name="SignUpFirst" component={FirstStep} />
			<Screen name="SignUpSecond" component={SecondStep} />
			<Screen name="Confirmation" component={Confirmation} />
		</Navigator>
	);
}
