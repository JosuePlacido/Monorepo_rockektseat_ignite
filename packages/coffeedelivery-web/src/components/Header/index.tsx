import { CartLink, HeaderContainer } from './styles';
import { MapPin, ShoppingCart } from 'phosphor-react';

import logoIgnite from '../../assets/Logo.svg';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

export function Header() {
	const { cart } = useCart();

	const hasProductsInCart = cart.length > 0;
	return (
		<HeaderContainer>
			<nav>
				<NavLink to="/" title="Home page">
					<img src={logoIgnite} alt="" />
				</NavLink>
				<span>
					<p>
						<MapPin size={20} weight="fill" />
						Porto Alegre, RS
					</p>
					<CartLink to="/cart" title="Carrinho de compras">
						<ShoppingCart weight="fill" size={20} />
						{hasProductsInCart && <span>{cart.length}</span>}
					</CartLink>
				</span>
			</nav>
		</HeaderContainer>
	);
}
