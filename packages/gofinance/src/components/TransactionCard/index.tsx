import React from 'react';

import {
	Container,
	Title,
	Category,
	CategoryName,
	Icon,
	Footer,
	Amount,
	Date
} from './style';

interface Category {
	name: string;
	icon: string;
}
export interface TransactionCardProps {
	title: string;
	amount: string;
	category: Category;
	date: string;
	type: 'positive' | 'negative';
}
interface Props {
	data: TransactionCardProps
}

const TransactionCard: React.FC<Props> = ({ data }: Props) => {
	return (
		<Container >
			<Title >{data.title}</Title>
			<Amount type={data.type}>{data.type === 'negative' ? '-' : ''} {data.amount}</Amount>
			<Footer>
				<Category>
					<Icon name={data.category.icon} />
					<CategoryName>{data.category.name}</CategoryName>
				</Category>
				<Date>{data.date}</Date>
			</Footer>
		</Container>
	);
};

export default TransactionCard;
