import { type IUser } from '@src/types/model.types'
import bcrypt from 'bcryptjs'
import mongoose, { Schema } from 'mongoose'


export const userSchema: Schema<IUser> = new Schema({
	name: { type: String, required: true, unique: true },
	password: { type: String, required: true },
})


userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
	return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);
