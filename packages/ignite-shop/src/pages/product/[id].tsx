import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Stripe from 'stripe';

import { Button } from '@/components/Button';
import { IProduct } from '@/context/cart';
import { useCart } from '@/hooks/useCart';
import { stripe } from '@/lib/stripe';
import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product';
interface ProductProps {
	product: IProduct;
}
export default function Product({ product }: ProductProps) {
	const { addProductCart } = useCart();

	async function handleAddCart() {
		addProductCart({
			...product,
			quantity: 1
		});
	}

	return (
		<ProductContainer>
			<Head>
				<title>{product.name} | Ignite Shop</title>
			</Head>
			<ImageContainer>
				<Image src={product.imageUrl} width={520} height={480} alt="" />
			</ImageContainer>

			<ProductDetails>
				<h1>{product.name}</h1>
				<span>{product.price}</span>

				<p>{product.description}</p>

				<Button onClick={() => handleAddCart()}>Adicionar a sacola</Button>
			</ProductDetails>
		</ProductContainer>
	);
}
export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [
			{
				params: { id: 'prod_MLH5Wy0Y97hDAC' }
			}
		],
		fallback: 'blocking'
	};
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
	const productId = params!.id;

	const product = await stripe.products.retrieve(productId, {
		expand: ['default_price']
	});

	const price = product.default_price as Stripe.Price;

	return {
		props: {
			product: {
				id: product.id,
				name: product.name,
				imageUrl: product.images[0],
				price: new Intl.NumberFormat('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				}).format((price.unit_amount || 0) / 100),
				description: product.description,
				defaultPriceId: price.id,
				rawPrice: price.unit_amount
			}
		},
		revalidate: 60 * 60 * 1 // 1 hours
	};
};
