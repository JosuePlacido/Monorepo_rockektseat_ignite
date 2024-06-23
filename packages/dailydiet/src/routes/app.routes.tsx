import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Details } from "@screens/Details";

import { Form } from "@screens/Form";
import { Home } from "@screens/Home";
import { Message } from "@screens/Message";
import { Statistics } from "@screens/Statistics";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
	return (
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen name="home" component={Home} />
			<Screen name="statistics" component={Statistics} />
			<Screen name="message" component={Message} />
			<Screen name="form" component={Form} />
			<Screen name="details" component={Details} />
		</Navigator>
	);
}
