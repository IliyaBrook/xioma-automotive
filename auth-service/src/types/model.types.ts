import { Document } from 'mongoose'

export interface IUser extends Document {
	name: string;
	password: string;
	lastActive: Date;
	comparePassword: (candidatePassword: string) => Promise<boolean>;
	_id: string;
}