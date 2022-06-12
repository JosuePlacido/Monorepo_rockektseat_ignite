import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import BackButton from '../../components/BackButton';
import Car from '../../components/car';
import Load from '../../components/Load';
import { CarDTO } from '../../DTOs/carDTO';
import api from '../../services/api';
import {
	Appointments,
	AppointmentsQuantity,
	AppointmentsTitle,
	CarFooter,
	CarFooterDate,
	CarFooterPeriod,
	CarFooterTitle,
	CarWrapper,
	Container,
	Content,
	Header,
	Subtitle,
	Title
} from './styles';

interface CarProps {
	id: string;
	user_id: string;
	car: CarDTO;
	startDate: string;
	endDate: string;
}
export default function MyCars() {
	const theme = useTheme();
	const navigation = useNavigation();

	const [cars, setCars] = useState<CarProps[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchCars() {
			try {
				const response = await api.get(`/schedules_byuser?user_id=2`);
				setCars(response.data);
			} catch (error) {
				console.log(error);
				Alert.alert('Falha ao carregar suas locações');
			} finally {
				setLoading(false);
			}
		}
		fetchCars();
	}, []);

	return (
		<Container>
			<Header>
				<StatusBar
					barStyle="light-content"
					translucent
					backgroundColor="transparent"
				/>
				<BackButton
					onPress={() => navigation.goBack()}
					color={theme.colors.shape}
				/>
				<Title>
					Escolha uma {'\n'}
					data de inicio e {'\n'}
					fim do aluguel
				</Title>
				<Subtitle>Conforto segurança e praticidade</Subtitle>
			</Header>

			{loading ? (
				<Load />
			) : (
				<Content>
					<Appointments>
						<AppointmentsTitle>
							Agendamentos feitos
						</AppointmentsTitle>
						<AppointmentsQuantity>
							{cars.length}
						</AppointmentsQuantity>
					</Appointments>

					<FlatList
						data={cars}
						keyExtractor={item => item.id}
						renderItem={({ item }) => (
							<CarWrapper>
								<Car data={item.car} />
								<CarFooter>
									<CarFooterTitle>PERÍODO</CarFooterTitle>
									<CarFooterPeriod>
										<CarFooterDate>
											{item.startDate}
										</CarFooterDate>
										<AntDesign
											name="arrowright"
											size={20}
											color={theme.colors.title}
											style={{ marginHorizontal: 10 }}
										/>
										<CarFooterDate>
											{item.endDate}
										</CarFooterDate>
									</CarFooterPeriod>
								</CarFooter>
							</CarWrapper>
						)}
					/>
				</Content>
			)}
		</Container>
	);
}
