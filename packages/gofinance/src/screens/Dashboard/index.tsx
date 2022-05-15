import React from 'react';
import { } from 'react-native';
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
	Title, LogoutButton
} from './styles';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard, { TransactionCardProps } from '../../components/TransactionCard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export interface TransactionProps extends TransactionCardProps {
	id: string;
}

function Dashboard() {
	const handleClick = () => {
		alert('Button clicked!');
	}
	const data: TransactionProps[] = [{
		id: '1',
		title: 'Desenvolvimento de site',
		amount: '12.000,00',
		type: 'positive',
		category: {
			name: 'Vendas',
			icon: 'dollar-sign'
		},
		date: '13/14/2020'
	}, {
		id: '2',
		title: 'Alimentação Pizza de site',
		amount: '59,00',
		type: 'negative',
		category: {
			name: 'Alimentação',
			icon: 'coffee'
		},
		date: '13/14/2020'
	}, {
		id: '3',
		title: 'Aluguel de Apartamento',
		amount: '1.200,00',
		type: 'negative',
		category: {
			name: 'Casa',
			icon: 'home'
		},
		date: '13/14/2020'
	}];

	return (
		<Container>
			<Header>
				<UserWrapper>
					<UserInfo>
						<Photo
							source={{
								uri: 'https://github.com/JosuePlacido.png'
							}}
						/>
						<User>
							<UserGreeting>Olá,</UserGreeting>
							<UserName>Josué</UserName>
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
					amount="R$ 17.400,00"
					lastTransaction="Ultima entrada dia 03 de Abril"
					type="up"
				/>
				<HighlightCard
					title="Saída"
					amount="R$ 1.259,00"
					lastTransaction="Ultima saída dia 03 de Abril"
					type="down"
				/>
				<HighlightCard
					title="Total"
					amount="R$ 16.141,00"
					lastTransaction="De 0 à 15 de Abril"
					type="total"
				/>
			</HighlightCards>
			<Transactions>
				<Title>Listagem</Title>
				<TransactionList
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <TransactionCard data={item} />}
				/>
			</Transactions>
		</Container>
	);
}

export default Dashboard;
