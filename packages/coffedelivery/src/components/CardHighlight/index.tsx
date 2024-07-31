import { Image, View, Text, Pressable, TouchableOpacity } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../styles/theme";
import { useCart } from "../../hooks/useCart";
import { ShoppingCart } from "phosphor-react-native";
import { ICoffee } from "../../models/Coffee";
import Animated, {
	Extrapolation,
	FadeInDown,
	FadeInUp,
	FadeOut,
	interpolate,
	Layout,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from "react-native-reanimated";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

type Props = {
	item: ICoffee;
	active?: boolean;
};
const AnimatedPeessable = Animated.createAnimatedComponent(TouchableOpacity);

export function CardHighlight({ item, active }: Props) {
	const animation = useSharedValue(0);
	const { navigate } = useNavigation();
	function handleClick() {
		navigate("coffee", { id: item.id });
	}

	function startAnimation(value: number) {
		animation.value = withTiming(value, {
			duration: 700
		});
	}

	const pressableAnimatedStyle = useAnimatedStyle(() => {
		return {
			marginHorizontal: 15,
			width: interpolate(animation.value, [1, 1.3], [166, 200]),
			transform: [
				{
					scale: animation.value
				}
			]
		};
	});

	const imageAnimatedStyle = useAnimatedStyle(() => {
		return {
			width: interpolate(animation.value, [1, 1.3], [64, 92]),
			height: interpolate(animation.value, [1, 1.3], [64, 92]),
			transform: [
				{
					translateY: interpolate(animation.value, [1, 1.3], [0, -10])
				}
			]
		};
	});

	useEffect(() => {
		startAnimation(active ? 1.3 : 1);
	}, [active]);

	return (
		<Animated.View style={[pressableAnimatedStyle]}>
			<AnimatedPeessable
				entering={FadeInDown}
				exiting={FadeOut}
				style={[styles.container]}
				onPress={handleClick}
			>
				<Animated.Image
					resizeMode="contain"
					style={[styles.img, imageAnimatedStyle]}
					source={item.thumbnail}
				/>
				<Text style={styles.tag}>{item.type}</Text>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.description}>{item.description}</Text>
				<Text style={styles.price}>
					<Text style={styles.RS}>R$</Text>{" "}
					{(item.price / 100).toFixed(2).replace(".", ",")}
				</Text>
			</AnimatedPeessable>
		</Animated.View>
	);
}
