import '../lib/dayjs';

import { QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import { queryClient } from '@/lib/query';

import { globalStyles } from '../styles/global';

globalStyles();

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</QueryClientProvider>
	);
}
