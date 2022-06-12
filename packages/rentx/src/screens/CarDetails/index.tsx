import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

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

interface Params {
	car: CarDTO;
}

export default function CarDetails() {
	const navigation = useNavigation();
	const route = useRoute();
	const { car } = route.params as Params;
	function handleSelectRentPeriod() {
		navigation.navigate('Scheduling', { car });
	}

	return (
		<Container>
			<Header>
				<BackButton onPress={() => navigation.goBack()} />
			</Header>
			<CarImages>
				<ImageSlider imagesUrl={car.photos} />
			</CarImages>

			<Content>
				<Details>
					<Description>
						<Brand>{car.brand}</Brand>
						<Name>{car.name}</Name>
					</Description>
					<Rent>
						<Period>{car.rent.period}</Period>
						<Price>
							R$ {car.rent.price}
						</Price>
					</Rent>
				</Details>
				<Acessories>
					{car.accessories.map(item => (
						<Acessory name={item.name} icon={getIcon(item.type)} />
					))}
				</Acessories>
				<About>{car.about}</About>
			</Content>
			<Footer>
				<Button
					title="Escolher período de aluguel"
					onPress={handleSelectRentPeriod}
				/>
			</Footer>
		</Container>
	);
}
