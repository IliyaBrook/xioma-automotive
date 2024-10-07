import { deleteNotification } from '@services/notifications/deleteNotification'
import { getNotifications } from '@services/notifications/getNotifications'
import { markNotificationAsRead } from '@services/notifications/markNotificationAsRead'
import { Router } from 'express'

const router = Router();

router.get('/', getNotifications);
router.put('/markAsRead', markNotificationAsRead);
router.delete('/', deleteNotification);

export default router;