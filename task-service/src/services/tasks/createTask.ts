import { Task } from '@models/taskModel'
import type { ITask } from '@src/types/task.types'
import { sendTaskNotification } from '@src/websocket/notificationSocket'
import hasErrorMessage from '@utils/hasErrorMessage'
import { Request, Response } from 'express'

export const createTask = async (req: Request, res: Response) => {
	try {
		const taskData: ITask = req.body
		const task = new Task(taskData)
		const userId = req.query.userId;
		await task.save()
		const result = await Task.findById(task._id).populate('assignee', 'name')
		
		if (result) {
			void sendTaskNotification(result as ITask, 'create', userId as string)
		}
		
		res.status(201).json(result)
	} catch (error) {
		if (hasErrorMessage(error)) {
			res.status(400).json({ message: error.message })
		}
	}
}
