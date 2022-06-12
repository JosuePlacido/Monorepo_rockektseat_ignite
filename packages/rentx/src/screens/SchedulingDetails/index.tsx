import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import Acessory from '../../components/Acessory';
import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
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
import { CarDTO } from '../../DTOs/carDTO';
import { getIcon } from '../../utils/getAcessoryIcon';
import api from '../../services/api';
import { Alert } from 'react-native';

interface Params {
	car: CarDTO;
	dates: string[];
	rentalPeriod: RentalPeriod;
}
interface RentalPeriod {
	startFormatted: string;
	endFormatted: string;
}
export default function SchedulingDetails() {
	const theme = useTheme();
	const navigation = useNavigation();
	const [isSubmiting, setIsSubmiting] = useState(false);

	async function handleConfirmRent() {
		const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

		const unavailable_dates = [
			...schedulesByCar.data.unavailable_dates,
			...dates
		];
		setIsSubmiting(true);
		await api
			.post(`/schedules_byuser`, {
				user_id: 2,
				car: car,
				startDate: rentalPeriod.startFormatted,
				endDate: rentalPeriod.endFormatted
			})
			.then(() => navigation.navigate('SchedulingCompleted'))
			.catch((error) => {
				console.log(error);
				Alert.alert('Não foi possível confirmar o agendamento')
				setIsSubmiting(false);
			}

			);
	}
	const route = useRoute();
	const { car, dates, rentalPeriod } = route.params as Params;

	useEffect(() => { }, []);
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
						<Price>R$ {car.rent.price}</Price>
					</Rent>
				</Details>
				<Acessories>
					{car.accessories.map(item => (
						<Acessory name={item.name} icon={getIcon(item.type)} />
					))}
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
						<DateValue>{rentalPeriod.startFormatted}</DateValue>
					</DateInfo>
					<Feather
						name="chevron-right"
						size={RFValue(24)}
						color={theme.colors.text}
					/>
					<DateInfo>
						<DateTitle>Até</DateTitle>
						<DateValue>{rentalPeriod.endFormatted}</DateValue>
					</DateInfo>
				</RentalPeriod>

				<RentalPrice>
					<RentalPriceLabel>TOTAL</RentalPriceLabel>
					<RentalPriceDetails>
						<RentalPriceQuota>
							R$ {car.rent.price} x{dates.length} diárias
						</RentalPriceQuota>
						<RentalPriceTotal>
							R$ {car.rent.price * dates.length}
						</RentalPriceTotal>
					</RentalPriceDetails>
				</RentalPrice>
			</Content>
			<Footer>
				<Button
					title="Alugar agora"
					color={theme.colors.success}
					onPress={handleConfirmRent}
					enable={!isSubmiting}
					load={isSubmiting}
				/>
			</Footer>
		</Container>
	);
}
