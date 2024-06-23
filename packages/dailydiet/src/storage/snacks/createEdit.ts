import AsyncStorage from '@react-native-async-storage/async-storage';
import { SNACK_COLLECTION } from '@storage/storageConfig';
import { ISnack } from '@models/snacks';
import { getAllSnacks } from './getAll';
import { updateStatistics, updateStatisticsOnEditSnack } from '@storage/statistics/update';

export async function createEditSnack(snack: ISnack) {
	try {
		const storedSnacks = await getAllSnacks();
		const isEditing = !!snack.id;
		let differentSuccess = false;
		if (snack.id === "") {
			snack.id = snack.date.replaceAll('/', '') + snack.hour.replace(':', '');
			storedSnacks.push(snack);
		} else {
			const index = storedSnacks.findIndex(s => s.id === snack.id);
			differentSuccess = storedSnacks[index].success !== snack.success;
			storedSnacks[index] = snack;
		}

		const storage = JSON.stringify(storedSnacks);
		await AsyncStorage.setItem(`${SNACK_COLLECTION}`, storage);
		if (!isEditing) {
			await updateStatistics(snack);
		} else if (differentSuccess) {
			await updateStatisticsOnEditSnack(snack);
		}
	} catch (error) {
		throw error;
	}
}
