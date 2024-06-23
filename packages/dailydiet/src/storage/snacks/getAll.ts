import AsyncStorage from '@react-native-async-storage/async-storage';

import { SNACK_COLLECTION } from '@storage/storageConfig';
import { ISnack } from '@models/snacks';

export interface IDataSnack {
	title: string;
	data: ISnack[];
}

export async function getAllSnacks() {
	try {
		const storage = await AsyncStorage.getItem(SNACK_COLLECTION);
		const database: ISnack[] = storage ? JSON.parse(storage) : [];

		return database;
	} catch (error) {
		throw error;
	}
}

export async function getAllSnacksSectioned() {
	try {
		const database = await getAllSnacks();
		const dataSectioned: IDataSnack[] = [];

		database.forEach(s => {
			const section = dataSectioned.find(d => d.title === s.date.replaceAll('/', '.'));
			if (section) {
				section.data.push(s);
			} else {
				dataSectioned.push({
					title: s.date.replaceAll('/', '.'),
					data: [s]
				});
			}
		});

		return dataSectioned;
	} catch (error) {
		throw error;
	}
}

export async function getById(id: string) {
	try {
		const database = await getAllSnacks();

		return database.filter(s => s.id === id)[0];
	} catch (error) {
		throw error;
	}
}
