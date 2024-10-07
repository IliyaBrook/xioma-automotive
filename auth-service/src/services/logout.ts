import rmClientCookies from '@utils/rmClientCookies'
import { Request, Response } from 'express';

export const logout = (req: Request, res: Response): void => {
	try {
		rmClientCookies(res);
		res.status(200).json({ message: 'Successfully logged out' });
	} catch (error) {
		res.status(500).json({ message: 'Error during logout' });
	}
};
