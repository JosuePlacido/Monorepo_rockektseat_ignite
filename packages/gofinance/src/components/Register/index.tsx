import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import CategorySelect from '../../screens/CategorySelect';
import Button from '../Forms/Button';
import CategorySelectButton from '../Forms/CategorySelectButton';
import InputForm from '../Forms/InputForm';
import TransactionTypeButton from '../Forms/TransactionTypeButton';

import {
	Container,
	Fields,
	Form,
	Header,
	Title,
	TransactionsTypes
} from './styles';
import { GestureHandlerRootView, TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
	const [category, setCategory] = useState({
		key: 'category',
		name: 'Categoria'
	});
	const [transactionType, setTransactionType] = useState('');
	const [categoryModalOpen, setCategoryModalOpen] = useState(false);

	const {
		control,
		handleSubmit,
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

	function handleRegister(form: FormData) {
		if (!transactionType) {
			return Alert.alert('Selecione o tipo de transação');
		}

		if (category.key === 'category') {
			return Alert.alert('Selecione a categoria');
		}

		const dataFormRegister = {
			name: form.name,
			amount: form.amount,
			transactionType,
			category: category.key
		};
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
								title="Income"
								type="up"
								isActive={transactionType === 'up'}
								onPress={() => handleTransactionType('up')}
							/>
							<TransactionTypeButton
								title="Outcome"
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
