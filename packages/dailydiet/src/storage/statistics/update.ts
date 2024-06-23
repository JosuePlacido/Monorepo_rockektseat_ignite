import { ISnack } from "@models/snacks";
import { SEQUENCE_COLLECTION, STATS_COLLECTION } from "@storage/storageConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStatistics } from "./getStatistics";
import { getAllSnacks } from "@storage/snacks/getAll";

export async function updateStatistics(snack: ISnack, add = true) {
	try {
		const stats = await getStatistics();
		const storageSequence = await AsyncStorage.getItem(SEQUENCE_COLLECTION);
		const sequence: string[] = storageSequence ? JSON.parse(storageSequence) : [];
		stats.total += add ? 1 : -1;
		if (snack.success) {
			stats.in += add ? 1 : -1;
			if (add) {
				sequence.push(snack.id);
				stats.currentSequence++;
			} else {
				const indexSnackInSequence = sequence.findIndex(s => s === snack.id);
				if (indexSnackInSequence >= 0) {
					stats.currentSequence--;
					sequence.splice(indexSnackInSequence, 1);
				}
			}
			if (stats.currentSequence > stats.biggestSequence) {
				stats.biggestSequence = stats.currentSequence;
			}
		} else {
			sequence.splice(0);
			stats.currentSequence = 0;
			stats.out += add ? 1 : -1;
		}

		await AsyncStorage.setItem(`${SEQUENCE_COLLECTION}`, JSON.stringify(sequence));
		stats.percent = stats.total > 0 ? stats.in / stats.total * 100 : 0;

		await AsyncStorage.setItem(`${STATS_COLLECTION}`, JSON.stringify(stats));
	} catch (error) {
		throw error;
	}
}

export async function updateStatisticsOnEditSnack(snack: ISnack) {
	try {
		const stats = await getStatistics();
		const storageSequence = await AsyncStorage.getItem(SEQUENCE_COLLECTION);
		const sequence: string[] = storageSequence ? JSON.parse(storageSequence) : [];

		if (snack.success) {
			stats.in++;
			stats.out--;
		} else {
			stats.in--;
			stats.out++;
		}

		const snacks = await getAllSnacks();
		sequence.splice(0);
		snacks.forEach(snack => {
			if (snack.success) {
				sequence.push(snack.id);
				stats.currentSequence++;
			}
			else {
				sequence.splice(0);
				stats.currentSequence = 0;
			}
		});

		if (stats.currentSequence > stats.biggestSequence) {
			stats.biggestSequence = stats.currentSequence;
		}

		await AsyncStorage.setItem(`${SEQUENCE_COLLECTION}`, JSON.stringify(sequence));
		stats.percent = stats.total > 0 ? stats.in / stats.total * 100 : 0;

		await AsyncStorage.setItem(`${STATS_COLLECTION}`, JSON.stringify(stats));
	} catch (error) {
		throw error;
	}
}
