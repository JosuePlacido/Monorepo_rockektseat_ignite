import {
	TouchableOpacity,
	TouchableOpacityProps,
	Text,
	Pressable,
	PressableProps,
	Dimensions
} from "react-native";

import { styles } from "./styles";
import { THEME } from "../../styles/theme";
import Animated, {
	Extrapolation,
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming
} from "react-native-reanimated";
import { useEffect } from "react";

type Props = PressableProps & {
	title: string;
	isChecked?: boolean;
	error?: boolean;
};
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Select({ title, isChecked = true, error, ...rest }: Props) {
	const selectedAnimation = useSharedValue(1);

	const containerAnimatedStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				selectedAnimation.value,
				[0, 1, 2],
				[
					THEME.COLORS.GREY_700,
					THEME.COLORS.GREY_700,
					THEME.COLORS.WHITE
				]
			),
			borderColor: interpolateColor(
				selectedAnimation.value,
				[0, 1, 2],
				[THEME.COLORS.RED, "transparent", THEME.COLORS.PURPLE]
			),
			borderWidth: interpolate(
				selectedAnimation.value,
				[0, 1],
				[2, 1],
				Extrapolation.CLAMP
			)
		};
	});

	useEffect(() => {
		selectedAnimation.value = withTiming(error ? 0 : isChecked ? 2 : 1);
	}, [isChecked, error]);
	return (
		<AnimatedPressable
			style={[styles.container, containerAnimatedStyle]}
			{...rest}
		>
			<Text style={isChecked ? styles.titleActive : styles.title}>
				{title}
			</Text>
		</AnimatedPressable>
	);
}
