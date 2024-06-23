import { ISnack } from "@models/snacks";
import { STATS_COLLECTION } from "@storage/storageConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface IStatistics {
	total: number;
	in: number;
	out: number;
	currentSequence: number;
	biggestSequence: number;
	percent: number;
	limit: number;
}

export async function getStatistics() {
	try {
		const storage = await AsyncStorage.getItem(STATS_COLLECTION);
		const stats: IStatistics = storage ? JSON.parse(storage) : {
			total: 0,
			in: 0,
			out: 0,
			currentSequence: 0,
			biggestSequence: 0,
			percent: 0,
			limit: 50,
		};
		return stats;
	} catch (error) {
		throw error;
	}
}
