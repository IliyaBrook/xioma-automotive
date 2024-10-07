import { User } from '@models/userModel';
import { generateToken } from '@services/generateToken';
import hasErrorMessage from '@utils/hasErrorMessage';
import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
	try {
		const { name, password } = req.body;
		
		const login = async (name: string, password: string) => {
			const user = await User.findOne({ name });
			if (!user || !(await user.comparePassword(password))) {
				throw new Error('Invalid credentials');
			}
			const token = generateToken(user._id);
			return { user, token };
		};
		
		const { user, token } = await login(name, password);
		
		res.cookie('token', token, {
			httpOnly: true,
			secure: false,
			maxAge: 24000 * 60 * 60,
		});
		
		res.status(200).json({ user: { name: user.name, _id: user._id }, token });
	} catch (error) {
		if (hasErrorMessage(error)) {
			res.status(400).json({ message: error.message });
		}
	}
};
