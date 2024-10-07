// store.ts
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer from './slices/authUser.slice'
import notificationReducer from './slices/notification.slice'
import taskReducer from './slices/task.slice'
import taskModalReducer from './slices/taskModal.slice'


const store = configureStore({
	reducer: {
		auth: authReducer,
		notifications: notificationReducer,
		tasks: taskReducer,
		taskModal: taskModalReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware(
			{
				serializableCheck: false,
			}
		).concat(
			// updateTaskMiddleware,
			// createTaskMiddleware
		),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;