import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ITasksGet } from '@src/types/axios.queries.types.ts'
import { type ITask, ITaskLocation, type ITasksState } from '@src/types/task.type.ts'
import { getLocationName } from '@src/utils/getLocationName.ts'
import axios from 'axios'


export const fetchCountrySuggestions = createAsyncThunk(
	'taskModal/fetchCountrySuggestions',
	async (query: string) => {
		if (query.length < 2) return [];
		const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=&addressdetails=1`);
		const countries = response.data.map((item: any) => item.display_name);
		return [...new Set(countries)];
	}
);

export const fetchCitySuggestions = createAsyncThunk(
	'taskModal/fetchCitySuggestions',
	async ({ query, country }: { query: string; country?: string }) => {
		if (query.length < 2) return [];
		const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&country=${country}&addressdetails=1`);
		const cities = response.data.map((item: any) => item.display_name);
		return [...new Set(cities)];
	}
);

export const fetchLocation = createAsyncThunk(
	'taskModal/fetchLocation',
	async (_, { rejectWithValue }) => {
		if (!navigator.geolocation) return rejectWithValue('Geolocation not supported');
		
		return new Promise<ITaskLocation>((resolve) => {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude } = position.coords;
					const locationName = await getLocationName(latitude, longitude);
					resolve({ latitude, longitude, name: locationName });
				},
				() => resolve({ latitude: 0, longitude: 0, name: '' })
			);
		});
	}
);

export const fetchManualLocation = createAsyncThunk(
	'taskModal/fetchManualLocation',
	async ({ country, city }: { country: string; city: string }, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`https://nominatim.openstreetmap.org/search?format=json&city=${city}&country=${country}&limit=1`
			);
			
			if (response?.data?.[0]) {
				const { lat, lon } = response.data[0];
				const locationName = await getLocationName(lat, lon);
				return { latitude: parseFloat(lat), longitude: parseFloat(lon), name: locationName };
			} else {
				return rejectWithValue('No location data found');
			}
		} catch (error) {
			return rejectWithValue('Failed to fetch location');
		}
	}
);

export const fetchTasksThunk = createAsyncThunk(
	'tasks/fetchTasks',
	async (userId: string, { getState, rejectWithValue }) => {
		const state = getState() as { tasks: ITasksState };
		const { skip, hasMore } = state.tasks;

		if (!hasMore) return rejectWithValue('No more tasks');

		try {
			const response = await axios.get<ITasksGet>(`/api/tasks`, {
				params: { user: userId, limit: 10, skip },
			});
			return response.data.tasks;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const deleteTaskThunk = createAsyncThunk(
	'tasks/deleteTask',
	async (taskId: string, { rejectWithValue }) => {
		try {
			await axios.delete(`/api/tasks/${taskId}`);
			return taskId;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const updateTaskThunk = createAsyncThunk(
	'tasks/updateTask',
	async ({ task, taskId, userId }: { task: ITask; taskId: string, userId: string }, { rejectWithValue }) => {
		try {
			const response = await axios.put(`api/tasks?taskId=${taskId}&userId=${userId}`, task, { withCredentials: true });
			return { response: response.data, userId };
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const addTaskThunk = createAsyncThunk(
	'tasks/addTask',
	async ({userId, task }: {task: ITask, userId: string}, { rejectWithValue }) => {
		try {
			const response = await axios.post(`api/tasks?userId=${userId}`, task, { withCredentials: true });
			return { response: response.data, userId };
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);