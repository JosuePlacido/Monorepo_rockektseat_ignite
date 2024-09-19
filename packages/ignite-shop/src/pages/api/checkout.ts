import { NextApiRequest, NextApiResponse } from 'next';

import { stripe } from '../../lib/stripe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { prices } = req.body;

	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed.' });
	}

	if (!prices && prices.length === 0) {
		return res.status(400).json({ error: 'Price not found.' });
	}
	const pricesToSend = prices.map((p: any) => {
		return {
			price: p.defaultPriceId,
			quantity: p.quantity
		};
	});
	const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
	const cancelUrl = `${process.env.NEXT_URL}/`;
	const checkoutSession = await stripe.checkout.sessions.create({
		success_url: successUrl,
		cancel_url: cancelUrl,
		mode: 'payment',
		line_items: pricesToSend
	});

	return res.status(201).json({
		checkoutUrl: checkoutSession.url
	});
}
