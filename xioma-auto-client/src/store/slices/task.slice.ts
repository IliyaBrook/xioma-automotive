import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addTaskThunk, deleteTaskThunk, fetchTasksThunk, updateTaskThunk } from '@src/store/thunks/task.thunk.ts'
import type { ITask, ITasksState } from '@src/types/task.type'
import getUniqData from '@src/utils/getUniqData.ts'

const initialState: ITasksState = {
	tasks: [],
	isLoading: false,
	hasMore: true,
	skip: 0,
};

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask(state, action: PayloadAction<ITask>) {
			state.tasks = [action.payload, ...state.tasks];
		}
	},
	extraReducers: (builder) => {
		builder
			// fetch tasks
			.addCase(fetchTasksThunk.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchTasksThunk.fulfilled, (state, action) => {
				const newTasks = action.payload;
				state.tasks = getUniqData([...state.tasks, ...newTasks], '_id');
				state.hasMore = newTasks.length === 10;
				state.skip += 10;
				state.isLoading = false;
			})
			.addCase(fetchTasksThunk.rejected, (state) => {
				state.isLoading = false;
				state.hasMore = false;
			})
			// update task
			.addCase(updateTaskThunk.fulfilled, (state, action) => {
				const updatedTask: ITask = action.payload.response
				const updatedTaskUserId = updatedTask.assignee?._id;
				const userId = action.payload.userId;
				if (userId === updatedTaskUserId) {
					state.tasks = state.tasks.map((task) =>
						task._id === updatedTask._id ? updatedTask : task
					);
				}else {
					state.tasks = state.tasks.filter((task) =>
						task._id !== updatedTask._id
					);
				}
			})
			// add task
			.addCase(addTaskThunk.fulfilled, (state, action) => {
				const newTask = action.payload.response as ITask;
				const userId = action.payload.userId;
				const taskUserId = newTask.assignee?._id || '';
				if (userId === taskUserId) {
					state.tasks = [newTask, ...state.tasks];
				}
			})
		  // delete task
			.addCase(deleteTaskThunk.fulfilled, (state, action) => {
				state.tasks = state.tasks.filter((task) => task._id !== action.payload);
			})
	},
});

export const { addTask } = tasksSlice.actions;

export default tasksSlice.reducer;
