import React from 'react';
import {
	Button,
	CartPanel,
	Container,
	ErrorMessage,
	Select,
	WrapperFieldHorizontal
} from './styles';
import { useCart } from '../../hooks/useCart';
import { CartItem } from '../../components/CartItem';
import {
	Bank,
	CreditCard,
	CurrencyDollar,
	MapPinLine,
	Money
} from 'phosphor-react';
import { useTheme } from 'styled-components';

import * as zod from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormAddress } from '../../components/FormAddress';
import { redirect, useNavigate } from 'react-router-dom';

const addressFormValidationSchema = zod.object({
	cep: zod.string().min(1, 'Informe o CEP'),
	street: zod.string().min(1, 'Informe a Rua'),
	number: zod.string().min(1, 'Informe o Número'),
	complement: zod.string().optional(),
	city: zod.string().min(1, 'Informe a cidade'),
	district: zod.string().min(1, 'Informe o bairro'),
	uf: zod.string().min(1, 'Informe a sigla do estado'),
	paymentMethod: zod.enum(
		['Cartão de Crédito', 'Dinheiro', 'Depósito Bancário'],
		{
			errorMap: () => ({ message: 'Informa o método de pagamento' })
		}
	)
});

export type AddressFormData = zod.infer<typeof addressFormValidationSchema>;

export function Cart() {
	const navigate = useNavigate();
	const theme = useTheme();
	const { cart, submitOrder } = useCart();

	const addressForm = useForm<AddressFormData>({
		resolver: zodResolver(addressFormValidationSchema)
	});

	const { handleSubmit, watch, reset, setValue, formState } = addressForm;

	function handleCreateOrder(data: AddressFormData) {
		const { paymentMethod, ...rest } = data;
		submitOrder(rest, paymentMethod);
		reset();
		navigate('/success');
	}
	const [totalItens, deliveryCost] = cart.reduce(
		(totals, c) => {
			return [
				(totals[0] += (c.price * c.count) / 100),
				(totals[1] += 1.75 * c.count)
			];
		},
		[0, 0]
	);

	const paymentMethod = watch('paymentMethod');
	return (
		<Container onSubmit={handleSubmit(handleCreateOrder)} action="">
			<h3>Complete seu pedido</h3>
			<h3>Cafés selecionados</h3>
			<span>
				<section>
					<header>
						<MapPinLine size={24} color={theme['yellow-dark']} />
						<span>
							<p>Endereço de Entrega</p>
							<small>
								Informe o endereço onde deseja receber seu
								pedido
							</small>
						</span>
					</header>

					<FormProvider {...addressForm}>
						<FormAddress />
					</FormProvider>
				</section>
				<section>
					<header>
						<CurrencyDollar size={24} color={theme['purple']} />
						<span>
							<p>Pagamento</p>
							<small>
								O pagamento é feito na entrega. Escolha a forma
								que deseja pagar
							</small>
						</span>
					</header>
					<WrapperFieldHorizontal>
						<Select
							type="button"
							active={`${paymentMethod === 'Cartão de Crédito'}`}
							onClick={() =>
								setValue('paymentMethod', 'Cartão de Crédito')
							}
						>
							<CreditCard size={20} />
							CARTÃO DE CRÉDITO
						</Select>
						<Select
							type="button"
							active={`${paymentMethod === 'Dinheiro'}`}
							onClick={() =>
								setValue('paymentMethod', 'Dinheiro')
							}
						>
							<Money size={20} />
							DINHEIRO
						</Select>
						<Select
							type="button"
							active={`${paymentMethod === 'Depósito Bancário'}`}
							onClick={() =>
								setValue('paymentMethod', 'Depósito Bancário')
							}
						>
							<Bank size={20} />
							DEPÓSITO BANCÁRIO
						</Select>
					</WrapperFieldHorizontal>
					{formState.errors.paymentMethod && (
						<ErrorMessage>
							{formState.errors.paymentMethod.message}
						</ErrorMessage>
					)}
				</section>
			</span>
			<CartPanel>
				{cart.map(c => (
					<>
						<CartItem key={c.id} coffee={c} />
						<hr />
					</>
				))}

				<ul>
					<li>
						<span>Total de itens</span>
						<span>
							R$ {totalItens.toFixed(2).replace('.', ',')}
						</span>
					</li>
					<li>
						<span>Entrega</span>
						<span>
							R$ {deliveryCost.toFixed(2).replace('.', ',')}
						</span>
					</li>
					<li>
						<span>Total</span>
						<span>
							R${' '}
							{(totalItens + deliveryCost)
								.toFixed(2)
								.replace('.', ',')}
						</span>
					</li>
				</ul>
				<Button type="submit" disabled={cart.length === 0}>
					CONFIRMAR PEDIDO
				</Button>
			</CartPanel>
		</Container>
	);
}
