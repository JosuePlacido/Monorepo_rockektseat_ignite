import type { AppProps } from 'next/app';
import Image from 'next/image';

import { CartButton } from '@/components/CartButton';
import { CartPanel } from '@/components/CartPanel';
import { CartContextProvider } from '@/context/cart';
import { Container, Header } from '@/styles/pages/app';

import logoImg from '../assets/logo.svg';
import { globalStyles } from '../styles/global';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Container>
			<CartContextProvider>
				<Header>
					<Image src={logoImg} alt="" />
					<CartButton />
				</Header>
				<Component {...pageProps} />
				<CartPanel />
			</CartContextProvider>
		</Container>
	);
}
