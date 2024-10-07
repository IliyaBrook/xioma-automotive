import { Document, Types  } from 'mongoose'

export enum TaskStatus {
	NEW = 1,
	IN_PROGRESS = 2,
	COMPLETED = 3,
	ON_HOLD = 4,
	CANCELLED = 5,
}

export interface ITask extends Document {
	title: string;
	date?: Date;
	description: string;
	assignee: Types.ObjectId;
	location: {
		name: string;
		longitude: number;
		latitude: number;
	};
	status: number;
	_id: string;
}

