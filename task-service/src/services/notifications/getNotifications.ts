import { Notification } from '@models/notificationModel';
import { Request, Response } from 'express';

export const getNotifications = async (req: Request, res: Response) => {
	try {
		const limit = parseInt(req.query.limit as string);
		const skip = parseInt(req.query.skip as string);
		const userId = req.query.user;

		const notifications = await Notification.find({
			user: userId
		})
			.populate('task')
			.sort({ isUnread: -1, datetime: -1 })
			.limit(limit)
			.skip(skip);
		
		const notificationCount = await Notification.countDocuments({ user: userId });
		const unreadCount = await Notification.countDocuments({ isUnread: true, user: userId });
		
		res.status(200).json({ notifications, notificationCount, unreadCount });
	} catch (error) {
		console.error('getNotifications error:', error);
		res.status(500).json({ message: 'Error fetching notifications' });
	}
};