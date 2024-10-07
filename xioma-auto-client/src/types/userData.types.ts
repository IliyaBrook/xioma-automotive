export interface IUserData {
	user: IUserDataUser;
	token: string;
}
export interface IUserDataUser {
	name: string;
	_id: string;
}

export interface IInitialAuthUser extends IUserDataUser {
	loading: boolean,
	isAuth: boolean
}