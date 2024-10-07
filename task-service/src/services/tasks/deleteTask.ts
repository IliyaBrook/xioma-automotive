import { Task } from '@models/taskModel'
import hasErrorMessage from '@utils/hasErrorMessage'
import { Request, Response } from 'express'

export const deleteTask = async (req: Request, res: Response) => {
	try {
		await Task.findByIdAndDelete(req.params.id)
		res.status(204).send()
	} catch (error) {
		if (hasErrorMessage(error)) {
			res.status(400).json({ message: error.message })
		}
	}
}