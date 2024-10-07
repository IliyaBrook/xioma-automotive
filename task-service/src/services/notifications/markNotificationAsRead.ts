import { Notification } from '@models/notificationModel'
import { Request, Response } from 'express'

export const markNotificationAsRead = async (req: Request, res: Response) => {
	try {
		const notificationId = req.query.id as string;
		const result = await Notification.findByIdAndUpdate(notificationId, { isUnread: false }).populate('task')
		if (result) {
			res.status(200).json(result);
		}else{
			res.status(404).json({ message: 'Notification not found' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Error marking notification as read' });
	}
};