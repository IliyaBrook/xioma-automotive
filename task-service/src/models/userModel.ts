import type { IUser } from '@src/types/user.types'
import mongoose, { Schema } from 'mongoose'

export const userSchema: Schema<IUser> = new Schema({
	name: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

export const User = mongoose.model<IUser>('User', userSchema);