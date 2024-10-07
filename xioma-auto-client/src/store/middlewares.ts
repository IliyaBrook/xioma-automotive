// import type { Middleware } from '@reduxjs/toolkit'
// import { addNotification, updateNotificationDetails } from '@src/store/slices/notification.slice.ts'
// import type { RootState } from '@src/store/store.ts'
// import { addTaskThunk, updateTaskThunk } from '@src/store/thunks/task.thunk.ts'
// import type { INotification } from '@src/types/notification.types.ts'
//
// export const updateTaskMiddleware: Middleware = (store) => (next) => (action) => {
// 	if (updateTaskThunk.fulfilled.match(action)) {
// 		const taskData = action.payload.response;
// 		const taskId = taskData._id;
// 		const updatedTitle = taskData.title;
// 		if (taskId) {
// 			const state: RootState = store.getState();
// 			const notifications = state.notifications.notifications;
// 			const notification = notifications.find((n) => n._id === taskId);
// 			if (notification) {
// 				store.dispatch(
// 					updateNotificationDetails({
// 						notificationId: notification._id as string,
// 						newDetails: updatedTitle,
// 					})
// 				);
// 			}
// 		} else {
// 			console.error('Error: taskId is undefined.');
// 		}
// 	}
// 	return next(action);
// };
//
// export const createTaskMiddleware: Middleware = (store) => (next) => (action) => {
// 	if (addTaskThunk.fulfilled.match(action)) {
// 		const taskData = action.payload.response;
// 		const taskId = taskData._id;
// 		const taskTitle = taskData.title;
// 		const assigneeId = taskData.assignee?._id;
//
// 		if (taskId && assigneeId) {
// 			const newNotification: INotification = {
// 				datetime: new Date().toISOString(),
// 				user: assigneeId,
// 				task: taskId,
// 				details: taskTitle,
// 				isUnread: true,
// 			};
//
// 			store.dispatch(addNotification(newNotification));
// 		} else {
// 			console.error('Error: taskId or assigneeId is undefined.');
// 		}
// 	}
//
// 	return next(action);
// };