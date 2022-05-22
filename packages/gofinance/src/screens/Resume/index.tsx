import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';
import { VictoryPie } from 'victory-native';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import HistoryCard from '../../components/HistoryChart';
import { TransactionCardProps } from '../../components/TransactionCard';
import { categories } from '../../utils/categories';

import { ChartContainer, Container, Content, Header, LoadContainer, Month, MonthSelect, MonthSelectButton, MonthSelectIcon, Title } from './styles';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

interface CategoryData {
	key: string;
	name: string;
	total: number;
	totalFormatted: string;
	color: string;
	percent: string;
}
export default function Resume() {
	const [isLoading, setIsLoading] = useState(false);
	const [dataCategory, setDataCategory] = useState<CategoryData[]>([]);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const theme = useTheme();

	function handleChangeDate(action: 'prev' | 'next') {
		if (action === 'prev') {
			setSelectedDate(subMonths(selectedDate, 1));
		} else {
			setSelectedDate(addMonths(selectedDate, 1));
		}
	}


	async function loadData() {
		setIsLoading(true);
		const dataKey = '@gofinance:transaction';
		const response = await AsyncStorage.getItem(dataKey);
		const transactions = response ? JSON.parse(response) : [];

		const costs = transactions.filter(
			(item: TransactionCardProps) => item.type === 'down'
				&& new Date(item.date).getMonth() === selectedDate.getMonth()
				&& new Date(item.date).getFullYear() === selectedDate.getFullYear()
		);

		const totalCosts: number = costs.reduce(
			(result: number, item: TransactionCardProps) =>
				result + Number(item.amount),
			0
		);

		const totalByCategory: CategoryData[] = [];
		categories.forEach(category => {
			let total: number = 0;

			costs.forEach((item: TransactionCardProps) => {
				if (item.category === category.key) {
					total += Number(item.amount);
				}
			});

			const percent = `${((total / totalCosts) * 100).toFixed(0)}%`;

			total &&
				totalByCategory.push({
					key: category.key,
					name: category.name,
					color: category.color,
					total,
					totalFormatted: total.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL'
					}),
					percent
				});
		});
		setDataCategory(totalByCategory);
		setIsLoading(false);
	}

	useFocusEffect(
		useCallback(() => {
			loadData();
		}, [selectedDate])
	);
	return (
		<Container>
			<Header>
				<Title>Resumo por categoria</Title>
			</Header>

			<MonthSelect>
				<MonthSelectButton onPress={() => handleChangeDate('prev')}>
					<MonthSelectIcon name="chevron-left" />
				</MonthSelectButton>
				<Month>
					{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
				</Month>
				<MonthSelectButton onPress={() => handleChangeDate('next')}>
					<MonthSelectIcon name="chevron-right" />
				</MonthSelectButton>
			</MonthSelect>
			{isLoading ? (
				<LoadContainer>
					<ActivityIndicator
						color={theme.COLORS.primary}
						size="large"
					/>
				</LoadContainer>
			) : (<>
				<ChartContainer>
					<VictoryPie
						data={dataCategory}
						colorScale={dataCategory.map(i => i.color)}
						style={{
							labels: {
								fontSize: RFValue(18),
								fontWeight: 'bold',
								fill: theme.COLORS.shape
							}
						}}
						labelRadius={50}
						x="percent"
						y="total" />
				</ChartContainer>
				<Content>
					{dataCategory.map(item => (
						<HistoryCard
							key={item.key}
							title={item.name}
							amount={item.totalFormatted}
							color={item.color}
						/>
					))}
				</Content>
			</>)}
		</Container>
	);
}
