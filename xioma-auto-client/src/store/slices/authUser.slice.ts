import { createSlice } from '@reduxjs/toolkit'
import { fetchUserStatus } from '@src/store/thunks/authUser.thunk.ts'
import type { IInitialAuthUser } from '@src/types/userData.types.ts'

const initialAuthUser:IInitialAuthUser = {
	_id: '',
	name: '',
	loading: true,
	isAuth: false
}

const authSlice = createSlice({
	name: 'auth',
	initialState: initialAuthUser,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserStatus.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchUserStatus.fulfilled, (state, action) => {
				state.name = action.payload?.name || ''
				state._id = action.payload?._id || ''
				state.isAuth = !!action.payload
				state.loading = false
			})
			.addCase(fetchUserStatus.rejected, (state) => {
				state.name = ''
				state._id = ''
				state.isAuth = false
				state.loading = false
			})
	},
})

export default authSlice.reducer;
