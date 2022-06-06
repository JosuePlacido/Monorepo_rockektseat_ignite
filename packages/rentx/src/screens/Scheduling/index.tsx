import React from 'react';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

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
import { StatusBar } from 'react-native';
import Button from '../../components/Button';
import Calendar from '../../components/Calendar';

export default function Scheduling() {
	const theme = useTheme();
	const navigation = useNavigation();

	function handleSchedulingDetails() {
		navigation.navigate("SchedulingDetails");
	}

	return (
		<Container>
			<Header>
				<StatusBar
					barStyle="light-content"
					translucent
					backgroundColor="transparent"
				/>
				<BackButton onPress={() => navigation.goBack()} color={theme.colors.shape} />
				<Title>
					Escolha uma {'\n'}
					data de inicio e {'\n'}
					fim do aluguel
				</Title>

				<RentalInfo>
					<DateInfo selected={false}>
						<DateTitle>De</DateTitle>
						<DateValue></DateValue>
					</DateInfo>
					<ArrowSvg />
					<DateInfo selected={false}>
						<DateTitle>Até</DateTitle>
						<DateValue>10/10/2022</DateValue>
					</DateInfo>
				</RentalInfo>
			</Header>

			<Content>
				<Calendar />
			</Content>

			<Footer>
				<Button title="Confirmar" onPress={handleSchedulingDetails} />
			</Footer>
		</Container>
	);
}
