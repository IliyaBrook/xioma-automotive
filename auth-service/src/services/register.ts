import { User } from '@models/userModel';
import { generateToken } from '@services/generateToken';
import hasErrorMessage from '@utils/hasErrorMessage';
import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
	try {
		const { name, password } = req.body;
		
		const register = async (name: string, password: string) => {
			const user = new User({ name, password });
			await user.save();
			const token = generateToken(user._id);
			return { user, token };
		};
		
		const { user, token } = await register(name, password);
		
		res.cookie('token', token, {
			httpOnly: true,
			secure: false,
			maxAge: 24000 * 60 * 60,
		});
		
		res.status(201).json({ user: { name: user.name, _id: user._id }, token });
	} catch (error: unknown) {
		if (hasErrorMessage(error)) {
			res.status(400).json({ message: error.message });
		}
	}
};
