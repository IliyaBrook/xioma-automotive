import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchAuthUsers } from '@src/store/thunks/authUser.thunk.ts'
import { fetchLocation } from '@src/store/thunks/task.thunk.ts'
import { ITaskStatus, ITask, type ITaskLocation, type ITaskModalState, type TTaskModalMode } from '@src/types/task.type'

const defaultLocation: ITaskLocation = {
	name: '',
	longitude: 0,
	latitude: 0,
	country: '',
	city: ''
}

const initialState: ITaskModalState = {
	visible: false,
	mode: 'add',
	task: null,
	title: '',
	description: '',
	location: defaultLocation,
	loadingLocation: false,
	status: ITaskStatus.NEW,
	assigneeData: null,
	authUsers: [],
	countryOptions: [],
	cityOptions: [],
	usersLoading: false,
	hasMoreUsers: true,
	usersSkip: 0
}

const taskModalSlice = createSlice({
	name: 'taskModal',
	initialState,
	reducers: {
		openModal(state, action: PayloadAction<{ mode: TTaskModalMode; task?: ITask }>) {
			state.visible = true
			state.mode = action.payload.mode
			state.task = action.payload.task || null
			
			if (action.payload.mode === 'edit' && action.payload.task) {
				state.title = action.payload.task.title
				state.description = action.payload.task.description
				state.location = action.payload.task.location || defaultLocation
				state.status = action.payload.task.status
				state.assigneeData = action.payload.task.assignee || null
			} else {
				state.title = ''
				state.description = ''
				state.location = defaultLocation
				state.status = ITaskStatus.NEW
				state.assigneeData = null
			}
		},
		closeModal(state) {
			state.visible = false
			state.title = ''
			state.description = ''
			state.location = defaultLocation
			state.status = ITaskStatus.NEW
			state.assigneeData = null
			state.task = null
			state.usersSkip = 0
			state.hasMoreUsers = true
			state.authUsers = []
		},
		updateTitle(state, action: PayloadAction<string>) {
			state.title = action.payload
		},
		updateDescription(state, action: PayloadAction<string>) {
			state.description = action.payload
		},
		updateStatus(state, action: PayloadAction<ITaskStatus>) {
			state.status = action.payload
		},
		updateAssignee(state, action: PayloadAction<{ name: string; _id: string }>) {
			state.assigneeData = action.payload
		},
		updateLocation(state, action: PayloadAction<ITaskLocation>) {
			state.location = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// fetch auth users
			.addCase(fetchAuthUsers.pending, (state) => {
				state.usersLoading = true
			})
			.addCase(fetchAuthUsers.fulfilled, (state, action) => {
				state.authUsers = [...state.authUsers, ...action.payload.users]
				state.usersSkip += action.payload.users.length
				state.hasMoreUsers = action.payload.users.length > 0
				state.usersLoading = false
			})
			.addCase(fetchAuthUsers.rejected, (state) => {
				state.usersLoading = false
			})
			// fetch location
			.addCase(fetchLocation.pending, (state) => {
				state.loadingLocation = true
			})
			.addCase(fetchLocation.fulfilled, (state, action) => {
				state.location = action.payload
				state.loadingLocation = false
			})
			.addCase(fetchLocation.rejected, (state) => {
				state.location = { latitude: 0, longitude: 0, name: '' }
				state.loadingLocation = false
			})
	}
})

export const {
	openModal,
	closeModal,
	updateTitle,
	updateDescription,
	updateStatus,
	updateAssignee,
	updateLocation
} = taskModalSlice.actions

export default taskModalSlice.reducer
