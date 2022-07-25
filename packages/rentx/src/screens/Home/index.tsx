import React, { useEffect, useState } from 'react';
import { BackHandler, StatusBar, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
	withSpring,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import {
	CarList,
	Container,
	Header,
	HeaderContent,
	MyCarsButton,
	TotalCars
} from './styles';
import Logo from '../../assets/logo.svg';
import Car from '../../components/car';
import api from '../../services/api';
import { CarDTO } from '../../DTOs/carDTO';
import Load from '../../components/Load';
import { useTheme } from 'styled-components';
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler';

export default function Home() {
	const [cars, setCars] = useState<CarDTO[]>([]);
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();
	const theme = useTheme();

	const positionX = useSharedValue(0);
	const positionY = useSharedValue(0);

	const OnGestureEvent = useAnimatedGestureHandler({
		onStart(_, ctx: any) {
			ctx.positionX = positionX.value;
			ctx.positionY = positionY.value;
		},
		onActive(event, ctx: any) {
			positionX.value = ctx.positionX + event.translationX;
			positionY.value = ctx.positionY + event.translationY;
		},
		onEnd() {
			positionX.value = withSpring(0);
			positionY.value = withSpring(0);
		},
	});

	const MyCarsButtonStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: positionX.value },
				{ translateY: positionY.value }
			]
		};
	});

	function handleCarDetails(car: CarDTO) {
		navigation.navigate('CarDetails', { car });
	}

	function handleMyCars() {
		navigation.navigate('MyCars');
	}

	useEffect(() => {
		async function loadData() {
			try {
				setLoading(true);
				const response = await api.get('/cars');
				const result = response.data;
				setCars(result);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}
		loadData();

		BackHandler.addEventListener('hardwareBackPress', () => true);
	}, []);

	return (
		<Container>
			<StatusBar
				barStyle="light-content"
				translucent
				backgroundColor="transparent"
			/>
			<Header>
				<HeaderContent>
					<Logo width={108} height={12} />
					{!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
				</HeaderContent>
			</Header>
			{loading ? (
				<Load />
			) : (
				<CarList
					data={cars}
					keyExtractor={item => item.id}
					renderItem={({ item }) => (
						<Car
							data={item}
							onPress={() => handleCarDetails(item)}
						/>
					)}
				/>
			)}

			<PanGestureHandler onGestureEvent={OnGestureEvent}>
				<Animated.View style={[MyCarsButtonStyle]}>
					<ButtonAnimated
						onPress={handleMyCars}
						style={[
							styles.myCarsButton,
							{
								backgroundColor: theme.colors.main
							}
						]}
					>
						<Ionicons
							name="ios-car-sport"
							size={32}
							color={theme.colors.shape}
						/>
					</ButtonAnimated>
				</Animated.View>
			</PanGestureHandler>
		</Container>
	);
}

const styles = StyleSheet.create({
	myCarsButton: {
		position: 'absolute',
		bottom: 22,
		right: 13,
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
