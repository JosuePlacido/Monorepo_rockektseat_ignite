import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import BackButton from '../../components/BackButton';
import Car from '../../components/car';
import Load from '../../components/Load';
import { Car as ModelCar } from '../../databases/model/Car';
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
import { format, parseISO } from 'date-fns';

interface DataProps {
	id: string;
	car: ModelCar;
	start_date: string;
	end_date: string;
}

export default function MyCars() {
	const theme = useTheme();
	const navigation = useNavigation();
	const screenInFocus = useIsFocus();

	const [cars, setCars] = useState<DataProps[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchCars() {
			try {
				const response = await api.get(`/rentals`);
				const dataFormatted = response.data.map((data: DataProps) => {
					return {
						id: data.id,
						car: data.car,
						start_date: format(
							parseISO(data.start_date),
							'dd/MM/yyyy'
						),
						end_date: format(parseISO(data.end_date), 'dd/MM/yyyy')
					};
				});
				setCars(dataFormatted);
			} catch (error) {
				console.log(error);
				Alert.alert('Falha ao carregar suas locações');
			} finally {
				setLoading(false);
			}
		}
		fetchCars();
	}, [screenInFocus]);

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
											{item.start_date}
										</CarFooterDate>
										<AntDesign
											name="arrowright"
											size={20}
											color={theme.colors.title}
											style={{ marginHorizontal: 10 }}
										/>
										<CarFooterDate>
											{item.end_date}
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
function useIsFocus() {
	throw new Error('Function not implemented.');
}
