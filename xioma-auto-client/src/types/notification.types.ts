import type { ITask } from '@src/types/task.type.ts'
import type { IUserDataUser } from '@src/types/userData.types.ts'

export interface ITaskNotification {
	task: ITask;
	method: 'create' | 'update';
	userId: string;
	notification: INotification;
}

export interface INotificationsState {
	notifications: INotification[];
	unreadCount: number;
	isDrawerVisible: boolean;
	isLoading: boolean;
	hasMore: boolean;
	skip: number;
}

export interface INotification {
	datetime: string;
	details: string;
	isUnread: boolean;
	task: ITask | string;
	user: IUserDataUser | string;
	_id: string;
}