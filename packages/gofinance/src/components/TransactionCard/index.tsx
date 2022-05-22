import React from 'react';
import { categories } from '../../utils/categories';

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
	name: string;
	amount: string;
	category: string;
	date: string;
	type: 'up' | 'down';
}
interface Props {
	data: TransactionCardProps
}

const TransactionCard: React.FC<Props> = ({ data }: Props) => {
	const category: Category = categories.filter(item => item.key === data.category)[0];
	return (
		<Container >
			<Title >{data.name}</Title>
			<Amount type={data.type}>{data.type === 'down' ? '-' : ''} {data.amount}</Amount>
			<Footer>
				<Category>
					<Icon name={category.icon} />
					<CategoryName>{category.name}</CategoryName>
				</Category>
				<Date>{data.date}</Date>
			</Footer>
		</Container>
	);
};

export default TransactionCard;
