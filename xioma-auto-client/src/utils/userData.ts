import type { IUserData } from '@src/types/userData.types.ts'

export const getUserData = (): IUserData | null => {
	const storageData = localStorage.getItem('data');
	if (storageData) {
		return JSON.parse(storageData);
	}
	return null;
}

export const setUserData = (data: IUserData): void => {
	localStorage.setItem('data', JSON.stringify(data));
}