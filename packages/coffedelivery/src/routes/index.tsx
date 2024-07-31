import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "../screens/Splash";
import { View } from "react-native";
import { THEME } from "../styles/theme";
import Home from "../screens/Home";
import CoffeDetails from "../screens/Coffee";
import Cart from "../screens/Cart";
import Finish from "../screens/Finish";

const { Navigator, Screen } = createNativeStackNavigator();
export default function Routes() {
	return (
		<NavigationContainer>
			<Navigator
				screenOptions={{
					headerShown: false
				}}
			>
				<Screen name="home" component={Home} />
				<Screen name="finish" component={Finish} />
				<Screen name="coffee" component={CoffeDetails} />
				<Screen name="cart" component={Cart} />
			</Navigator>
		</NavigationContainer>
	);
}
