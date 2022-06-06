import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';
import Logo from '../../assets/logo.svg';
import Car, { CarData } from '../../components/car';

export default function Home() {
	const data = [{
		id: '1',
		brand: 'AUDI',
		name: 'RS 5 Coupé',
		rent: {
			period: 'Ao dia',
			price: 120
		},
		thumbnail: 'https://e7.pngegg.com/pngimages/329/794/png-clipart-2018-audi-rs-5-2014-audi-rs-5-car-audi-rs-6-car-sedan-performance-car.png'
	}];
	const navigation = useNavigation();

	function handleCarDetails() {
		navigation.navigate("CarDetails");
	}
	return (
		<Container>
			<StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
			<Header>
				<HeaderContent>
					<Logo width={108} height={12} />
					<TotalCars>Total de 12 carros</TotalCars>
				</HeaderContent>
			</Header>

			<CarList
				data={data as CarData[]}
				keyExtractor={item => item.id}
				renderItem={({ item }) => <Car data={item} onPress={handleCarDetails} />}
			/>
		</Container>
	);
}
