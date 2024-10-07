import { Task } from '@models/taskModel'
import type { ITask } from '@src/types/task.types'
import { sendTaskNotification } from '@src/websocket/notificationSocket'
import hasErrorMessage from '@utils/hasErrorMessage'
import { Request, Response } from 'express'

export const updateTask = async (req: Request, res: Response) => {
	try {
		const taskId = req.query.taskId
		const taskData: Partial<ITask> = req.body
		const userId = req.query.userId;
		const result = await Task.findByIdAndUpdate(taskId, taskData, { new: true }).populate('assignee', 'name')
		
		if (result) {
			void sendTaskNotification(result as ITask, 'update', userId as string)
		}
		
		res.status(200).json(result)
	} catch (error) {
		if (hasErrorMessage(error)) {
			res.status(400).json({ message: error.message })
		}
	}
}
