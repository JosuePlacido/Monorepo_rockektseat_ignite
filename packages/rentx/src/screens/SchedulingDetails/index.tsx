import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { format } from 'date-fns';
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
import { useNetInfo } from '@react-native-community/netinfo';
import { useAuth } from '../../hooks/auth';
import { getPlatformDate } from '../../utils/getPlatformDate';

interface Params {
	car: CarDTO;
	dates: string[];
}

interface RentalPeriod {
	start: string;
	end: string;
}

export default function SchedulingDetails() {
	const theme = useTheme();
	const { user } = useAuth();

	const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
		{} as RentalPeriod
	);
	const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
	const navigation = useNavigation();
	const netInfo = useNetInfo();
	const [isSubmiting, setIsSubmiting] = useState(false);

	const route = useRoute();
	const { car, dates } = route.params as Params;
	const rentTotal = Number(dates.length * car.price);

	async function handleConfirmRent() {
		setIsSubmiting(true);

		await api
			.post(
				`rentals`,
				{
					user_id: user.user_id,
					car_id: car.id,
					start_date: new Date(dates[0]),
					end_date: new Date(dates[dates.length - 1]),
					total: rentTotal
				} /*,
				{
					headers: { authorization: `Bearer ${user.token}` }
				}*/
			)
			.then(() =>
				navigation.navigate('Confirmation', {
					title: 'Carro Alugado',
					message: `Agora você só precisa ir \nna concessionário da RENTX \npegar o seu automóvel`,
					nextScreenRoute: 'Home'
				})
			)
			.catch(error => {
				console.log(error);
				console.log(api.defaults.headers);
				Alert.alert('Não foi possível confirmar o agendamento');
				setIsSubmiting(false);
			});
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

	useEffect(() => {
		setRentalPeriod({
			start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
			end: format(
				getPlatformDate(new Date(dates[dates.length - 1])),
				'dd/MM/yyyy'
			)
		});
	}, []);
	return (
		<Container>
			<Header>
				<BackButton onPress={() => navigation.goBack()} />
			</Header>
			<CarImages>
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
			</CarImages>

			<Content>
				<Details>
					<Description>
						<Brand>{car.brand}</Brand>
						<Name>{car.name}</Name>
					</Description>
					<Rent>
						<Period>{car.period}</Period>
						<Price>R$ {car.price}</Price>
					</Rent>
				</Details>
				<Acessories>
					{!!carUpdated.accessories &&
						carUpdated.accessories.map(item => (
							<Acessory
								name={item.name}
								icon={getIcon(item.type)}
							/>
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
						<DateValue>{rentalPeriod.start}</DateValue>
					</DateInfo>
					<Feather
						name="chevron-right"
						size={RFValue(24)}
						color={theme.colors.text}
					/>
					<DateInfo>
						<DateTitle>Até</DateTitle>
						<DateValue>{rentalPeriod.end}</DateValue>
					</DateInfo>
				</RentalPeriod>

				<RentalPrice>
					<RentalPriceLabel>TOTAL</RentalPriceLabel>
					<RentalPriceDetails>
						<RentalPriceQuota>
							R$ {car.price} x{dates.length} diárias
						</RentalPriceQuota>
						<RentalPriceTotal>
							R$ {car.price * dates.length}
						</RentalPriceTotal>
					</RentalPriceDetails>
				</RentalPrice>
			</Content>
			<Footer>
				<Button
					title="Alugar agora"
					color={theme.colors.success}
					onPress={handleConfirmRent}
					enabled={!isSubmiting}
					load={isSubmiting}
				/>
			</Footer>
		</Container>
	);
}
