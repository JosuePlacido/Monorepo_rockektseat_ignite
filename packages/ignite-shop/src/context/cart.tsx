import axios from 'axios';
import { createContext, ReactNode, useState } from 'react';

export interface IProduct {
	id: string;
	name: string;
	imageUrl: string;
	price: string;
	description: string;
	defaultPriceId: string;
	rawPrice: number;
}
export interface ICartProduct extends IProduct {
	quantity: number;
}

export type CartContextDataProps = {
	addProductCart: (newProduct: ICartProduct) => Promise<void>;
	removeProductCart: (coffeeId: string) => Promise<void>;
	submitOrder: () => void;
	visible: () => void;
	open: boolean;
	cart: ICartProduct[];
};

type CartContextProviderProps = {
	children: ReactNode;
};

export const CartContext = createContext<CartContextDataProps>({} as CartContextDataProps);

export function CartContextProvider({ children }: CartContextProviderProps) {
	const [cart, setCart] = useState<ICartProduct[]>([]);
	const [open, setOpen] = useState(false);

	function visible() {
		setOpen(ps => !ps);
	}
	async function addProductCart(newItem: ICartProduct) {
		const indexCofee = cart.findIndex(c => c.id === newItem.id);
		if (indexCofee < 0) {
			setCart([...cart, newItem]);
		} else {
			setCart(ps =>
				ps.map((p, i) => {
					if (i === indexCofee) p.quantity++;
					return p;
				})
			);
		}
	}
	async function removeProductCart(productId: string) {
		setCart(ps => ps.filter(p => p.id !== productId));
	}
	async function submitOrder() {
		try {
			const response = await axios.post('/api/checkout', {
				prices: cart
			});

			const { checkoutUrl } = response.data;

			window.location.href = checkoutUrl;
		} catch (err) {
			console.error(err);
			alert('Falha ao redirecionar ao checkout!');
		}
	}

	return (
		<CartContext.Provider
			value={{
				cart,
				visible,
				open,
				addProductCart,
				removeProductCart,
				submitOrder
			}}
		>
			{children}
		</CartContext.Provider>
	);
}
