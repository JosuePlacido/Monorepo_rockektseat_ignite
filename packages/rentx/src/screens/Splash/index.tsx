import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Dimensions, StatusBar, StyleSheet } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	Easing,
	interpolate,
	Extrapolate,
	runOnJS
} from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg';
import Logo from '../../assets/logo.svg';
import { Container } from './styles';

export default function Splash() {
	const splashAnimation = useSharedValue(0);

	const navigation = useNavigation();

	const brandStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
			transform: [
				{
					translateX: interpolate(
						splashAnimation.value,
						[0, 50],
						[0, -50],
						Extrapolate.CLAMP
					)
				}
			]
		};
	});
	const logoStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(splashAnimation.value, [0, 50], [0, 1]),
			transform: [
				{
					translateX: interpolate(
						splashAnimation.value,
						[0, 50],
						[-50, 0],
						Extrapolate.CLAMP
					)
				}
			]
		};
	});

	function startApp() {
		navigation.navigate('SignIn');
	}
	useEffect(() => {
		splashAnimation.value = withTiming(50, { duration: 1000 }, () => {
			'worklet';
			runOnJS(startApp)();
		});
	}, []);

	return (
		<Container>
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
			<Animated.View style={[brandStyle, { position: 'absolute' }]}>
				<BrandSvg width={80} height={50} />
			</Animated.View>

			<Animated.View style={[logoStyle, { position: 'absolute' }]}>
				<Logo width={180} height={20} />
			</Animated.View>
		</Container>
	);
}
