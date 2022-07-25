import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import Acessory from '../../components/Acessory';
import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import {
	About,
	Acessories,
	Brand,
	CarImages,
	Container,
	Content,
	Description,
	Details,
	Footer,
	Header,
	Name,
	Period,
	Price,
	Rent
} from './styles';
import Button from '../../components/Button';
import { CarDTO } from '../../DTOs/carDTO';
import { getIcon } from '../../utils/getAcessoryIcon';
import { useTheme } from 'styled-components/native';

interface Params {
	car: CarDTO;
}

export default function CarDetails() {
	const navigation = useNavigation();
	const route = useRoute();

	const theme = useTheme();

	const scrollY = useSharedValue(0);
	const scrollHandler = useAnimatedScrollHandler(event => {
		scrollY.value = event.contentOffset.y;
	});

	const headerStyleAnimation = useAnimatedStyle(() => {
		return {
			height: interpolate(
				scrollY.value,
				[0, 200],
				[200, 70],
				Extrapolate.CLAMP
			)
		};
	});
	const sliderCarsStyleAnimation = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				scrollY.value,
				[0, 150],
				[1, 0],
				Extrapolate.CLAMP
			)
		};
	});

	const { car } = route.params as Params;
	function handleSelectRentPeriod() {
		navigation.navigate('Scheduling', { car });
	}

	return (
		<Container>
			<Animated.View
				style={[
					headerStyleAnimation,
					styles.header,
					{ backgroundColor: theme.colors.background_secondary }
				]}
			>
				<Header>
					<BackButton onPress={() => navigation.goBack()} />
				</Header>
				<CarImages>
					<Animated.View style={[sliderCarsStyleAnimation]}>
						<ImageSlider imagesUrl={car.photos} />
					</Animated.View>
				</CarImages>
			</Animated.View>

			<Animated.ScrollView
				style={{
					paddingHorizontal: 24,
					paddingTop: getStatusBarHeight() + 160
				}}
				showsVerticalScrollIndicator={false}
				onScroll={scrollHandler}
				scrollEventThrottle={16}
			>
				<Details>
					<Description>
						<Brand>{car.brand}</Brand>
						<Name>{car.name}</Name>
					</Description>
					<Rent>
						<Period>{car.rent.period}</Period>
						<Price>R$ {car.rent.price}</Price>
					</Rent>
				</Details>
				<Acessories>
					{car.accessories.map(item => (
						<Acessory name={item.name} icon={getIcon(item.type)} />
					))}
				</Acessories>
				<About>{car.about}</About>
			</Animated.ScrollView>
			<Footer>
				<Button
					title="Escolher período de aluguel"
					onPress={handleSelectRentPeriod}
				/>
			</Footer>
		</Container>
	);
}

const styles = StyleSheet.create({
	header: {
		position: 'absolute',
		overflow: 'hidden',
		zIndex: 1
	}
});
