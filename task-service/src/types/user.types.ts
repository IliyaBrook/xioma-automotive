import { Request } from 'express'

export interface IUser {
	name: string;
	password: string;
	lastActive: Date;
	_id: string;
}

export interface RequestWithUser extends Request {
	user?: string;
}