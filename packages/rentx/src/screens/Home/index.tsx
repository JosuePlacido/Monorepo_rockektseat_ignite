import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { CarList, Container, Header, HeaderContent, MyCarsButton, TotalCars } from './styles';
import Logo from '../../assets/logo.svg';
import Car from '../../components/car';
import api from '../../services/api';
import { CarDTO } from '../../DTOs/carDTO';
import Load from '../../components/Load';
import { useTheme } from 'styled-components';


export default function Home() {
	const [cars, setCars] = useState<CarDTO[]>([]);
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();
	const theme = useTheme();


	function handleCarDetails(car: CarDTO) {
		navigation.navigate("CarDetails", { car });
	}

	function handleMyCars() {
		navigation.navigate("MyCars");
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
	}, []);

	return (
		<Container>
			<StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
			<Header>
				<HeaderContent>
					<Logo width={108} height={12} />
					<TotalCars>Total de {cars.length} carros</TotalCars>
				</HeaderContent>
			</Header>
			{loading ? <Load /> :
				<CarList
					data={cars}
					keyExtractor={item => item.id}
					renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
				/>}
			<MyCarsButton onPress={handleMyCars}>
				<Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
			</MyCarsButton>
		</Container>
	);
}
