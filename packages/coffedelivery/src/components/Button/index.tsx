import {
	TouchableOpacity,
	TouchableOpacityProps,
	Text,
	PressableProps,
	Pressable,
	GestureResponderEvent
} from "react-native";

import { styles } from "./styles";
import { THEME } from "../../styles/theme";
import Animated, {
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from "react-native-reanimated";
import { useEffect } from "react";

type Props = PressableProps & {
	title: string;
	variant?: "PURPLE" | "YELLOW";
};

const COLORS: { [key: string]: string } = {
	PURPLE: THEME.COLORS.PURPLE_DARK,
	YELLOW: THEME.COLORS.YELLOW_DARK
};
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export function Button({
	title,
	variant = "PURPLE",
	onPressIn,
	onPressOut,
	...rest
}: Props) {
	const pressed = useSharedValue(0);
	const diabledAnimation = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(diabledAnimation.value, [0, 1], [0.3, 1]),
			backgroundColor: interpolateColor(
				pressed.value,
				[0, 1],
				[
					variant === "PURPLE"
						? THEME.COLORS.PURPLE_DARK
						: THEME.COLORS.YELLOW_DARK,
					variant === "PURPLE"
						? THEME.COLORS.PURPLE
						: THEME.COLORS.YELLOW
				]
			)
		};
	});

	function handlePressIn(e: GestureResponderEvent) {
		pressed.value = withTiming(1, { duration: 100 });
		onPressIn && onPressIn(e);
	}
	function handlePressOut(e: GestureResponderEvent) {
		pressed.value = withTiming(0, { duration: 100 });
		onPressOut && onPressOut(e);
	}

	useEffect(() => {
		diabledAnimation.value = withTiming(rest.disabled ? 0 : 1);
	}, [rest.disabled]);

	return (
		<AnimatedPressable
			style={[styles.container, animatedStyle]}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			{...rest}
		>
			<Text style={styles.title}>{title}</Text>
		</AnimatedPressable>
	);
}
