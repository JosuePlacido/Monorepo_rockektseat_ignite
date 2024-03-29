import React, { useEffect, useState } from 'react';
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

import { Car as ModelCar } from '../../databases/model/Car';
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
	OfflineInfo,
	Period,
	Price,
	Rent
} from './styles';
import Button from '../../components/Button';
import { CarDTO } from '../../DTOs/carDTO';
import { getIcon } from '../../utils/getAcessoryIcon';
import { useTheme } from 'styled-components/native';
import api from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';

interface Params {
	car: ModelCar;
}

export default function CarDetails() {
	const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
	const navigation = useNavigation();
	const netInfo = useNetInfo();
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

	useEffect(() => {
		async function fetchCarUpfdated() {
			const response = await api.get(`/cars/${car.id}`);
			setCarUpdated(response.data);
		}
		if (netInfo.isConnected === true) {
			fetchCarUpfdated();
		}
	}, [netInfo.isConnected]);

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
						<ImageSlider
							imagesUrl={
								!!carUpdated.photos
									? carUpdated.photos
									: [
											{
												id: car.thumbnail,
												photo: car.thumbnail
											}
									  ]
							}
						/>
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
						<Period>{car.period}</Period>
						<Price>
							R$ {netInfo.isConnected ? car.price : '...'}
						</Price>
					</Rent>
				</Details>
				{!!carUpdated.accessories && (
					<Acessories>
						{carUpdated.accessories.map(item => (
							<Acessory
								key={item.id}
								name={item.name}
								icon={getIcon(item.type)}
							/>
						))}
					</Acessories>
				)}
				<About>{car.about}</About>
			</Animated.ScrollView>
			<Footer>
				<Button
					title="Escolher período de aluguel"
					onPress={handleSelectRentPeriod}
					enabled={netInfo.isConnected === true}
				/>
			</Footer>
			{netInfo.isConnected === false && (
				<OfflineInfo>
					Conecte-se a Internet para ver mais detalhes e agendar seu
					carro.
				</OfflineInfo>
			)}
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
