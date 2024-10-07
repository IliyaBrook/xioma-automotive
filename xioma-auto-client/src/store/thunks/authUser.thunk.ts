import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ITaskModalState } from '@src/types/task.type.ts'
import type { IUserData } from '@src/types/userData.types.ts'
import axios from 'axios'

export const fetchUserStatus = createAsyncThunk('auth/fetchUserStatus', async () => {
	const response = await axios.get<IUserData>('/api/auth');
	return response.data.user || null;
});

export const fetchAuthUsers = createAsyncThunk(
	'auth/fetchAuthUsers',
	async (_, { getState, rejectWithValue }) => {
		const state = getState() as { taskModal: ITaskModalState }
		const { usersSkip, hasMoreUsers } = state.taskModal
		
		if (!hasMoreUsers) return rejectWithValue('No more users')
		
		try {
			const response = await axios.get('/api/auth/authUsers', {
				params: { limit: 20, skip: usersSkip }
			})
			return response.data
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)