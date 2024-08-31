import { ICartCoffee, IOrder } from '../../contexts/cart';

export enum ActionTypes {
	ADD_COFFEE = 'ADD_COFFEE',
	REMOVE_COFFEE = 'REMOVE_COFFEE',
	INCREASE_COFFEE_COUNT = 'INCREASE_COFFEE_COUNT',
	DECREASE_COFFEE_COUNT = 'DECREASE_COFFEE_COUNT',
	SUBMIT_ORDER = 'SUBMIT_ORDER'
}

function addNewCoffee(coffee: ICartCoffee) {
	return {
		type: ActionTypes.ADD_COFFEE,
		payload: {
			coffee
		}
	};
}
function removeCoffee(id: number) {
	return {
		type: ActionTypes.REMOVE_COFFEE,
		payload: {
			id
		}
	};
}

function incrementCoffee(id: number) {
	return {
		type: ActionTypes.INCREASE_COFFEE_COUNT,
		payload: {
			id
		}
	};
}

function decrementCoffee(id: number) {
	return {
		type: ActionTypes.DECREASE_COFFEE_COUNT,
		payload: {
			id
		}
	};
}
function submitOrder(order: IOrder) {
	return {
		type: ActionTypes.SUBMIT_ORDER,
		payload: {
			order
		}
	};
}
export const CartActions = {
	addNewCoffee,
	removeCoffee,
	incrementCoffee,
	decrementCoffee,
	submitOrder
};
