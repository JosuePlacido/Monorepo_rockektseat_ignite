import React from 'react';
import { useNavigation } from '@react-navigation/native';


import Acessory from '../../components/Acessory';
import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import ForceSvg from '../../assets/force.svg';
import AccelerateSvg from '../../assets/acceleration.svg';
import EnergySvg from '../../assets/energy.svg';
import PeopleSvg from '../../assets/people.svg';
import SpeedSvg from '../../assets/speed.svg';
import ExchangeSvg from '../../assets/exchange.svg';
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

export default function CarDetails() {
	const navigation = useNavigation();

	function handleSelectRentPeriod() {
		navigation.navigate("Scheduling");
	}

	return (
		<Container>
			<Header>
				<BackButton onPress={() => navigation.goBack()} />
			</Header>
			<CarImages>
				<ImageSlider
					imagesUrl={[
						'https://e7.pngegg.com/pngimages/329/794/png-clipart-2018-audi-rs-5-2014-audi-rs-5-car-audi-rs-6-car-sedan-performance-car.png'
					]}
				/>
			</CarImages>

			<Content>
				<Details>
					<Description>
						<Brand>Lamborghini</Brand>
						<Name>Huracan</Name>
					</Description>
					<Rent>
						<Period>ao dia</Period>
						<Price>R$ 120,00</Price>
					</Rent>
				</Details>

				<Acessories>
					<Acessory name="Força" icon={ForceSvg} />
					<Acessory name="Aceleração" icon={AccelerateSvg} />
					<Acessory name="Velocidade" icon={SpeedSvg} />
					<Acessory name="Elétrico" icon={EnergySvg} />
					<Acessory name="Pessoas" icon={PeopleSvg} />
					<Acessory name="Exchange" icon={ExchangeSvg} />
				</Acessories>
				<About>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Curabitur vehicula iaculis turpis, eu tempus ipsum luctus
					non. Aliquam hendrerit purus ut metus aliquet aliquam.
				</About>
			</Content>
			<Footer>
				<Button title="Escolher período de aluguel" onPress={handleSelectRentPeriod} />
			</Footer>
		</Container>
	);
}
