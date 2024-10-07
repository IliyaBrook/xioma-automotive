import { createAsyncThunk } from '@reduxjs/toolkit'
import type { INotification } from '@src/types/notification.types.ts'
import axios from 'axios'

export const fetchNotificationsThunk = createAsyncThunk(
	'notifications/fetchNotifications',
	async (userId: string, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/api/notifications`, { params: { user: userId } });
			return response.data.notifications;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const markNotificationAsReadThunk = createAsyncThunk(
	'notifications/markNotificationAsRead',
	async (notification: INotification, { rejectWithValue }) => {
		try {
			await axios.put(`/api/notifications/markAsRead?id=${notification._id}`);
			return notification;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const deleteNotificationThunk = createAsyncThunk(
	'notifications/deleteNotification',
	async (notification: INotification, { rejectWithValue }) => {
		try {
			await axios.delete(`/api/notifications?id=${notification._id}`);
			return notification;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);