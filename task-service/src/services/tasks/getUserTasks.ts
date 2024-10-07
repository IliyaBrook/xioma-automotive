import { Task } from '@models/taskModel'
import type { RequestWithUser } from '@src/types/user.types'
import hasErrorMessage from '@utils/hasErrorMessage'
import { Response } from 'express'
import mongoose from 'mongoose'

export const getUserTasks = async (req: RequestWithUser, res: Response) => {
	try {
		const userId = req?.query?.user as string;
		const limit = parseInt(req.query.limit as string) || 10;
		const skip = parseInt(req.query.skip as string) || 0;
		
		if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
			return res.status(400).json({ message: 'Invalid user ID' });
		}
		
		const filterData = { assignee: new mongoose.Types.ObjectId(userId) };
		
		const tasks = await Task.find(filterData)
			.populate('assignee')
			.sort({ date: -1 })
			.skip(skip)
			.limit(limit);
		
		const totalTasks = await Task.countDocuments(filterData);
		
		res.status(200).json({ tasks, totalTasks });
	} catch (error) {
		if (hasErrorMessage(error)) {
			res.status(400).json({ message: error.message })
		}
	}
}