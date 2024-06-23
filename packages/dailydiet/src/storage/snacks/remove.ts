import AsyncStorage from '@react-native-async-storage/async-storage';
import { SNACK_COLLECTION } from '@storage/storageConfig';
import { ISnack } from '@models/snacks';
import { getAllSnacks } from './getAll';
import { updateStatistics } from '@storage/statistics/update';

export async function removeSnack(snack: ISnack) {
	try {
		const storedSnacks = await getAllSnacks();

		const storage = JSON.stringify(storedSnacks.filter(s => s.id !== snack.id));
		await AsyncStorage.setItem(`${SNACK_COLLECTION}`, storage);
		await updateStatistics(snack, false);
	} catch (error) {
		throw error;
	}
}
