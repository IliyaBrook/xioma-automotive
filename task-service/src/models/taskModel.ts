import { userSchema } from '@models/userModel'
import { type ITask, TaskStatus } from '@src/types/task.types'
import mongoose, { Schema } from 'mongoose'

const taskSchema: Schema<ITask> = new Schema({
	title: { type: String, required: true },
	date: { type: Date, required: false, default: Date.now },
	description: { type: String, required: true },
	assignee: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	location: {
		name: { type: String },
		longitude: { type: Number },
		latitude: { type: Number }
	},
	status: {
		type: Number,
		enum: {
			values: Object.values(TaskStatus).filter(value => typeof value === 'number'),
			message: `{VALUE} is not a valid status! Correct values are: 1 = NEW, 2 = IN_PROGRESS, 3 = COMPLETED, 4 = ON_HOLD, 5 = CANCELLED.`
		},
		default: TaskStatus.NEW
	}
})


mongoose.model('User', userSchema);
export const Task = mongoose.model<ITask>('Task', taskSchema)
