import { Types } from 'mongoose'

export interface INotification {
	_id: string;
	datetime: Date;
	user: Types.ObjectId;
	task: Types.ObjectId;
	details: string;
	isUnread: boolean;
}