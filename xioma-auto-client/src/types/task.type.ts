export interface ITaskModalState {
	visible: boolean;
	mode: TTaskModalMode;
	task: ITask | null;
	title: string;
	description: string;
	location: ITaskLocation;
	loadingLocation: boolean;
	status: ITaskStatus;
	assigneeData: { name: string; _id: string } | null;
	authUsers: { name: string; _id: string }[];
	usersLoading: boolean;
	hasMoreUsers: boolean;
	usersSkip: number;
	countryOptions: Array<any>;
	cityOptions: Array<any>,
}

export interface ITask {
	_id?: string;
	location: ITaskLocation;
	title: string;
	date?: Date;
	description: string;
	assignee?: ITaskAssignee;
	status: number;
}
export interface ITaskLocation {
	name: string;
	longitude: number;
	latitude: number;
	country?: string;
	city?: string;
}

export interface ITaskAssignee {
	_id: string;
	name: string;
}
export enum ITaskStatus {
	NEW = 1,
	IN_PROGRESS = 2,
	COMPLETED = 3,
	ON_HOLD = 4,
	CANCELLED = 5,
}
export type TTaskModalMode = 'add' | 'edit';

export interface ITasksState {
	tasks: ITask[];
	isLoading: boolean;
	hasMore: boolean;
	skip: number;
}