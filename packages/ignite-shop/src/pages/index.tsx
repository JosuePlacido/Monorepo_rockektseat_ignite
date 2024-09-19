import 'keen-slider/keen-slider.min.css';

import { useKeenSlider } from 'keen-slider/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { CaretLeft, CaretRight } from 'phosphor-react';
import Stripe from 'stripe';

import { stripe } from '@/lib/stripe';
import { ButtonLeft, ButtonRight, Content, HomeContainer, Product } from '@/styles/pages/home';

interface HomeProps {
	products: {
		id: string;
		name: string;
		imageUrl: string;
		price: number;
	}[];
}
export default function Home({ products }: HomeProps) {
	const [sliderRef, instanceRef] = useKeenSlider({
		slides: {
			perView: 3,
			spacing: 48,
			origin: 'center'
		}
	});

	function handleBackCarousel() {
		instanceRef.current?.prev();
	}
	function handleNextCarousel() {
		instanceRef.current?.next();
	}

	return (
		<>
			<Head>
				<title>Home | Ignite Shop</title>
			</Head>
			<Content>
				<ButtonLeft onClick={handleBackCarousel}>
					<CaretLeft size={24} />
				</ButtonLeft>
				<HomeContainer ref={sliderRef} className="keen-slider">
					{products.map(product => {
						return (
							<Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
								<Product className="keen-slider__slide">
									<Image src={product.imageUrl} width={520} height={480} alt="" />

									<footer>
										<strong>{product.name}</strong>
										<span>{product.price}</span>
									</footer>
								</Product>
							</Link>
						);
					})}
				</HomeContainer>
				<ButtonRight onClick={handleNextCarousel}>
					<CaretRight size={24} />
				</ButtonRight>
			</Content>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const response = await stripe.products.list({
		expand: ['data.default_price']
	});

	const products = response.data.map(product => {
		const price = product.default_price as Stripe.Price;

		return {
			id: product.id,
			name: product.name,
			imageUrl: product.images[0],
			price: new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL'
			}).format((price.unit_amount || 0) / 100)
		};
	});

	return {
		props: {
			products
		},
		revalidate: 60 * 60 * 2
	};
};
