import {
	TouchableOpacity,
	TouchableOpacityProps,
	Text,
	Pressable,
	PressableProps
} from "react-native";

import { styles } from "./styles";
import { THEME } from "../../styles/theme";
import { useEffect } from "react";
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from "react-native-reanimated";

type Props = PressableProps & {
	title: string;
	isChecked?: boolean;
};
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export function Tag({ title, isChecked = true, ...rest }: Props) {
	const variant = useSharedValue(0);

	const containerAnimatedStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				variant.value,
				[1, 0],
				[THEME.COLORS.PURPLE, THEME.COLORS.WHITE]
			)
		};
	});
	const titleAnimatedStyle = useAnimatedStyle(() => {
		return {
			color: interpolateColor(
				variant.value,
				[1, 0],
				[THEME.COLORS.WHITE, THEME.COLORS.PURPLE_DARK]
			)
		};
	});

	useEffect(() => {
		variant.value = withTiming(isChecked ? 1 : 0, { duration: 400 });
	}, [isChecked]);
	return (
		<AnimatedPressable
			style={[styles.container, containerAnimatedStyle]}
			{...rest}
		>
			<Animated.Text style={[styles.title, titleAnimatedStyle]}>
				{title}
			</Animated.Text>
		</AnimatedPressable>
	);
}
