import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient({
	log: ['query']
});
prisma.$use(async (params, next) => {
	const result = await next(params);

	const transformBigIntToNumber = (obj: any): any => {
		if (obj === null || obj === undefined) return obj;

		if (typeof obj === 'bigint') return Number(obj);

		if (Array.isArray(obj)) {
			return obj.map(transformBigIntToNumber);
		}

		if (typeof obj === 'object' && Object.entries(obj).length > 0) {
			return Object.fromEntries(
				Object.entries(obj).map(([key, value]) => [key, transformBigIntToNumber(value)])
			);
		}

		return obj;
	};

	return transformBigIntToNumber(result);
});
