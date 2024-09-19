import { HandbagSimple } from 'phosphor-react';
import { useRef } from 'react';

import { useCart } from '@/hooks/useCart';
import { Badge, Container } from '@/styles/components/CartButton';

export function CartButton() {
	const panelRef = useRef<HTMLElement>(null);
	const { cart, visible } = useCart();
	function handleOpenClosePanel() {
		if (panelRef.current!.classList.contains('active')) {
			panelRef.current!.classList.add('active');
			return;
		}
		panelRef.current!.classList.remove('active');
	}

	return (
		<>
			<Container onClick={visible}>
				<HandbagSimple weight="bold" size={24} />
				{cart.length > 0 && <Badge>{cart.length}</Badge>}
			</Container>
		</>
	);
}
