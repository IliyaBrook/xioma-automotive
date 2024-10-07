import rmClientCookies from '@utils/rmClientCookies'
import { Request, Response } from 'express';
import { User } from '@models/userModel';
import jwt from 'jsonwebtoken';
import hasErrorMessage from '@utils/hasErrorMessage';

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
	try {
		const token = req.cookies.token;
		if (!token) {
			res.status(200).json({ message: 'unauthorized' });
			return;
		}
		
		const verifyToken = (token: string): Promise<{ name: string, _id: string }> => {
			return new Promise((resolve, reject) => {
				jwt.verify(token, process.env.JWT_SECRET!, async (err, decoded: any) => {
					if (err) {
						return reject('Invalid token');
					}
					
					try {
						const user = await User.findById(decoded.id);
						if (!user) {
							return reject('User not found');
						}
						resolve(user);
					} catch (err) {
						reject('Error fetching user');
					}
				});
			});
		};
		
		const user = await verifyToken(token);
		
		res.status(200).json({ user: { name: user.name, _id: user._id }, token });
	} catch (error) {
		if (hasErrorMessage(error)) {
			rmClientCookies(res);
			res.status(400).json({ message: error.message });
		} else {
			rmClientCookies(res);
			res.status(500).json({ message: 'unauthorized' });
		}
	}
};
