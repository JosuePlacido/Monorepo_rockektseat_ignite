import { useContext } from 'react';

import { CartContext, CartContextDataProps } from '../context/cart';

export function useCart(): CartContextDataProps {
	const context = useContext(CartContext);

	return context;
}
