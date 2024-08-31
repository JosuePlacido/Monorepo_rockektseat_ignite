import { ShoppingCart } from 'phosphor-react';
import { ICoffee } from '../../contexts/cart';
import { CartButton, Container, PriceDisplay } from './styles';
import { InputNumber } from '../InputNumer';
import { useRef } from 'react';
import { useCart } from '../../hooks/useCart';

type Props = {
	coffee: ICoffee;
};
export function CoffeeCard({ coffee }: Props) {
	const { addProductCart } = useCart();
	const refCount = useRef(1);

	function handleChanngeCount(newCount: number) {
		refCount.current = newCount;
	}

	function handleAddCoffeToCart() {
		addProductCart({
			...coffee,
			count: refCount.current
		});
	}

	return (
		<Container>
			<img src={coffee.thumbnail} alt="" />
			<span>{coffee.type}</span>
			<h3>{coffee.title}</h3>
			<p>{coffee.description}</p>
			<PriceDisplay>
				R$
				<h1>{(coffee.price / 100).toFixed(2).replace('.', ',')}</h1>
				<InputNumber
					value={refCount.current}
					updateValue={handleChanngeCount}
				/>
				<CartButton onClick={handleAddCoffeToCart}>
					<ShoppingCart weight="fill" size={20} />
				</CartButton>
			</PriceDisplay>
		</Container>
	);
}
