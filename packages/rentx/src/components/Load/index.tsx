import React from 'react';
import { useTheme } from 'styled-components';
import LottieView from 'lottie-react-native';

import { Container } from './styles';
import Animation from '../../assets/load_animation.json';

export default function Load() {
	const theme = useTheme();

	return (
		<Container>
			<LottieView
				source={Animation}
				style={{ height: 200 }}
				autoPlay
				resizeMode="contain"
				loop
			/>
		</Container>
	);
}
