import {
	Image,
	View,
	Text,
	Pressable,
	PressableProps,
	TouchableOpacity,
	TouchableOpacityProps
} from "react-native";

import { styles } from "./styles";
import { ICoffee } from "../../models/Coffee";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

type Props = TouchableOpacityProps & {
	item: ICoffee;
};
const AnimatedPressable = Animated.createAnimatedComponent(TouchableOpacity);
export function CoffeeCard({ item, ...rest }: Props) {
	return (
		<AnimatedPressable
			entering={FadeInUp}
			exiting={FadeOutUp}
			style={styles.container}
			{...rest}
		>
			<Image
				resizeMode="contain"
				style={styles.img}
				source={item.thumbnail}
			/>
			<Text style={styles.title}>{item.title}</Text>
			<Text style={styles.description}>{item.description}</Text>
			<Text style={styles.price}>
				<Text style={styles.RS}>R$</Text>{" "}
				{(item.price / 100).toFixed(2).replace(".", ",")}
			</Text>
		</AnimatedPressable>
	);
}
