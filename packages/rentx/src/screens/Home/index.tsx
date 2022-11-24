import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../databases';

import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';
import Logo from '../../assets/logo.svg';
import Car from '../../components/car';
import { Car as ModelCar } from '../../databases/model/Car';
import api from '../../services/api';
import { CarDTO } from '../../DTOs/carDTO';
import Load from '../../components/Load';
import Button from '../../components/Button';

export default function Home() {
	const [cars, setCars] = useState<ModelCar[]>([]);
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();
	const netInfo = useNetInfo();

	function handleCarDetails(car: CarDTO) {
		navigation.navigate('CarDetails', { car });
	}

	async function offlineSynchronize() {
		await synchronize({
			database,
			pullChanges: async ({ lastPulledAt }) => {
				const response = await api.get(
					`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
				);
				const { changes, latestVersion } = response.data;

				return { changes, timestamp: latestVersion };
			},
			pushChanges: async ({ changes }) => {
				const user = changes.users;
				await api.post('/users/sync', user).catch(console.error);
			}
		});
	}

	useEffect(() => {
		let isMounted = true;
		async function loadData() {
			try {
				setLoading(true);
				const carCollection = database.get<ModelCar>('cars');
				const cars = await carCollection.query().fetch();
				if (isMounted) {
					setCars(cars);
				}
			} catch (error) {
				console.error(error);
			} finally {
				isMounted && setLoading(false);
			}
		}
		loadData();
		return () => {
			isMounted = false;
		};
	}, []);

	useEffect(() => {
		if (netInfo.isConnected) {
			offlineSynchronize();
		}
	}, [netInfo.isConnected]);

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
					{!loading && (
						<TotalCars>Total de {cars.length} carros</TotalCars>
					)}
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
		</Container>
	);
}
