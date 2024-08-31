import { Trash } from 'phosphor-react';
import { ICartCoffee } from '../../contexts/cart';
import { CartButton, Container, PriceDisplay } from './styles';
import { InputNumber } from '../InputNumer';
import { useCart } from '../../hooks/useCart';

type Props = {
	coffee: ICartCoffee;
};
export function CartItem({ coffee }: Props) {
	const { removeProductCart, increaseCoffeeCount, decreaseCoffeeCount } =
		useCart();

	function handleChanngeCount(newCount: number) {
		console.log(newCount, coffee.count);
		if (newCount > coffee.count) increaseCoffeeCount(coffee.id);
		else decreaseCoffeeCount(coffee.id);
	}

	function handleRemoveCoffee() {
		removeProductCart(coffee.id);
	}

	return (
		<Container>
			<img src={coffee.thumbnail} alt="" />
			<div>
				<p>{coffee.title}</p>
				<span>
					<InputNumber
						value={coffee.count}
						updateValue={handleChanngeCount}
					/>
					<CartButton type="button" onClick={handleRemoveCoffee}>
						<Trash size={20} /> REMOVER
					</CartButton>
				</span>
			</div>
			<PriceDisplay>
				R$ {(coffee.price / 100).toFixed(2).replace('.', ',')}
			</PriceDisplay>
		</Container>
	);
}
