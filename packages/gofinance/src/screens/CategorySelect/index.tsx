import React from 'react';
import { View, FlatList } from 'react-native';
import Button from '../../components/Forms/Button';
import { categories } from '../../utils/categories';

import {
	Container,
	Header,
	Title,
	Category,
	Name,
	Icon,
	Separator,
	Footer
} from './styles';

interface Category {
	key: string;
	name: string;
}

interface Props {
	category: Category;
	setCategory: (category: Category) => void;
	closeSelectCategory: () => void;
}

export default function CategorySelect({ category, setCategory, closeSelectCategory }: Props) {
	return (
		<Container>
			<Header>
				<Title>Cadastro</Title>
			</Header>

			<FlatList
				data={categories}
				keyExtractor={item => item.key}
				style={{ flex: 1, width: '100%' }}
				renderItem={({ item }) => (
					<Category onPress={() => setCategory(item)}
						isActive={item.key === category.key}>
						<Icon name={item.icon} />
						<Name>{item.name}</Name>
					</Category>
				)}
				ItemSeparatorComponent={() => <Separator />}
			/>
			<Footer>
				<Button title="Selecionar" onPress={closeSelectCategory} />
			</Footer>
		</Container>
	);
};
