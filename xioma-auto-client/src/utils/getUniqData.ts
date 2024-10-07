interface IData {
	[key: string]: any;
}

export const getUniqData =  <T extends IData, K extends keyof  T>(data: T[], filterKey: K): T[] => {
	const uniqueData = new Map<string, T>();
	data.forEach((item) => {
		const keyValue = item[filterKey];
		if (!uniqueData.has(keyValue)) {
			uniqueData.set(keyValue, item);
		}
	});
	return Array.from(uniqueData.values());
}

export default getUniqData;