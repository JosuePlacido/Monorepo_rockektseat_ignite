import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CarDetails from '../screens/CarDetails';
import Home from '../screens/Home';
import Scheduling from '../screens/Scheduling';
import SchedulingCompleted from '../screens/SchedulingCompleted';
import SchedulingDetails from '../screens/SchedulingDetails';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
	return (
		<NavigationContainer>
			<Navigator screenOptions={{
				headerMode: 'false'
			}}>
				<Screen name="Home" component={Home} />
				<Screen name="CarDetails" component={CarDetails} />
				<Screen name="Scheduling" component={Scheduling} />
				<Screen
					name="SchedulingDetails"
					component={SchedulingDetails}
				/>
				<Screen
					name="SchedulingCompleted"
					component={SchedulingCompleted}
				/>
			</Navigator>
		</NavigationContainer>
	);
}
