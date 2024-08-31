import { useContext } from 'react';

import { CartContext, CartContextDataProps } from '../contexts/cart';

export function useCart(): CartContextDataProps {
	const context = useContext(CartContext);

	return context;
}
