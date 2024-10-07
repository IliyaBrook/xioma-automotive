import { Task } from '@models/taskModel'
import type { RequestWithUser } from '@src/types/user.types'
import hasErrorMessage from '@utils/hasErrorMessage'
import { Response } from 'express'

export const getTask = async (req: RequestWithUser, res: Response) => {
	try {
		const taskId = req.params.id;
		const task = await Task.findById({_id: taskId}).populate('assignee');
		
		res.status(200).json(task)
	} catch (error) {
		
		if (hasErrorMessage(error)) {
			res.status(400).json({ message: error.message })
		}
	}
}