import { INotification    } from '@src/types/notification.types'
import mongoose, { Schema } from 'mongoose'

const notificationSchema: Schema<INotification> = new Schema({
		datetime: { type: Date, required: true },
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
		details: { type: String, required: true },
		isUnread: { type: Boolean, required: true, default: true }
})

export const Notification = mongoose.model<INotification>('Notification', notificationSchema);