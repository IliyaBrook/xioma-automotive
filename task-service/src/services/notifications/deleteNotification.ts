import { Notification } from '@models/notificationModel'
import { Request, Response } from 'express'

export const deleteNotification = async (req: Request, res: Response) => {
	try {
		const notificationId = req.query.id as string;
		const deletedNotification = await Notification.findByIdAndDelete(notificationId);
		
		if (!deletedNotification) {
			return res.status(404).json({ message: 'Notification not found' });
		}
		
		return res.status(200).json(deletedNotification);
	} catch (error) {
		res.status(500).json({ message: 'Error deleting notification' });
	}
};