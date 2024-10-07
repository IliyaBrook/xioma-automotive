import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	deleteNotificationThunk,
	fetchNotificationsThunk, markNotificationAsReadThunk
} from '@src/store/thunks/notification.thunk.ts'
import type { INotification, INotificationsState } from '@src/types/notification.types'

const initialState: INotificationsState = {
	notifications: [],
	unreadCount: 0,
	isDrawerVisible: false,
	isLoading: false,
	hasMore: true,
	skip: 0
};

const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		addNotification(state, action: PayloadAction<INotification>) {
			state.notifications = [action.payload, ...state.notifications];
			state.unreadCount += 1;
		},
		toggleDrawer(state) {
			state.isDrawerVisible = !state.isDrawerVisible;
		},
		updateNotificationDetails(
			state,
			action: PayloadAction<{ notificationId: string; newDetails: string }>
		) {
			state.notifications = state.notifications.map((notification) =>
				notification._id === action.payload.notificationId
					? { ...notification, details: action.payload.newDetails }
					: notification
			);
		},
	},
	extraReducers: (builder) => {
		builder
			// fetch notifications
			.addCase(fetchNotificationsThunk.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchNotificationsThunk.fulfilled, (state, action:PayloadAction<INotification[]>) => {
				state.notifications = action.payload;
				state.unreadCount = action.payload.filter((n) => n.isUnread).length;
				state.isLoading = false;
			})
			.addCase(fetchNotificationsThunk.rejected, (state) => {
				state.isLoading = false;
				state.hasMore = false;
			})
      // mark notification as read
			.addCase(markNotificationAsReadThunk.fulfilled, (state, action: PayloadAction<INotification>) => {
				state.notifications = state.notifications.map((notification) =>
					notification._id === action.payload._id ? { ...notification, isUnread: false } : notification
				);
				if (state.unreadCount > 0 && action.payload.isUnread) {
					state.unreadCount -= 1;
				}
			})
		  // delete notification
			.addCase(deleteNotificationThunk.fulfilled, (state, action: PayloadAction<INotification>) => {
				state.notifications = state.notifications.filter((notification) => notification._id !== action.payload._id);
				if (state.unreadCount > 0 && action.payload.isUnread) {
					state.unreadCount -= 1;
				}
			})
	},
});

export const {
	addNotification,
	// markNotificationAsRead,
	// deleteNotification,
	toggleDrawer,
	updateNotificationDetails
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
