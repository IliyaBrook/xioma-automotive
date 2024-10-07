import { Task } from '@models/taskModel'
import type { TServer } from '@src/types/server.types'
import type { ITask } from '@src/types/task.types'
import { Notification } from '@models/notificationModel';
import { Server } from 'socket.io'

let io: Server;

export const initNotificationSocket = (server: TServer) => {
	io = new Server(server, {
		cors: {
			origin: '*',
		},
	});
	
	io.on('connection', (socket) => {
		console.log('User connected');
		
		socket.on('join_room', (userId) => {
			console.log(`User with ID ${userId} joined room`);
			socket.join(userId);
		});
		
		socket.on('leave_room', (userId) => {
			console.log(`User with ID ${userId} left room`);
			socket.leave(userId);
		});
		
		socket.on('disconnect', () => {
			console.log('User disconnected');
		});
	});
};

export const sendTaskNotification = async (
	task: ITask,
	method: 'update' | 'create',
	userId: string
) => {
	if (io) {
		const assigneeId = task.assignee._id.toString();
		const taskId = task._id.toString();
		
		const newNotification = new Notification({
			datetime: new Date(),
			user: assigneeId,
			task: taskId,
			details: task.title,
			isUnread: true,
		});
		// const result = await Task.findById(task._id).populate('assignee', 'name')
		await newNotification.save();
		
		io.to(assigneeId).emit('task_notification', {
			task,
			notification: newNotification,
			method,
			userId
		});
	}
};