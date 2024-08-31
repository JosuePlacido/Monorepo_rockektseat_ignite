import React from 'react';
import { useCart } from '../../hooks/useCart';
import MessageImg from '../../assets/message.png';
import { Container } from './styles';
import { BadgeIcon } from '../../components/BadgeIcon';
import { CurrencyDollar, MapPin, Timer } from 'phosphor-react';

export function Message() {
	const { orders } = useCart();
	const order = orders[orders.length - 1];
	return (
		<Container>
			<h1>Uhu! Pedido confirmado</h1>
			<p>Agora é só aguardar que logo o café chegará até você</p>
			<div>
				<ul>
					<li>
						<BadgeIcon variant="purple">
							<MapPin size={20} weight="fill" />
						</BadgeIcon>
						<span>
							Entrega em{' '}
							<b>
								{order.address.street}, {order.address.number}
							</b>
							<br />
							{order.address.district} - {order.address.city},{' '}
							{order.address.uf}
						</span>
					</li>
					<li>
						<BadgeIcon variant="yellow">
							<Timer size={20} weight="fill" />
						</BadgeIcon>
						<span>
							Previsão de entrega <br />
							<b>20 min - 30 min</b>
						</span>
					</li>
					<li>
						<BadgeIcon variant="dark">
							<CurrencyDollar size={20} weight="fill" />
						</BadgeIcon>
						<span>
							Pagamento na entrega <br />
							<b>{order.paymentMethod}</b>
						</span>
					</li>
				</ul>
			</div>
			<img src={MessageImg} alt="" />
		</Container>
	);
}
