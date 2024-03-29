import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import {
	Container,
	Header,
	HighlightCards,
	Photo,
	PowerIcon,
	User,
	UserGreeting,
	UserInfo,
	UserName,
	UserWrapper,
	Transactions,
	TransactionList,
	Title,
	LogoutButton,
	LoadContainer
} from './styles';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard, {
	TransactionCardProps
} from '../../components/TransactionCard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { useAuth } from '../../hooks/Auth';

export interface TransactionProps extends TransactionCardProps {
	id: string;
}

interface HighlightDataProps {
	amount: string;
	lastTransaction: string;
}
interface HighlightData {
	entries: HighlightDataProps;
	costs: HighlightDataProps;
	total: HighlightDataProps;
}

function Dashboard() {
	const [isLoading, setIsLoading] = useState(true);
	const theme = useTheme();
	const { signOut, user } = useAuth();

	async function handleClick() {
		await signOut();
	};
	const [transactions, setTransactions] = useState<TransactionProps[]>([]);
	const [highlightData, setHighlightData] = useState<HighlightData>(
		{} as HighlightData
	);


	function getLastTransactiondate(
		items: TransactionProps[],
		type: 'up' | 'down'
	) {

		let filteredItems =
			items
				.filter(item => item.type === type);
		if (filteredItems.length == 0) {
			return null;
		}
		const date = new Date(
			Math.max.apply(
				Math,
				filteredItems.map(item => new Date(item.date).getTime())
			)
		);

		return `${date.getDate()} de ${date.toLocaleString('pt-BR', {
			month: 'long'
		})}`;
	}

	async function loadData() {
		let entriesSum = 0;
		let costSum = 0;
		const dataKey = `@gofinance:transaction_user:${user!.id}`;
		const response = await AsyncStorage.getItem(dataKey);
		const transactions = response ? JSON.parse(response) : [];
		const formatedData: TransactionProps[] = transactions.map(
			(item: TransactionProps) => {
				if (item.type === 'up') {
					entriesSum += Number(item.amount);
				} else {
					costSum += Number(item.amount);
				}

				const amount = Number(item.amount).toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				});

				const date = Intl.DateTimeFormat('pt-BR', {
					day: '2-digit',
					month: '2-digit',
					year: '2-digit'
				}).format(new Date(item.date));

				return {
					id: item.id,
					name: item.name,
					type: item.type,
					category: item.category,
					amount,
					date
				};
			}
		);
		setTransactions(formatedData);

		const lastTransactionEntry = getLastTransactiondate(transactions, 'up');
		const lastTransactionCost = getLastTransactiondate(
			transactions,
			'down'
		);

		setHighlightData({
			entries: {
				amount: entriesSum.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				}),
				lastTransaction: lastTransactionEntry ? `Última entrada dia ${lastTransactionEntry}` : 'Não há transações'
			},
			costs: {
				amount: costSum.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				}),
				lastTransaction: lastTransactionCost ? `Última saída dia ${lastTransactionCost}` : 'Não há transações'
			},
			total: {
				amount: (entriesSum - costSum).toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				}),
				lastTransaction: lastTransactionCost ? `De 01 à ${lastTransactionCost}` :
					lastTransactionEntry ? `De 01 à ${lastTransactionCost}` :
						'Não há transações'
			}
		});
		setIsLoading(false);
	}

	useEffect(() => {
		loadData();
	}, []);

	useFocusEffect(
		useCallback(() => {
			loadData();
		}, [])
	);
	return (
		<Container>
			{isLoading ? (
				<LoadContainer>
					<ActivityIndicator
						color={theme.COLORS.primary}
						size="large"
					/>
				</LoadContainer>
			) : (
				<>
					<Header>
						<UserWrapper>
							<UserInfo>
								<Photo
									source={{
										uri: user!.photo
									}}
								/>
								<User>
									<UserGreeting>Olá,</UserGreeting>
									<UserName>{user?.name}</UserName>
								</User>
							</UserInfo>
							<LogoutButton onPress={handleClick}>
								<PowerIcon name="power" />
							</LogoutButton>
						</UserWrapper>
					</Header>
					<HighlightCards>
						<HighlightCard
							title="Entrada"
							amount={highlightData.entries.amount}
							lastTransaction={highlightData.entries.lastTransaction}
							type="up"
						/>
						<HighlightCard
							title="Saída"
							amount={highlightData.costs.amount}
							lastTransaction={highlightData.costs.lastTransaction}
							type="down"
						/>
						<HighlightCard
							title="Total"
							amount={highlightData.total.amount}
							lastTransaction={highlightData.total.lastTransaction}
							type="total"
						/>
					</HighlightCards>
					<Transactions>
						<Title>Listagem</Title>
						<TransactionList
							data={transactions}
							keyExtractor={item => item.id}
							renderItem={({ item }) => (
								<TransactionCard data={item} />
							)}
						/>
					</Transactions>
				</>
			)}
		</Container>
	);
}

export default Dashboard;
