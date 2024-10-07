import { User } from '@models/userModel'
import hasErrorMessage from '@utils/hasErrorMessage'
import { Request, Response } from 'express'

export const getAuthUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const skip = parseInt(req.query.skip as string) || 0;
		const limit = parseInt(req.query.limit as string) || 10;
		
		const getUsers = async () => {
			return User.find({}, { name: true, _id: true })
				.skip(skip)
				.limit(limit)
		};
		
		const totalUsers = await User.countDocuments({}, { name: true, _id: true });
		
		const users = await getUsers();
		res.status(200).json({users, totalUsers});
	} catch (error) {
		if (hasErrorMessage(error)) {
			res.status(400).json({ message: error.message });
		} else {
			res.status(500).json({ message: 'Server error' });
		}
	}
};
