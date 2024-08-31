import { Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import { DefaultLayout } from './Layout/Default';
import { Cart } from './pages/Cart';
import { Message } from './pages/Message';

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<DefaultLayout />}>
				<Route path="/" element={<Home />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/success" element={<Message />} />
			</Route>
		</Routes>
	);
}
