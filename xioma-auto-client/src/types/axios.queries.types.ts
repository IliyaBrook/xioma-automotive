import { INotification } from '@src/types/notification.types.ts'
import type { ITask } from '@src/types/task.type.ts'

export interface INotificationsGet  {notifications: INotification[], notificationCount: number, unreadCount: number}
export interface ITasksGet  {tasks: ITask[], totalTasks: number}