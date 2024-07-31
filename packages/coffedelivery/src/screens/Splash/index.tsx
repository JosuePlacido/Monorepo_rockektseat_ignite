import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	interpolate,
	runOnJS,
	Extrapolation,
	Easing,
	interpolateColor,
	withSequence,
	withRepeat
} from "react-native-reanimated";

import BrandSvg from "../../assets/brand.svg";
import Logo from "../../assets/logo.svg";
import { styles } from "./styles";
import { Pressable, useWindowDimensions, View } from "react-native";
import { THEME } from "../../styles/theme";

type SplashProps = {
	handleEnd: () => void;
};

export default function Splash({ handleEnd }: SplashProps) {
	const { width } = useWindowDimensions();
	const splashAnimation = useSharedValue(0);

	const brandStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				splashAnimation.value,
				[0, 100, 150],
				[1, 1, 0]
			),
			transform: [
				{
					translateX: interpolate(
						splashAnimation.value,
						[50, 70],
						[width / 2, 0],
						Extrapolation.CLAMP
					)
				}
			]
		};
	});
	const logoStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				splashAnimation.value,
				[0, 100, 150],
				[1, 1, 0]
			),
			transform: [
				{
					translateX: interpolate(
						splashAnimation.value,
						[0, 15, 20, 30, 70, 75, 80],
						[width / 2, 0, -10, 0, 5, 0, 0, -10, 0],
						Extrapolation.CLAMP
					)
				},
				{
					translateY: interpolate(
						splashAnimation.value,
						[15, 20, 30, 70, 75, 80],
						[0, -3, 0, 0, -3, 0],
						Extrapolation.CLAMP
					)
				},
				{
					rotate: `${interpolate(
						splashAnimation.value,
						[0, 15, 20, 30, 70, 75, 80],
						[20, 20, -15, 0, 0, -15, 0],
						Extrapolation.CLAMP
					)}deg`
				}
			]
		};
	});
	const backgroundStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				splashAnimation.value,
				[0, 10, 100, 130],
				[
					THEME.COLORS.PURPLE_DARK,
					THEME.COLORS.PURPLE,
					THEME.COLORS.PURPLE,
					THEME.COLORS.PURPLE_DARK
				]
			)
		};
	});

	useEffect(() => {
		splashAnimation.value = withRepeat(
			withSequence(
				withTiming(100, { duration: 2000 }, () => {
					"worklet";
					runOnJS(handleEnd)();
				}),
				withTiming(150, { duration: 1000 })
			),
			-1
		);
	}, []);

	return (
		<Animated.View style={[backgroundStyle, styles.container]}>
			<Animated.View style={[logoStyle]}>
				<Logo width={60} height={60} />
			</Animated.View>
			<Animated.View style={[brandStyle]}>
				<BrandSvg width={80} height={50} />
			</Animated.View>
		</Animated.View>
	);
}
