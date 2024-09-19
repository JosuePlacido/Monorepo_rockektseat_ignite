import Image from 'next/image';
import { X } from 'phosphor-react';
import { useMemo } from 'react';

import { useCart } from '@/hooks/useCart';
import { CartPanelStyled, ProductItem } from '@/styles/components/CartPanel';

import { Button } from './Button';

export function CartPanel() {
	const { cart, open, visible, removeProductCart, submitOrder } = useCart();

	const total = useMemo(
		() =>
			cart.reduce(
				(totals, item) => {
					return {
						total: totals.total + (item.quantity * item.rawPrice) / 100,
						quantity: totals.quantity + item.quantity
					};
				},
				{ total: 0, quantity: 0 }
			),
		[cart]
	);

	return (
		<CartPanelStyled className={open ? 'active' : ''}>
			<X
				onClick={() => visible()}
				weight="bold"
				style={{
					marginLeft: 'auto'
				}}
				size={24}
			/>
			<h2>Sacola de Compras</h2>
			<ul>
				{cart.map(c => (
					<ProductItem key={c.id}>
						<div>
							<Image src={c.imageUrl} width={100} height={90} alt="" />
						</div>
						<span>
							<p>{c.name}</p>
							<h3>{c.price}</h3>
							<button onClick={() => removeProductCart(c.id)}>Remover</button>
						</span>
					</ProductItem>
				))}
			</ul>
			<dl>
				<dt>Quantidade:</dt>
				<dd>{total.quantity} unidades</dd>
				<dt>Valor Total:</dt>
				<dd>
					{new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL'
					}).format(total.total)}
				</dd>
			</dl>
			<Button onClick={() => submitOrder()}>Finalizar Compra</Button>
		</CartPanelStyled>
	);
}
