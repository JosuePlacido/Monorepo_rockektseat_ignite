import React from 'react';
import { Feather } from '@expo/vector-icons';
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
import Button from '../../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import {
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
	Rent,
	RentalPeriod,
	CalendarIcon,
	DateInfo,
	DateTitle,
	DateValue,
	RentalPrice,
	RentalPriceLabel,
	RentalPriceDetails,
	RentalPriceQuota,
	RentalPriceTotal
} from './styles';

export default function SchedulingDetails() {
	const theme = useTheme();
	const navigation = useNavigation();

	function handleConfirmRent() {
		navigation.navigate("SchedulingCompleted");
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
				<RentalPeriod>
					<CalendarIcon>
						<Feather
							name="calendar"
							size={RFValue(24)}
							color={theme.colors.shape}
						/>
					</CalendarIcon>
					<DateInfo>
						<DateTitle>De</DateTitle>
						<DateValue>10/10/2022</DateValue>
					</DateInfo>
					<Feather
						name="chevron-right"
						size={RFValue(24)}
						color={theme.colors.text}
					/>
					<DateInfo>
						<DateTitle>Até</DateTitle>
						<DateValue>10/10/2022</DateValue>
					</DateInfo>
				</RentalPeriod>

				<RentalPrice>
					<RentalPriceLabel>TOTAL</RentalPriceLabel>
					<RentalPriceDetails>
						<RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
						<RentalPriceTotal>R$ 2.900,00</RentalPriceTotal>
					</RentalPriceDetails>
				</RentalPrice>
			</Content>
			<Footer>
				<Button title="Alugar agora" color={theme.colors.success} onPress={handleConfirmRent} />
			</Footer>
		</Container>
	);
}

