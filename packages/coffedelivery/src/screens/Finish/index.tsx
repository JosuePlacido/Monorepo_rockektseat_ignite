import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Button } from "../../components/Button";
import FinishImg from "../../assets/finish.png";
import Animated, {
	BounceIn,
	BounceInLeft,
	LightSpeedInLeft,
	runOnJS
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function Finish() {
	const { navigate } = useNavigation();
	const [showButton, setshowButton] = useState(false);
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				backgroundColor="transparent"
				barStyle="dark-content"
				translucent
			/>
			<Animated.Image
				entering={LightSpeedInLeft.duration(1000).withCallback(() =>
					runOnJS(setshowButton)(true)
				)}
				source={FinishImg}
			/>
			<Text style={styles.title}>Uhu! Pedido confirmado</Text>
			<Text style={styles.message}>
				Agora é só aguardar que logo o café chegará até você!
			</Text>
			{showButton && (
				<Animated.View entering={BounceIn}>
					<Button
						title="IR PARA A HOME"
						onPress={() => navigate("home")}
					/>
				</Animated.View>
			)}
		</SafeAreaView>
	);
}
