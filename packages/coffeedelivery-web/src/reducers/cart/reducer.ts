import { produce } from 'immer';
import { ICartCoffee, IOrder, IState } from '../../contexts/cart';
import { ActionTypes } from './actions';

export function cartReducer(state: IState, action: any) {
	switch (action.type) {
		case ActionTypes.ADD_COFFEE:
			return produce(state, draft => {
				draft.cart.push(action.payload.coffee as ICartCoffee);
			});
		case ActionTypes.REMOVE_COFFEE:
			return produce(state, draft => {
				draft.cart = draft.cart.filter(c => c.id !== action.payload.id);
			});
		case ActionTypes.INCREASE_COFFEE_COUNT: {
			const currentCycleIndex = state.cart.findIndex(
				c => c.id === action.payload.id
			);
			if (currentCycleIndex < 0) {
				return state;
			}
			return produce(state, draft => {
				draft.cart[currentCycleIndex].count++;
			});
		}
		case ActionTypes.DECREASE_COFFEE_COUNT: {
			const currentCycleIndex = state.cart.findIndex(c => {
				return c.id === action.payload.id;
			});

			if (currentCycleIndex < 0) {
				return state;
			}

			return produce(state, draft => {
				draft.cart[currentCycleIndex].count--;
			});
		}
		case ActionTypes.SUBMIT_ORDER: {
			const order: IOrder = action.payload.order;
			return produce(state, draft => {
				draft.orders.push(order);
				draft.cart.length = 0;
			});
		}
		default:
			return state;
	}
}
