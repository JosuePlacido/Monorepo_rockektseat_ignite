import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import uuid from 'react-native-uuid';

import CategorySelect from '../CategorySelect';
import Button from '../../components/Forms/Button';
import CategorySelectButton from '../../components/Forms/CategorySelectButton';
import InputForm from '../../components/Forms/InputForm';
import TransactionTypeButton from '../../components/Forms/TransactionTypeButton';

import {
	Container,
	Fields,
	Form,
	Header,
	Title,
	TransactionsTypes
} from './styles';
import { GestureHandlerRootView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

export type FormData = {
	[name: string]: any;
};

const schema = Yup.object().shape({
	name: Yup.string().required('Nome é obrigatório'),
	amount: Yup.number()
		.typeError('Informe um valor numérico')
		.positive('O valor não pode ser negativo')
		.required('O valor é obrigatório')
});
const Register: React.FC = () => {
	const navigation: NavigationProp<ParamListBase> = useNavigation();

	const dataKey = "@gofinance:transaction";
	const [category, setCategory] = useState({
		key: 'category',
		name: 'Categoria'
	});
	const [transactionType, setTransactionType] = useState('');
	const [categoryModalOpen, setCategoryModalOpen] = useState(false);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});
	function handleTransactionType(type: 'up' | 'down') {
		setTransactionType(type);
	}
	function handleOpenSelectCategory() {
		setCategoryModalOpen(true);
	}
	function handleCloseSelectCategory() {
		setCategoryModalOpen(false);
	}

	async function handleRegister(form: FormData) {
		if (!transactionType) {
			return Alert.alert('Selecione o tipo de transação');
		}

		if (category.key === 'category') {
			return Alert.alert('Selecione a categoria');
		}

		const newTransaction = {
			id: String(uuid.v4()),
			name: form.name,
			amount: form.amount,
			type: transactionType,
			category: category.key,
			date: new Date()
		};


		try {
			const loadedTransactions = await AsyncStorage.getItem(dataKey);
			const currentTransactions = loadedTransactions ? JSON.parse(loadedTransactions) : [];
			const newTransactionsList = [
				...currentTransactions,
				newTransaction
			];
			await AsyncStorage.setItem(dataKey, JSON.stringify(newTransactionsList));


			setCategory({
				key: 'category',
				name: 'Categoria'
			});
			setTransactionType('');
			reset();

			navigation.navigate('Listagem');
		} catch (error) {
			console.error(error);
			Alert.alert('Não foi possível salvar');
		}
	}

	return (
		<TouchableWithoutFeedback containerStyle={{ flex: 1 }} style={{ flex: 1 }} onPress={() => Keyboard.dismiss}>
			<Container>
				<Header>
					<Title>Cadastro</Title>
				</Header>
				<Form>
					<Fields>
						<InputForm
							name="name"
							control={control}
							placeholder="Nome"
							autoCapitalize="sentences"
							autoCorrect={false}
							erro={errors.name && errors.name.message}
						/>
						<InputForm
							name="amount"
							control={control}
							placeholder="Preço"
							keyboardType="numeric"
							erro={errors.amount && errors.amount.message}
						/>
						<TransactionsTypes>
							<TransactionTypeButton
								title="Entrada"
								type="up"
								isActive={transactionType === 'up'}
								onPress={() => handleTransactionType('up')}
							/>
							<TransactionTypeButton
								title="Saida"
								type="down"
								isActive={transactionType === 'down'}
								onPress={() => handleTransactionType('down')}
							/>
						</TransactionsTypes>
						<CategorySelectButton
							title={category.name}
							onPress={handleOpenSelectCategory}
						/>
					</Fields>
					<GestureHandlerRootView>
						<Button
							title="Enviar"
							onPress={handleSubmit(handleRegister)}
						/>
					</GestureHandlerRootView>
				</Form>

				<Modal visible={categoryModalOpen}>
					<CategorySelect
						category={category}
						setCategory={setCategory}
						closeSelectCategory={handleCloseSelectCategory}
					/>
				</Modal>
			</Container>
		</TouchableWithoutFeedback>
	);
};

export default Register;
