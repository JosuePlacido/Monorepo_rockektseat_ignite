export declare global {
	namespace ReactNavigation {
		interface RootParamList {
			home: undefined;
			statistics: { stats: IStatistics };
			message: { success: boolean };
			form: { id: string } | undefined;
			details: { id: string };
		}
	}
}
