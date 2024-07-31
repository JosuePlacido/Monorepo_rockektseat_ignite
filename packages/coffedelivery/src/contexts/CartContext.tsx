import { createContext, useState, ReactNode, useEffect } from "react";
import { ImageSourcePropType } from "react-native";
import { ICartCoffee } from "../models/Coffee";

export type CartContextDataProps = {
	addProductCart: (newProduct: ICartCoffee) => Promise<void>;
	removeProductCart: (coffeeId: number) => Promise<void>;
	setShowToast: (show: boolean) => void;
	showToast: boolean;
	cart: ICartCoffee[];
};

type CartContextProviderProps = {
	children: ReactNode;
};

export const CartContext = createContext<CartContextDataProps>(
	{} as CartContextDataProps
);

export function CartContextProvider({ children }: CartContextProviderProps) {
	const [cart, setCart] = useState<ICartCoffee[]>([]);
	const [showToast, setShowToast] = useState(false);

	async function addProductCart(newItem: ICartCoffee) {
		const indexCofee = cart.findIndex(
			c => c.id === newItem.id && c.size === newItem.size
		);
		if (indexCofee < 0) {
			setCart([...cart, newItem]);
		} else {
			setCart(
				cart.map(c => {
					const newCount =
						newItem.id === c.id && newItem.size === c.size
							? c.count + newItem.count
							: c.count;
					return {
						...c,
						count: newCount
					};
				})
			);
		}
		setShowToast(true);
	}

	async function removeProductCart(coffeeId: number) {
		try {
			setCart(cart.filter(p => p.id !== coffeeId));
		} catch (error) {
			throw error;
		}
	}

	return (
		<CartContext.Provider
			value={{
				cart,
				showToast,
				setShowToast,
				addProductCart,
				removeProductCart
			}}
		>
			{children}
		</CartContext.Provider>
	);
}
