import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { cartReducer } from '../reducers/cart/reducer';
import { CartActions } from '../reducers/cart/actions';

export interface ICoffee {
	id: number;
	title: string;
	description: string;
	type: 'Tradicional' | 'Doce' | 'Especial';
	price: number;
	thumbnail: string;
}
export interface ICartCoffee extends ICoffee {
	count: number;
}
interface IAddress {
	number: string;
	cep: string;
	street: string;
	city: string;
	district: string;
	uf: string;
	complement?: string | undefined;
}
export interface IOrder {
	cart: ICartCoffee[];
	address: IAddress;
	paymentMethod: 'Cartão de Crédito' | 'Dinheiro' | 'Depósito Bancário';
}

export interface IState {
	cart: ICartCoffee[];
	orders: IOrder[];
}

export type CartContextDataProps = {
	addProductCart: (newProduct: ICartCoffee) => Promise<void>;
	removeProductCart: (coffeeId: number) => Promise<void>;
	decreaseCoffeeCount: (coffeeId: number) => void;
	increaseCoffeeCount: (coffeeId: number) => void;
	submitOrder: (
		address: IAddress,
		paymentMethod: 'Cartão de Crédito' | 'Dinheiro' | 'Depósito Bancário'
	) => void;
	cart: ICartCoffee[];
	orders: IOrder[];
};

type CartContextProviderProps = {
	children: ReactNode;
};

export const CartContext = createContext<CartContextDataProps>(
	{} as CartContextDataProps
);

const STORAGE_KEY = '@coffee-delivery:cart-state-1.0.0';

export function CartContextProvider({ children }: CartContextProviderProps) {
	const [state, dispatch] = useReducer(
		cartReducer,
		{
			cart: [],
			orders: []
		},
		state => {
			const storedStateAsJSON = localStorage.getItem(STORAGE_KEY);

			if (storedStateAsJSON) {
				return JSON.parse(storedStateAsJSON);
			}

			return state;
		}
	);
	const { cart, orders } = state;
	async function addProductCart(newItem: ICartCoffee) {
		const indexCofee = cart.findIndex(c => c.id === newItem.id);
		if (indexCofee < 0) {
			dispatch(CartActions.addNewCoffee(newItem));
		} else {
			dispatch(CartActions.incrementCoffee(newItem.id));
		}
	}

	function decreaseCoffeeCount(id: number) {
		dispatch(CartActions.decrementCoffee(id));
	}
	function increaseCoffeeCount(id: number) {
		dispatch(CartActions.incrementCoffee(id));
	}
	async function removeProductCart(coffeeId: number) {
		dispatch(CartActions.removeCoffee(coffeeId));
	}
	async function submitOrder(
		address: IAddress,
		paymentMethod: 'Cartão de Crédito' | 'Dinheiro' | 'Depósito Bancário'
	) {
		dispatch(
			CartActions.submitOrder({
				address,
				paymentMethod,
				cart
			})
		);
	}

	useEffect(() => {
		if (state) {
			const stateJSON = JSON.stringify(state);

			localStorage.setItem(STORAGE_KEY, stateJSON);
		}
	}, [state]);

	return (
		<CartContext.Provider
			value={{
				cart,
				orders,
				addProductCart,
				removeProductCart,
				decreaseCoffeeCount,
				increaseCoffeeCount,
				submitOrder
			}}
		>
			{children}
		</CartContext.Provider>
	);
}
