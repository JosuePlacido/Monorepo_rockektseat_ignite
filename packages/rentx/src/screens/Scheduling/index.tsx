import React, { useState } from 'react';
import { useTheme } from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';

import BackButton from '../../components/BackButton';
import {
	Container,
	Content,
	DateInfo,
	DateTitle,
	DateValue,
	Footer,
	Header,
	RentalInfo,
	Title
} from './styles';

import ArrowSvg from '../../assets/arrow.svg';
import { Alert, StatusBar } from 'react-native';
import Button from '../../components/Button';
import Calendar, { DayProps, MarkedDateProps } from '../../components/Calendar';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { format } from 'date-fns';
import { CarDTO } from '../../DTOs/carDTO';

interface RentalPeriod {
	startFormatted: string;
	endFormatted: string;
}
interface Params {
	car: CarDTO;
}

export default function Scheduling() {
	const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
		{} as DayProps
	);
	const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
		{} as MarkedDateProps
	);
	const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
		{} as RentalPeriod
	);
	const route = useRoute();
	const { car } = route.params as Params;

	const theme = useTheme();
	const navigation = useNavigation();

	function handleSchedulingDetails() {
		navigation.navigate('SchedulingDetails', {
			car,
			dates: Object.keys(markedDates),
			rentalPeriod
		});
	}
	function handleChangeDate(day: DayProps) {
		let start = !lastSelectedDate.timestamp ? day : lastSelectedDate;
		let end = day;
		if (start.timestamp > end.timestamp) {
			const aux = start;
			start = end;
			end = aux;
		}
		setLastSelectedDate(day);
		const interval = generateInterval(start, end);
		setMarkedDates(interval);

		const firstDate = Object.keys(interval)[0];
		const endDate = Object.keys(interval)[Object.keys(interval).length - 1];
		setRentalPeriod({
			startFormatted: format(
				getPlatformDate(new Date(firstDate)),
				'dd/MM/yyyy'
			),
			endFormatted: format(
				getPlatformDate(new Date(endDate)),
				'dd/MM/yyyy'
			)
		});
	}

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

				<RentalInfo>
					<DateInfo selected={!!rentalPeriod.startFormatted}>
						<DateTitle>De</DateTitle>
						<DateValue>{rentalPeriod.startFormatted}</DateValue>
					</DateInfo>
					<ArrowSvg />
					<DateInfo selected={!!rentalPeriod.endFormatted}>
						<DateTitle>Até</DateTitle>
						<DateValue>{rentalPeriod.endFormatted}</DateValue>
					</DateInfo>
				</RentalInfo>
			</Header>

			<Content>
				<Calendar
					markedDates={markedDates}
					onDayPress={handleChangeDate}
				/>
			</Content>

			<Footer>
				<Button
					enabled={!!rentalPeriod.endFormatted}
					title="Confirmar"
					onPress={handleSchedulingDetails}
				/>
			</Footer>
		</Container>
	);
}
